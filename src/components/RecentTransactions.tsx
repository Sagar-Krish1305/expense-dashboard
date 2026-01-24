import type { RecentTransactionsProps } from '../types/transaction.types';
import TransactionCard from './TransactionCard';

export default function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  return (
    <div className="flex-1 bg-(--card-background) rounded-2xl flex flex-col gap-6 p-4 overflow-y-auto min-h-0 h-full border ">
      <div className="flex items-center justify-between m-6">
        <span className="text-[1rem] font-bold text-(--light-text-color)">
          Recent Transactions
        </span>
      </div>

      {transactions.map((transaction, index) => (
        <TransactionCard
          key={index}
          description={transaction.description}
          category={transaction.category}
          amount={transaction.amount}
          timeAgo={getDaysAgo(transaction.transaction_date)}
        />
      ))}
    </div>
  );
}

function getDaysAgo(date: string) {
  return Math.floor(
    (Date.now() - new Date(date).getTime()) /
      (1000 * 60 * 60 * 24)
  );
}
