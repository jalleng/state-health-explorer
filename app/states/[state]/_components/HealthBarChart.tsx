"use client";

import { useState, useMemo } from "react";
import { aggregateByMeasure, groupByCategory } from "@/app/lib/utils";
import { State } from "@/app/types/state";
import BarChartComponent from "@/components/BarChartComponent";

export default function HealthBarChart({ data }: { data: State[] }) {
  const counties = useMemo(() => {
    const names = [...new Set(data.map((d) => d.locationname))].sort();
    return ["All Counties", ...names];
  }, [data]);

  const [selectedCounty, setSelectedCounty] = useState("All Counties");

  const lowerText = useMemo(() => {
    return selectedCounty === "All Counties"
      ? "Statewide average"
      : `${selectedCounty} County`;
  }, [selectedCounty]);

  const categoryCharts = useMemo(() => {
    const records =
      selectedCounty === "All Counties"
        ? data
        : data.filter((d) => d.locationname === selectedCounty);

    const byCategory = groupByCategory(records);
    return Object.entries(byCategory)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([category, rows]) => ({
        category,
        chartData: aggregateByMeasure(rows),
      }));
  }, [data, selectedCounty]);

  const valueLabel = "% crude prevalence";

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <label
          htmlFor="county-select"
          className="text-[13px] font-semibold text-zinc-600"
        >
          View:
        </label>
        <select
          id="county-select"
          value={selectedCounty}
          onChange={(e) => setSelectedCounty(e.target.value)}
          className="px-3 py-1.5 rounded-md border border-zinc-200 text-[13px] text-zinc-900 bg-white cursor-pointer"
        >
          {counties.map((county) => (
            <option key={county} value={county}>
              {county}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {categoryCharts.map(({ category, chartData }) => (
          <div key={category}>
            <h2 className="text-sm font-semibold text-zinc-700 mb-2">
              {category}
            </h2>
            <BarChartComponent
              chartData={chartData}
              valueLabel={valueLabel}
              bottomText={lowerText}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
