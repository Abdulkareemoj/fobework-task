import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";

export default function InvestmentsPerformance() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("1m");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // This would be replaced with actual chart data in a real application
  const performanceData = {
    "1w": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      values: [122500, 123200, 124100, 123800, 125850],
      change: "+2.7%",
    },
    "1m": {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      values: [120000, 122500, 121800, 125850],
      change: "+4.9%",
    },
    "3m": {
      labels: ["Jan", "Feb", "Mar"],
      values: [115000, 118500, 125850],
      change: "+9.4%",
    },
    "1y": {
      labels: ["Q2 '24", "Q3 '24", "Q4 '24", "Q1 '25"],
      values: [105000, 112000, 118000, 125850],
      change: "+19.9%",
    },
    all: {
      labels: ["2022", "2023", "2024", "2025"],
      values: [85000, 95000, 110000, 125850],
      change: "+48.1%",
    },
  };

  const currentData =
    performanceData[activeTab as keyof typeof performanceData];
  const minValue = Math.min(...currentData.values);
  const maxValue = Math.max(...currentData.values);
  const valueRange = maxValue - minValue;

  // Calculate if the overall trend is positive
  const isPositiveTrend =
    currentData.values[currentData.values.length - 1] > currentData.values[0];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Portfolio Performance</CardTitle>
          <Tabs
            defaultValue="1m"
            className="w-full sm:w-auto"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-5 w-full sm:w-auto">
              <TabsTrigger value="1w">1W</TabsTrigger>
              <TabsTrigger value="1m">1M</TabsTrigger>
              <TabsTrigger value="3m">3M</TabsTrigger>
              <TabsTrigger value="1y">1Y</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Current Value
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              $
              {(
                currentData.values[currentData.values.length - 1] / 1000
              ).toFixed(1)}
              k
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Change</p>
            <p
              className={`text-lg font-bold ${
                isPositiveTrend
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {currentData.change}
            </p>
          </div>
        </div>

        <div className="h-[250px] w-full relative">
          {/* Chart area */}
          <div className="absolute inset-0">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Chart line */}
              <path
                d={`
                  M 0,${
                    100 -
                    ((currentData.values[0] - minValue) / valueRange) * 100
                  }
                  ${currentData.values
                    .map((value, index) => {
                      const x = (index / (currentData.values.length - 1)) * 100;
                      const y = 100 - ((value - minValue) / valueRange) * 100;
                      return `L ${x},${y}`;
                    })
                    .join(" ")}
                `}
                fill="none"
                stroke={
                  isPositiveTrend
                    ? theme === "dark"
                      ? "#4ade80"
                      : "#16a34a"
                    : theme === "dark"
                    ? "#f87171"
                    : "#dc2626"
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Area under the line */}
              <path
                d={`
                  M 0,${
                    100 -
                    ((currentData.values[0] - minValue) / valueRange) * 100
                  }
                  ${currentData.values
                    .map((value, index) => {
                      const x = (index / (currentData.values.length - 1)) * 100;
                      const y = 100 - ((value - minValue) / valueRange) * 100;
                      return `L ${x},${y}`;
                    })
                    .join(" ")}
                  L 100,100
                  L 0,100
                  Z
                `}
                fill={
                  isPositiveTrend
                    ? theme === "dark"
                      ? "rgba(74, 222, 128, 0.1)"
                      : "rgba(22, 163, 74, 0.1)"
                    : theme === "dark"
                    ? "rgba(248, 113, 113, 0.1)"
                    : "rgba(220, 38, 38, 0.1)"
                }
              />
            </svg>
          </div>

          {/* Data points */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
            {currentData.labels.map((label) => (
              <div key={label} className="flex flex-col items-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 text-sm">
          <div className="text-gray-500 dark:text-gray-400">
            Initial: ${(currentData.values[0] / 1000).toFixed(1)}k
          </div>
          <div
            className={
              isPositiveTrend
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }
          >
            {isPositiveTrend ? "+" : "-"}$
            {(
              Math.abs(
                currentData.values[currentData.values.length - 1] -
                  currentData.values[0]
              ) / 1000
            ).toFixed(1)}
            k
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
