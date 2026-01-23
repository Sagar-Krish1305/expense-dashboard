export type TransactionDetails = {
  description: string;
  category: string;
  amount: number;
  transaction_date: string;
  type: string;
};

export type RecentTransactionsProps = {
  transactions: TransactionDetails[];
};