import type { Artwork } from "#/api/art-work/interface";
import { log } from "#/utils/logging";
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
  onOpen: (artwork) => {
    log.info("Acessando detalhes da obra!", {
      objectID: artwork?.objectID,
      primaryImage: artwork?.primaryImage,
      department: artwork?.department,
      title: artwork?.title,
      artistDisplayName: artwork?.artistDisplayName,
      objectDate: artwork?.objectDate,
      medium: artwork?.medium,
    });
    set({ isOpen: true, artwork });
  },
  onClose: () => set({ isOpen: false }),
}));
