import { artWorkService } from "#/api/art-work";
import { useQueries } from "react-query";

interface IProps {
  ids: number[];
}
export const useGetArtworksDetails = ({ ids }: IProps) => {
  return useQueries(
    ids.map((id) => ({
      queryKey: ["getetArtworksDetails", id],
      queryFn: () => artWorkService.findById(id),
      staleTime: Infinity,
    }))
  );
};
