import HealthBarChart from "./_components/HealthBarChart";
import { fetchStateHealthData } from "@/app/lib/cdc";
import { State, StateAbbreviations } from "../../types/state";

export default async function Page(props: {
  params: Promise<{ state: StateAbbreviations }>;
}) {
  const params = await props.params;
  const { state } = params;

  const data: State[] = await fetchStateHealthData(state);

  const stateName = data[0]?.statedesc ?? state;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px" }}>
      {/* Page header */}
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{ fontSize: 28, fontWeight: 800, color: "#1a1a1a", margin: 0 }}
        >
          {stateName}
        </h1>
        <p style={{ fontSize: 14, color: "#666", marginTop: 8 }}>
          County-level crude prevalence. Select a county to compare against the
          statewide average.
        </p>
      </div>
      <HealthBarChart data={data} />
    </div>
  );
}
