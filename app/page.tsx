import StateCard from "@/components/StateCard";
import { StateBase } from "@/app/types/state";
import { fetchListOfStates } from "@/app/lib/cdc";

export default async function Page() {
  const states: StateBase[] = await fetchListOfStates();
  return (
    <div className="max-w-[900px] mx-auto px-4 py-8">
      <div className="p-6">
        <h1 className="text-[28px] font-extrabold text-zinc-900 m-0">
          State Health Explorer
        </h1>
        <p className="text-sm text-zinc-500 mt-2">
          Select a state to explore county-level crude prevalence data for
          various health conditions.
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-6">
        {states.map((s) => (
          <StateCard key={s.stateabbr} state={s} />
        ))}
      </div>
    </div>
  );
}
