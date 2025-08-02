import { useGetArtworksDetails } from "#/hooks/use-get-artworks-details";
import { useGetArtworksIds } from "#/hooks/use-get-artworks-ids";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

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
  const artworksLoading = artworkDetailsResult.some(
    (result) => result.isLoading
  );

  const { ref: loadmoreRef, inView } = useInView({
    threshold: 0.1,
  });

  const isLoading = artworksLoading || idsLoading;


  return {
    artworks,
    isLoading,
    loadmoreRef,
  };
};
