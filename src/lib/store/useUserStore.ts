import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
}

interface UserState {
  user: UserProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  // Actions
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          // In a real app, this would be an API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Mock successful login
          if (email === "demo@example.com" && password === "password") {
            set({
              user: {
                id: "1",
                name: "Eugene An",
                email: "demo@example.com",
                avatar:
                  "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png",
                role: "Prompt Engineer",
              },
              isAuthenticated: true,
              isLoading: false,
            })
          } else {
            set({ error: "Invalid email or password", isLoading: false })
          }
        } catch (error) {
          set({ error: "Login failed. Please try again.", isLoading: false })
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateProfile: async (profile) => {
        set({ isLoading: true, error: null })
        try {
          // In a real app, this would be an API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          const currentUser = get().user
          if (currentUser) {
            set({
              user: { ...currentUser, ...profile },
              isLoading: false,
            })
          }
        } catch (error) {
          set({ error: "Failed to update profile", isLoading: false })
        }
      },
    }),
    {
      name: "kokonut-user-storage",
      // Only persist certain fields
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)

