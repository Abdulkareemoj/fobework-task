import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

interface RevenueChartProps {
  comparisonPeriod: string;
}

export default function RevenueChart({ comparisonPeriod }: RevenueChartProps) {
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
  const revenueData = {
    "1w": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: [4500, 5200, 4800, 5800, 6000, 5500, 6500],
      change: "+12.5%",
    },
    "1m": {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      values: [18000, 22000, 19500, 24000],
      change: "+20.1%",
    },
    "3m": {
      labels: ["Jan", "Feb", "Mar"],
      values: [55000, 62000, 75000],
      change: "+26.8%",
    },
    "1y": {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      values: [180000, 210000, 245000, 280000],
      change: "+32.4%",
    },
  };

  const currentData = revenueData[activeTab as keyof typeof revenueData];
  const minValue = Math.min(...currentData.values) * 0.8;
  const maxValue = Math.max(...currentData.values) * 1.1;
  const valueRange = maxValue - minValue;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Revenue Overview</CardTitle>
          <Tabs
            defaultValue="1m"
            className="w-full sm:w-auto"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-4 w-full sm:w-auto">
              <TabsTrigger value="1w">1W</TabsTrigger>
              <TabsTrigger value="1m">1M</TabsTrigger>
              <TabsTrigger value="3m">3M</TabsTrigger>
              <TabsTrigger value="1y">1Y</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Revenue
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
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Change from {comparisonPeriod}
            </p>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">
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
                stroke={theme === "dark" ? "#4ade80" : "#16a34a"}
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
                  theme === "dark"
                    ? "rgba(74, 222, 128, 0.1)"
                    : "rgba(22, 163, 74, 0.1)"
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
      </CardContent>
    </Card>
  );
}
