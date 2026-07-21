import TempStateCard from "@/components/TempStateCard";
import { StateBase } from "@/app/types/state";
import { fetchListOfStates } from "@/app/lib/cdc";

export default async function Page() {
  const states: StateBase[] = await fetchListOfStates();
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-6">
      {states.map((s) => (
        <TempStateCard key={s.stateabbr} state={s} />
      ))}
    </div>
  );
}
