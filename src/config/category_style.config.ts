import { Briefcase, Building, CircleDollarSign, Film, Gift, Home, Lightbulb, Percent, Plane, Repeat, RotateCcw, TrendingUp, User, Utensils, type LucideIcon } from "lucide-react";

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
  Salary: {
    bg: 'bg-teal-100',
    text: 'text-teal-600',
  },
  Freelance: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-600',
  },
  Business: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-600',
  },
  Investments: {
    bg: 'bg-cyan-100',
    text: 'text-cyan-600',
  },
  Interest: {
    bg: 'bg-lime-100',
    text: 'text-lime-600',
  },
  Gifts: {
    bg: 'bg-rose-100',
    text: 'text-rose-600',
  },
  Refunds: {
    bg: 'bg-amber-100',
    text: 'text-amber-600',
  },
  'Other Income': {
    bg: 'bg-slate-100',
    text: 'text-slate-600',
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
  Salary: Briefcase,
  Freelance: Building,
  Business: Building,
  Investments: TrendingUp,
  Interest: Percent,
  Gifts: Gift,
  Refunds: RotateCcw,
  'Other Income': CircleDollarSign,
};