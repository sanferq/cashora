import { AllTransactionHistory } from "../components/all-transactions"
import BarChartWithFilter from "../components/simple"
import { useFinance } from "../context/finance-context"

export const Transactions = () => {
  const { transactions } = useFinance()
  return (
    <>
      <BarChartWithFilter />
      <AllTransactionHistory transactions={transactions} />
    </>
  )
}
