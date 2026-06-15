import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shared/ui/components/table";
import { Badge } from "@shared/ui/components/badge";
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
import { MoreHorizontal, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@shared/ui/components/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@shared/ui/components/select";
import type { Invoice } from "@shared/lib/types";
import { format } from "date-fns";
import { useNavigate } from "@tanstack/react-router";
import { formatCurrency, getBadgeVariant } from "@/lib/utils";
import { calculateTotalAmount } from "@shared/utils/util";
import { toast } from "sonner";
import { useFetch } from "@/hooks/useFetch";
import { SkeletonTable } from "@/components/Skeleton";

interface InvoicesTableProps {
  clientId: string;
  invoices: Invoice[];
  onDelete: (id: string) => Promise<void> | void;
  meta?: { total: number; page: number; size: number; totalPages: number } | null;
  onPageChange?: (page: number) => void;
  onSizeChange?: (size: number) => void;
  isLoading?: boolean;
}

const invoiceSkeletonColumns = [
  { lines: ["h-4 w-28"] },
  { className: "hidden md:table-cell", lines: ["h-3 w-24"] },
  { className: "hidden lg:table-cell", lines: ["h-3 w-24"] },
  { lines: ["h-3 w-28"] },
  { lines: ["h-3 w-16"] },
  { className: "text-right", isAction: true },
];

export default function InvoicesTable({
  invoices,
  onDelete,
  clientId,
  meta = null,
  onPageChange,
  onSizeChange,
  isLoading = false,
}: InvoicesTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const navigate = useNavigate();
  const { doDELETE } = useFetch();

  const handleDelete = async () => {
    if (deleteId) {
      try {
        const response = await doDELETE(`/api/v1/clients/${clientId}/invoices/${deleteId}/delete`);
        if (response instanceof Error) throw response;

        if (!response.ok) throw new Error("An error occurred while deleting the invoice");

        // Parent manages re-fetching/pagination
        await onDelete(deleteId);
        toast.success("Invoice Deleted");
      } catch (error: unknown) {
        if (error instanceof Error) toast.error(error.message);
        console.log(error);
      } finally {
        setDeleteId(null);
      }
    }
  };

  const handleNavigate = (clientId: string, invoiceId: string) => {
    navigate({ to: `/clients/${clientId}/invoices/${invoiceId}` });
  };

  const start = meta && meta.total > 0 ? (meta.page - 1) * meta.size + 1 : 0;
  const end = meta ? Math.min((meta.page || 1) * (meta.size || 10), meta.total || 0) : 0;

  return (
    <>
      {isLoading ? (
        <SkeletonTable columns={invoiceSkeletonColumns} />
      ) : (
        <>
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="hidden lg:table-cell">Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12.5"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices && (
                  <>
                    {invoices.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                          No invoices found. Create your first invoice to get started.
                        </TableCell>
                      </TableRow>
                    ) : (
                      invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="cursor-pointer" onClick={() => handleNavigate(clientId, invoice.id)}>
                            <div className="flex flex-col">
                              <span className="font-medium">{invoice.invoiceNumber}</span>
                            </div>
                          </TableCell>
                          <TableCell
                            className="hidden md:table-cell text-sm cursor-pointer"
                            onClick={() => handleNavigate(clientId, invoice.id)}
                          >
                            {format(new Date(invoice.issueDate), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell
                            className="hidden lg:table-cell text-sm cursor-pointer"
                            onClick={() => handleNavigate(clientId, invoice.id)}
                          >
                            {format(new Date(invoice.dueDate), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell
                            className="font-semibold cursor-pointer"
                            onClick={() => handleNavigate(clientId, invoice.id)}
                          >
                            {formatCurrency(
                              calculateTotalAmount(invoice.items, invoice.taxRate, invoice.discount),
                              invoice.currency,
                            )}
                          </TableCell>
                          <TableCell className="cursor-pointer" onClick={() => handleNavigate(clientId, invoice.id)}>
                            <Badge className={`capitalize ${getBadgeVariant(invoice.status)}`}>{invoice.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger className="cursor-pointer">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-44">
                                <DropdownMenuItem
                                  onClick={() =>
                                    navigate({
                                      to: "/clients/$clientId/invoices/$invoiceId",
                                      params: { invoiceId: invoice.id.toString(), clientId },
                                    })
                                  }
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    navigate({
                                      to: "/clients/$clientId/invoices/$invoiceId/edit",
                                      params: { invoiceId: invoice.id.toString(), clientId },
                                    })
                                  }
                                >
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setDeleteId(invoice.id)} className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="text-sm text-muted-foreground">
              {meta ? (meta.total === 0 ? "No invoices" : `Showing ${start} - ${end} of ${meta.total}`) : null}
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
            <AlertDialogTitle>Delete Invoice</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this invoice? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
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
