import { Card, CardContent } from "../../../components/ui/card";
import { cn } from "../../../lib/utils";
import { TrendingUp, DollarSign, Percent } from "lucide-react";

export default function InvestmentsSummary() {
  const summaryItems = [
    {
      title: "Total Portfolio Value",
      value: "$125,850.75",
      change: "+$3,250.50 (2.7%)",
      trend: "up",
      icon: DollarSign,
      color: "text-gray-600 dark:text-gray-300",
      bgColor: "bg-gray-100 dark:bg-[#1F1F23]",
    },
    {
      title: "Today's Change",
      value: "+$1,250.25",
      change: "+1.0%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Total Return",
      value: "+$15,850.75",
      change: "+14.4%",
      trend: "up",
      icon: Percent,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Annual Dividend Yield",
      value: "$3,250.00",
      change: "2.6%",
      trend: "neutral",
      icon: TrendingUp,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
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
                      : item.trend === "down"
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-600 dark:text-gray-400"
                  )}
                >
                  {item.change}
                  {item.trend !== "neutral" && (
                    <TrendingUp
                      className={cn(
                        "w-3.5 h-3.5 ml-1",
                        item.trend === "down" && "rotate-180"
                      )}
                    />
                  )}
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
