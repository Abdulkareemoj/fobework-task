import { cn } from "../../../lib/utils";
import { FileText, Download, Send, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  amount: string;
  issueDate: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

interface InvoicesListProps {
  status?: "all" | "paid" | "pending" | "overdue";
  searchQuery?: string;
}

const INVOICES: Invoice[] = [
  {
    id: "inv_1",
    invoiceNumber: "INV-2025-001",
    client: "Acme Corporation",
    amount: "$2,500.00",
    issueDate: "Mar 15, 2025",
    dueDate: "Apr 15, 2025",
    status: "pending",
  },
  {
    id: "inv_2",
    invoiceNumber: "INV-2025-002",
    client: "Globex Inc.",
    amount: "$1,800.00",
    issueDate: "Mar 10, 2025",
    dueDate: "Apr 10, 2025",
    status: "paid",
  },
  {
    id: "inv_3",
    invoiceNumber: "INV-2025-003",
    client: "Stark Industries",
    amount: "$3,200.00",
    issueDate: "Mar 5, 2025",
    dueDate: "Apr 5, 2025",
    status: "overdue",
  },
  {
    id: "inv_4",
    invoiceNumber: "INV-2025-004",
    client: "Wayne Enterprises",
    amount: "$4,500.00",
    issueDate: "Feb 28, 2025",
    dueDate: "Mar 28, 2025",
    status: "paid",
  },
  {
    id: "inv_5",
    invoiceNumber: "INV-2025-005",
    client: "Oscorp",
    amount: "$1,200.00",
    issueDate: "Feb 20, 2025",
    dueDate: "Mar 20, 2025",
    status: "overdue",
  },
  {
    id: "inv_6",
    invoiceNumber: "INV-2025-006",
    client: "Umbrella Corporation",
    amount: "$3,800.00",
    issueDate: "Feb 15, 2025",
    dueDate: "Mar 15, 2025",
    status: "pending",
  },
  {
    id: "inv_7",
    invoiceNumber: "INV-2025-007",
    client: "Cyberdyne Systems",
    amount: "$2,100.00",
    issueDate: "Feb 10, 2025",
    dueDate: "Mar 10, 2025",
    status: "paid",
  },
  {
    id: "inv_8",
    invoiceNumber: "INV-2025-008",
    client: "Massive Dynamic",
    amount: "$5,000.00",
    issueDate: "Feb 5, 2025",
    dueDate: "Mar 5, 2025",
    status: "pending",
  },
];

export default function InvoicesList({
  status = "all",
  searchQuery = "",
}: InvoicesListProps) {
  // Filter invoices based on status and search query
  const filteredInvoices = INVOICES.filter((invoice) => {
    const matchesStatus = status === "all" || invoice.status === status;
    const matchesSearch =
      searchQuery === "" ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const statusStyles = {
    paid: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    overdue: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvoices.length > 0 ? (
            filteredInvoices.map((invoice) => (
              <TableRow
                key={invoice.id}
                className="hover:bg-gray-50 dark:hover:bg-[#1F1F23]/50"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "p-2 rounded-lg",
                        "bg-gray-100 dark:bg-[#1F1F23]"
                      )}
                    >
                      <FileText className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </div>
                    <span>{invoice.invoiceNumber}</span>
                  </div>
                </TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>{invoice.issueDate}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(statusStyles[invoice.status])}
                  >
                    {invoice.status.charAt(0).toUpperCase() +
                      invoice.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {invoice.amount}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Send className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit invoice</DropdownMenuItem>
                        <DropdownMenuItem>Mark as paid</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 dark:text-red-400">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-gray-500 dark:text-gray-400"
              >
                No invoices found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
