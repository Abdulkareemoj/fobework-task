import { cn } from "../../../lib/utils";
import { CreditCard, Trash2, Edit, Plus, CheckCircle } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

interface PaymentMethod {
  id: string;
  type: "credit" | "debit" | "bank";
  name: string;
  number: string;
  expiryDate?: string;
  isDefault: boolean;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "pm_1",
    type: "credit",
    name: "Visa ending in 4242",
    number: "•••• •••• •••• 4242",
    expiryDate: "04/28",
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "credit",
    name: "Mastercard ending in 5555",
    number: "•••• •••• •••• 5555",
    expiryDate: "09/26",
    isDefault: false,
  },
  {
    id: "pm_3",
    type: "bank",
    name: "Bank of America",
    number: "Checking account ending in 7890",
    isDefault: false,
  },
];

export default function PaymentMethods() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PAYMENT_METHODS.map((method) => (
          <Card
            key={method.id}
            className="border-gray-200 dark:border-[#1F1F23] relative overflow-hidden"
          >
            {method.isDefault && (
              <div className="absolute top-0 right-0">
                <Badge className="rounded-bl-lg rounded-tr-lg rounded-tl-none rounded-br-none bg-green-500 text-white">
                  Default
                </Badge>
              </div>
            )}
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={cn(
                    "p-2 rounded-lg",
                    "bg-gray-100 dark:bg-[#1F1F23]"
                  )}
                >
                  <CreditCard className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                {!method.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Set Default
                  </Button>
                )}
              </div>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                {method.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {method.number}
              </p>
              {method.expiryDate && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Expires: {method.expiryDate}
                </p>
              )}

              <div className="flex items-center gap-2 mt-4">
                <Button variant="outline" size="sm" className="h-8">
                  <Edit className="w-3.5 h-3.5 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-900/30"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="border-dashed border-2 border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-50 dark:hover:bg-[#1F1F23]/50 transition-colors cursor-pointer">
          <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
            <div className="p-3 rounded-full bg-gray-100 dark:bg-[#1F1F23] mb-4">
              <Plus className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              Add New Payment Method
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Add a new credit card or bank account
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
