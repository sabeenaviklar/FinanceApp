// src/components/TransactionList.tsx
"use client";

export default function TransactionList({ transactions, onDelete }: { transactions: any[], onDelete: (id: string) => void }) {
  return (
    <ul className="space-y-2">
      {transactions.map(t => (
        <li key={t._id} className="flex justify-between">
          <span>{t.description} - ₹{t.amount} - {new Date(t.date).toLocaleDateString()}</span>
          <button onClick={() => onDelete(t._id)} className="text-red-500">Delete</button>
        </li>
      ))}
    </ul>
  );
}
