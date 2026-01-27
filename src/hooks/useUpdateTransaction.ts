import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TransactionDetails } from "../types/transaction.types";

async function updateTransaction(data: TransactionDetails) {
  if (!data.id) throw new Error("Transaction id is required to update");

  const res = await fetch(`http://localhost:3000/transactions/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update transaction");
  return res.json();
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["previous_months_data"] });
    },
  });
}
