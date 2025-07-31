import { useGetArtworksDetails } from "#/hooks/use-get-artworks-details";
import { useGetArtworksIds } from "#/hooks/use-get-artworks-ids";
import { useMemo, useState } from "react";

const PAGE_SIZE = 15;
export const useHome = () => {
  const [page, setPage] = useState<number>(1);
  const { data: idsData, isLoading: idsLoading } = useGetArtworksIds({
    params: { hasImage: true, q: "painting" },
  });

  const ids = useMemo(
    () => idsData?.objectIDs?.slice(0, page * PAGE_SIZE) || [],
    [idsData?.objectIDs, page]
  );

  const artworkDetailsResult = useGetArtworksDetails({ ids });
  const artworks = artworkDetailsResult
    .map((result) => result.data)
    .filter(Boolean);
  const isLoading = artworkDetailsResult.some((result) => result.isLoading);

  return {
    artworks,
    isLoading: isLoading || idsLoading,
    loadMoreArtworks: () => setPage((currentPage) => currentPage + 1),
  };
};
