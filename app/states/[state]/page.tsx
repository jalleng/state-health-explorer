import HealthQuery from "@/components/HealthQuery";
import HealthBarChart from "./_components/HealthBarChart";
import { fetchStateHealthData } from "@/app/lib/cdc";
import { State, StateAbbreviations } from "../../types/state";

const SHOW_HEALTH_QUERY = process.env.SHOW_HEALTH_QUERY === "true"; // Only show when running locally. Backend is not deployed yet.

export default async function Page(props: {
  params: Promise<{ state: StateAbbreviations }>;
}) {
  const params = await props.params;
  const { state } = params;

  const data: State[] = await fetchStateHealthData(state);

  const stateName = data[0]?.statedesc ?? state;

  return (
    <div className="max-w-[900px] mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-[28px] font-extrabold text-zinc-900 m-0">
          {stateName}
        </h1>
        <p className="text-sm text-zinc-500 mt-2">
          County-level crude prevalence. Select a county to compare against the
          statewide average.
        </p>
      </div>
      {SHOW_HEALTH_QUERY && <HealthQuery />}
      <HealthBarChart data={data} />
    </div>
  );
}
