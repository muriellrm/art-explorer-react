import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useGetDepartments } from "./use-get-departments";
import { artWorkService } from "#/api/art-work";
import type { SelectOption } from "#/utils/interface";

vi.mock("#/api/art-work", () => ({
  artWorkService: {
    findDepartments: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("hooks > use-get-departments", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and map departments correctly", async () => {
    const mockResponse = {
      departments: [
        { departmentId: 1, displayName: "Paintings" },
        { departmentId: 2, displayName: "Sculpture" },
      ],
    };

    (artWorkService.findDepartments as any).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useGetDepartments(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const expected: SelectOption[] = [
      { label: "Paintings", value: 1 },
      { label: "Sculpture", value: 2 },
    ];

    expect(result.current.data).toEqual(expected);
  });
});
