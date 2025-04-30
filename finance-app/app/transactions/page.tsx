import { getTransactions, addTransaction, deleteTransaction } from "./actions";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyChart from "@/components/MonthlyChart";

export default async function TransactionsPage() {
  const transactions = await getTransactions();

  return (
    <div className="max-w-xl mx-auto space-y-6 p-4">
      <h1 className="text-2xl font-bold">Transactions</h1>
      <TransactionForm onAdd={addTransaction} />
      <TransactionList transactions={transactions} onDelete={deleteTransaction} />
      <MonthlyChart transactions={transactions} />
    </div>
  );
}