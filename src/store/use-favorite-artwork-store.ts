import type { Artwork } from "#/api/art-work/interface";
import { log } from "#/utils/logging";
import { cloneDeep, findIndex, remove, uniqBy } from "lodash";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteArtworkStore {
  favoriteArtworks: Artwork[];
  toggleFavorite: (art: Artwork) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoriteArtworkStore = create<FavoriteArtworkStore>()(
  persist(
    (set, get) => ({
      favoriteArtworks: [],
      toggleFavorite: (art) =>
        set((state) => {
          const exists =
            findIndex(state.favoriteArtworks, { objectID: art.objectID }) >= 0;
          const updated = cloneDeep(state.favoriteArtworks);

          if (exists) {
            log.info("Removendo artwork dos favoritos!", {
              objectID: art.objectID,
              action: "remove",
            });
            remove(updated, (a) => a.objectID === art.objectID);
          } else {
            log.info("Adicionando artwork nos favoritos!", {
              objectID: art.objectID,
              action: "add",
            });
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
