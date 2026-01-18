import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, memo, useCallback } from "react";

export const ThemeToggle = memo(function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = useCallback(() => {
    // Instant theme change - no animation
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  if (!mounted) {
    return (
      <button
        className="w-7 h-7 lg:w-10 lg:h-10 flex items-center justify-center"
        disabled
      >
        <Sun className="h-3.5 w-3.5 lg:h-5 lg:w-5 text-zinc-400" />
      </button>
    );
  }

  return (
    <button
      onClick={handleThemeToggle}
      className="w-7 h-7 lg:w-10 lg:h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-3.5 w-3.5 lg:h-5 lg:w-5 text-amber-400" />
      ) : (
        <Moon className="h-3.5 w-3.5 lg:h-5 lg:w-5 text-indigo-600" />
      )}
    </button>
  );
});
