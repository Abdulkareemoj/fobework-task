import { cn } from "../../../lib/utils";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  ShoppingCart,
  Wallet,
  type LucideIcon,
  Building,
  Coffee,
  Car,
  Smartphone,
  Utensils,
  Home,
  Plane,
  Zap,
  Wifi,
  Gift,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";

interface Transaction {
  id: string;
  title: string;
  amount: string;
  type: "incoming" | "outgoing";
  category: string;
  icon: LucideIcon;
  timestamp: string;
  status: "completed" | "pending" | "failed";
  reference?: string;
}

interface TransactionsListProps {
  type?: "all" | "incoming" | "outgoing";
  searchQuery?: string;
}

const TRANSACTIONS: Transaction[] = [
  {
    id: "tx_1",
    title: "Salary Deposit",
    amount: "$4,500.00",
    type: "incoming",
    category: "income",
    icon: Building,
    timestamp: "Apr 1, 2025",
    status: "completed",
    reference: "ACME Corp",
  },
  {
    id: "tx_2",
    title: "Apple Store Purchase",
    amount: "$999.00",
    type: "outgoing",
    category: "shopping",
    icon: ShoppingCart,
    timestamp: "Mar 30, 2025",
    status: "completed",
    reference: "Apple Inc.",
  },
  {
    id: "tx_3",
    title: "Netflix Subscription",
    amount: "$15.99",
    type: "outgoing",
    category: "entertainment",
    icon: CreditCard,
    timestamp: "Mar 28, 2025",
    status: "completed",
    reference: "Netflix",
  },
  {
    id: "tx_4",
    title: "Freelance Payment",
    amount: "$850.00",
    type: "incoming",
    category: "income",
    icon: Wallet,
    timestamp: "Mar 25, 2025",
    status: "completed",
    reference: "Client XYZ",
  },
  {
    id: "tx_5",
    title: "Starbucks Coffee",
    amount: "$5.75",
    type: "outgoing",
    category: "food",
    icon: Coffee,
    timestamp: "Mar 24, 2025",
    status: "completed",
    reference: "Starbucks",
  },
  {
    id: "tx_6",
    title: "Uber Ride",
    amount: "$12.50",
    type: "outgoing",
    category: "transport",
    icon: Car,
    timestamp: "Mar 23, 2025",
    status: "completed",
    reference: "Uber",
  },
  {
    id: "tx_7",
    title: "Phone Bill",
    amount: "$45.00",
    type: "outgoing",
    category: "utilities",
    icon: Smartphone,
    timestamp: "Mar 20, 2025",
    status: "pending",
    reference: "Verizon",
  },
  {
    id: "tx_8",
    title: "Restaurant Dinner",
    amount: "$78.50",
    type: "outgoing",
    category: "food",
    icon: Utensils,
    timestamp: "Mar 18, 2025",
    status: "completed",
    reference: "Italian Bistro",
  },
  {
    id: "tx_9",
    title: "Rent Payment",
    amount: "$1,200.00",
    type: "outgoing",
    category: "housing",
    icon: Home,
    timestamp: "Mar 15, 2025",
    status: "completed",
    reference: "Property Management",
  },
  {
    id: "tx_10",
    title: "Tax Refund",
    amount: "$750.00",
    type: "incoming",
    category: "income",
    icon: Wallet,
    timestamp: "Mar 12, 2025",
    status: "completed",
    reference: "IRS",
  },
  {
    id: "tx_11",
    title: "Flight Tickets",
    amount: "$450.00",
    type: "outgoing",
    category: "travel",
    icon: Plane,
    timestamp: "Mar 10, 2025",
    status: "completed",
    reference: "Delta Airlines",
  },
  {
    id: "tx_12",
    title: "Electricity Bill",
    amount: "$85.20",
    type: "outgoing",
    category: "utilities",
    icon: Zap,
    timestamp: "Mar 8, 2025",
    status: "failed",
    reference: "Power Company",
  },
  {
    id: "tx_13",
    title: "Internet Bill",
    amount: "$59.99",
    type: "outgoing",
    category: "utilities",
    icon: Wifi,
    timestamp: "Mar 5, 2025",
    status: "completed",
    reference: "Comcast",
  },
  {
    id: "tx_14",
    title: "Birthday Gift",
    amount: "$50.00",
    type: "incoming",
    category: "other",
    icon: Gift,
    timestamp: "Mar 3, 2025",
    status: "completed",
    reference: "John Smith",
  },
];

export default function TransactionsList({
  type = "all",
  searchQuery = "",
}: TransactionsListProps) {
  // Filter transactions based on type and search query
  const filteredTransactions = TRANSACTIONS.filter((transaction) => {
    const matchesType = type === "all" || transaction.type === type;
    const matchesSearch =
      searchQuery === "" ||
      transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.reference?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  const statusStyles = {
    completed:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    failed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="hover:bg-gray-50 dark:hover:bg-[#1F1F23]/50 cursor-pointer"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "p-2 rounded-lg",
                        "bg-gray-100 dark:bg-[#1F1F23]"
                      )}
                    >
                      <transaction.icon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </div>
                    <span>{transaction.title}</span>
                  </div>
                </TableCell>
                <TableCell>{transaction.timestamp}</TableCell>
                <TableCell>{transaction.reference || "-"}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(statusStyles[transaction.status])}
                  >
                    {transaction.status.charAt(0).toUpperCase() +
                      transaction.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <span
                      className={cn(
                        "font-medium",
                        transaction.type === "incoming"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      )}
                    >
                      {transaction.type === "incoming" ? "+" : "-"}
                      {transaction.amount}
                    </span>
                    {transaction.type === "incoming" ? (
                      <ArrowDownLeft className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-gray-500 dark:text-gray-400"
              >
                No transactions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
