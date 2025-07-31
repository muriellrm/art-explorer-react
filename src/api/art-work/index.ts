import { request } from "#/config/request";
import {
  type SearchArtworks,
  type Artwork,
  type Departments,
} from "./interface";

export const artWorkService = {  
  find: async (params?: any) =>
    (await request.get<SearchArtworks>("search", { params })).data,
  findById: async (id: number) => {
    const url = `objects/${id}`;
    return (await request.get<Artwork>(url)).data;
  },
  findDepartments: async () =>
    (await request.get<Departments>("departments")).data,
};
