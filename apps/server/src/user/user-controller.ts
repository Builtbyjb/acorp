import { Hono } from "hono";
import { Bindings, Client, Invoice, TokenPayload } from "@/lib/types";
import { drizzle } from "drizzle-orm/d1";
import { eq, and } from "drizzle-orm";
import { clients, invoices } from "@/db/schema";
import {
    countPaidInvoices,
    calculateRevenue,
    countPendingAmount,
    getInvoiceData,
    getMonthlyRevenues,
    getRecentInvoices,
} from "./user-service";
import { authMiddleware } from "@/middleware/auth-middleware";

const userRouteV1 = new Hono<{ Bindings: Bindings }>().basePath("/user");
userRouteV1.use("*", authMiddleware());

userRouteV1.get("/dashboard", async (c) => {
    const db = drizzle(c.env.DB);
    const jwtPayload = c.get("jwtPayload") as TokenPayload;

    const allClients: Client[] = await db
        .select()
        .from(clients)
        .where(and(eq(clients.organizationId, jwtPayload.currentOrgId), eq(clients.deleted, false)));

    if (allClients.length === 0) return c.json({ message: "No clients found" }, 404);

    const totalClients = allClients.length;

    const allInvoices: Invoice[] = [];

    // Get all invoices for all clients
    for (const client of allClients) {
        const clientInvoices = await db
            .select()
            .from(invoices)
            .where(and(eq(invoices.clientId, client.id), eq(invoices.deleted, false)));

        allInvoices.push(...clientInvoices);
    }

    const totalRevenue: number = calculateRevenue(allInvoices);
    const paidInvoices = countPaidInvoices(allInvoices);
    const pendingAmount = countPendingAmount(allInvoices);
    const invoiceData = getInvoiceData(allInvoices);
    const monthlyRevenues = getMonthlyRevenues(allInvoices);
    const recentInvoices = getRecentInvoices(allInvoices);

    const data = {
        topStats: { totalRevenue, paidInvoices, pendingAmount, totalClients },
        invoiceData,
        monthlyRevenues,
        recentInvoices,
    };

    return c.json({ message: "Success", data }, 200);
});

userRouteV1.get("/settings", async (c) => {
    const tmp = {
        user: {
            avatar_url: "https://picsum.photos/id/433/300/300",
            username: "notdoe",
        },
        business: {
            logo_url: "https://picsum.photos/id/403/300/300",
            name: "ACME",
            email: "contact@business.com",
            phone: "+1 (555) 123-4567",
            website: "example.com",
            address: "123 Some Street",
            city: "City",
            country: "Country",
        },
    };
    return c.json({ message: "Profile settings", data: tmp }, 200);
});

userRouteV1.put("/settings/profile", async (c) => {
    const data = await c.req.parseBody();
    console.log(data);

    return c.json({ message: "User profile updated" }, 200);
});

userRouteV1.put("/settings/business", async (c) => {
    const data = await c.req.parseBody();
    console.log(data);

    return c.json({ message: "Business Profile updated" }, 200);
});

export default userRouteV1;
