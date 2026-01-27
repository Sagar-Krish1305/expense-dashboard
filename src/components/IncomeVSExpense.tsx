import { useQuery } from "@tanstack/react-query";
import IncomeExpenseChart from "./IncomeExpenseChart";
import type { PreviousMonthDataDetails, TransactionDetails } from "../types/transaction.types";
import axios from "axios";



export default function IncomeVSExpense() {
    const {
    data,
    isPending,
    error,
    refetch,
  } = useQuery<PreviousMonthDataDetails[]>({
    queryKey: ['previous_months_data'],
    queryFn: async () => {
      await new Promise<void>((resolve) =>
        setTimeout(resolve, 1000)
      );
      const res = await axios.get(
        'http://localhost:3000/previous_months_data'
      );
      return res.data;
    },
  });

  console.log(data)
  return (
    <div className="h-100 w-full bg-(--card-background) rounded-2xl flex flex-col gap-6 p-4 border">
      <div className="flex items-center justify-between m-2">
        <span className="text-[1rem] font-bold text-(--light-text-color)">
          Income VS Expense
        </span>
      </div>
        <div className="flex justify-center items-center flex-1">
            {!isPending ? 
                <IncomeExpenseChart data={data as PreviousMonthDataDetails[]} />
                : <div className="p-4 text-(--light-text-color)">Loading Chart</div>
            }
        </div>
    </div>
  );
}

