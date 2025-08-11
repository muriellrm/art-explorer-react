import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useGetArtworksById } from "./use-get-artwork-by-id";
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

describe("hooks > use-get-artwork-by-id", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch artwork by id", async () => {
    const mockData = { id: 1, title: "Mona Lisa" };
    (artWorkService.findById as any).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useGetArtworksById(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(artWorkService.findById).toHaveBeenCalledWith(1);
    expect(result.current.data).toEqual(mockData);
  });

  it("should not call API if id is 0 or falsy", async () => {
    const { result } = renderHook(() => useGetArtworksById(0), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(artWorkService.findById).not.toHaveBeenCalled();
  });
});
