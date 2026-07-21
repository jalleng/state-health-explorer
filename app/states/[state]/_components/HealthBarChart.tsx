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

  const chartData = useMemo(() => {
    const records =
      selectedCounty === "All Counties"
        ? data
        : data.filter((d) => d.locationname === selectedCounty);

    return aggregateByMeasure(records);
  }, [data, selectedCounty]);

  return (
    <div>
      {/* ---- County Selector ------------------------------------ */}
      <div
        style={{
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <label
          htmlFor="county-select"
          style={{ fontSize: 13, fontWeight: 600, color: "#444" }}
        >
          View:
        </label>
        <select
          id="county-select"
          value={selectedCounty}
          onChange={(e) => setSelectedCounty(e.target.value)}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: "1px solid #e0e0e0",
            fontSize: 13,
            color: "#1a1a1a",
            background: "#fff",
            cursor: "pointer",
          }}
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
              <CustomTooltip {...props} selectedCounty={selectedCounty} />
            )}
          />

          <Bar dataKey="value" fill="#1a3a5c" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
