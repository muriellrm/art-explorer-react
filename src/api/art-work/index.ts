import { request } from "#/config/request";
import type { SearchParams } from "#/pages/Home/resolver";
import {
  type Artwork,
  type Departments,
  type SearchArtworks,
} from "./interface";

export const artWorkService = {
  find: async (params?: Omit<SearchParams, "searchType">) =>
    (await request.get<SearchArtworks>("search", { params })).data,
  findById: async (id: number) => {
    const url = `objects/${id}`;
    return (await request.get<Artwork>(url)).data;
  },
  findDepartments: async () =>
    (await request.get<Departments>("departments")).data,
};
