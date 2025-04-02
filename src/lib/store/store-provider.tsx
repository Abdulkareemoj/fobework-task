import { type ReactNode, useEffect } from "react";
import { useSettingsStore } from "../../lib/store";
import { useTheme } from "next-themes";

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const { theme } = useSettingsStore();
  const { setTheme } = useTheme();

  // Sync theme from store to next-themes
  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }
  }, [theme, setTheme]);

  return <>{children}</>;
}
