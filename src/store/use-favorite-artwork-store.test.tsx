import { describe, it, expect, vi, beforeEach } from "vitest";
import { log } from "#/utils/logging";
import type { Artwork } from "#/api/art-work/interface";
import { useFavoriteArtworkStore } from "./use-favorite-artwork-store";

vi.mock("#/utils/logging", () => ({
  log: {
    info: vi.fn(),
  },
}));

describe("store > use-favorite-artwork-store", () => {
  beforeEach(() => {
    useFavoriteArtworkStore.persist?.clearStorage?.();
    useFavoriteArtworkStore.setState({ favoriteArtworks: [] });
    vi.clearAllMocks();
  });

  it("should initialize with empty favoriteArtworks", () => {
    const state = useFavoriteArtworkStore.getState();
    expect(state.favoriteArtworks).toEqual([]);
  });

  it("should add artwork to favorites and call log.info", () => {
    const artwork: Artwork = {
      objectID: 1,
      primaryImage: "img1.png",
      primaryImageSmall: "img1-small.png",
      department: "Paintings",
      title: "Artwork 1",
      artistDisplayName: "Artist 1",
      objectDate: "2020",
      medium: "Oil",
    };

    useFavoriteArtworkStore.getState().toggleFavorite(artwork);

    const state = useFavoriteArtworkStore.getState();
    expect(state.favoriteArtworks).toContainEqual(artwork);
    expect(log.info).toHaveBeenCalledWith(
      "Adicionando artwork nos favoritos!",
      {
        objectID: artwork.objectID,
        action: "add",
      }
    );
  });

  it("should remove artwork from favorites and call log.info", () => {
    const artwork: Artwork = {
      objectID: 2,
      primaryImage: "img2.png",
      primaryImageSmall: "img2-small.png",
      department: "Sculpture",
      title: "Artwork 2",
      artistDisplayName: "Artist 2",
      objectDate: "2021",
      medium: "Marble",
    };

    useFavoriteArtworkStore.getState().toggleFavorite(artwork);
    expect(useFavoriteArtworkStore.getState().favoriteArtworks).toContainEqual(
      artwork
    );

    useFavoriteArtworkStore.getState().toggleFavorite(artwork);
    const state = useFavoriteArtworkStore.getState();

    expect(state.favoriteArtworks).not.toContainEqual(artwork);
    expect(log.info).toHaveBeenCalledWith("Removendo artwork dos favoritos!", {
      objectID: artwork.objectID,
      action: "remove",
    });
  });

  it("isFavorite should return true if artwork is favorited", () => {
    const artwork: Artwork = {
      objectID: 3,
      primaryImage: "img3.png",
      primaryImageSmall: "img3-small.png",
      department: "Drawings",
      title: "Artwork 3",
      artistDisplayName: "Artist 3",
      objectDate: "2019",
      medium: "Pencil",
    };

    expect(
      useFavoriteArtworkStore.getState().isFavorite(artwork.objectID)
    ).toBe(false);

    useFavoriteArtworkStore.getState().toggleFavorite(artwork);

    expect(
      useFavoriteArtworkStore.getState().isFavorite(artwork.objectID)
    ).toBe(true);

    useFavoriteArtworkStore.getState().toggleFavorite(artwork);

    expect(
      useFavoriteArtworkStore.getState().isFavorite(artwork.objectID)
    ).toBe(false);
  });
});