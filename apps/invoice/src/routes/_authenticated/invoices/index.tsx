import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Button } from "@shared/ui/components/button";
import { Plus } from "lucide-react";
import InvoicesTable from "@/components/InvoicesTable";
import { useLayout } from "@/hooks/useLayout";
import { useFetch } from "@/hooks/useFetch";
import { usePagination } from "@/hooks/usePagination";
import { type Invoice } from "@shared/lib/types";
import { InvoiceSchema } from "@shared/lib/zod-schema";
import * as z from "zod";

const invoicesResponseSchema = z.object({
  invoices: z.array(InvoiceSchema),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    size: z.number(),
    totalPages: z.number(),
  }),
});

function RouteComponent() {
  const { setTitle } = useLayout();

  useEffect(() => {
    setTitle("Invoices");
  }, [setTitle]);

  const { doGET } = useFetch();

  const pagination = usePagination<Invoice>({
    fetcher: async (pageToFetch, sizeToFetch) => {
      const response = await doGET(`/api/v1/invoices?page=${pageToFetch}&size=${sizeToFetch}`);
      if (response instanceof Error) throw response;
      if (!response.ok) throw new Error("Failed to fetch invoices");
      const result = await response.json();
      const parsed = invoicesResponseSchema.parse(result);
      return { data: parsed.invoices, meta: parsed.meta };
    },
  });

  const handleCreate = () => {
    console.log("Create invoice clicked");
  };

  const handleInvoiceDelete = async () => {
    await pagination.onItemDeleted();
  };

  return (
    <div>
      <Button onClick={handleCreate} className="mb-4">
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
  );
}

export const Route = createFileRoute("/_authenticated/invoices/")({
  component: RouteComponent,
});
