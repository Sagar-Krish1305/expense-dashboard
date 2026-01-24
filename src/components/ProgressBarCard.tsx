import { Progress } from "../components/ui/progress"

type ProgressBarCardProps = {
    category: string;
    amountSpend: number;
    budget: number;
}
export default function ProgressBarCard({category, amountSpend, budget} : ProgressBarCardProps) {

    const percent = budget === 0 ? 0 : Math.max(amountSpend / budget * 100, 0);

    return (
        <div className='flex rounded-2xl px-6 flex-col gap-2 py-3'>
            <div className='flex-1 flex justify-between'>
                <span className='text-(--light-text-color) text-[0.9rem]'>{category}</span>
                <span className='text-(--muted-text) text-[0.9rem]'>{amountSpend.toFixed(2)}₹ / {budget.toFixed(2)}₹ </span>
            </div>
            <Progress className={`${amountSpend > budget ? 'bg-red-600' : ''}`} value={percent} ></Progress>
        </div>
    );
}
