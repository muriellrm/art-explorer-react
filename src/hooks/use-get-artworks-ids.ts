import { artWorkService } from "#/api/art-work";
import type { SearchParams } from "#/pages/Home/resolver";
import { useQuery } from "react-query";

interface IProps {
  params: SearchParams;
}
export const useGetArtworksIds = ({ params }: IProps) => {
  const { searchType, ...restParams } = params;

  const searchParams = {
    ...restParams,
    q: searchType === "hasImages" ? restParams?.q || "paintings" : restParams?.q,
  };

  return useQuery({
    queryKey: ["getArtworkIds", params],
    queryFn: () => artWorkService.find(searchParams),
    enabled: !!params,
  });
};
