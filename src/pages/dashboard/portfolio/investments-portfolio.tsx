import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { cn } from "../../../lib/utils";

export default function InvestmentsPortfolio() {
  const assetAllocation = [
    { name: "Stocks", percentage: 55, color: "bg-blue-500 dark:bg-blue-600" },
    { name: "ETFs", percentage: 25, color: "bg-green-500 dark:bg-green-600" },
    {
      name: "Bonds",
      percentage: 15,
      color: "bg-yellow-500 dark:bg-yellow-600",
    },
    {
      name: "Crypto",
      percentage: 5,
      color: "bg-purple-500 dark:bg-purple-600",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-40">
            {/* Create a donut chart using conic-gradient */}
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `conic-gradient(
                  ${assetAllocation[0].color} 0% ${
                  assetAllocation[0].percentage
                }%, 
                  ${assetAllocation[1].color} ${
                  assetAllocation[0].percentage
                }% ${
                  assetAllocation[0].percentage + assetAllocation[1].percentage
                }%, 
                  ${assetAllocation[2].color} ${
                  assetAllocation[0].percentage + assetAllocation[1].percentage
                }% ${
                  assetAllocation[0].percentage +
                  assetAllocation[1].percentage +
                  assetAllocation[2].percentage
                }%, 
                  ${assetAllocation[3].color} ${
                  assetAllocation[0].percentage +
                  assetAllocation[1].percentage +
                  assetAllocation[2].percentage
                }% 100%
                )`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white dark:bg-[#0F0F12] w-24 h-24 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {assetAllocation.map((asset) => (
            <div key={asset.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={cn("w-3 h-3 rounded-full", asset.color)} />
                <span className="text-sm text-gray-900 dark:text-white">
                  {asset.name}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {asset.percentage}%
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-[#1F1F23]">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Total Assets
            </span>
            <span className="font-medium text-gray-900 dark:text-white">4</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-500 dark:text-gray-400">
              Total Holdings
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              12
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
