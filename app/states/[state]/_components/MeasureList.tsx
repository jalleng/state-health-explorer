"use client";

import { useState } from "react";
import { useMeasures } from "@/hooks/useMeasures";
import { State } from "@/app/types/state";

export default function MeasureList({
  data,
  stateName,
}: {
  data: State[];
  stateName: State["statedesc"];
}) {
  const categories = ["All", ...new Set(data.map((d) => d.category))];
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortDir, setSortDir] = useState("desc");

  // Custom hook handles all filtering and sorting logic
  const measures = useMeasures(data, activeCategory, sortDir);

  return (
    <div>
      {/* Filter + Sort Controls */}
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                background: activeCategory === cat ? "#1a3a5c" : "#f0f0f0",
                color: activeCategory === cat ? "#fff" : "#444",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
          style={{
            marginLeft: "auto",
            padding: "6px 12px",
            borderRadius: 6,
            border: "1px solid #e0e0e0",
            background: "#fff",
            cursor: "pointer",
            fontSize: 13,
            color: "#444",
          }}
        >
          {sortDir === "desc" ? "Highest first" : "Lowest first"}
        </button>
      </div>

      {/* Measure Rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {measures.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "14px 16px",
              background: "#fff",
              borderRadius: 8,
              border: "1px solid #e8e8e8",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#1a1a1a" }}>
                {m.short_question_text}
              </div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                {m.locationname} County • {m.category}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700, fontSize: 20, color: "#1a3a5c" }}>
                {m.data_value}%
              </div>
              <div style={{ fontSize: 11, color: "#aaa" }}>
                crude prevalence
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
