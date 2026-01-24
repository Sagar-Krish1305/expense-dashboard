import type { LucideIcon } from "lucide-react";

export type TransactionDetails = {
  description: string;
  category: string;
  amount: number;
  transaction_date: string;
  transaction_type: string;
};

export type RecentTransactionsProps = {
  transactions: TransactionDetails[];
};

export type TransactionCardProps = {
  description: string;
  category: string;
  amount: number;
  currencySymbol?: string;
  timeAgo: number;
  Icon?: LucideIcon;
};
