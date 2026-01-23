import { Wallet, type LucideIcon } from 'lucide-react'

type TransactionCardProps = {
  merchant: string;
  category: string;
  amount: number;
  currencySymbol?: string;
  timeAgo: string;
  Icon?: LucideIcon;
};

export default function TransactionCard({
  merchant,
  category,
  amount,
  currencySymbol = '₹',
  timeAgo,
  Icon = Wallet,
}: TransactionCardProps) {
  return (
    <div className='p-4 border-b'>
        <div className='flex p-4 pr-0 border-black justify-between'>
        <div className='flex gap-4'>
            <Icon className='w-10 h-10 bg-red-200 text-red-400 p-1 rounded' />
            <div className='flex flex-col'>
            <span className='text-[1rem] '>{merchant}</span>
            <span className='text-[0.8rem]'>{category}</span>
            </div>
        </div>
        <div className='flex gap-2 items-center'>
            <div className='flex flex-col'>
                <span className='text-[1rem] font-bold' >{amount}{currencySymbol}</span>
                <span className='text-[0.8rem]' >{timeAgo}</span>
            </div>
            <div className='w-10 h-10 border-black border'></div>
        </div>
        
        </div>
    </div>
  )
}
