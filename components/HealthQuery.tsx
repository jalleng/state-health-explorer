"use client";

import { useState, type FormEvent } from "react";

export default function HealthQuery() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer(null);
    setSources([]);
    setError(null);

    try {
      const res = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setAnswer(data.answer);
      setSources(data.sources ?? []);
    } catch (err) {
      setError(
        "Could not reach the health query service. Make sure the API is running.",
      );
    } finally {
      setLoading(false);
    }
  }

  const handleClear = () => {
    setQuestion("");
    setAnswer(null);
    setSources([]);
    setError(null);
  };

  const disableClearButton =
    loading || (!question && !answer && !error && sources.length === 0);

  return (
    <div className="bg-white border border-zinc-200 rounded-[10px] p-6 mb-8">
      {/* Header */}
      <div className="mb-4">
        <div className="text-[11px] font-bold tracking-[2px] text-zinc-400 uppercase mb-1">
          Ask the Data
        </div>
        <p className="text-sm text-zinc-500 m-0">
          Ask a plain English question about Washington state health data.
        </p>
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Which counties have the highest stroke rates?"
            disabled={loading}
            className="w-full py-2.5 pl-[14px] pr-10 rounded-md border border-zinc-200 text-sm text-zinc-900 outline-none disabled:opacity-50"
          />
          <button
            type="button"
            onClick={handleClear}
            disabled={disableClearButton}
            aria-label="Clear input"
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded text-lg leading-none transition-colors
              ${disableClearButton
                ? "text-zinc-300 cursor-not-allowed"
                : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 cursor-pointer"
              }`}
          >
            ×
          </button>
        </div>
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className={`px-5 py-2.5 rounded-md text-sm font-semibold text-white whitespace-nowrap transition-colors
            ${loading || !question.trim()
              ? "bg-zinc-300 cursor-not-allowed"
              : "bg-[#1a3a5c] hover:bg-[#1a3a5c]/90 cursor-pointer"
            }`}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>

      {/* Error state */}
      {error && (
        <div className="mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Answer */}
      {answer && (
        <div className="mt-5">
          <div className="text-sm leading-[1.7] text-zinc-900 p-4 bg-[#f8f9fc] rounded-lg border-l-[3px] border-l-[#1a3a5c]">
            {answer}
          </div>

          {sources.length > 0 && (
            <details className="mt-3">
              <summary className="text-xs text-zinc-400 cursor-pointer select-none">
                {sources.length} source{sources.length !== 1 ? "s" : ""} used
              </summary>
              <div className="mt-2 flex flex-col gap-1">
                {sources.map((s, i) => (
                  <div
                    key={i}
                    className="text-xs text-zinc-500 px-[10px] py-1.5 bg-zinc-100 rounded"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
