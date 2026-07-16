import Link from "next/link";
import { StateBase } from "../app/types/state";

export default function StateCard({ state }: { state: StateBase }) {
  return (
    <Link href={`/states/${state.stateabbr}`}>
      <div
        style={{
          padding: "16px 20px",
          borderRadius: 8,
          border: "1px solid #e0e0e0",
          background: "#fff",
        }}
      >
        <div>{state.statedesc}</div>
        <div>{state.stateabbr}</div>
      </div>
    </Link>
  );
}
