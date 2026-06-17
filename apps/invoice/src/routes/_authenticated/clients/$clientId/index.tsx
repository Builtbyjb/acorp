import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Plus, UserCircle, ArrowLeft } from "lucide-react";
import InvoicesTable from "@/components/InvoicesTable";
import type { Client } from "@/lib/types";
import type { Invoice } from "@shared/lib/types";
import { useNavigate } from "@tanstack/react-router";
import { useLayout } from "@/hooks/useLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetch } from "@/hooks/useFetch";
import { usePagination } from "@/hooks/usePagination";
import { InvoiceSchema, ClientSchema } from "@shared/lib/zod-schema";
import { z } from "zod";
import { SkeletonClientInfoCard } from "@/components/Skeleton";

const ClientInvoicesResponseSchema = z.object({
  clientInfo: ClientSchema,
  invoices: z.array(InvoiceSchema),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    size: z.number(),
    totalPages: z.number(),
  }),
});

function RouteComponent() {
  const [clientInfo, setClientInfo] = useState<Client>();

  const { clientId } = Route.useParams();
  const { doGET } = useFetch();

  const { setTitle } = useLayout();

  useEffect(() => {
    if (clientInfo?.name) setTitle(clientInfo.name);
  }, [setTitle, clientInfo]);

  const navigate = useNavigate();

  const pagination = usePagination<Invoice>({
    fetcher: async (pageToFetch, sizeToFetch) => {
      const response = await doGET(`/api/v1/invoice/clients/${clientId}?page=${pageToFetch}&size=${sizeToFetch}`);
      if (response instanceof Error) throw response;

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      const parsed = ClientInvoicesResponseSchema.parse(result);

      setClientInfo(parsed.clientInfo);

      return { data: parsed.invoices, meta: parsed.meta };
    },
  });

  const handleInvoiceDelete = async () => {
    await pagination.onItemDeleted();
  };

  return (
    <div key={clientId} className="flex flex-col min-h-screen">
      <Button variant="ghost" onClick={() => navigate({ to: "/clients" })} className="w-fit mb-4">
        <ArrowLeft className="mr-2 h-8 w-8" />
        Back
      </Button>
      {clientInfo ? (
        <Card className="mb-8">
          <CardHeader className="flex items-center gap-3">
            <UserCircle className="h-6 w-6" />
            <CardTitle>{clientInfo.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0 mt-0.5">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Email</p>
                <p className="text-sm mt-0.5 whitespace-pre-line">{clientInfo.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Phone</p>
                <p className="text-sm mt-0.5 whitespace-pre-line">{clientInfo.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Address</p>
                <p className="text-sm mt-0.5 whitespace-pre-line">
                  <span>{clientInfo.address}</span>
                  <br />
                  <span>{clientInfo.city}</span>
                  <br />
                  <span>{clientInfo.country}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        pagination.isLoading && <SkeletonClientInfoCard />
      )}
      <div>
        <Button
          onClick={() => navigate({ to: "/clients/$clientId/invoices/new", params: { clientId } })}
          className="mb-4"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
        <InvoicesTable
          invoices={pagination.data}
          onDelete={handleInvoiceDelete}
          meta={pagination.meta}
          onPageChange={(p) => pagination.setPage(p)}
          onSizeChange={(s) => pagination.setSize(s)}
          isLoading={pagination.isLoading}
        />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_authenticated/clients/$clientId/")({
  component: RouteComponent,
});
