import type { Artwork } from "#/api/art-work/interface";
import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  artwork?: Artwork;
  onOpen: (artwork?: Artwork) => void;
  onClose: () => void;
}

export const useArtworkModalStore = create<ModalState>((set) => ({
  artwork: undefined,
  isOpen: false,
  onOpen: (artwork) => set({ isOpen: true, artwork }),
  onClose: () => set({ isOpen: false }),
}));
