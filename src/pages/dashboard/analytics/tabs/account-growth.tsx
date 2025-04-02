import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

interface AccountGrowthProps {
  comparisonPeriod: string;
}

export default function AccountGrowth({
  comparisonPeriod,
}: AccountGrowthProps) {
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
  const growthData = {
    "1w": {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: [1150, 1175, 1190, 1210, 1225, 1240, 1250],
      change: "+8.7%",
    },
    "1m": {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      values: [1100, 1150, 1180, 1205],
      change: "+18.2%",
    },
    "3m": {
      labels: ["Jan", "Feb", "Mar"],
      values: [950, 1050, 1205],
      change: "+26.8%",
    },
    "1y": {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      values: [800, 900, 1050, 1205],
      change: "+50.6%",
    },
  };

  const currentData = growthData[activeTab as keyof typeof growthData];
  const minValue = Math.min(...currentData.values) * 0.8;
  const maxValue = Math.max(...currentData.values) * 1.1;
  const valueRange = maxValue - minValue;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Customer Growth</CardTitle>
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
              Total Customers
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentData.values[currentData.values.length - 1]}
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
                stroke={theme === "dark" ? "#818cf8" : "#4f46e5"}
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
                    ? "rgba(129, 140, 248, 0.1)"
                    : "rgba(79, 70, 229, 0.1)"
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
