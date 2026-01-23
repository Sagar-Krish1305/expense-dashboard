import {
  Wallet,
  Utensils,
  Home,
  Lightbulb,
  Plane,
  Film,
  User,
  Repeat,
  CircleDollarSign,
  EditIcon,
  type LucideIcon,
} from 'lucide-react';

export const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  'Food & Dining': Utensils,
  'Rent / Housing': Home,
  Utilities: Lightbulb,
  Travel: Plane,
  Entertainment: Film,
  'Personal Care': User,
  Subscriptions: Repeat,
  Miscellaneous: CircleDollarSign,
};


type TransactionCardProps = {
  description: string;
  category: string;
  amount: number;
  currencySymbol?: string;
  timeAgo: number;
  Icon?: LucideIcon;
};

export const CATEGORY_STYLE_MAP: Record<
  string,
  { bg: string; text: string }
> = {
  'Food & Dining': {
    bg: 'bg-orange-100',
    text: 'text-orange-600',
  },
  'Rent / Housing': {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
  },
  Utilities: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-600',
  },
  Travel: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
  },
  Entertainment: {
    bg: 'bg-pink-100',
    text: 'text-pink-600',
  },
  'Personal Care': {
    bg: 'bg-green-100',
    text: 'text-green-600',
  },
  Subscriptions: {
    bg: 'bg-red-100',
    text: 'text-red-600',
  },
  Miscellaneous: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
  },
};

export default function TransactionCard({
  description,
  category,
  amount,
  currencySymbol = '₹',
  timeAgo,
}: TransactionCardProps) {
  const Icon = CATEGORY_ICON_MAP[category] ?? Wallet;

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
            <span className="text-[1rem] font-medium">
              {description}
            </span>
            <span className="text-[0.8rem] text-gray-500">
              {category}
            </span>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex flex-col text-right">
            <span className="text-[1rem] font-semibold">
              {currencySymbol}
              {amount}
            </span>
            <span className="text-[0.8rem] text-gray-500">
              {timeAgo} days ago
            </span>
          </div>

          <button className="w-10 h-10 p-2 flex items-center bg-white border-0  hover:visible hover:bg-black text-white hover:border rounded-md">
            <EditIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
