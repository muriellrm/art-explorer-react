import { artWorkService } from "#/api/art-work";
import type { SearchParams } from "#/pages/Home/resolver";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useGetArtworksIds } from "./use-get-artworks-ids";

vi.mock("#/api/art-work", () => ({
  artWorkService: {
    find: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("hooks > use-get-artworks-ids", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch artworks with given params", async () => {
    const mockData = { data: [1, 2, 3] };
    (artWorkService.find as any).mockResolvedValueOnce(mockData);

    const params: SearchParams = {
      searchType: "artistOrCulture",
      artistOrCulture: true,
      q: "sculptures",
    };
    const { result } = renderHook(() => useGetArtworksIds({ params }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(artWorkService.find).toHaveBeenCalledWith({
      q: "sculptures",
      artistOrCulture: true,
    });
    expect(result.current.data).toEqual(mockData);
  });

  it('should set default q="paintings" when searchType is "hasImages" and q is empty', async () => {
    const mockData = { data: [4, 5, 6] };
    (artWorkService.find as any).mockResolvedValueOnce(mockData);

    const params: SearchParams = {
      searchType: "hasImages",
      hasImages: true,
      q: "",
    };
    const { result } = renderHook(() => useGetArtworksIds({ params }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(artWorkService.find).toHaveBeenCalledWith({
      q: "paintings",
      hasImages: true,
    });
    expect(result.current.data).toEqual(mockData);
  });

  it("should fetch artworks when searchType is departmentId and departmentId is provided", async () => {
    const mockData = { data: [7, 8, 9] };
    (artWorkService.find as any).mockResolvedValueOnce(mockData);

    const params: SearchParams = {
      searchType: "departmentId",
      departmentId: 42,
    };
    const { result } = renderHook(() => useGetArtworksIds({ params }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(artWorkService.find).toHaveBeenCalledWith(
      expect.objectContaining({ departmentId: 42 })
    );
    expect(result.current.data).toEqual(mockData);
  });
});
