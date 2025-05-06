import React, { createContext, useContext, useEffect, useState } from "react"
import {
  Category,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  Transaction,
} from "../data/money"

type ChartData = {
  name: string
  income: number
  expense: number
  fullDate: string
}

type FinanceContextType = {
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, "id">) => void
  deleteTransaction: (id: string) => void
  balance: number
  income: number
  expenses: number
  getCategoriesByType: (type: "income" | "expense") => Category[]
  getDailyData: (days: number) => ChartData[]
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem("transactions")
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error("Failed to parse transactions", error)
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
  }, [transactions])

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id))
  }

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      description: transaction.description ?? "",
    }
    setTransactions(prev => [...prev, newTransaction])
  }

  const getCategoriesByType = (type: "income" | "expense"): Category[] => {
    return type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
  }

  const getDailyData = (days: number): ChartData[] => {
    const today = new Date()
    const result: Record<string, { income: number; expense: number }> = {}

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateKey = date.toISOString().split("T")[0]
      result[dateKey] = { income: 0, expense: 0 }
    }
    transactions.forEach(transaction => {
      const dataKey = transaction.date.split("T")[0]
      if (result[dataKey]) {
        if (transaction.type === "income") {
          result[dataKey].income += transaction.amount
        } else {
          result[dataKey].expense += transaction.amount
        }
      }
    })

    return Object.entries(result)
      .map(([date, values]) => {
        const currentDate = new Date(date)
        const day = currentDate.getDate()
        const month = currentDate
          .toLocaleString("ru-RU", { month: "short" })
          .replace(".", "")

        return {
          name: `${day} ${month}`,
          income: values.income,
          expense: values.expense,
          fullDate: date,
        }
      })
      .sort(
        (a, b) =>
          new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime(),
      )
  }
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expenses

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        balance,
        income,
        expenses,
        getCategoriesByType,
        getDailyData,
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

export const useFinance = (): FinanceContextType => {
  const context = useContext(FinanceContext)

  if (!context) {
    throw new Error("useFinance must be used within a FinanceProvider")
  }
  return context
}
