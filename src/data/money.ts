export type Category = {
  key: string
  label: string
}

export type TransactionType = "income" | "expense";

export type Transaction = {
  id: string
  type: "income" | "expense"
  category: string
  amount: number
  date: string
  description?: string
}

export const INCOME_CATEGORIES: Category[] = [
  { key: "зарплата", label: "Зарплата" },
  { key: "стипендия", label: "Стипендия" },
  { key: "алименты", label: "Алименты" },
  { key: "пенсия", label: "Пенсия" },
  { key: "пособие", label: "Пособие" },
  { key: "самозанятость", label: "Самозанятость" },
]

export const EXPENSE_CATEGORIES: Category[] = [
  { key: "жкх", label: "ЖКХ" },
  { key: "продукты", label: "Продукты" },
  { key: "транспорт", label: "Транспорт" },
  { key: "медицина", label: "Медицина" },
  { key: "образование", label: "Образование" },
  { key: "развлечения", label: "Развлечения" },
]
