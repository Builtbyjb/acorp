import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shared/ui/components/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/ui/components/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@shared/ui/components/alert-dialog";
import { MoreHorizontal, Pencil, Trash2, Mail, Phone, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@shared/ui/components/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@shared/ui/components/select";
import type { Client } from "@/lib/types";
import { format } from "date-fns";
import { toast } from "sonner";
import { Link, useNavigate } from "@tanstack/react-router";
import { SkeletonTable } from "@/components/Skeleton";

interface ClientsTableProps {
  onEdit: (client: Client) => void;
  clients: Client[];
  deleteClient: (clientId: string) => Promise<void> | void;
  meta?: { total: number; page: number; size: number; totalPages: number } | null;
  onPageChange?: (page: number) => void;
  onSizeChange?: (size: number) => void;
  isLoading?: boolean;
}

const API_URL = import.meta.env.VITE_API_URL;
export default function ClientsTable({
  onEdit,
  clients,
  deleteClient,
  meta = null,
  onPageChange,
  onSizeChange,
  isLoading = false,
}: ClientsTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleDelete = async () => {
    if (deleteId) {
      try {
        const response = await fetch(`${API_URL}/api/v1/clients/delete/${deleteId}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to delete client");

        // Let parent decide how to refresh list (we call deleteClient which should re-fetch)
        deleteClient(deleteId);
        toast.success("Client deleted");
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error);
          toast.error("Failed to delete client");
        } else {
          console.log(String(error));
        }
      } finally {
        setDeleteId(null);
      }
    }
  };

  const handleNavigate = (clientId: string) => {
    navigate({ to: `/clients/${clientId}` });
  };

  const start = meta && meta.total > 0 ? (meta.page - 1) * meta.size + 1 : 0;
  const end = meta ? Math.min((meta.page || 1) * (meta.size || 10), meta.total || 0) : 0;

  return (
    <>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <>
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Contact</TableHead>
                  <TableHead className="hidden md:table-cell">Location</TableHead>
                  <TableHead className="hidden lg:table-cell">Added</TableHead>
                  <TableHead className="w-12.5"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                      No clients found. Add your first client to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  clients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell onClick={() => handleNavigate(client.id)} className="cursor-pointer">
                        <div className="flex flex-col">
                          <span className="font-medium">{client.name}</span>
                          <span className="text-sm text-muted-foreground sm:hidden">{client.email}</span>
                        </div>
                      </TableCell>
                      <TableCell
                        className="hidden sm:table-cell hover:cursor-pointer"
                        onClick={() => handleNavigate(client.id)}
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-sm">
                            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                            {client.email}
                          </div>
                          {client.phone && (
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Phone className="h-3.5 w-3.5" />
                              {client.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell
                        className="hidden md:table-cell cursor-pointer"
                        onClick={() => handleNavigate(client.id)}
                      >
                        <div className="flex flex-col text-sm">
                          <span>{client.city}</span>
                          <span className="text-muted-foreground">{client.country}</span>
                        </div>
                      </TableCell>
                      <TableCell
                        className="hidden lg:table-cell text-sm text-muted-foreground cursor-pointer"
                        onClick={() => handleNavigate(client.id)}
                      >
                        {format(client.createdAt, "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="cursor-pointer">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Link to="/clients/$clientId" params={{ clientId: client.id }}>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={() => onEdit(client)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setDeleteId(client.id)} className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="text-sm text-muted-foreground">
              {meta ? (meta.total === 0 ? "No clients" : `Showing ${start} - ${end} of ${meta.total}`) : null}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  disabled={!meta || (meta && meta.page <= 1)}
                  onClick={() => {
                    if (onPageChange) onPageChange(Math.max(1, (meta?.page ?? 1) - 1));
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {meta ? `Page ${meta.page} of ${meta.totalPages}` : ""}
                </span>
                <Button
                  size="sm"
                  disabled={!meta || (meta && meta.page >= (meta.totalPages || 1))}
                  onClick={() => {
                    if (onPageChange) onPageChange(Math.min(meta?.totalPages ?? 1, (meta?.page ?? 1) + 1));
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground">Size</label>
                <Select
                  value={String(meta?.size ?? 10)}
                  onValueChange={(val) => {
                    if (val == null) return;
                    if (onSizeChange) onSizeChange(parseInt(val, 10));
                  }}
                >
                  <SelectTrigger size="sm" aria-label="Select page size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Client</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this client? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="bg-background">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-white hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
