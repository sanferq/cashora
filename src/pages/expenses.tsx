import { Button, useDisclosure } from "@heroui/react"
import { TransactionModal } from "../components/modal"
import { useFinance } from "../context/finance-context";
import { TransactionHistory } from "../components/transaction-history";

export const Expenses = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
    const { transactions, addTransaction } = useFinance(); 



 return (
    <div className="space-y-4">
      <Button className="w-full" onPress={onOpen}>
        Добавить расход
      </Button>
      <TransactionModal 
        type="expense"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={addTransaction} 
      />
      <TransactionHistory 
        type="expense" 
        transactions={transactions} 
      />
    </div>
  );
}