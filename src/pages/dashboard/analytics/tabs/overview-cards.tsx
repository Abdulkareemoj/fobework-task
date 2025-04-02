import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { cn } from "../../../../lib/utils";
import { Users, CreditCard, ShoppingCart, TrendingUp } from "lucide-react";

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
    <>
      {summaryItems.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <div className={cn("p-2 rounded-full", item.bgColor)}>
              <item.icon className={cn("h-4 w-4", item.color)} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">
              {item.change || "Compared to last month"}
            </p>
            <div
              className={cn(
                "mt-2 flex items-center text-xs",
                item.trend === "up"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              )}
            >
              <TrendingUp
                className={cn(
                  "mr-1 h-3 w-3",
                  item.trend === "down" && "transform rotate-180"
                )}
              />
              {item.change}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
