"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartRow } from "@/app/types/chart";
import CustomTooltip from "@/components/CustomTooltip";

export default function BarChartComponent({
  chartData,
  valueLabel,
  bottomText,
}: {
  chartData: ChartRow[];
  valueLabel?: string;
  bottomText?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 20, left: 0, bottom: 80 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: "#444" }}
          angle={-35}
          textAnchor="end"
          interval={0}
        />

        <YAxis
          tickFormatter={(v) => `${v}%`}
          tick={{ fontSize: 12, fill: "#444" }}
          domain={[0, "auto"]}
        />

        <Tooltip
          content={(props) => (
            <CustomTooltip
              {...props}
              bottomText={bottomText}
              valueLabel={valueLabel}
            />
          )}
        />

        <Bar dataKey="value" fill="#1a3a5c" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
