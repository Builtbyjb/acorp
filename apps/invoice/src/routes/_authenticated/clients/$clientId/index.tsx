import { useState, useEffect, useCallback, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@shared/ui/components/button";
import { Mail, MapPin, Phone, Plus, UserCircle, ArrowLeft } from "lucide-react";
import InvoicesTable from "@/components/InvoicesTable";
import type { Client } from "@/lib/types";
import type { Invoice } from "@shared/lib/types";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useLayout } from "@/hooks/useLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/components/card";
import { useFetch } from "@/hooks/useFetch";
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
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [meta, setMeta] = useState<null | { total: number; page: number; size: number; totalPages: number }>(null);
  const [isLoading, setIsLoading] = useState(true);

  const skipAutoFetchRef = useRef(false);
  const fetchIdRef = useRef(0);

  const { clientId } = Route.useParams();
  const { doGET } = useFetch();

  const { setTitle } = useLayout();

  useEffect(() => {
    if (clientInfo?.name) setTitle(clientInfo.name);
  }, [setTitle, clientInfo]);

  const navigate = useNavigate();

  // Fetch client info and invoices for a specific page/size
  const fetchClientAndInvoices = useCallback(
    async (pageToFetch: number, sizeToFetch: number) => {
      fetchIdRef.current += 1;
      const fetchId = fetchIdRef.current;
      setIsLoading(true);
      try {
        const response = await doGET(`/api/v1/clients/${clientId}?page=${pageToFetch}&size=${sizeToFetch}`);
        if (response instanceof Error) throw response;

        const result = await response.json();
        if (!response.ok) throw new Error(result.message);

        const parsed = ClientInvoicesResponseSchema.parse(result);

        setClientInfo(parsed.clientInfo);
        setInvoices(parsed.invoices);
        setMeta(parsed.meta);

        return parsed;
      } catch (error: unknown) {
        if (error instanceof Error) toast.error(error.message);
        console.log(error);
        return null;
      } finally {
        if (fetchId === fetchIdRef.current) {
          setIsLoading(false);
        }
      }
    },
    [doGET, clientId],
  );

  useEffect(() => {
    if (skipAutoFetchRef.current) {
      skipAutoFetchRef.current = false;
      return;
    }

    fetchClientAndInvoices(page, size);
  }, [fetchClientAndInvoices, page, size]);

  const handleInvoiceDelete = async (invoiceId: string) => {
    // reference parameter to avoid lint error — deletion is performed by the table component
    void invoiceId;

    // The table component performs the delete request and then calls this handler.
    // We will re-fetch and adjust the page if needed so the user is not left on an empty page.

    // If we don't have meta, just re-fetch current page
    if (!meta) {
      await fetchClientAndInvoices(page, size);
      return;
    }

    const expectedTotal = Math.max(meta.total - 1, 0);
    const expectedTotalPages = Math.max(Math.ceil(expectedTotal / size), 1);

    if (expectedTotal === 0) {
      skipAutoFetchRef.current = true;
      setPage(1);
      try {
        await fetchClientAndInvoices(1, size);
      } finally {
        skipAutoFetchRef.current = false;
      }
      return;
    }

    if (page > expectedTotalPages) {
      skipAutoFetchRef.current = true;
      setPage(expectedTotalPages);
      try {
        await fetchClientAndInvoices(expectedTotalPages, size);
      } finally {
        skipAutoFetchRef.current = false;
      }
      return;
    }

    await fetchClientAndInvoices(page, size);
  };

  return (
    <div className="flex flex-col min-h-screen">
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
        isLoading && <SkeletonClientInfoCard />
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
          invoices={invoices}
          onDelete={handleInvoiceDelete}
          meta={meta}
          onPageChange={(p) => setPage(p)}
          onSizeChange={(s) => {
            setSize(s);
            setPage(1);
          }}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_authenticated/clients/$clientId/")({
  component: RouteComponent,
});
