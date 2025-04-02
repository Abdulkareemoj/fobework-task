import { cn } from "../../../lib/utils";
import {
  TrendingUp,
  TrendingDown,
  BarChart2,
  LineChart,
  CandlestickChart,
  MoreHorizontal,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

interface Investment {
  id: string;
  symbol: string;
  name: string;
  type: "stocks" | "etfs" | "bonds" | "crypto";
  price: string;
  change: string;
  changePercent: string;
  trend: "up" | "down";
  shares: string;
  value: string;
  costBasis: string;
  gain: string;
  gainPercent: string;
}

interface InvestmentsListProps {
  type?: "all" | "stocks" | "etfs" | "bonds" | "crypto";
  searchQuery?: string;
}

const INVESTMENTS: Investment[] = [
  {
    id: "inv_1",
    symbol: "AAPL",
    name: "Apple Inc.",
    type: "stocks",
    price: "$175.25",
    change: "+$2.50",
    changePercent: "+1.45%",
    trend: "up",
    shares: "25",
    value: "$4,381.25",
    costBasis: "$3,750.00",
    gain: "+$631.25",
    gainPercent: "+16.83%",
  },
  {
    id: "inv_2",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    type: "stocks",
    price: "$410.75",
    change: "+$5.25",
    changePercent: "+1.29%",
    trend: "up",
    shares: "15",
    value: "$6,161.25",
    costBasis: "$5,250.00",
    gain: "+$911.25",
    gainPercent: "+17.36%",
  },
  {
    id: "inv_3",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    type: "stocks",
    price: "$165.80",
    change: "-$1.20",
    changePercent: "-0.72%",
    trend: "down",
    shares: "20",
    value: "$3,316.00",
    costBasis: "$2,800.00",
    gain: "+$516.00",
    gainPercent: "+18.43%",
  },
  {
    id: "inv_4",
    symbol: "VOO",
    name: "Vanguard S&P 500 ETF",
    type: "etfs",
    price: "$452.30",
    change: "+$3.75",
    changePercent: "+0.84%",
    trend: "up",
    shares: "35",
    value: "$15,830.50",
    costBasis: "$14,000.00",
    gain: "+$1,830.50",
    gainPercent: "+13.08%",
  },
  {
    id: "inv_5",
    symbol: "QQQ",
    name: "Invesco QQQ Trust",
    type: "etfs",
    price: "$425.15",
    change: "+$4.25",
    changePercent: "+1.01%",
    trend: "up",
    shares: "20",
    value: "$8,503.00",
    costBasis: "$7,500.00",
    gain: "+$1,003.00",
    gainPercent: "+13.37%",
  },
  {
    id: "inv_6",
    symbol: "BTC",
    name: "Bitcoin",
    type: "crypto",
    price: "$65,250.00",
    change: "+$1,250.00",
    changePercent: "+1.95%",
    trend: "up",
    shares: "0.5",
    value: "$32,625.00",
    costBasis: "$25,000.00",
    gain: "+$7,625.00",
    gainPercent: "+30.50%",
  },
  {
    id: "inv_7",
    symbol: "ETH",
    name: "Ethereum",
    type: "crypto",
    price: "$3,450.75",
    change: "-$45.25",
    changePercent: "-1.29%",
    trend: "down",
    shares: "2.5",
    value: "$8,626.88",
    costBasis: "$7,500.00",
    gain: "+$1,126.88",
    gainPercent: "+15.03%",
  },
];

export default function InvestmentsList({
  type = "all",
  searchQuery = "",
}: InvestmentsListProps) {
  // Filter investments based on type and search query
  const filteredInvestments = INVESTMENTS.filter((investment) => {
    const matchesType = type === "all" || investment.type === type;
    const matchesSearch =
      searchQuery === "" ||
      investment.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investment.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  const getInvestmentIcon = (investmentType: string) => {
    switch (investmentType) {
      case "stocks":
        return CandlestickChart;
      case "etfs":
        return BarChart2;
      case "bonds":
        return LineChart;
      case "crypto":
        return TrendingUp;
      default:
        return BarChart2;
    }
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Change</TableHead>
            <TableHead>Shares</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead className="text-right">Gain/Loss</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvestments.length > 0 ? (
            filteredInvestments.map((investment) => {
              const InvestmentIcon = getInvestmentIcon(investment.type);

              return (
                <TableRow
                  key={investment.id}
                  className="hover:bg-gray-50 dark:hover:bg-[#1F1F23]/50"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          "bg-gray-100 dark:bg-[#1F1F23]"
                        )}
                      >
                        <InvestmentIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                      <span>{investment.symbol}</span>
                    </div>
                  </TableCell>
                  <TableCell>{investment.name}</TableCell>
                  <TableCell>{investment.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span
                        className={cn(
                          investment.trend === "up"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        )}
                      >
                        {investment.change}
                      </span>
                      <span
                        className={cn(
                          "text-xs",
                          investment.trend === "up"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        )}
                      >
                        ({investment.changePercent})
                      </span>
                      {investment.trend === "up" ? (
                        <TrendingUp className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{investment.shares}</TableCell>
                  <TableCell className="text-right font-medium">
                    {investment.value}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span
                        className={cn(
                          investment.gain.startsWith("+")
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        )}
                      >
                        {investment.gain}
                      </span>
                      <span
                        className={cn(
                          "text-xs",
                          investment.gain.startsWith("+")
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        )}
                      >
                        ({investment.gainPercent})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Buy more</DropdownMenuItem>
                          <DropdownMenuItem>Sell</DropdownMenuItem>
                          <DropdownMenuItem>Set alert</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center py-8 text-gray-500 dark:text-gray-400"
              >
                No investments found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
