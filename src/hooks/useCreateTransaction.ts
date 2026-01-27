// hooks/useCreateTransaction.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TransactionDetails } from "../types/transaction.types";


async function createTransaction(data: TransactionDetails) {
  const res = await fetch("http://localhost:3000/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Failed to save transaction");
  return res.json();
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    }
  });
}
