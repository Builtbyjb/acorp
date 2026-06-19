import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Pencil, Trash2, Mail, Phone, Eye } from "lucide-react";
import { PaginationBar } from "@/components/PaginationBar";
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
        const response = await fetch(`${API_URL}/api/v1/invoice/clients/delete/${deleteId}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to delete client");

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

  return (
    <>
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <>
          <div className="border border-black/10">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-black/10 hover:bg-transparent">
                  <TableHead className="text-[10px] font-mono font-bold tracking-widest uppercase text-neutral-500">
                    Name
                  </TableHead>
                  <TableHead className="hidden sm:table-cell text-[10px] font-mono font-bold tracking-widest uppercase text-neutral-500">
                    Contact
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-[10px] font-mono font-bold tracking-widest uppercase text-neutral-500">
                    Location
                  </TableHead>
                  <TableHead className="hidden lg:table-cell text-[10px] font-mono font-bold tracking-widest uppercase text-neutral-500">
                    Added
                  </TableHead>
                  <TableHead className="w-12.5"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-neutral-500">
                      No clients found. Add your first client to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  clients.map((client) => (
                    <TableRow key={client.id} className="border-b border-black/5 hover:bg-black/[0.02]">
                      <TableCell onClick={() => handleNavigate(client.id)} className="cursor-pointer">
                        <div className="flex flex-col">
                          <span className="font-bold text-black">{client.name}</span>
                          <span className="text-sm text-neutral-500 sm:hidden">{client.email}</span>
                        </div>
                      </TableCell>
                      <TableCell
                        className="hidden sm:table-cell hover:cursor-pointer"
                        onClick={() => handleNavigate(client.id)}
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-sm">
                            <Mail className="h-3.5 w-3.5 text-neutral-500" />
                            {client.email}
                          </div>
                          {client.phone && (
                            <div className="flex items-center gap-1.5 text-sm text-neutral-500">
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
                          <span className="text-black">{client.city}</span>
                          <span className="text-neutral-500">{client.country}</span>
                        </div>
                      </TableCell>
                      <TableCell
                        className="hidden lg:table-cell text-sm text-neutral-500 cursor-pointer"
                        onClick={() => handleNavigate(client.id)}
                      >
                        {format(client.createdAt, "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="cursor-pointer">
                            <MoreHorizontal className="h-4 w-4 text-neutral-500" />
                            <span className="sr-only">Open menu</span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="border-black/10">
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
                            <DropdownMenuSeparator className="bg-black/10" />
                            <DropdownMenuItem onClick={() => setDeleteId(client.id)} className="text-black">
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

          <PaginationBar meta={meta} onPageChange={onPageChange} onSizeChange={onSizeChange} label="clients" />
        </>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="border-black/10 rounded-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black">Delete Client</AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-500">
              Are you sure you want to delete this client? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="bg-white border-t-0">
            <AlertDialogCancel className="rounded-none">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-black text-white hover:bg-black/90 rounded-none">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
