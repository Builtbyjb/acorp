import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "@shared/ui/components/button";
import { Plus } from "lucide-react";
import InvoicesTable from "@/components/InvoicesTable";
import { useLayout } from "@/hooks/useLayout";
import { type Invoice } from "@shared/lib/types";

function RouteComponent() {
  const { setTitle } = useLayout();

  useEffect(() => {
    setTitle("Invoices");
  }, [setTitle]);

  // const navigate = useNavigate();

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<null | { total: number; page: number; size: number; totalPages: number }>(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const handleCreate = () => {
    console.log("Create invoice clicked");
  };

  const handleInvoiceDelete = (id: string) => {
    void id;
    setInvoices(invoices.filter((invoice) => invoice.id !== id));
    setIsLoading(false);
    setMeta(null);
    console.log(page);
    console.log(size);
  };

  return (
    <div>
      <Button onClick={handleCreate} className="mb-4">
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
  );
}

export const Route = createFileRoute("/_authenticated/invoices/")({
  component: RouteComponent,
});
