import { Card, CardContent } from "../../../components/ui/card";
import { cn } from "../../../lib/utils";
import { Wallet, CreditCard, PiggyBank, ArrowUpRight } from "lucide-react";

export default function BankAccountsSummary() {
  const summaryItems = [
    {
      title: "Total Balance",
      value: "$42,850.25",
      change: "+$1,250.83 (3.2%)",
      trend: "up",
      icon: Wallet,
      color: "text-gray-600 dark:text-gray-300",
      bgColor: "bg-gray-100 dark:bg-[#1F1F23]",
    },
    {
      title: "Checking Accounts",
      value: "$8,450.00",
      change: "+$450.25 (5.6%)",
      trend: "up",
      icon: Wallet,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Savings Accounts",
      value: "$26,400.25",
      change: "+$800.58 (3.1%)",
      trend: "up",
      icon: PiggyBank,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Credit Card Debt",
      value: "$2,850.00",
      change: "-$350.00 (10.9%)",
      trend: "down",
      icon: CreditCard,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryItems.map((item) => (
        <Card
          key={item.title}
          className="border-gray-200 dark:border-[#1F1F23]"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {item.value}
                </p>
                <p
                  className={cn(
                    "text-xs mt-1 flex items-center",
                    item.trend === "up"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  )}
                >
                  {item.change}
                  <ArrowUpRight
                    className={cn(
                      "w-3.5 h-3.5 ml-1",
                      item.trend === "down" && "rotate-180"
                    )}
                  />
                </p>
              </div>
              <div className={cn("p-3 rounded-full", item.bgColor)}>
                <item.icon className={cn("w-5 h-5", item.color)} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
