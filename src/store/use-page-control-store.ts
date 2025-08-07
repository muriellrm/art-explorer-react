import { create } from "zustand";

interface PageControl {
  page: number;
  increasePage: () => void;
  resetPage: () => void;
}

export const usePageControlStore = create<PageControl>((set) => ({
  page: 0,
  increasePage: () => set((state) => ({ page: state.page + 1 })),
  resetPage: () => set({ page: 0 }),
}));
