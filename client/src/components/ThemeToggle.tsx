import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    setIsFlipping(true);
    
    // Add page transition effect
    document.documentElement.classList.add('theme-transitioning');
    
    // Toggle theme
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    }, 150);
    
    // Remove transition class after animation
    setTimeout(() => {
      setIsFlipping(false);
      document.documentElement.classList.remove('theme-transitioning');
    }, 600);
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 rounded-lg relative"
        disabled
      >
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeToggle}
      disabled={isFlipping}
      className="w-10 h-10 rounded-lg relative overflow-hidden group bg-zinc-800/80 dark:bg-zinc-800/80 hover:bg-zinc-700 dark:hover:bg-zinc-700 border border-zinc-700/50 dark:border-zinc-700/50 hover:border-zinc-600 dark:hover:border-zinc-600 transition-all duration-300 hover:scale-110 shadow-lg"
      aria-label="Toggle theme"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Flip container */}
      <div 
        className={`relative transition-all duration-500 ${
          isFlipping ? 'rotate-180 scale-0' : 'rotate-0 scale-100'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] transition-all duration-300 group-hover:rotate-90 group-hover:scale-110" />
        ) : (
          <Moon className="h-5 w-5 text-indigo-600 drop-shadow-[0_0_8px_rgba(79,70,229,0.5)] transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110" />
        )}
      </div>
      
      {/* Mechanical indicator */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-all duration-300 ${
        theme === "dark" ? 'translate-x-0' : 'translate-x-full'
      }`} />
    </Button>
  );
}
