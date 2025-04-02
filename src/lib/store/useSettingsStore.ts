import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SettingsState {
  theme: "light" | "dark" | "system"
  sidebarCollapsed: boolean
  notifications: {
    email: boolean
    push: boolean
    inApp: boolean
  }

  // Actions
  setTheme: (theme: "light" | "dark" | "system") => void
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  updateNotificationSettings: (settings: Partial<{ email: boolean; push: boolean; inApp: boolean }>) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "system",
      sidebarCollapsed: false,
      notifications: {
        email: true,
        push: true,
        inApp: true,
      },

      setTheme: (theme) => set({ theme }),

      toggleSidebar: () =>
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        })),

      setSidebarCollapsed: (collapsed) =>
        set({
          sidebarCollapsed: collapsed,
        }),

      updateNotificationSettings: (settings) =>
        set((state) => ({
          notifications: {
            ...state.notifications,
            ...settings,
          },
        })),
    }),
    {
      name: "kokonut-settings-storage",
    },
  ),
)

