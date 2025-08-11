import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useGetArtworksDetails } from "./use-get-artworks-details";
import { artWorkService } from "#/api/art-work";

vi.mock("#/api/art-work", () => ({
  artWorkService: {
    findById: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("hooks > use-get-artworks-details", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch artworks for all provided ids", async () => {
    const mockResults = [
      { id: 1, title: "Mona Lisa" },
      { id: 2, title: "The Starry Night" },
    ];

    (artWorkService.findById as any)
      .mockResolvedValueOnce(mockResults[0])
      .mockResolvedValueOnce(mockResults[1]);

    const { result } = renderHook(
      () => useGetArtworksDetails({ ids: [1, 2] }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.every((r) => r.isSuccess)).toBe(true);
    });

    expect(artWorkService.findById).toHaveBeenCalledTimes(2);
    expect(artWorkService.findById).toHaveBeenCalledWith(1);
    expect(artWorkService.findById).toHaveBeenCalledWith(2);

    expect(result.current.map((r) => r.data)).toEqual(mockResults);
  });

  it("should not call API if ids array is empty", async () => {
    const { result } = renderHook(
      () => useGetArtworksDetails({ ids: [] }),
      { wrapper: createWrapper() }
    );

    expect(result.current).toEqual([]);
    expect(artWorkService.findById).not.toHaveBeenCalled();
  });
});
