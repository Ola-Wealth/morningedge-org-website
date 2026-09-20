"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

// Dark is the house theme; light is the opt-in.
function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  // Start unknown so the server and first client render match; resolve on mount.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  function toggle() {
    const next: Theme = (theme ?? readTheme()) === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("me-theme", next);
    } catch {
      /* storage may be unavailable; the attribute still applies for this visit */
    }
    setTheme(next);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`pressable inline-flex h-10 w-10 items-center justify-center rounded-lg border border-(--line) bg-(--surface) text-(--ink) shadow-soft hover:border-(--ink)/35 ${className}`}
    >
      {/* Both rendered; CSS in globals.css shows the one matching data-theme, so there is no flash before hydration */}
      <Sun size={17} className="theme-icon-sun" aria-hidden="true" />
      <Moon size={17} className="theme-icon-moon" aria-hidden="true" />
    </button>
  );
}
