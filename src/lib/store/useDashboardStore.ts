import { create } from "zustand"

interface DashboardState {
  activeView: "cards" | "list" | "table"
  dateRange: {
    start: Date
    end: Date
  }
  comparisonPeriod: string
  isLoading: boolean

  // Actions
  setActiveView: (view: "cards" | "list" | "table") => void
  setDateRange: (start: Date, end: Date) => void
  setComparisonPeriod: (period: string) => void
  fetchDashboardData: () => Promise<void>
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  activeView: "cards",
  dateRange: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    end: new Date(),
  },
  comparisonPeriod: "last month",
  isLoading: false,

  setActiveView: (view) => set({ activeView: view }),

  setDateRange: (start, end) =>
    set({
      dateRange: { start, end },
      // Update comparison period based on the date range
      comparisonPeriod: getComparisonPeriodLabel(start, end),
    }),

  setComparisonPeriod: (period) => set({ comparisonPeriod: period }),

  fetchDashboardData: async () => {
    set({ isLoading: true })
    try {
      // In a real app, this would fetch data based on the date range
      await new Promise((resolve) => setTimeout(resolve, 1000))
      set({ isLoading: false })
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
      set({ isLoading: false })
    }
  },
}))

// Helper function to determine comparison period label
function getComparisonPeriodLabel(start: Date, end: Date): string {
  const diffDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays <= 7) return "previous week"
  if (diffDays <= 30) return "last month"
  if (diffDays <= 90) return "last quarter"
  return "last year"
}

