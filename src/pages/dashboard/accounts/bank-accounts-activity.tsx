import { useState } from "react";
import { cn } from "../../..//lib/utils";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ShoppingCart,
  Wallet,
  Building,
  Coffee,
  Car,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../..//components/ui/card";
import { Button } from "../../..//components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../..//components/ui/tabs";

interface Transaction {
  id: string;
  title: string;
  amount: string;
  type: "incoming" | "outgoing";
  category: string;
  icon: any;
  timestamp: string;
  account: string;
  accountType: "checking" | "savings" | "credit";
}

interface BankAccountsActivityProps {
  type?: "all" | "checking" | "savings" | "credit";
}

const RECENT_TRANSACTIONS: Transaction[] = [
  {
    id: "tx_1",
    title: "Salary Deposit",
    amount: "$4,500.00",
    type: "incoming",
    category: "income",
    icon: Building,
    timestamp: "Apr 1, 2025",
    account: "Primary Checking",
    accountType: "checking",
  },
  {
    id: "tx_2",
    title: "Rent Payment",
    amount: "$1,800.00",
    type: "outgoing",
    category: "housing",
    icon: Building,
    timestamp: "Mar 31, 2025",
    account: "Primary Checking",
    accountType: "checking",
  },
  {
    id: "tx_3",
    title: "Interest Payment",
    amount: "$45.25",
    type: "incoming",
    category: "interest",
    icon: Wallet,
    timestamp: "Mar 30, 2025",
    account: "Savings Account",
    accountType: "savings",
  },
  {
    id: "tx_4",
    title: "Grocery Shopping",
    amount: "$125.50",
    type: "outgoing",
    category: "shopping",
    icon: ShoppingCart,
    timestamp: "Mar 29, 2025",
    account: "Visa Credit Card",
    accountType: "credit",
  },
  {
    id: "tx_5",
    title: "Coffee Shop",
    amount: "$8.75",
    type: "outgoing",
    category: "food",
    icon: Coffee,
    timestamp: "Mar 28, 2025",
    account: "Primary Checking",
    accountType: "checking",
  },
  {
    id: "tx_6",
    title: "Uber Ride",
    amount: "$24.50",
    type: "outgoing",
    category: "transport",
    icon: Car,
    timestamp: "Mar 27, 2025",
    account: "Mastercard Credit",
    accountType: "credit",
  },
];

export default function BankAccountsActivity({
  type = "all",
}: BankAccountsActivityProps) {
  const [activeTab, setActiveTab] = useState("all");

  // Filter transactions based on account type
  const filteredTransactions = RECENT_TRANSACTIONS.filter((transaction) => {
    return type === "all" || transaction.accountType === type;
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Recent Activity</CardTitle>
          <Tabs
            defaultValue="all"
            className="w-full sm:w-auto"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 w-full sm:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="incoming">Deposits</TabsTrigger>
              <TabsTrigger value="outgoing">Withdrawals</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {filteredTransactions
            .filter(
              (transaction) =>
                activeTab === "all" || transaction.type === activeTab
            )
            .map((transaction) => (
              <div
                key={transaction.id}
                className={cn(
                  "group flex items-center gap-3",
                  "p-2 rounded-lg",
                  "hover:bg-gray-100 dark:hover:bg-[#1F1F23]/50",
                  "transition-all duration-200"
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-lg",
                    "bg-gray-100 dark:bg-[#1F1F23]",
                    "border border-gray-200 dark:border-[#1F1F23]"
                  )}
                >
                  <transaction.icon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>

                <div className="flex-1 flex items-center justify-between min-w-0">
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-medium text-gray-900 dark:text-gray-100">
                      {transaction.title}
                    </h3>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400">
                      {transaction.timestamp} • {transaction.account}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 pl-3">
                    <span
                      className={cn(
                        "text-xs font-medium",
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
                </div>
              </div>
            ))}
        </div>

        <Button variant="outline" className="w-full mt-4">
          View All Transactions
        </Button>
      </CardContent>
    </Card>
  );
}
