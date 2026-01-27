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
  // 1) Save the raw transaction
  const res = await fetch("http://localhost:3000/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Failed to save transaction");

  // 2) Update the aggregated current-month dataset used by the chart
  const txDate = new Date(data.transaction_date);
  const monthLabel = txDate.toLocaleString("en-US", { month: "short" }); // e.g., Jan, Feb

  // Load existing month aggregates
  const prevRes = await fetch("http://localhost:3000/previous_months_data");
  if (!prevRes.ok) throw new Error("Failed to load monthly aggregates");
  const prevData = (await prevRes.json()) as PreviousMonthDatum[];

  const existing = prevData.find((p) => p.month === monthLabel);

  const updated: PreviousMonthDatum = existing
    ? { ...existing }
    : { month: monthLabel, income: 0, expense: 0 };

  if (data.transaction_type === "Income") {
    updated.income += data.amount;
  } else {
    updated.expense += data.amount;
  }

  const saveUrl = existing?.id
    ? `http://localhost:3000/previous_months_data/${existing.id}`
    : "http://localhost:3000/previous_months_data";

  const saveMethod = existing?.id ? "PUT" : "POST";

  const aggRes = await fetch(saveUrl, {
    method: saveMethod,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated)
  });

  if (!aggRes.ok) throw new Error("Failed to update monthly aggregates");

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
