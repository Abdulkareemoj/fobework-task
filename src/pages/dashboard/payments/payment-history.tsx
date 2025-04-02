import { cn } from "../../../lib/utils";
import {
  CreditCard,
  Receipt,
  Building,
  Smartphone,
  Zap,
  Wifi,
  ShoppingCart,
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

interface Payment {
  id: string;
  description: string;
  paymentMethod: string;
  amount: string;
  date: string;
  status: "successful" | "pending" | "failed";
  category: string;
  icon: any;
}

interface PaymentHistoryProps {
  searchQuery?: string;
}

const PAYMENTS: Payment[] = [
  {
    id: "pay_1",
    description: "Monthly Subscription",
    paymentMethod: "Visa ending in 4242",
    amount: "$15.99",
    date: "Apr 1, 2025",
    status: "successful",
    category: "subscription",
    icon: Receipt,
  },
  {
    id: "pay_2",
    description: "Internet Bill",
    paymentMethod: "Mastercard ending in 5555",
    amount: "$59.99",
    date: "Mar 28, 2025",
    status: "successful",
    category: "utilities",
    icon: Wifi,
  },
  {
    id: "pay_3",
    description: "Phone Bill",
    paymentMethod: "Bank of America",
    amount: "$45.00",
    date: "Mar 25, 2025",
    status: "pending",
    category: "utilities",
    icon: Smartphone,
  },
  {
    id: "pay_4",
    description: "Electricity Bill",
    paymentMethod: "Visa ending in 4242",
    amount: "$85.20",
    date: "Mar 20, 2025",
    status: "failed",
    category: "utilities",
    icon: Zap,
  },
  {
    id: "pay_5",
    description: "Office Supplies",
    paymentMethod: "Mastercard ending in 5555",
    amount: "$120.50",
    date: "Mar 15, 2025",
    status: "successful",
    category: "shopping",
    icon: ShoppingCart,
  },
  {
    id: "pay_6",
    description: "Rent Payment",
    paymentMethod: "Bank of America",
    amount: "$1,200.00",
    date: "Mar 10, 2025",
    status: "successful",
    category: "housing",
    icon: Building,
  },
  {
    id: "pay_7",
    description: "Annual Software License",
    paymentMethod: "Visa ending in 4242",
    amount: "$299.99",
    date: "Mar 5, 2025",
    status: "successful",
    category: "subscription",
    icon: Receipt,
  },
];

export default function PaymentHistory({
  searchQuery = "",
}: PaymentHistoryProps) {
  // Filter payments based on search query
  const filteredPayments = PAYMENTS.filter((payment) => {
    return (
      searchQuery === "" ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const statusStyles = {
    successful:
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
            <TableHead>Description</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <TableRow
                key={payment.id}
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
                      <payment.icon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </div>
                    <span>{payment.description}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                    <span>{payment.paymentMethod}</span>
                  </div>
                </TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(statusStyles[payment.status])}
                  >
                    {payment.status.charAt(0).toUpperCase() +
                      payment.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {payment.amount}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-gray-500 dark:text-gray-400"
              >
                No payments found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
