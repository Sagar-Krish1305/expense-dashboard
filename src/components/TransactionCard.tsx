import {
  EditIcon,
  CircleDollarSign,
} from 'lucide-react';
import { CATEGORY_ICON_MAP, CATEGORY_STYLE_MAP } from '../config/category_style.config';
import type { TransactionCardProps } from '../types/transaction.types';



export default function TransactionCard({
  description,
  category,
  amount,
  currencySymbol = '₹',
  timeAgo,
}: TransactionCardProps) {
  const Icon = CATEGORY_ICON_MAP[category] ?? CircleDollarSign;

  const style = CATEGORY_STYLE_MAP[category] ?? {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
  };

  return (
    <div className="px-4 border-b">
      <div className="flex p-4 pr-0 justify-between">
        <div className="flex gap-4">
          <Icon
            className={`w-10 h-10 p-2 rounded ${style.bg} ${style.text}`}
          />

          <div className="flex flex-col">
            <span className="text-[1rem] font-medium text-(--light-text-color)">
              {description}
            </span>
            <span className="text-[0.8rem] text-(--muted-text)">
              {category}
            </span>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex flex-col text-right">
            <span className="text-[1rem] font-semibold text-(--light-text-color)">
              {currencySymbol}
              {amount}
            </span>
            <span className="text-[0.8rem] text-gray-500">
              {timeAgo} days ago
            </span>
          </div>

          <button className="w-10 h-10 p-2 flex items-center
          bg-(--edit-button-background-invisible) border-0 hover:bg-(--edit-button-background-hover)
          text-(--edit-button-text-invisible) hover:text-(--edit-button-text-hover) hover:border rounded-md">
            <EditIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
