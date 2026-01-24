import type { Wallet } from "lucide-react";

export type SummaryCardDetails = {
    title: string,
    amount: number, 
    percentChange: number, 
    iconStyle: string,
    Icon: typeof Wallet
}
export default function SummaryCard( { title, amount, percentChange, iconStyle, Icon} : SummaryCardDetails) {

    const positiveChange: boolean = percentChange > 0;
    return (
        <div className='flex-1 flex border rounded-2xl bg-(--card-background)'>
            <div className='flex-3 flex flex-col p-4 pr-0'>
                <span className='text-(--muted-text) text-[0.75rem]'>{title}</span>
                <div className='text-2xl font-bold text-(--light-text-color)'>${amount}₹</div>
                <span className={`text-xs ${positiveChange ? 'text-green-600' : 'text-red-600'}`}>{positiveChange ? '+' : '-'}${percentChange}% from last month</span>
            </div>
            <div className='flex-1 flex items-center justify-center pr-4'>
                <Icon className={`${iconStyle} w-10 h-10 p-2 rounded-xl`}></Icon>
            </div>
        </div>
    )
}
