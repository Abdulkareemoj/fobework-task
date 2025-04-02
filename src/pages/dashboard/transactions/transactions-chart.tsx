// import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";

export default function TransactionsChart({
  type = "all",
}: {
  type?: "all" | "incoming" | "outgoing";
}) {
  // const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("week");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // This would be replaced with actual chart data in a real application
  const chartData = {
    week: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      incoming: [500, 800, 300, 400, 600, 200, 900],
      outgoing: [300, 400, 500, 200, 700, 300, 600],
    },
    month: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      incoming: [2500, 3000, 2800, 3500],
      outgoing: [2000, 2200, 2500, 1800],
    },
    year: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      incoming: [
        5000, 4800, 5200, 5500, 6000, 5800, 6200, 6500, 6300, 6700, 7000, 7500,
      ],
      outgoing: [
        4500, 4300, 4700, 4800, 5200, 5000, 5500, 5800, 5600, 6000, 6200, 6500,
      ],
    },
  };

  const currentData = chartData[activeTab as keyof typeof chartData];

  // Calculate totals based on type
  const incomingTotal = currentData.incoming.reduce((sum, val) => sum + val, 0);
  const outgoingTotal = currentData.outgoing.reduce((sum, val) => sum + val, 0);
  const balance = incomingTotal - outgoingTotal;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Transaction Overview</CardTitle>
            <CardDescription>
              {type === "all"
                ? "Summary of all your financial activity"
                : type === "incoming"
                ? "Summary of your income"
                : "Summary of your expenses"}
            </CardDescription>
          </div>
          <Tabs
            defaultValue="week"
            className="w-full sm:w-auto"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 w-full sm:w-auto">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-[#1F1F23]/50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Income</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${(incomingTotal / 1000).toFixed(1)}k
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              +5.2% from previous period
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-[#1F1F23]/50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Expenses</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              ${(outgoingTotal / 1000).toFixed(1)}k
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              -2.4% from previous period
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-[#1F1F23]/50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${(balance / 1000).toFixed(1)}k
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              +8.7% from previous period
            </p>
          </div>
        </div>

        <div className="h-[250px] w-full flex items-end justify-between gap-2 mt-6 px-2">
          {currentData.labels.map((label, index) => {
            const inHeight =
              (currentData.incoming[index] /
                Math.max(...currentData.incoming)) *
              100;
            const outHeight =
              (currentData.outgoing[index] /
                Math.max(...currentData.outgoing)) *
              100;

            return (
              <div
                key={label}
                className="flex flex-col items-center gap-2 w-full"
              >
                <div className="w-full flex justify-center gap-1">
                  <div
                    className="w-[40%] bg-green-500 dark:bg-green-600 rounded-t-sm"
                    style={{ height: `${inHeight * 2}px` }}
                  />
                  <div
                    className="w-[40%] bg-red-500 dark:bg-red-600 rounded-t-sm"
                    style={{ height: `${outHeight * 2}px` }}
                  />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {label}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 dark:bg-green-600 rounded-full" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Income
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 dark:bg-red-600 rounded-full" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Expenses
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
