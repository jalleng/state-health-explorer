import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useBoolean } from "./useBoolean";

describe("useBoolean", () => {
  it("initializes to false", () => {
    const { result } = renderHook(() => useBoolean(false));
    expect(result.current[0]).toBe(false);
  });

  it("initializes to true", () => {
    const { result } = renderHook(() => useBoolean(true));
    expect(result.current[0]).toBe(true);
  });

  it("accepts a lazy initializer function", () => {
    const { result } = renderHook(() => useBoolean(() => true));
    expect(result.current[0]).toBe(true);
  });

  it("setTrue sets value to true", () => {
    const { result } = renderHook(() => useBoolean(false));
    act(() => result.current[1].setTrue());
    expect(result.current[0]).toBe(true);
  });

  it("setFalse sets value to false", () => {
    const { result } = renderHook(() => useBoolean(true));
    act(() => result.current[1].setFalse());
    expect(result.current[0]).toBe(false);
  });

  it("toggle flips the value", () => {
    const { result } = renderHook(() => useBoolean(false));
    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(true);
    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(false);
  });

  it("setTrue and setFalse are stable references across renders", () => {
    const { result, rerender } = renderHook(() => useBoolean(false));
    const { setTrue, setFalse } = result.current[1];
    rerender();
    expect(result.current[1].setTrue).toBe(setTrue);
    expect(result.current[1].setFalse).toBe(setFalse);
  });
});
