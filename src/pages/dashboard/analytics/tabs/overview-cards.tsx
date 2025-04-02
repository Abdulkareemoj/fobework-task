import { Card, CardContent } from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils";
import {
  ArrowUpRight,
  Users,
  CreditCard,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

interface OverviewCardsProps {
  comparisonPeriod: string;
}

export default function OverviewCards({
  comparisonPeriod,
}: OverviewCardsProps) {
  const summaryItems = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1% from " + comparisonPeriod,
      trend: "up",
      icon: CreditCard,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "New Customers",
      value: "1,205",
      change: "+18.2% from " + comparisonPeriod,
      trend: "up",
      icon: Users,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Total Orders",
      value: "3,456",
      change: "+12.5% from " + comparisonPeriod,
      trend: "up",
      icon: ShoppingCart,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      title: "Growth Rate",
      value: "14.8%",
      change: "+2.3% from " + comparisonPeriod,
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
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
