import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFakeLoading } from "./use-fake-loading";

describe("hooks > use-fake-loading", () => {
  it("should start with loading = true", () => {
    const { result } = renderHook(() => useFakeLoading());
    expect(result.current.loading).toBe(true);
  });

  it("should set loading to false after 500ms", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useFakeLoading());

    expect(result.current.loading).toBe(true);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.loading).toBe(false);

    vi.useRealTimers();
  });
});
