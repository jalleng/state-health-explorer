import StateCard from "@/components/stateCard";
import { State, StateBase } from "./types/state";

const SOCRATA_APP_TOKEN = process.env.SOCRATA_APP_TOKEN || "";

function isState(value: unknown): value is State {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.stateabbr === "string" &&
    typeof candidate.statedesc === "string" &&
    typeof candidate.locationname === "string" &&
    typeof candidate.category === "string" &&
    typeof candidate.short_question_text === "string" &&
    typeof candidate.data_value === "string" &&
    typeof candidate.totalpopulation === "string"
  );
}

export default async function Page() {
  const res = await fetch(
    "https://chronicdata.cdc.gov/resource/swc5-untb.json?$limit=200",
    { headers: { "X-App-Token": SOCRATA_APP_TOKEN } },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch states: ${res.status} ${res.statusText}`);
  }

  const raw: unknown = await res.json();
  const data: State[] = Array.isArray(raw) ? raw.filter(isState) : [];
  const states: StateBase[] = Array.from(
    new Map(
      data.map((s) => [
        s.stateabbr,
        { stateabbr: s.stateabbr, statedesc: s.statedesc },
      ]),
    ).values(),
  );
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 16,
      }}
    >
      {states.map((s) => (
        <StateCard key={s.stateabbr} state={s} />
      ))}
    </div>
  );
}
