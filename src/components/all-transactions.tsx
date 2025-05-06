import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Accordion,
  AccordionItem,
} from "@heroui/react"
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  Transaction,
} from "../data/money"
import { useMemo } from "react"
import { useFinance } from "../context/finance-context"
import { AiFillDelete } from "react-icons/ai"
import { formatTransactionDate } from "../utils/date"

type Props = {
  transactions: Transaction[]
}

export const AllTransactionHistory = ({ transactions }: Props) => {
  const { deleteTransaction } = useFinance()

  if (transactions.length === 0) {
    return <p className="text-center py-4">Пока что нет транзакций</p>
  }
  const handleDelete = (id: string) => {
    deleteTransaction(id)
  }

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
  }, [transactions])

  return (
    <>
      {sortedTransactions.map(transaction => {
        const categories =
          transaction.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
        return (
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
                <AiFillDelete className="  opacity-70 hover:opacity-100 hover:text-red-900 transition-opacity duration-300 cursor-pointer" />
              </button>
            </CardHeader>
            <Divider />
            <CardBody>
              <p
                className={
                  transaction.type === "income"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {transaction.type === "income" ? "+" : "-"}
                {transaction.amount.toLocaleString("ru-RU")} ₽
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
        )
      })}
    </>
  )
}
