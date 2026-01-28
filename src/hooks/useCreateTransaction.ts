// hooks/useCreateTransaction.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TransactionDetails } from "../types/transaction.types";


type PreviousMonthDatum = {
  id?: number | string;
  month: string;
  income: number;
  expense: number;
};

async function createTransaction(data: TransactionDetails) {
  const res = await fetch("http://localhost:3000/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Failed to save transaction");

  const txDate = new Date(data.transaction_date);
  const monthLabel = txDate.toLocaleString("en-US", { month: "short" }); 

  const prevRes = await fetch("http://localhost:3000/previous_months_data");
  if (!prevRes.ok) throw new Error("Failed to load monthly aggregates");
  const prevData = (await prevRes.json()) as PreviousMonthDatum[];
  const lastEntry = prevData[prevData.length - 1];
  const sameMonth = lastEntry && lastEntry.month === monthLabel;

  const addToEntry = (entry: PreviousMonthDatum): PreviousMonthDatum => {
    const updated = { ...entry };
    if (data.transaction_type === "Income") {
      updated.income += data.amount;
    } else {
      updated.expense += data.amount;
    }
    return updated;
  };

  if (sameMonth && lastEntry?.id !== undefined) {
    const updated = addToEntry(lastEntry);
    const aggRes = await fetch(`http://localhost:3000/previous_months_data/${lastEntry.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });
    
    if (!aggRes.ok) throw new Error("Failed to update monthly aggregates");
  } else {
    const oldest = prevData[0];
    if (oldest?.id !== undefined) {
      await fetch(`http://localhost:3000/previous_months_data/${oldest.id}`, {
        method: "DELETE"
      });
    }

    const newEntry: PreviousMonthDatum = addToEntry({
      month: monthLabel,
      income: 0,
      expense: 0,
    });

    const aggRes = await fetch("http://localhost:3000/previous_months_data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry)
    });
    if (!aggRes.ok) throw new Error("Failed to update monthly aggregates");
  }

  return res.json();
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["previous_months_data"] });
    }
  });
}
