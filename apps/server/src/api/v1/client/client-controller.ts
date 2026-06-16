import { Hono } from "hono";
import { Bindings, TokenPayload } from "@/lib/types";
import { zValidator } from "@hono/zod-validator";
import { drizzle } from "drizzle-orm/d1";
import { eq, and, like, desc } from "drizzle-orm";
import { clients, invoices, members } from "@/db/schema";
import invoiceRouteV1 from "@/api/v1/invoice/invoice-controller";
import { ClientFormSchema, ClientListSchema, ClientSchema } from "@shared/lib/zod-schema";
import { authMiddleware } from "@/middleware/authentication";
import { handleZodValidate } from "@/lib/utils";

const clientRouteV1 = new Hono<{ Bindings: Bindings }>().basePath("/clients");
clientRouteV1.use("*", authMiddleware());

clientRouteV1.get("/", async (c) => {
    const db = drizzle(c.env.DB);

    const jwtPayload = c.get("jwtPayload") as TokenPayload;

    const member = await db.select().from(members).where(eq(members.userId, jwtPayload.userId));
    if (member.length == 0) return c.json("User is not part of an organization", 400);

    // Pagination: query params ?page=1&size=10
    const pageStr = c.req.query("page");
    const sizeStr = c.req.query("size");

    let page = parseInt(pageStr ?? "1", 10);
    if (Number.isNaN(page) || page < 1) page = 1;

    let size = parseInt(sizeStr ?? "10", 10);
    if (Number.isNaN(size) || size < 1) size = 10;

    const MAX_SIZE = 100;
    size = Math.min(size, MAX_SIZE);

    const baseWhere = and(eq(clients.organizationId, member[0].organizationId), eq(clients.deleted, false));

    // Total items for pagination metadata
    const total = await db.$count(clients, baseWhere);

    const offset = (page - 1) * size;

    // Fetch the page
    const result = await db
        .select()
        .from(clients)
        .where(baseWhere)
        .orderBy(desc(clients.createdAt))
        .limit(size)
        .offset(offset);

    const parsedResult = ClientListSchema.parse(result);

    return c.json(
        {
            message: "Clients fetched",
            clients: parsedResult,
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

clientRouteV1.get("/:id", async (c) => {
    const id = c.req.param("id");

    const db = drizzle(c.env.DB);

    const pageStr = c.req.query("page");
    const sizeStr = c.req.query("size");

    let page = parseInt(pageStr ?? "1", 10);
    if (Number.isNaN(page) || page < 1) page = 1;

    let size = parseInt(sizeStr ?? "10", 10);
    if (Number.isNaN(size) || size < 1) size = 10;

    const MAX_SIZE = 100;
    size = Math.min(size, MAX_SIZE);

    const client = await db
        .select()
        .from(clients)
        .where(and(eq(clients.id, id), eq(clients.deleted, false)))
        .get();

    if (!client) return c.json("Client not found", 404);

    const baseWhere = and(eq(invoices.clientId, client.id), eq(invoices.deleted, false));

    // Total items for pagination metadata
    const total = await db.$count(invoices, baseWhere);

    const offset = (page - 1) * size;

    const invoicesResult = await db
        .select()
        .from(invoices)
        .where(baseWhere)
        .orderBy(desc(invoices.createdAt))
        .limit(size)
        .offset(offset);

    return c.json(
        {
            clientInfo: client,
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

clientRouteV1.post(
    "/create",
    zValidator("json", ClientFormSchema, (result, c) => {
        return handleZodValidate(result, c);
    }),
    async (c) => {
        const data = c.req.valid("json");
        const db = drizzle(c.env.DB);

        const jwtPayload = c.get("jwtPayload") as TokenPayload;

        const member = await db.select().from(members).where(eq(members.userId, jwtPayload.userId));
        if (member.length == 0) return c.json("User is not part of an organization", 400);

        const client = await db
            .insert(clients)
            .values({
                id: crypto.randomUUID(),
                organizationId: member[0].organizationId,
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                city: data.city,
                country: data.country,
            })
            .returning()
            .get();

        const parsedClient = ClientSchema.parse(client);

        return c.json({ message: "Client created", client: parsedClient }, 200);
    },
);

clientRouteV1.delete("/delete/:id", async (c) => {
    const db = drizzle(c.env.DB);
    const id = c.req.param("id");

    await db.update(clients).set({ deleted: true }).where(eq(clients.id, id));

    return c.json({ message: "Client Deleted" }, 200);
});

clientRouteV1.put(
    "/edit/:id",
    zValidator("json", ClientFormSchema, (result, c) => {
        return handleZodValidate(result, c);
    }),
    async (c) => {
        const db = drizzle(c.env.DB);
        const data = c.req.valid("json");
        const id = c.req.param("id");

        await db
            .update(clients)
            .set({
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                city: data.city,
                country: data.country,
            })
            .where(eq(clients.id, id));

        return c.json({ message: "Client data edited" }, 200);
    },
);

clientRouteV1.post("/search", async (c) => {
    const db = drizzle(c.env.DB);
    const data = await c.req.json();
    const jwtPayload = c.get("jwtPayload") as TokenPayload;

    const member = await db.select().from(members).where(eq(members.userId, jwtPayload.userId));
    if (member.length == 0) return c.json("User is not part of an organization", 400);

    const result = await db
        .select()
        .from(clients)
        .where(
            and(
                eq(clients.organizationId, member[0].organizationId),
                like(clients.name, `%${data.query}%`),
                eq(clients.deleted, false),
            ),
        );

    return c.json({ data: result }, 200);
});

/* Links the invoice routes to the clients route */
clientRouteV1.route("/:clientId", invoiceRouteV1);
export default clientRouteV1;
