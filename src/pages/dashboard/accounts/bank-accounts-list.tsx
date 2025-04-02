import { cn } from "../../../lib/utils";
import {
  BanknoteIcon as Bank,
  Wallet,
  CreditCard,
  MoreHorizontal,
  ExternalLink,
  ArrowRightLeft,
  FileText,
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
import { PiggyBank } from "lucide-react";

interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  balance: string;
  type: "checking" | "savings" | "credit";
  status: "active" | "inactive";
  lastUpdated: string;
}

interface BankAccountsListProps {
  type?: "all" | "checking" | "savings" | "credit";
  searchQuery?: string;
}

const BANK_ACCOUNTS: BankAccount[] = [
  {
    id: "acc_1",
    name: "Primary Checking",
    accountNumber: "•••• 4567",
    bankName: "Chase Bank",
    balance: "$5,250.00",
    type: "checking",
    status: "active",
    lastUpdated: "Today, 10:30 AM",
  },
  {
    id: "acc_2",
    name: "Savings Account",
    accountNumber: "•••• 7890",
    bankName: "Bank of America",
    balance: "$12,450.25",
    type: "savings",
    status: "active",
    lastUpdated: "Today, 10:30 AM",
  },
  {
    id: "acc_3",
    name: "Emergency Fund",
    accountNumber: "•••• 1234",
    bankName: "Wells Fargo",
    balance: "$8,750.00",
    type: "savings",
    status: "active",
    lastUpdated: "Today, 10:30 AM",
  },
  {
    id: "acc_4",
    name: "Travel Savings",
    accountNumber: "•••• 5678",
    bankName: "Ally Bank",
    balance: "$5,200.00",
    type: "savings",
    status: "active",
    lastUpdated: "Today, 10:30 AM",
  },
  {
    id: "acc_5",
    name: "Business Checking",
    accountNumber: "•••• 9012",
    bankName: "Chase Bank",
    balance: "$3,200.00",
    type: "checking",
    status: "active",
    lastUpdated: "Today, 10:30 AM",
  },
  {
    id: "acc_6",
    name: "Visa Credit Card",
    accountNumber: "•••• 3456",
    bankName: "Chase Bank",
    balance: "$1,850.00",
    type: "credit",
    status: "active",
    lastUpdated: "Today, 10:30 AM",
  },
  {
    id: "acc_7",
    name: "Mastercard Credit",
    accountNumber: "•••• 7890",
    bankName: "Citibank",
    balance: "$1,000.00",
    type: "credit",
    status: "active",
    lastUpdated: "Today, 10:30 AM",
  },
];

export default function BankAccountsList({
  type = "all",
  searchQuery = "",
}: BankAccountsListProps) {
  // Filter accounts based on type and search query
  const filteredAccounts = BANK_ACCOUNTS.filter((account) => {
    const matchesType = type === "all" || account.type === type;
    const matchesSearch =
      searchQuery === "" ||
      account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.bankName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  const getAccountIcon = (accountType: string) => {
    switch (accountType) {
      case "checking":
        return Wallet;
      case "savings":
        return PiggyBank;
      case "credit":
        return CreditCard;
      default:
        return Bank;
    }
  };

  const getAccountColor = (accountType: string) => {
    switch (accountType) {
      case "checking":
        return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30";
      case "savings":
        return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30";
      case "credit":
        return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30";
      default:
        return "text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-[#1F1F23]";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredAccounts.length > 0 ? (
        filteredAccounts.map((account) => {
          const AccountIcon = getAccountIcon(account.type);
          const colorClass = getAccountColor(account.type);

          return (
            <Card
              key={account.id}
              className="border-gray-200 dark:border-[#1F1F23]"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg", colorClass)}>
                      <AccountIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {account.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {account.bankName}
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
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>View transactions</DropdownMenuItem>
                      <DropdownMenuItem>Edit account</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 dark:text-red-400">
                        Remove account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Account Number
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {account.accountNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Current Balance
                    </p>
                    <p
                      className={cn(
                        "text-xl font-bold",
                        account.type === "credit"
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-900 dark:text-white"
                      )}
                    >
                      {account.balance}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={cn(
                        account.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      )}
                    >
                      {account.status.charAt(0).toUpperCase() +
                        account.status.slice(1)}
                    </Badge>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Updated: {account.lastUpdated}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ArrowRightLeft className="w-3.5 h-3.5 mr-1" />
                      Transfer
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="w-3.5 h-3.5 mr-1" />
                      Statement
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="w-3.5 h-3.5 mr-1" />
                      Go to Bank
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <div className="col-span-3 text-center py-8 text-gray-500 dark:text-gray-400">
          No bank accounts found
        </div>
      )}
    </div>
  );
}
