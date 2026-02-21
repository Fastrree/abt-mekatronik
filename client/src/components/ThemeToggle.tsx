import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, memo, useCallback } from "react";

export const ThemeToggle = memo(function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track scroll for styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleThemeToggle = useCallback(() => {
    // Instant theme change - no animation
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  // Dynamic styling based on theme and scroll
  const isDark = theme === "dark";
  const buttonClasses = isDark
    ? "bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40"
    : isScrolled
    ? "bg-white/90 hover:bg-white border-white/40 hover:border-white/60"
    : "bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40";

  if (!mounted) {
    return (
      <button
        className={`min-w-12 min-h-12 w-12 h-12 lg:w-11 lg:h-11 flex items-center justify-center backdrop-blur-sm rounded-2xl border-2 focus:outline-none focus:ring-4 focus:ring-amber-400/30 ${buttonClasses}`}
        disabled
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4 lg:h-5 lg:w-5 text-zinc-300" />
      </button>
    );
  }

  return (
    <button
      onClick={handleThemeToggle}
      className={`min-w-12 min-h-12 w-12 h-12 lg:w-11 lg:h-11 flex items-center justify-center backdrop-blur-sm rounded-2xl border-2 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-amber-400/30 ${buttonClasses} ${
        isDark ? "hover:shadow-white/20" : isScrolled ? "hover:shadow-zinc-900/20" : "hover:shadow-white/20"
      }`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 lg:h-5 lg:w-5 text-amber-400 group-hover:text-amber-300 group-hover:rotate-90 transition-all duration-300" />
      ) : (
        <Moon className={`h-4 w-4 lg:h-5 lg:w-5 group-hover:-rotate-12 transition-all duration-300 ${
          isScrolled ? "text-zinc-900 group-hover:text-zinc-800" : "text-white group-hover:text-zinc-100"
        }`} />
      )}
    </button>
  );
});
