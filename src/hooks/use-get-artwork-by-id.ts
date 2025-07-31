import { artWorkService } from "#/api/art-work";
import { useQuery } from "react-query";

export const useGetArtworksById = (id: number) => {
  return useQuery(
    ["getArtworksById", id],
    async () => {
      return await artWorkService.findById(id);
    },
    {
      enabled: !!id,
    }
  );
};
