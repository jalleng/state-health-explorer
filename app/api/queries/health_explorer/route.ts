import { NextResponse } from "next/server";
import type { QueryResponse } from "@/app/types/query";

const HEALTH_EXPLORER_API_URL =
  process.env.HEALTH_EXPLORER_API_URL ?? "http://localhost:8000";

const UPSTREAM_TIMEOUT_MS = 30_000;

// If responses become more complex consider switching to Zod for validation instead of this type guard.
function isQueryResponse(data: unknown): data is QueryResponse {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  if (typeof d.answer !== "string") return false;
  if (d.sources !== undefined && !Array.isArray(d.sources)) return false;
  if (
    Array.isArray(d.sources) &&
    !d.sources.every((s) => typeof s === "string")
  )
    return false;
  return true;
}

export async function POST(request: Request) {
  const { question } = (await request.json()) as { question?: unknown };

  if (typeof question !== "string" || !question.trim()) {
    return NextResponse.json(
      { error: "Question is required" },
      { status: 400 },
    );
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const upstream = await fetch(`${HEALTH_EXPLORER_API_URL}/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
      signal: controller.signal,
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Server error: ${upstream.status}` },
        { status: upstream.status },
      );
    }

    const data: unknown = await upstream.json();

    if (!isQueryResponse(data)) {
      return NextResponse.json(
        { error: "Unexpected response shape from upstream service." },
        { status: 502 },
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return NextResponse.json(
        { error: "The health query service timed out." },
        { status: 504 },
      );
    }
    return NextResponse.json(
      { error: "Could not reach the health query service." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timer);
  }
}
