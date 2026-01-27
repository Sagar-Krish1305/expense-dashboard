import ExpenseCategoryChart, { type ExpenseCategoryDatum } from "./ExpenseByCategoryChart";


export default function ExpenseByCategory({ data }: { data: ExpenseCategoryDatum[] }) {
  return (
    <div className="h-140 w-full bg-(--card-background) rounded-2xl flex flex-col gap-6 p-4 border ">
      <div className="flex items-center justify-between m-2">
        <span className="text-[1rem] font-bold text-(--light-text-color)">
          Expense By Category
        </span>
      </div>

        <ExpenseCategoryChart data={data} />
    </div>
  );
}

