import { drizzle } from "drizzle-orm/d1";
import { clients, invoices, users, organizations } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { hasActiveSubscription } from "@/lib/utils";
import { type Bindings } from "./types";

export async function invoiceNotify(env: Bindings): Promise<any> {
    const db = drizzle(env.DB);

    const allUsers = await db.select().from(users).where(eq(users.deleted, false));

    for (const user of allUsers) {
        const organization = await db.select().from(organizations).where(eq(organizations.id, user.currentOrgId)).get();
        if (!organization) continue;

        const hasActive = await hasActiveSubscription(organization.paystackCustomerId, env.PAYSTACK_SECRET);
        if (!hasActive) continue;

        const allClients = await db
            .select()
            .from(clients)
            .where(and(eq(clients.deleted, false), eq(clients.organizationId, user.currentOrgId)));

        for (const client of allClients) {
            const allInvoices = await db.select().from(invoices).where(eq(invoices.clientId, client.id));

            for (const invoice of allInvoices) {
                if (invoice.notified) continue;

                if (invoice.status === "sent" || invoice.status === "overdue") {
                    if (new Date(invoice.dueDate) < new Date()) {
                        // Send notification
                        await env.SEND_EMAIL.send({
                            from: "notify-noreply@acorp.app",
                            to: user.email,
                            subject: `Invoice Overdue: ${invoice.invoiceNumber}`,
                            text: `Invoice ${invoice.invoiceNumber} for ${client.name} is overdue. Consider sending a payment reminder.`,
                        });

                        await db.update(invoices).set({ notified: true }).where(eq(invoices.id, invoice.id));
                    }
                }
            }
        }
    }
}
