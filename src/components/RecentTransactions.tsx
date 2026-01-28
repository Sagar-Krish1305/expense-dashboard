import type { RecentTransactionsProps } from '../types/transaction.types';
import TransactionCard from './TransactionCard';

export default function RecentTransactions({
  transactions,
  onEditTransaction,
}: RecentTransactionsProps) {
  const hasData = Array.isArray(transactions) && transactions.length > 0;
  return (
    <div className="flex-1 bg-(--card-background) rounded-2xl flex flex-col gap-6 p-4 border ">
      <div className="flex items-center justify-between m-6">
        <span className="text-[1rem] font-bold text-(--light-text-color)">
          Recent Transactions
        </span>
      </div>
      <div className='max-h-150 overflow-y-auto min-h-0'> 
        {!hasData ? (
          <div className="h-full w-full py-8 flex items-center justify-center text-(--muted-text)">
            Add some transactions to see them here.
          </div>
        ) : (
          transactions.map((transaction, index) => (
            <TransactionCard
              key={index}
              id={transaction.id}
              transaction_date={transaction.transaction_date}
              description={transaction.description}
              category={transaction.category}
              amount={transaction.amount}
              timeAgo={getDaysAgo(transaction.transaction_date)}
              onEdit={onEditTransaction ? () => onEditTransaction(transaction) : undefined}
            />
          ))
        )}
      </div>
    </div>
  );
}

function getDaysAgo(date: string) {
  return Math.floor(
    (Date.now() - new Date(date).getTime()) /
      (1000 * 60 * 60 * 24)
  );
}
