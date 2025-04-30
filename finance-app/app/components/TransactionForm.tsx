// src/components/TransactionForm.tsx
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TransactionForm({ onAdd }: { onAdd: (data: any) => void }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!description || !amount || !date) return;
    onAdd({ description, amount: parseFloat(amount), date });
    setDescription("");
    setAmount("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <Input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <Button type="submit">Add</Button>
    </form>
  );
}
