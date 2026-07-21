import Link from "next/link";
import { StateBase } from "../app/types/state";

export default function StateCard({ state }: { state: StateBase }) {
  return (
    <Link href={`/states/${state.stateabbr}`}>
      <div className="px-5 py-4 rounded-lg border border-zinc-200 bg-white">
        <div>{state.statedesc}</div>
        <div>{state.stateabbr}</div>
      </div>
    </Link>
  );
}
