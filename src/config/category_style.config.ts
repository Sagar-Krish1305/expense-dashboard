import { CircleDollarSign, Film, Home, Lightbulb, Plane, Repeat, User, Utensils, type LucideIcon } from "lucide-react";

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