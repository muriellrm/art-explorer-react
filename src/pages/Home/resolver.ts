import { z } from "zod";

export const searchParamsSchema = z
  .object({
    q: z.string().optional(),
    searchType: z.enum(["hasImages", "artistOrCulture", "departmentId"]),
    departmentId: z.number().optional(),
    hasImages: z.boolean().optional(),
    artistOrCulture: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.searchType === "artistOrCulture") {
        return !!data.q && data.q.trim() !== "";
      }
      return true;
    },
    {
      path: ["q"],
      message: "Por favor, preencha o campo de busca.",
    }
  )
  .refine(
    (data) => {
      if (data.searchType === "departmentId") {
        return typeof data.departmentId === "number";
      }
      return true;
    },
    {
      path: ["departmentId"],
      message: "Por favor, selecione um departamento.",
    }
  );

export type SearchParams = z.input<typeof searchParamsSchema>;
