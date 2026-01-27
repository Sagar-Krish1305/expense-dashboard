export type ExpenseCategoryDatum = {
  name: string;
  value: number;
};

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend
} from "recharts";
import { CATEGORY_STYLE_MAP } from "../config/category_style.config";
import { useTheme } from "../context/ThemeContext";

const getSliceColor = (category: string, theme: "light" | "dark") => {
  const style = CATEGORY_STYLE_MAP[category];

  const color = theme === "dark"
    ? style.pieChartColorDark
    : style.pieChartColorLight;

  return color;
};

export default function ExpenseCategoryChart({ data }: { data: ExpenseCategoryDatum[] }) {
  const { theme } = useTheme();

  return (
    <div className="flex-1 w-full rounded-xl border bg-(--card-background) p-6">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={90}
            outerRadius={120}
            paddingAngle={4}
            stroke="var(--card-background)"
            className="m-12"
            strokeWidth={4}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={getSliceColor(entry.name, theme)}
              />
            ))}
          </Pie>

          <Legend
            verticalAlign="bottom"
            iconType="square"
            className="m-2"
            formatter={(value) => (
              <span style={{ color: "var(--muted-text)", padding: "0.5rem" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
