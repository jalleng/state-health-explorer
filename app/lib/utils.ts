// Add Utils here if needed in the future. For now, this file is empty.

import { State, ChartRow } from "../types/state";

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

  // Convert to array Recharts can consume, sorted descending
  return Object.entries(grouped)
    .map(([measure, { sum, count }]) => ({
      measure,
      value: parseFloat((sum / count).toFixed(1)),
    }))
    .sort((a, b) => b.value - a.value);
}
