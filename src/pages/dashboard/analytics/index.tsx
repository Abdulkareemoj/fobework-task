import DashboardLayout from "../../../components/dashboard/layout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { DateRangePicker } from "../../../components/date-range-picker";
import { OverviewTab } from "./tabs/overview-tab";
import { AnalyticsTab } from "./tabs/analytics-tab";
import { ReportsTab } from "./tabs/reports-tab";
import { NotificationsTab } from "./tabs/notifications-tab";
import { Button } from "../../../components/ui/button";
import { Download } from "lucide-react";

export default function AnalyticsPage() {
  const handleExportData = () => {
    // Implement export functionality here
    console.log("Exporting data...");
  };

  return (
    <DashboardLayout>
      <main className="flex-1 space-y-4 ">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <div className="flex items-center space-x-2">
            <DateRangePicker />
            <Button
              onClick={handleExportData}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <AnalyticsTab />
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <ReportsTab />
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <NotificationsTab />
          </TabsContent>
        </Tabs>
      </main>
    </DashboardLayout>
  );
}
