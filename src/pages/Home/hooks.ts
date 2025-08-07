import { useGetArtworksDetails } from "#/hooks/use-get-artworks-details";
import { useGetArtworksIds } from "#/hooks/use-get-artworks-ids";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { DEFAULT_PAGE_SIZE } from "./constants";
import { searchParamsSchema, type SearchParams } from "./resolver";
import { usePageControlStore } from "#/store/use-page-control-store";
import { zodResolver } from "@hookform/resolvers/zod";
export const useHome = () => {
  const { ref: loadmoreRef, inView } = useInView();
  const { page, increasePage } = usePageControlStore();

  const [searchParams, setSearchParams] = useState<SearchParams>({
    searchType: "hasImages",
    hasImages: true,
  });

  const methods = useForm<SearchParams>({
    defaultValues: searchParams,
    resolver: zodResolver(searchParamsSchema),
    mode: "onSubmit",
  });

  const { data: idsData, isLoading: idsLoading } = useGetArtworksIds({
    params: searchParams,
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

  const onSubmit = useCallback((searchParams: SearchParams) => {
    setSearchParams(searchParams);
  }, []);

  useEffect(() => {
    if (inView && !idsLoading) {
      increasePage();
    }
  }, [inView, idsLoading, increasePage]);

  return {
    artworks,
    isLoading,
    loadmoreRef,
    methods,
    onSubmit,
  };
};
