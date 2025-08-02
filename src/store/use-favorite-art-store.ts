import type { Artwork } from "#/api/art-work/interface";
import { cloneDeep, findIndex, remove, uniqBy } from "lodash";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteArtStore {
  favoriteArtworks: Artwork[];
  toggleFavorite: (art: Artwork) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoriteArtStore = create<FavoriteArtStore>()(
  persist(
    (set, get) => ({
      favoriteArtworks: [],
      toggleFavorite: (art) =>
        set((state) => {
          const exists =
            findIndex(state.favoriteArtworks, { objectID: art.objectID }) >= 0;
          const updated = cloneDeep(state.favoriteArtworks);

          if (exists) {
            remove(updated, (a) => a.objectID === art.objectID);
          } else {
            updated.push(art);
          }

          return { favoriteArtworks: uniqBy(updated, "objectID") };
        }),
      isFavorite: (objectID) =>
        findIndex(get().favoriteArtworks, { objectID }) >= 0,
    }),
    {
      name: "favorite-artworks-storage",
    }
  )
);
