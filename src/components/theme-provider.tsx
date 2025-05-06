import React, { useEffect, useState } from "react"

type ThemeContextType = {
  theme: "dark" | "light"
  toggleTheme: () => void
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => null,
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const savedTheme = localStorage.getItem("theme")
    return savedTheme ? (savedTheme as "dark" | "light") : "dark"
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    return () => {
      document.documentElement.classList.remove("dark", "light")
    }
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme) // Сохраняем выбор в localStorage
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className={`${theme} text-foreground bg-background min-h-screen`}>
        {children}
      </main>
    </ThemeContext.Provider>
  )
}
