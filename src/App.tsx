import { PiggyBank, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import './App.css';
import SummaryCard from './components/SummaryCard';
import { useState } from 'react';
import AddTransactionModal from './components/AddTransactionModal';
import RecentTransactions from './components/RecentTransactions';
import type { TransactionDetails } from './types/transaction.types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function DashboardLoading() {
  return (
    <div className="w-full h-screen flex items-center justify-center text-lg">
      Loading dashboard…
    </div>
  );
}

function DashboardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <span className="text-red-600 text-lg">
        Failed to load dashboard data
      </span>
      <button
        onClick={onRetry}
        className="px-4 py-2 border rounded-lg hover:bg-neutral-100"
      >
        Retry
      </button>
    </div>
  );
}

function App() {
  const {
    data,
    isPending,
    error,
    refetch,
  } = useQuery<TransactionDetails[]>({
    queryKey: ['transactions'],
    queryFn: async () => {
      await new Promise<void>((resolve) =>
        setTimeout(resolve, 1000)
      );
      const res = await axios.get(
        'http://localhost:3000/transactions'
      );
      return res.data;
    },
  });

  const [transactionModalVisibility, setTransactionModalVisibility] =
    useState(false);

  if (isPending) {
    return <DashboardLoading />;
  }

  if (error) {
    return <DashboardError onRetry={refetch} />;
  }

  return (
    <div className="w-full h-screen flex justify-center font-serif">
      {transactionModalVisibility && (
        <AddTransactionModal
          isVisible={transactionModalVisibility}
          setVisibility={setTransactionModalVisibility}
        />
      )}

      <div className="dashboard-container p-8 h-full flex flex-col gap-4 w-300 min-h-0">
        <div className="navbar flex gap-4">
          <div className="navbar-left flex-1 p-4 flex flex-col">
            <span className="text-3xl font-bold">
              Dashboard
            </span>
            <span className="text-xl">
              Track and manage your expenses effectively
            </span>
          </div>

          <div className="navbar-right flex-1 p-4 flex justify-end items-center">
            <button
              className="bg-[#1b284a] text-white px-4 p-2 rounded-xl"
              onClick={() =>
                setTransactionModalVisibility(true)
              }
            >
              + Add Transaction
            </button>
          </div>
        </div>

        <div className="summary-cards-container flex gap-4">
          <SummaryCard
            Icon={Wallet}
            title="Total Balance"
            amount={0}
            percentChange={12.5}
            iconStyle="bg-orange-200 text-orange-600"
          />
          <SummaryCard
            Icon={TrendingUp}
            title="Total Income"
            amount={0}
            percentChange={8.2}
            iconStyle="bg-green-200 text-green-600"
          />
          <SummaryCard
            Icon={TrendingDown}
            title="Total Expense"
            amount={0}
            percentChange={3.1}
            iconStyle="bg-red-200 text-red-600"
          />
          <SummaryCard
            Icon={PiggyBank}
            title="Total Savings"
            amount={0}
            percentChange={24.5}
            iconStyle="bg-purple-200 text-purple-600"
          />
        </div>

        <div className="flex-1 flex gap-4 p-2 min-h-0">
          <RecentTransactions transactions={data} />
          <div className="flex-1 bg-white rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export default App;
