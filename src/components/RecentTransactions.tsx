import TransactionCard from './TransactionCard';

export default function RecentTransactions() {
    const transactions = [
            { merchant: 'Starbucks', category: 'Food & Drink', amount: 12.5, timeAgo: '2h ago' },
            { merchant: 'Amazon', category: 'Shopping', amount: 52.99, timeAgo: '1d ago' },
            { merchant: 'Uber', category: 'Transport', amount: 18, timeAgo: '3d ago' },
            { merchant: 'Rent', category: 'Housing', amount: 1200, timeAgo: '1w ago' },
            { merchant: 'Gym', category: 'Health', amount: 45, timeAgo: '2w ago' }
        ];
  return (
    <div className='flex-1 bg-red-200 flex gap-4 p-2 red-section min-h-0'>
          <div className='flex-1 bg-white rounded-2xl flex flex-col gap-4 overflow-y-auto min-h-0 h-full'>
            <div className='text-[1rem] font-bold m-6'>Recent Transactions</div>
            {[...transactions, ...Array.from({ length: 5 }, (_, idx) => ({
              merchant: `Random Shop ${idx + 1}`,
              category: ['Food', 'Transport', 'Shopping'][idx % 3],
              amount: parseFloat((Math.random() * 200).toFixed(2)),
              timeAgo: `${Math.floor(Math.random() * 24)}h ago`
            }))].map((transaction, index) => (
              <TransactionCard
              key={index}
              merchant={transaction.merchant}
              category={transaction.category}
              amount={transaction.amount}
              timeAgo={transaction.timeAgo}
              />
            ))}
            <div className='flex-1 bg-green-50'></div>
          </div>
          <div className='flex-1 bg-white'></div>
    </div>
  )
}
