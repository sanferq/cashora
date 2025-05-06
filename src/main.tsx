import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { HeroUIProvider } from "@heroui/react"
import { ThemeProvider } from "./components/theme-provider"
import { Layout } from "./pages/layout"
import { Expenses } from "./pages/expenses"
import { Income } from "./pages/income"
import { Transactions } from "./pages/transactions"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { FinanceProvider } from "./context/finance-context"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate to="/expenses" replace />,
        },
        {
          path: "/expenses",
          element: <Expenses />,
        },
        {
          path: "/income",
          element: <Income />,
        },
        {
          path: "/transactions",
          element: <Transactions />,
        },
      ],
    },
  ])

  root.render(
    <StrictMode>
      <FinanceProvider>
        <HeroUIProvider>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </HeroUIProvider>
      </FinanceProvider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
