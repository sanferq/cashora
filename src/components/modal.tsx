// Импорт необходимых типов и компонентов
import { Transaction } from "../data/money"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react"
import { useFinance } from "../context/finance-context"
import React, { useContext } from "react"
import { ThemeContext } from "./theme-provider"

type Props = {
  type: "income" | "expense"
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<Transaction, "id">) => void
}

export const TransactionModal = ({ type, isOpen, onClose }: Props) => {
  const { addTransaction, getCategoriesByType } = useFinance()

  const categories = getCategoriesByType(type)
  const [amount, setAmount] = React.useState<number | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const { theme } = useContext(ThemeContext)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    if (!amount || amount <= 0 || isNaN(amount)) {
      setError("Сумма должна быть больше нуля")
      return
    }

    const category = formData.get("category") as string
    const description = formData.get("description") as string

    addTransaction({
      type,
      category,
      amount,
      date: new Date().toISOString(), //позже
      description,
    })

    onClose()
    setAmount(null)
    setError(null)
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        onClose()
        setAmount(null)
        setError(null)
      }}
      className={`${theme} text-foreground`}
    >
      <ModalContent>
        {() => (
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              {type === "income" ? "Добавить доход" : "Добавить расход"}
            </ModalHeader>
            <ModalBody className="space-y-4">
              <Select
                name="category"
                label="Категория"
                defaultSelectedKeys={
                  categories.length > 0 ? [categories[0].key] : []
                }
              >
                {categories.map(category => (
                  <SelectItem key={category.key} textValue={category.label}>
                    {category.label}
                  </SelectItem>
                ))}
              </Select>

              <NumberInput
                name="amount"
                label="Сумма"
                minValue={0}
                placeholder="0.00"
                isRequired
                value={amount ?? undefined}
                onChange={value => {
                  setAmount(Number(value))
                  setError(null)
                }}
                aria-invalid={!!error}
                aria-describedby={error ? "amount-error" : undefined}
              />

              <Textarea
                name="description"
                className=""
                label="Коментарий"
                placeholder="Не обязательно"
              />
            </ModalBody>

            <ModalFooter>
              <Button type="button" variant="light" onPress={onClose}>
                Отмена
              </Button>
              <Button type="submit" color="primary">
                Сохранить
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}
