import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import ClientsTable from "@/components/ClientsTable";
import ClientForm from "@/components/ClientForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Client } from "@/lib/types";
import * as z from "zod";
import { useLayout } from "@/hooks/useLayout";
import { useFetch } from "@/hooks/useFetch";
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
  const [clients, setClients] = useState<Client[]>([]);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [meta, setMeta] = useState<null | { total: number; page: number; size: number; totalPages: number }>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormOpen(true);
  };

  const handleFormClose = (open: boolean) => {
    setFormOpen(open);
    setEditingClient(null);
  };

  const handleClientEdit = (editedClient: Client) => {
    setClients((prev) => prev.map((client) => (client.id === editedClient.id ? editedClient : client)));
  };

  // Fetch clients for a specific page/size. Returns parsed result so callers can inspect meta.
  const skipAutoFetchRef = useRef(false);
  const fetchIdRef = useRef(0);

  const fetchClients = useCallback(
    async (pageToFetch: number, sizeToFetch: number) => {
      fetchIdRef.current += 1;
      const fetchId = fetchIdRef.current;
      setIsLoading(true);
      try {
        const response = await doGET(`/api/v1/clients?page=${pageToFetch}&size=${sizeToFetch}`);
        if (response instanceof Error) throw response;

        if (!response.ok) throw new Error("Failed to fetch clients");

        const result = await response.json();
        const parsed = clientsResponseSchema.parse(result);

        setClients(parsed.clients);
        setMeta(parsed.meta);
        return parsed;
      } catch (error) {
        console.log(error);
        return null;
      } finally {
        if (fetchId === fetchIdRef.current) {
          setIsLoading(false);
        }
      }
    },
    [doGET],
  );

  useEffect(() => {
    // Skip the auto-fetch if a manual fetch requested to avoid duplicate requests
    if (skipAutoFetchRef.current) {
      skipAutoFetchRef.current = false;
      return;
    }

    // Fetch when page or size changes
    fetchClients(page, size);
  }, [fetchClients, page, size]);

  const handleClientAdd = (client: Client) => {
    // Reference the parameter to avoid unused variable lint errors, then re-fetch
    void client;
    fetchClients(page, size);
  };

  const handleClientDelete = async (clientId: string) => {
    // Reference the parameter to avoid unused variable lint errors
    void clientId;

    // If we have meta, compute the expected new total after deletion to avoid briefly showing an empty page.
    if (meta) {
      const expectedTotal = Math.max(meta.total - 1, 0);
      const expectedTotalPages = Math.max(Math.ceil(expectedTotal / size), 1);

      // If expected total is zero, go back to page 1
      if (expectedTotal === 0) {
        skipAutoFetchRef.current = true;
        setPage(1);
        try {
          await fetchClients(1, size);
        } finally {
          skipAutoFetchRef.current = false;
        }
        return;
      }

      // If current page would be past last page after deletion, jump to the last page
      if (page > expectedTotalPages) {
        skipAutoFetchRef.current = true;
        setPage(expectedTotalPages);
        try {
          await fetchClients(expectedTotalPages, size);
        } finally {
          skipAutoFetchRef.current = false;
        }
        return;
      }
    }

    // Default: re-fetch current page
    await fetchClients(page, size);
  };

  return (
    <main className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        {/*<div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clients..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>*/}
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      <ClientsTable
        onEdit={handleEdit}
        clients={clients}
        deleteClient={handleClientDelete}
        meta={meta}
        onPageChange={(p) => setPage(p)}
        onSizeChange={(s) => {
          setSize(s);
          setPage(1); // reset to first page when size changes
        }}
        isLoading={isLoading}
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
