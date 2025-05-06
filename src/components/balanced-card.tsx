import { Card, CardBody, CardHeader } from "@heroui/react"

import { useFinance } from "../context/finance-context"

export const BalancedCard = () => {
  const { balance = 0, income = 0, expenses = 0 } = useFinance()

  return (
    <Card className="p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800">
      <CardHeader className="text-xl font-semibold">Баланс</CardHeader>
      <CardBody>
        <div className="text-2xl font-bold">{balance} ₽</div>
        <div className="mt-2 text-sm text-gray-500">Доход: {income} ₽</div>
        <div className="text-sm text-gray-500">Расход: {expenses} ₽</div>
      </CardBody>
    </Card>
  )
}
