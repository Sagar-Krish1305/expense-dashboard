import { PiggyBank, Sun, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import './App.css';
import SummaryCard from './components/SummaryCard';
import { useState } from 'react';
import AddTransactionModal from './components/AddTransactionModal';
import RecentTransactions from './components/RecentTransactions';
import type { TransactionDetails } from './types/transaction.types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import BudgetOverview from './components/BudgetOverview';
import categoryConfig from './config/category.config.json'
import { useTheme, type Theme } from './context/ThemeContext';

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

  const theme = useTheme();

  const getBudgetData = (data: TransactionDetails[]) => {
    const result: Record<string, number> = {};
    data.forEach((transaction) => {
      categoryConfig.AVAILABLE_CATEGORIES.forEach((category) => {
        if (transaction.category === category) {
          if (!result[category]) result[category] = 0;
          result[category] += transaction.amount;
        }
      });
    });
    return result;
  };

  const getTotalIncome = (data: TransactionDetails[]) => {
    return data
      .filter((transaction) => transaction.transaction_type === 'Income')
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  const getTotalExpense = (data: TransactionDetails[]) => {
    return data
      .filter((transaction) => transaction.transaction_type === 'Expense')
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  const getTotalSavings = (data: TransactionDetails[]) => {
    return 0;
  };
  
  const getTotalBalance = (data: TransactionDetails[]) => {
    return getTotalIncome(data) - getTotalExpense(data);
  };

  const [transactionModalVisibility, setTransactionModalVisibility] =
    useState(false);

  if (isPending) {
    return <DashboardLoading />;
  }

  if (error) {
    return <DashboardError onRetry={refetch} />;
  }

  return (
    <div className="w-full h-screen flex justify-center font-serif bg-(--body-background)">
      {transactionModalVisibility && (
        <AddTransactionModal
          isVisible={transactionModalVisibility}
          setVisibility={setTransactionModalVisibility}
        />
      )}

      <div className="bg-(--dashboard-background) p-8 h-full flex flex-col gap-4 w-300 min-h-0">
        <div className="navbar flex gap-4">
          <div className="navbar-left flex-1 p-4 flex flex-col">
            <span className="text-3xl font-bold text-(--light-text-color)">
              Dashboard
            </span>
            <span className="text-xl text-(--muted-text)">
              Track and manage your expenses effectively
            </span>
          </div>

          <div className="navbar-right flex-1 p-4 flex justify-end items-center">
            <button className='m-2 p-3 rounded-2xl cursor-pointer text-(--light-text-color)' onClick={theme.toggleTheme}><Sun /></button>
            <button
              className="bg-(--add-transaction-button-background) text-(--dark-text-color) px-4 p-2 rounded-xl"
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
            amount={getTotalBalance(data)}
            percentChange={12.5}
            iconStyle="bg-orange-200 text-orange-600"
          />
          <SummaryCard
            Icon={TrendingUp}
            title="Total Income"
            amount={getTotalIncome(data)}
            percentChange={8.2}
            iconStyle="bg-green-200 text-green-600"
          />
          <SummaryCard
            Icon={TrendingDown}
            title="Total Expense"
            amount={getTotalExpense(data)}
            percentChange={3.1}
            iconStyle="bg-red-200 text-red-600"
          />
          <SummaryCard
            Icon={PiggyBank}
            title="Total Savings"
            amount={getTotalSavings(data)}
            percentChange={24.5}
            iconStyle="bg-purple-200 text-purple-600"
          />
        </div>

        <div className="flex-1 flex gap-4 p-2 min-h-0">
          <RecentTransactions transactions={data} />
          <BudgetOverview budgetData={getBudgetData(data)} />
        </div>
      </div>
    </div>
  );
}

export default App;
