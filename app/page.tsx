import StateCard from "@/components/stateCard";
import { StateBase } from "./types/state";
import { fetchListOfStates } from "@/app/lib/cdc";

export default async function Page() {
  const states: StateBase[] = await fetchListOfStates();
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
