import { useState } from "react";
import { Calendar, Filter, Plus, Search } from "lucide-react";
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
import PaymentMethods from "./payment-methods";
import PaymentHistory from "./payment-history";
import ScheduledPayments from "./scheduled-payments";

export default function PaymentsContent() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Payments
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage your payment methods and history
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Add Payment Method</span>
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23] overflow-hidden">
        <Tabs defaultValue="methods" className="w-full">
          <div className="border-b border-gray-200 dark:border-[#1F1F23]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-4">
              <TabsList className="bg-gray-100 dark:bg-[#1F1F23]">
                <TabsTrigger value="methods">Payment Methods</TabsTrigger>
                <TabsTrigger value="history">Payment History</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled Payments</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search payments..."
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
          </div>

          <TabsContent value="methods" className="p-6">
            <PaymentMethods />
          </TabsContent>

          <TabsContent value="history" className="p-0">
            <PaymentHistory searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="scheduled" className="p-6">
            <ScheduledPayments searchQuery={searchQuery} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
