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
import BankAccountsList from "./bank-accounts-list";
import BankAccountsSummary from "./bank-accounts-summary";
import BankAccountsActivity from "./bank-accounts-activity";

export default function BankAccountsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  // const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Bank Accounts
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage your connected bank accounts and transactions
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
            <span>Add Account</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <BankAccountsSummary />
        </div>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23] overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-[#1F1F23]">
          <Tabs
            defaultValue="all"
            className="w-full"
            // onValueChange={setActiveTab}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="bg-gray-100 dark:bg-[#1F1F23]">
                <TabsTrigger value="all">All Accounts</TabsTrigger>
                <TabsTrigger value="checking">Checking</TabsTrigger>
                <TabsTrigger value="savings">Savings</TabsTrigger>
                <TabsTrigger value="credit">Credit Cards</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search accounts..."
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
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                <div className="lg:col-span-3">
                  <BankAccountsList type="all" searchQuery={searchQuery} />
                </div>
                <div className="lg:col-span-3">
                  <BankAccountsActivity />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="checking" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                <div className="lg:col-span-3">
                  <BankAccountsList type="checking" searchQuery={searchQuery} />
                </div>
                <div className="lg:col-span-3">
                  <BankAccountsActivity type="checking" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="savings" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                <div className="lg:col-span-3">
                  <BankAccountsList type="savings" searchQuery={searchQuery} />
                </div>
                <div className="lg:col-span-3">
                  <BankAccountsActivity type="savings" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="credit" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                <div className="lg:col-span-3">
                  <BankAccountsList type="credit" searchQuery={searchQuery} />
                </div>
                <div className="lg:col-span-3">
                  <BankAccountsActivity type="credit" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
