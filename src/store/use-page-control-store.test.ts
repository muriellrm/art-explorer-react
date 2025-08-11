import { describe, it, expect, beforeEach } from "vitest";
import { usePageControlStore } from "./use-page-control-store";

describe("store > use-page-control-store", () => {
  beforeEach(() => {
    usePageControlStore.setState({ page: 0 });
  });

  it("should initialize with page 0", () => {
    const state = usePageControlStore.getState();
    expect(state.page).toBe(0);
  });

  it("should increase page by 1", () => {
    usePageControlStore.getState().increasePage();
    expect(usePageControlStore.getState().page).toBe(1);

    usePageControlStore.getState().increasePage();
    expect(usePageControlStore.getState().page).toBe(2);
  });

  it("should reset page to 0", () => {
    usePageControlStore.setState({ page: 5 });
    usePageControlStore.getState().resetPage();
    expect(usePageControlStore.getState().page).toBe(0);
  });
});
