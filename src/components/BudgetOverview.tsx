import ProgressBarCard from "./ProgressBarCard";

type BudgetOverviewProps = {
  budgetData: Record<string, number>;
};

export default function BudgetOverview({ budgetData }: BudgetOverviewProps) {
  const entries = Object.entries(budgetData ?? {});
  const hasData = entries.length > 0 && entries.some(([, v]) => (v ?? 0) > 0);

  return (
      <div className="flex-1 max-h-150 bg-(--card-background) rounded-2xl flex flex-col gap-6 p-4 overflow-y-auto h-full border">
        <div className="flex items-center justify-between m-6">
          <span className="text-[1rem] font-bold text-(--light-text-color)">
            Budget Overview
          </span>
          <button className="h-full px-4 flex justify-center rounded hover:underline font-semibold text-(--light-text-color)">Edit Budget</button>
        </div>
        <div className="flex flex-col overflow-y-auto min-h-0">
          {!hasData ? (
            <div className="h-full w-full py-8 flex items-center justify-center text-(--muted-text)">
              Add some transactions or budgets to see progress.
            </div>
          ) : (
            entries.map(([category, amount]) => (
              <ProgressBarCard
                key={category}
                category={category}
                amountSpend={amount ?? 0}
                budget={15000}
              />
            ))
          )}
        </div>
      </div>
    );
}
