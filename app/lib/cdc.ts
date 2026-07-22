import {
  State,
  StateApiRow,
  StateBase,
  StateAbbreviations,
} from "../types/state";

const SOCRATA_APP_TOKEN = process.env.SOCRATA_APP_TOKEN || "";
const headers: Record<string, string> = {};
if (SOCRATA_APP_TOKEN) {
  headers["X-App-Token"] = SOCRATA_APP_TOKEN;
}

function isStateBase(obj: unknown): obj is StateBase {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  const candidate = obj as Record<string, unknown>;
  return (
    typeof candidate.stateabbr === "string" &&
    typeof candidate.statedesc === "string"
  );
}

export async function fetchListOfStates(): Promise<StateBase[]> {
  const params = new URLSearchParams({
    $select: "stateabbr,statedesc",
    $group: "stateabbr,statedesc",
    $order: "statedesc ASC",
    $limit: "60",
  });
  const url = `https://chronicdata.cdc.gov/resource/swc5-untb.json?${params.toString()}`;
  const res = await fetch(url, { headers });

  if (!res.ok) {
    throw new Error(`Failed to fetch states: ${res.status} ${res.statusText}`);
  }

  const raw: unknown = await res.json();
  const data: StateBase[] = Array.isArray(raw) ? raw.filter(isStateBase) : [];
  const states: StateBase[] = Array.from(
    new Map(
      data.map((s) => [
        s.stateabbr,
        { stateabbr: s.stateabbr, statedesc: s.statedesc },
      ]),
    ).values(),
  );
  return states;
}

export async function fetchStateHealthData(
  stateAbbr: StateAbbreviations,
): Promise<State[]> {
  const params = new URLSearchParams({
    $where: `stateabbr='${stateAbbr}' AND data_value_type='Crude prevalence'`,
    $limit: "2000",
    $select:
      "stateabbr,statedesc,locationname,category,short_question_text,data_value,totalpopulation",
  });
  const url = `https://chronicdata.cdc.gov/resource/swc5-untb.json?${params.toString()}`;
  const res = await fetch(url, { headers });

  if (!res.ok) {
    throw new Error(`Failed to fetch data for ${stateAbbr}`);
  }

  const raw: StateApiRow[] = await res.json();
  const states: State[] = raw.map((row) => ({
    ...row,
    data_value: parseFloat(row.data_value),
    totalpopulation: parseInt(row.totalpopulation, 10),
  }));
  return states;
}
