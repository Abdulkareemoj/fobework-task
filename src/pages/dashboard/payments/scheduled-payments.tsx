import { cn } from "../../../lib/utils";
import {
  Calendar,
  CreditCard,
  Building,
  Smartphone,
  Zap,
  Wifi,
  Receipt,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

interface ScheduledPayment {
  id: string;
  description: string;
  paymentMethod: string;
  amount: string;
  scheduledDate: string;
  recurrence: "one-time" | "monthly" | "quarterly" | "yearly";
  category: string;
  icon: any;
}

interface ScheduledPaymentsProps {
  searchQuery?: string;
}

const SCHEDULED_PAYMENTS: ScheduledPayment[] = [
  {
    id: "sp_1",
    description: "Rent Payment",
    paymentMethod: "Bank of America",
    amount: "$1,200.00",
    scheduledDate: "Apr 5, 2025",
    recurrence: "monthly",
    category: "housing",
    icon: Building,
  },
  {
    id: "sp_2",
    description: "Internet Bill",
    paymentMethod: "Visa ending in 4242",
    amount: "$59.99",
    scheduledDate: "Apr 10, 2025",
    recurrence: "monthly",
    category: "utilities",
    icon: Wifi,
  },
  {
    id: "sp_3",
    description: "Phone Bill",
    paymentMethod: "Mastercard ending in 5555",
    amount: "$45.00",
    scheduledDate: "Apr 15, 2025",
    recurrence: "monthly",
    category: "utilities",
    icon: Smartphone,
  },
  {
    id: "sp_4",
    description: "Electricity Bill",
    paymentMethod: "Visa ending in 4242",
    amount: "$85.20",
    scheduledDate: "Apr 20, 2025",
    recurrence: "monthly",
    category: "utilities",
    icon: Zap,
  },
  {
    id: "sp_5",
    description: "Annual Software License",
    paymentMethod: "Mastercard ending in 5555",
    amount: "$299.99",
    scheduledDate: "Jun 15, 2025",
    recurrence: "yearly",
    category: "subscription",
    icon: Receipt,
  },
];

export default function ScheduledPayments({
  searchQuery = "",
}: ScheduledPaymentsProps) {
  // Filter scheduled payments based on search query
  const filteredPayments = SCHEDULED_PAYMENTS.filter((payment) => {
    return (
      searchQuery === "" ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const recurrenceStyles = {
    "one-time": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    monthly: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    quarterly:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    yearly:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredPayments.length > 0 ? (
        filteredPayments.map((payment) => (
          <Card
            key={payment.id}
            className="border-gray-200 dark:border-[#1F1F23]"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      "bg-gray-100 dark:bg-[#1F1F23]"
                    )}
                  >
                    <payment.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {payment.description}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {payment.amount}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit payment</DropdownMenuItem>
                    <DropdownMenuItem>Skip next payment</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600 dark:text-red-400">
                      Cancel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Next payment: {payment.scheduledDate}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {payment.paymentMethod}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={cn(recurrenceStyles[payment.recurrence])}
                >
                  {payment.recurrence.charAt(0).toUpperCase() +
                    payment.recurrence.slice(1)}
                </Badge>

                <Button variant="outline" size="sm">
                  Pay Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-2 text-center py-8 text-gray-500 dark:text-gray-400">
          No scheduled payments found
        </div>
      )}
    </div>
  );
}
