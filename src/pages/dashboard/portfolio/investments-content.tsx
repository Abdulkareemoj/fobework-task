import { useState } from "react";
import { Plus, Search, Filter, Download } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import InvestmentsSummary from "./investments-summary";
import InvestmentsPortfolio from "./investments-portfolio";
import InvestmentsPerformance from "./investments-performance";
import InvestmentsList from "./investments-list";

export default function InvestmentsContent() {
  type TabType = "overview" | "stocks" | "etfs" | "crypto" | "bonds";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Investment Portfolio
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Track and manage your investment portfolio
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>New Investment</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <InvestmentsSummary />
        </div>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23] overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-[#1F1F23]">
          <Tabs
            defaultValue="overview"
            className="w-full"
            onValueChange={(value) => setActiveTab(value as TabType)}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="bg-gray-100 dark:bg-[#1F1F23]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="stocks">Stocks</TabsTrigger>
                <TabsTrigger value="etfs">ETFs</TabsTrigger>
                <TabsTrigger value="crypto">Crypto</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search investments..."
                    className="pl-9 h-9 w-full sm:w-[200px] lg:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                <div className="lg:col-span-2">
                  <InvestmentsPerformance />
                </div>
                <div className="lg:col-span-1">
                  <InvestmentsPortfolio />
                </div>
                <div className="lg:col-span-3">
                  <InvestmentsList
                    type={activeTab === "overview" ? "all" : activeTab}
                    searchQuery={searchQuery}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stocks" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                <div className="lg:col-span-3">
                  <InvestmentsList type="stocks" searchQuery={searchQuery} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="etfs" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                <div className="lg:col-span-3">
                  <InvestmentsList type="etfs" searchQuery={searchQuery} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="crypto" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                <div className="lg:col-span-3">
                  <InvestmentsList type="crypto" searchQuery={searchQuery} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
