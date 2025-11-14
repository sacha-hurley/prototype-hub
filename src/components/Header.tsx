import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="w-full border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 relative">
          <h1 className="text-2xl font-bold text-foreground">
            Betterfly US Prototype Hub
          </h1>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="transition-all duration-200 absolute right-0"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-5 w-5 transition-all duration-200" />
            ) : (
              <Moon className="h-5 w-5 transition-all duration-200" />
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}

