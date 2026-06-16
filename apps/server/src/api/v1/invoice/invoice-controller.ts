import { Hono } from "hono";
import { Bindings, TokenPayload } from "@/lib/types";
import { zValidator } from "@hono/zod-validator";
import { drizzle } from "drizzle-orm/d1";
import { eq, and, desc, sql } from "drizzle-orm";
import { clients, invoices, members, organizations } from "@/db/schema";
import { getNewInvoiceNumber, handleZodValidate } from "@/lib/utils";
import { InvoiceFormSchema } from "@shared/lib/zod-schema";
import { planAccessMiddleware } from "@/middleware/plan-access";
import { authMiddleware } from "@/middleware/authentication";

const invoiceRouteV1 = new Hono<{ Bindings: Bindings }>().basePath("/invoices");

/* Returns all invoices for the user's organization (paginated) */
export const invoiceListRouteV1 = new Hono<{ Bindings: Bindings }>().basePath("/invoices");
invoiceListRouteV1.use("*", authMiddleware());

invoiceListRouteV1.get("/", async (c) => {
    const db = drizzle(c.env.DB);

    const jwtPayload = c.get("jwtPayload") as TokenPayload;

    const member = await db.select().from(members).where(eq(members.userId, jwtPayload.userId));
    if (member.length == 0) return c.json("User is not part of an organization", 400);

    const pageStr = c.req.query("page");
    const sizeStr = c.req.query("size");

    let page = parseInt(pageStr ?? "1", 10);
    if (Number.isNaN(page) || page < 1) page = 1;

    let size = parseInt(sizeStr ?? "10", 10);
    if (Number.isNaN(size) || size < 1) size = 10;

    const MAX_SIZE = 100;
    size = Math.min(size, MAX_SIZE);

    const baseWhere = and(
        eq(clients.organizationId, member[0].organizationId),
        eq(clients.deleted, false),
        eq(invoices.deleted, false),
    );

    const countResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(invoices)
        .innerJoin(clients, eq(invoices.clientId, clients.id))
        .where(baseWhere)
        .get();
    const total = countResult?.count ?? 0;

    const offset = (page - 1) * size;

    const result = await db
        .select()
        .from(invoices)
        .innerJoin(clients, eq(invoices.clientId, clients.id))
        .where(baseWhere)
        .orderBy(desc(invoices.createdAt))
        .limit(size)
        .offset(offset);

    const invoicesResult = result.map((r) => r.invoices);

    return c.json(
        {
            message: "Invoices fetched",
            invoices: invoicesResult,
            meta: {
                total,
                page,
                size,
                totalPages: Math.ceil(total / size),
            },
        },
        200,
    );
});

/* Returns all the invoices created for a client */
invoiceRouteV1.get("/", async (c) => {
    const clientId = c.req.param("clientId");
    if (!clientId) return c.json({ message: "No client Id" }, 400);

    const db = drizzle(c.env.DB);

    const result = await db
        .select()
        .from(invoices)
        .where(and(eq(invoices.clientId, clientId), eq(invoices.deleted, false)))
        .orderBy(desc(invoices.createdAt));

    return c.json({ message: "All Invoices", data: result }, 200);
});

/* Gets a single invoices for a client using the invoice id */
invoiceRouteV1.get("/:invoiceId", async (c) => {
    const clientId = c.req.param("clientId");
    if (!clientId) return c.json({ message: "No client Id" }, 400);

    const invoiceId = c.req.param("invoiceId");
    if (!invoiceId) return c.json({ message: "No invoice Id" }, 400);

    const jwt = c.get("jwtPayload") as TokenPayload;

    const db = drizzle(c.env.DB);

    const organization = await db.select().from(organizations).where(eq(organizations.id, jwt.currentOrgId)).get();
    if (!organization) return c.json({ message: "Organization not found" }, 404);

    const clientResult = await db.select().from(clients).where(eq(clients.id, clientId)).get();
    if (!clientResult) return c.json({ message: "Client not found" }, 404);

    const invoiceResult = await db
        .select()
        .from(invoices)
        .where(and(eq(invoices.clientId, clientId), eq(invoices.id, invoiceId), eq(invoices.deleted, false)))
        .get();

    if (!invoiceResult) return c.json({ message: "Invoice not found" }, 404);

    return c.json({ invoice: invoiceResult, client: clientResult, logoURL: organization.logoURL }, 200);
});

invoiceRouteV1.post(
    "/create",
    planAccessMiddleware(),
    zValidator("json", InvoiceFormSchema, (result, c) => {
        return handleZodValidate(result, c);
    }),
    async (c) => {
        const db = drizzle(c.env.DB);
        const data = c.req.valid("json");
        const jwtPayload = c.get("jwtPayload") as TokenPayload;

        // Get previous organization invoice number
        const organization = await db
            .select()
            .from(organizations)
            .where(eq(organizations.id, jwtPayload.currentOrgId))
            .get();

        if (!organization) return c.json({ message: "Organization not found" }, 404);

        const newInvoiceNumber = getNewInvoiceNumber(organization.invoiceNumber);

        const invoiceNumber = "INV-" + newInvoiceNumber.year + "-" + newInvoiceNumber.currentNumber;

        if (!data.clientId) return c.json({ message: "Client ID is required" }, 400);

        // Create Invoice
        const invoiceId = await db
            .insert(invoices)
            .values({
                id: crypto.randomUUID(),
                invoiceNumber: invoiceNumber,
                clientId: data.clientId,
                issueDate: data.issueDate,
                dueDate: data.dueDate,
                status: data.status,
                signature: data.signature,
                discount: data.discount,
                taxRate: data.taxRate,
                items: data.items,
                notes: data.notes,
                currency: data.currency,
            })
            .returning({ id: invoices.id })
            .get();

        // Bookkeeping: Updating organizations invoice number
        await db
            .update(organizations)
            .set({ invoiceNumber: newInvoiceNumber })
            .where(eq(organizations.id, jwtPayload.currentOrgId));

        return c.json({ message: "Invoice created", data: invoiceId }, 200);
    },
);

invoiceRouteV1.put(
    "/:invoiceId/edit",
    zValidator("json", InvoiceFormSchema, (result, c) => {
        return handleZodValidate(result, c);
    }),
    async (c) => {
        const invoiceId = c.req.param("invoiceId");
        const db = drizzle(c.env.DB);
        const data = c.req.valid("json");

        await db
            .update(invoices)
            .set({
                issueDate: data.issueDate,
                dueDate: data.dueDate,
                status: data.status,
                discount: data.discount,
                taxRate: data.taxRate,
                items: data.items,
                signature: data.signature,
                notes: data.notes,
                currency: data.currency,
            })
            .where(eq(invoices.id, invoiceId));

        return c.json({ message: "Invoice Updated", data: { id: invoiceId } }, 200);
    },
);

invoiceRouteV1.delete("/:invoiceId/delete", async (c) => {
    const invoiceId = c.req.param("invoiceId");
    const db = drizzle(c.env.DB);

    console.log(invoiceId);

    await db.update(invoices).set({ deleted: true }).where(eq(invoices.id, invoiceId));
    return c.json({ message: "Invoice deleted" }, 200);
});

export default invoiceRouteV1;
