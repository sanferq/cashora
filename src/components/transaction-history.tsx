import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Accordion,
  AccordionItem,
} from "@heroui/react"
import { Transaction } from "../data/money"
import { useFinance } from "../context/finance-context"
import { useMemo } from "react"
import { AiFillDelete } from "react-icons/ai"
import { formatTransactionDate } from "../utils/date"

type Props = {
  type: "income" | "expense"
  transactions: Transaction[]
}

export const TransactionHistory = ({ type, transactions }: Props) => {
  const { getCategoriesByType, deleteTransaction } = useFinance()
  const categories = getCategoriesByType(type)

  const handleDelete = (id: string) => {
    deleteTransaction(id)
  }

  const sortedTransactions = useMemo(() => {
    return [...transactions]
      .filter(t => t.type === type)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [transactions, type])

  return (
    <>
      {sortedTransactions.map(transaction => (
        <Card key={transaction.id} className="w-full mt-5">
          <CardHeader className="flex justify-between items-start gap-3">
            <div className="flex flex-col">
              <p className="text-md">
                {categories.find(cat => cat.key === transaction.category)
                  ?.label || "Другое"}
              </p>
              <p className="text-small text-default-500">
                {formatTransactionDate(transaction.date)}
              </p>
            </div>
            <button onClick={() => handleDelete(transaction.id)}>
              <AiFillDelete className="opacity-70 hover:opacity-100 hover:text-red-900 transition-opacity duration-300 cursor-pointer" />
            </button>
          </CardHeader>
          <Divider />
          <CardBody>
            <p
              className={type === "income" ? "text-green-500" : "text-red-500"}
            >
              {type === "income" ? "+" : "-"}
              {transaction.amount} ₽
            </p>
          </CardBody>
          {transaction.description && (
            <Accordion variant="light" className="mt-2">
              <AccordionItem
                key="description"
                title="Описание"
                className="px-1 py-2"
              >
                <p className="text-small text-default-500 pt-1">
                  {transaction.description}
                </p>
              </AccordionItem>
            </Accordion>
          )}
        </Card>
      ))}
    </>
  )
}
