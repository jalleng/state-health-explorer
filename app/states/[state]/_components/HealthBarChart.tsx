"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { aggregateByMeasure } from "@/app/lib/utils";
import CustomTooltip from "./CustomTooltip";
import { State } from "../../../types/state";

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

  const chartData = useMemo(() => {
    const records =
      selectedCounty === "All Counties"
        ? data
        : data.filter((d) => d.locationname === selectedCounty);

    return aggregateByMeasure(records);
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

      {/* ---- Bar Chart -------------------------------------- */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

          <XAxis
            dataKey="measure"
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
                bottomText={lowerText}
                valueLabel={valueLabel}
              />
            )}
          />

          <Bar dataKey="value" fill="#1a3a5c" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
