import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

import InvoicesTable from "@/components/InvoicesTable";
import { Button } from "@shared/ui/components/Button";
import { Plus } from "lucide-react";

function RouteComponent() {
  const navigate = useNavigate();

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
    <>
      <div>Invoices</div>
      <Button onClick={() => navigate({ to: "/invoices/new" })} className="mb-4">
        <Plus className="mr-2 h-4 w-4" />
        Create Invoice
      </Button>
      <InvoicesTable
        clientId={clientId}
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
    </>
  );
}

export const Route = createFileRoute("/_authenticated/invoices/")({
  component: RouteComponent,
});
