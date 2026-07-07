"use client";

import * as React from "react";

/*
  Minimal, dependency-free theme provider. Toggles `.dark` on <html>, persists to
  localStorage ("topicvane-theme"), and respects the OS preference when unset. The no-flash
  script in app/layout.tsx applies the same logic before first paint, so there is no flash.
*/

type Theme = "light" | "dark";
type ThemeSetting = Theme | "system";

const STORAGE_KEY = "topicvane-theme";

interface ThemeContextValue {
  /** The user's stored preference ("system" until they pick). */
  setting: ThemeSetting;
  /** The theme actually applied right now. */
  resolved: Theme;
  setTheme: (setting: ThemeSetting) => void;
  toggle: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function systemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readStored(): ThemeSetting {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem(STORAGE_KEY) as ThemeSetting | null) ?? "system";
}

function resolve(setting: ThemeSetting): Theme {
  return setting === "system" ? systemTheme() : setting;
}

function apply(resolved: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Lazily initialize from storage. The provider renders no theme-dependent DOM, so reading
  // localStorage on the client's first render can't cause a hydration mismatch — and the
  // no-flash script in layout.tsx has already applied the class before paint.
  const [setting, setSetting] = React.useState<ThemeSetting>(readStored);
  const [resolved, setResolved] = React.useState<Theme>(() => resolve(readStored()));

  // Follow OS changes while on "system".
  React.useEffect(() => {
    if (setting !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setResolved(systemTheme());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [setting]);

  // Apply whenever the resolved theme changes.
  React.useEffect(() => {
    apply(resolved);
  }, [resolved]);

  const setTheme = React.useCallback((next: ThemeSetting) => {
    setSetting(next);
    setResolved(resolve(next));
    if (next === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggle = React.useCallback(() => {
    setResolved((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      setSetting(next);
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = React.useMemo<ThemeContextValue>(
    () => ({ setting, resolved, setTheme, toggle }),
    [setting, resolved, setTheme, toggle]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
