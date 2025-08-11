import { describe, it, expect, vi, beforeEach } from "vitest";
import { useArtworkModalStore } from "./use-artwork-modal-store";
import { log } from "#/utils/logging";
import type { Artwork } from "#/api/art-work/interface";

vi.mock("#/utils/logging", () => ({
  log: {
    info: vi.fn(),
  },
}));

describe("store > use-artwork-modal-store", () => {
  beforeEach(() => {
    useArtworkModalStore.setState({
      isOpen: false,
      artwork: undefined,
    });
    vi.clearAllMocks();
  });

  it("should initialize with isOpen false and no artwork", () => {
    const state = useArtworkModalStore.getState();
    expect(state.isOpen).toBe(false);
    expect(state.artwork).toBeUndefined();
  });

  it("should open modal and set artwork", () => {
    const artwork: Artwork = {
      objectID: 123,
      primaryImage: "img.png",
      primaryImageSmall: "img-small.png",
      department: "Paintings",
      title: "Mona Lisa",
      artistDisplayName: "Leonardo da Vinci",
      objectDate: "1503",
      medium: "Oil on poplar",
    };

    useArtworkModalStore.getState().onOpen(artwork);

    const state = useArtworkModalStore.getState();
    expect(state.isOpen).toBe(true);
    expect(state.artwork).toEqual(artwork);

    expect(log.info).toHaveBeenCalledWith("Acessando detalhes da obra!", {
      objectID: artwork.objectID,
      primaryImage: artwork.primaryImage,
      department: artwork.department,
      title: artwork.title,
      artistDisplayName: artwork.artistDisplayName,
      objectDate: artwork.objectDate,
      medium: artwork.medium,
    });
  });

  it("should open modal without artwork", () => {
    useArtworkModalStore.getState().onOpen();

    const state = useArtworkModalStore.getState();
    expect(state.isOpen).toBe(true);
    expect(state.artwork).toBeUndefined();

    expect(log.info).toHaveBeenCalledWith("Acessando detalhes da obra!", {
      objectID: undefined,
      primaryImage: undefined,
      department: undefined,
      title: undefined,
      artistDisplayName: undefined,
      objectDate: undefined,
      medium: undefined,
    });
  });

  it("should close modal", () => {    
    useArtworkModalStore.setState({ isOpen: true });

    useArtworkModalStore.getState().onClose();

    const state = useArtworkModalStore.getState();
    expect(state.isOpen).toBe(false);
  });
});
