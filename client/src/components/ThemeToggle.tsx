import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    // Instant theme change - no animation
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <button
        className="w-10 h-10 flex items-center justify-center"
        disabled
      >
        <Sun className="h-5 w-5 text-zinc-400" />
      </button>
    );
  }

  return (
    <button
      onClick={handleThemeToggle}
      className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-amber-400" />
      ) : (
        <Moon className="h-5 w-5 text-indigo-600" />
      )}
    </button>
  );
}
