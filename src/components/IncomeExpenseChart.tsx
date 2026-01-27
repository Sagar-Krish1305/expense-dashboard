

// Keep axes aligned with design tokens defined in CSS variables.
const axisLineColor = "var(--total-progress-color)";
const axisLabelColor = "var(--muted-text)";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active) return null;

  return (
    <div className="rounded-lg border bg-white p-4 shadow">
      <p className="font-medium">{label}</p>
      <p className="text-green-600">• ₹{payload[0].value}</p>
      <p className="text-orange-500">• ₹{payload[1].value}</p>
    </div>
  );
};


import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function IncomeExpenseChart({ data } : { data: { month: string, income: number, expense: number }[] } ) {
  return (
    <div className="h-full w-full rounded-xl border bg-(--card-background) p-6">

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>

          <defs>
            <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E76F51" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#E76F51" stopOpacity={0} />
            </linearGradient>
          </defs>


          <XAxis
            dataKey="month"
            axisLine={{ stroke: axisLineColor }}
            tickLine={{ stroke: axisLineColor }}
            tick={{ fill: axisLabelColor, fontSize: 12 }}
          />
          <YAxis
            tickFormatter={(v) => `₹${v / 1000}k`}
            axisLine={{ stroke: axisLineColor }}
            tickLine={{ stroke: axisLineColor }}
            tick={{ fill: axisLabelColor, fontSize: 12 }}
          />


          <Tooltip content={<CustomTooltip />} />


          <Area
            type="monotone"
            dataKey="income"
            stroke="#4CAF50"
            fill="url(#income)"
            strokeWidth={2}
          />

          <Area
            type="monotone"
            dataKey="expense"
            stroke="#E76F51"
            fill="url(#expense)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
