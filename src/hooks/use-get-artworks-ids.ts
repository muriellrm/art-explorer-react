import { artWorkService } from "#/api/art-work";
import { useQuery } from "react-query";

interface IProps {
  params?: unknown;
}
export const useGetArtworksIds = ({ params }: IProps) => {
  return useQuery({
    queryKey: ["getArtworkIds", params],
    queryFn: () => artWorkService.find(params),
    enabled: !!params,
  });
};
