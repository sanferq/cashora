import { Button, useDisclosure } from "@heroui/react";
import { TransactionModal } from "../components/modal";
import { TransactionHistory } from "../components/transaction-history";

import { useFinance } from "../context/finance-context";

export const Income = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { transactions, addTransaction } = useFinance(); 

  return (
    <div className="space-y-4">
      <Button className="w-full" onPress={onOpen}>
        Добавить доход
      </Button>
      <TransactionModal 
        type="income"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={addTransaction}
      />
      <TransactionHistory 
        type="income" 
        transactions={transactions} 
      />
    </div>
  );
};