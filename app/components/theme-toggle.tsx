"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Moon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  function toggleTheme() {
    if (theme === "dark") {
      console.log("Switching to light theme")
      setTheme("light")
    } else {
      console.log("Switching to dark theme")
      setTheme("dark")
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
      aria-label={theme === "dark" ? t.lightMode : t.darkMode}
    >
      {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">{theme === "dark" ? t.lightMode : t.darkMode}</span>
    </Button>
  )
}