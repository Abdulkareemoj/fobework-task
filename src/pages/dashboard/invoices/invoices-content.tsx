import { useState } from "react";
import { Calendar, Download, Filter, Plus, Search } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import InvoicesList from "./invoices-list";
import InvoicesSummary from "./invoices-summary";

export default function InvoicesContent() {
  const [searchQuery, setSearchQuery] = useState("");
  // const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Invoices
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage your invoices and billing
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
            <span>New Invoice</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <InvoicesSummary />
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
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search invoices..."
                    className="pl-9 h-9 w-full sm:w-[200px] lg:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Filter className="h-4 w-4" />
                </Button>
                <Select defaultValue="30days">
                  <SelectTrigger className="h-9 w-[130px]">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                    <SelectItem value="year">This year</SelectItem>
                    <SelectItem value="custom">Custom range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <TabsContent value="all" className="mt-0">
              <InvoicesList status="all" searchQuery={searchQuery} />
            </TabsContent>
            <TabsContent value="paid" className="mt-0">
              <InvoicesList status="paid" searchQuery={searchQuery} />
            </TabsContent>
            <TabsContent value="pending" className="mt-0">
              <InvoicesList status="pending" searchQuery={searchQuery} />
            </TabsContent>
            <TabsContent value="overdue" className="mt-0">
              <InvoicesList status="overdue" searchQuery={searchQuery} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
