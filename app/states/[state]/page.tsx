import MeasureList from "./_components/MeasureList";

const SOCRATA_APP_TOKEN = process.env.SOCRATA_APP_TOKEN || "";
const DEBUG_CDC_FETCH = process.env.DEBUG_CDC_FETCH === "true";

export default async function Page(props: {
  params: Promise<{ state: string }>;
}) {
  const params = await props.params;
  const url = `https://chronicdata.cdc.gov/resource/swc5-untb.json?$where=stateabbr='${params.state}'&$limit=500`;

  if (DEBUG_CDC_FETCH) {
    console.log(`[states/${params.state}] Request URL: ${url}`);
  }

  const res = await fetch(
    url,
    { headers: { "X-App-Token": SOCRATA_APP_TOKEN } },
  );

  if (DEBUG_CDC_FETCH) {
    console.log(`[states/${params.state}] CDC response status: ${res.status}`);
    const bodyPreview = (await res.clone().text()).slice(0, 2000);
    console.log(`[states/${params.state}] CDC response body preview:\n${bodyPreview}`);
  }

  const data = await res.json();
  return <MeasureList data={data} stateName={params.state} />;
}
