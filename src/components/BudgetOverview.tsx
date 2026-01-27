import ProgressBarCard from "./ProgressBarCard";

type BudgetOverviewProps = {
  budgetData: Record<string, number>;
};

export default function BudgetOverview({ budgetData }: BudgetOverviewProps) {
  return (
      <div className="flex-1 min-h-150 bg-(--card-background) rounded-2xl flex flex-col gap-6 p-4 overflow-y-auto h-full border">
        <div className="flex items-center justify-between m-6">
          <span className="text-[1rem] font-bold text-(--light-text-color)">
            Budget Overview
          </span>
          <button className="h-full px-4 flex justify-center rounded hover:underline font-semibold text-(--light-text-color)">Edit Budget</button>
        </div>
        <div className="flex flex-col overflow-y-auto">
            {
                Object.keys(budgetData).map((category: string) => (
                  <ProgressBarCard
                    key={category}
                    category={category}
                    amountSpend={budgetData[category] ?? 0}
                    budget={15000}
                  />
                ))
            }
        </div>
      </div>
    );
}
