import { describe, it, expect } from "vitest";
import { groupByCategory, aggregateByMeasure } from "./utils";
import type { State } from "@/app/types/state";

function makeState(overrides: Partial<State> = {}): State {
  return {
    stateabbr: "WA",
    statedesc: "Washington",
    locationname: "King",
    category: "Health Outcomes",
    short_question_text: "Arthritis",
    data_value: 25.0,
    totalpopulation: 100000,
    ...overrides,
  };
}

describe("groupByCategory", () => {
  it("returns empty object for empty input", () => {
    expect(groupByCategory([])).toEqual({});
  });

  it("groups a single record into its category", () => {
    const row = makeState({ category: "Prevention" });
    expect(groupByCategory([row])).toEqual({ Prevention: [row] });
  });

  it("groups multiple records into their correct categories", () => {
    const a = makeState({ category: "Prevention" });
    const b = makeState({ category: "Health Outcomes" });
    const c = makeState({ category: "Prevention" });
    const result = groupByCategory([a, b, c]);
    expect(result["Prevention"]).toEqual([a, c]);
    expect(result["Health Outcomes"]).toEqual([b]);
  });

  it("preserves all records — none are dropped", () => {
    const rows = [
      makeState({ category: "A" }),
      makeState({ category: "B" }),
      makeState({ category: "A" }),
    ];
    const result = groupByCategory(rows);
    const total = Object.values(result).flat().length;
    expect(total).toBe(rows.length);
  });
});

describe("aggregateByMeasure", () => {
  it("returns empty array for empty input", () => {
    expect(aggregateByMeasure([])).toEqual([]);
  });

  it("passes through a single record unchanged", () => {
    const row = makeState({ short_question_text: "Stroke", data_value: 4.5 });
    const result = aggregateByMeasure([row]);
    expect(result).toEqual([{ name: "Stroke", value: 4.5 }]);
  });

  it("averages data_value across records with the same measure", () => {
    const rows = [
      makeState({ short_question_text: "Arthritis", data_value: 30.0 }),
      makeState({ short_question_text: "Arthritis", data_value: 20.0 }),
    ];
    const result = aggregateByMeasure(rows);
    expect(result).toEqual([{ name: "Arthritis", value: 25.0 }]);
  });

  it("rounds to 1 decimal place", () => {
    const rows = [
      makeState({ short_question_text: "Obesity", data_value: 10.0 }),
      makeState({ short_question_text: "Obesity", data_value: 20.0 }),
      makeState({ short_question_text: "Obesity", data_value: 15.0 }),
    ];
    const [result] = aggregateByMeasure(rows);
    expect(result.value).toBe(15.0);
    // Verify 1 decimal rounding with uneven numbers
    const uneven = [
      makeState({ short_question_text: "X", data_value: 10.0 }),
      makeState({ short_question_text: "X", data_value: 10.0 }),
      makeState({ short_question_text: "X", data_value: 11.0 }),
    ];
    const [r] = aggregateByMeasure(uneven);
    expect(r.value).toBe(10.3);
  });

  it("sorts results descending by value", () => {
    const rows = [
      makeState({ short_question_text: "Low", data_value: 5.0 }),
      makeState({ short_question_text: "High", data_value: 30.0 }),
      makeState({ short_question_text: "Mid", data_value: 15.0 }),
    ];
    const result = aggregateByMeasure(rows);
    expect(result.map((r) => r.name)).toEqual(["High", "Mid", "Low"]);
  });

  it("handles multiple distinct measures independently", () => {
    const rows = [
      makeState({ short_question_text: "Asthma", data_value: 10.0 }),
      makeState({ short_question_text: "Cancer", data_value: 6.0 }),
      makeState({ short_question_text: "Asthma", data_value: 12.0 }),
    ];
    const result = aggregateByMeasure(rows);
    const asthma = result.find((r) => r.name === "Asthma");
    const cancer = result.find((r) => r.name === "Cancer");
    expect(asthma?.value).toBe(11.0);
    expect(cancer?.value).toBe(6.0);
  });
});
