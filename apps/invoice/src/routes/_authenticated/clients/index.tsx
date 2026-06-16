import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import ClientsTable from "@/components/ClientsTable";
import ClientForm from "@/components/ClientForm";
import { Button } from "@shared/ui/components/button";
import { Plus } from "lucide-react";
import type { Client } from "@/lib/types";
import * as z from "zod";
import { useLayout } from "@/hooks/useLayout";
import { useFetch } from "@/hooks/useFetch";
import { usePagination } from "@/hooks/usePagination";
import { ClientSchema } from "@shared/lib/zod-schema";

const clientsResponseSchema = z.object({
  clients: z.array(ClientSchema),
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
    setTitle("Clients");
  }, [setTitle]);

  const { doGET } = useFetch();

  const [formOpen, setFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const pagination = usePagination<Client>({
    fetcher: async (pageToFetch, sizeToFetch) => {
      const response = await doGET(`/api/v1/clients?page=${pageToFetch}&size=${sizeToFetch}`);
      if (response instanceof Error) throw response;
      if (!response.ok) throw new Error("Failed to fetch clients");
      const result = await response.json();
      const parsed = clientsResponseSchema.parse(result);
      return { data: parsed.clients, meta: parsed.meta };
    },
  });

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormOpen(true);
  };

  const handleFormClose = (open: boolean) => {
    setFormOpen(open);
    setEditingClient(null);
  };

  const handleClientEdit = (editedClient: Client) => {
    pagination.setData((prev) => prev.map((client) => (client.id === editedClient.id ? editedClient : client)));
  };

  const handleClientAdd = () => {
    pagination.refetch();
  };

  const handleClientDelete = async () => {
    await pagination.onItemDeleted();
  };

  return (
    <main className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      <ClientsTable
        onEdit={handleEdit}
        clients={pagination.data}
        deleteClient={handleClientDelete}
        meta={pagination.meta}
        onPageChange={(p) => pagination.setPage(p)}
        onSizeChange={(s) => pagination.setSize(s)}
        isLoading={pagination.isLoading}
      />

      <ClientForm
        open={formOpen}
        onOpenChange={handleFormClose}
        client={editingClient}
        addClient={handleClientAdd}
        editClient={handleClientEdit}
      />
    </main>
  );
}

export const Route = createFileRoute("/_authenticated/clients/")({
  component: RouteComponent,
});
