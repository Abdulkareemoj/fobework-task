import { Card, CardContent } from "../../../components/ui/card";
import { cn } from "../../../lib/utils";
import { FileText, AlertCircle, CheckCircle, Clock } from "lucide-react";

export default function InvoicesSummary() {
  const summaryItems = [
    {
      title: "Total Invoices",
      value: "$20,500.00",
      count: "8 invoices",
      icon: FileText,
      color: "text-gray-600 dark:text-gray-300",
      bgColor: "bg-gray-100 dark:bg-[#1F1F23]",
    },
    {
      title: "Paid",
      value: "$8,400.00",
      count: "3 invoices",
      icon: CheckCircle,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Pending",
      value: "$7,500.00",
      count: "3 invoices",
      icon: Clock,
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      title: "Overdue",
      value: "$4,600.00",
      count: "2 invoices",
      icon: AlertCircle,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryItems.map((item) => (
        <Card
          key={item.title}
          className="border-gray-200 dark:border-[#1F1F23]"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {item.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.count}
                </p>
              </div>
              <div className={cn("p-3 rounded-full", item.bgColor)}>
                <item.icon className={cn("w-5 h-5", item.color)} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
