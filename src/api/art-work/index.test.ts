import { describe, it, expect, vi, beforeEach } from "vitest";
import { artWorkService } from "./";
import { request } from "#/config/request";
import type { SearchArtworks, Artwork, Departments } from "./interface";

vi.mock("#/config/request", () => ({
  request: {
    get: vi.fn(),
  },
}));

describe("api > art-work", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch artworks with given params", async () => {
    const mockData: SearchArtworks = {
      total: 1,
      objectIDs: [123],
      artworks: [
        {
          objectID: 123,
          primaryImage: "image.jpg",
          primaryImageSmall: "image-small.jpg",
          department: "Paintings",
          title: "Mona Lisa",
          artistDisplayName: "Leonardo da Vinci",
          objectDate: "1503",
          medium: "Oil on poplar",
        },
      ],
    };

    (request.get as any).mockResolvedValue({ data: mockData });

    const params = { q: "mona lisa", hasImages: true };
    const result = await artWorkService.find(params);

    expect(request.get).toHaveBeenCalledWith("search", { params });
    expect(result).toEqual(mockData);
  });

  it("should fetch artwork by ID", async () => {
    const mockArtwork: Artwork = {
      objectID: 456,
      primaryImage: "image.jpg",
      primaryImageSmall: "image-small.jpg",
      department: "Sculptures",
      title: "The Thinker",
      artistDisplayName: "Auguste Rodin",
      objectDate: "1904",
      medium: "Bronze",
    };

    (request.get as any).mockResolvedValue({ data: mockArtwork });

    const result = await artWorkService.findById(456);

    expect(request.get).toHaveBeenCalledWith("objects/456");
    expect(result).toEqual(mockArtwork);
  });

  it("should fetch departments", async () => {
    const mockDepartments: Departments = {
      departments: [
        { departmentId: 1, displayName: "Paintings" },
        { departmentId: 2, displayName: "Sculptures" },
      ],
    };

    (request.get as any).mockResolvedValue({ data: mockDepartments });

    const result = await artWorkService.findDepartments();

    expect(request.get).toHaveBeenCalledWith("departments");
    expect(result).toEqual(mockDepartments);
  });
});
