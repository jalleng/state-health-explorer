import { State } from "@/app/types/state";
import type { ChartRow } from "@/app/types/chart";

export function groupByCategory(data: State[]): Record<string, State[]> {
  return data.reduce(
    (acc, row) => {
      if (!acc[row.category]) acc[row.category] = [];
      acc[row.category].push(row);
      return acc;
    },
    {} as Record<string, State[]>,
  );
}

export function aggregateByMeasure(data: State[]): ChartRow[] {
  const grouped = data.reduce(
    (acc: Record<string, { sum: number; count: number }>, d) => {
      const key = d.short_question_text;
      if (!acc[key]) acc[key] = { sum: 0, count: 0 };
      acc[key].sum += d.data_value;
      acc[key].count += 1;
      return acc;
    },
    {},
  );

  return Object.entries(grouped)
    .map(([name, { sum, count }]) => ({
      name,
      value: parseFloat((sum / count).toFixed(1)),
    }))
    .sort((a, b) => b.value - a.value);
}
