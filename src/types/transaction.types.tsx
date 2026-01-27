import type { LucideIcon } from "lucide-react";

export type TransactionDetails = {
  id?: string | number;
  description: string;
  category: string;
  amount: number;
  transaction_date: string;
  transaction_type: string;
};

export type RecentTransactionsProps = {
  transactions: TransactionDetails[];
  onEditTransaction?: (transaction: TransactionDetails) => void;
};

export type TransactionCardProps = {
  id?: string | number;
  transaction_date?: string;
  description: string;
  category: string;
  amount: number;
  currencySymbol?: string;
  timeAgo: number;
  Icon?: LucideIcon;
  onEdit?: () => void;
};

export type PreviousMonthDataDetails = {
  month: string;
  income: number;
  expense: number;
};