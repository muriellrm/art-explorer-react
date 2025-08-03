import { useGetArtworksDetails } from "#/hooks/use-get-artworks-details";
import { useGetArtworksIds } from "#/hooks/use-get-artworks-ids";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { DEFAULT_PAGE_SIZE } from "./constants";
import { useForm } from "react-hook-form";

interface Params {
  q: string;
  hasImages?: boolean;
  artistOrCulture?: boolean;
  departmentId?: number;
}

export const useHome = () => {
  const { ref: loadmoreRef, inView } = useInView();
  const [page, setPage] = useState<number>(0);

  const methods = useForm();

  const [params, setParams] = useState<Params>({
    hasImages: true,
    q: "paintings",
  });

  const { data: idsData, isLoading: idsLoading } = useGetArtworksIds({
    params,
  });

  const ids = useMemo(
    () => idsData?.objectIDs?.slice(0, page * DEFAULT_PAGE_SIZE) || [],
    [idsData?.objectIDs, page]
  );

  const artworkDetailsResult = useGetArtworksDetails({ ids });
  const artworks = artworkDetailsResult
    .map((result) => result.data)
    .filter(Boolean);
  const artworksLoading = artworkDetailsResult.some(
    (result) => result.isLoading
  );

  const isLoading = artworksLoading || idsLoading;

  useEffect(() => {
    if (inView && !idsLoading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, idsLoading]);

  return {
    artworks,
    isLoading,
    loadmoreRef,
  };
};
