import { useQuery } from "react-query";
import { artWorkService } from "#/api/art-work";
import type { SelectOption } from "#/utils/interface";

export const useGetDepartments = () => {
  return useQuery<SelectOption[]>({
    queryKey: ["getDepartments"],
    queryFn: async () => {
      const { departments } = await artWorkService.findDepartments();
      return departments.map((department) => ({
        label: department.displayName,
        value: department.departmentId,
      }));
    },
    staleTime: Infinity,
  });
};
