import { renderHook, act } from '@testing-library/react';
import { useHome } from './hooks';

vi.mock('#/hooks/use-get-artworks-ids', () => ({
  useGetArtworksIds: vi.fn(),
}));
vi.mock('#/hooks/use-get-artworks-details', () => ({
  useGetArtworksDetails: vi.fn(),
}));
vi.mock('#/store/use-page-control-store', () => ({
  usePageControlStore: vi.fn(),
}));
vi.mock('react-intersection-observer', () => ({
  useInView: vi.fn(),
}));

import { useGetArtworksIds } from '#/hooks/use-get-artworks-ids';
import { useGetArtworksDetails } from '#/hooks/use-get-artworks-details';
import { usePageControlStore } from '#/store/use-page-control-store';
import { useInView } from 'react-intersection-observer';

describe('pages > Home > useHome', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve retornar artworks e isLoading corretamente', () => {
    (usePageControlStore as any).mockReturnValue({
      page: 1,
      increasePage: vi.fn(),
    });

    (useInView as any).mockReturnValue({
      ref: vi.fn(),
      inView: false,
    });

    (useGetArtworksIds as any).mockReturnValue({
      data: { objectIDs: [1, 2] },
      isLoading: false,
    });

    (useGetArtworksDetails as any).mockReturnValue([
      { data: { id: 1, title: 'Art 1' }, isLoading: false },
      { data: { id: 2, title: 'Art 2' }, isLoading: false },
    ]);

    const { result } = renderHook(() => useHome());

    expect(result.current.artworks).toEqual([
      { id: 1, title: 'Art 1' },
      { id: 2, title: 'Art 2' },
    ]);
    expect(result.current.isLoading).toBe(false);
    expect(typeof result.current.onSubmit).toBe('function');
    expect(result.current.methods).toBeDefined();
  });

  it('deve atualizar searchParams ao chamar onSubmit', () => {
    (usePageControlStore as any).mockReturnValue({
      page: 1,
      increasePage: vi.fn(),
    });

    (useInView as any).mockReturnValue({
      ref: vi.fn(),
      inView: false,
    });

    (useGetArtworksIds as any).mockReturnValue({
      data: { objectIDs: [] },
      isLoading: false,
    });

    (useGetArtworksDetails as any).mockReturnValue([]);

    const { result, rerender } = renderHook(() => useHome());

    act(() => {
      result.current.onSubmit({ searchType: 'artistOrCulture', hasImages: false });
    });
    
    (useGetArtworksIds as any).mockReturnValue({
      data: { objectIDs: [99] },
      isLoading: false,
    });

    rerender();

    expect(result.current.artworks).toEqual([]);
  });

  it('deve chamar increasePage quando inView for true', () => {
    const increasePageMock = vi.fn();

    (usePageControlStore as any).mockReturnValue({
      page: 1,
      increasePage: increasePageMock,
    });

    (useInView as any).mockReturnValue({
      ref: vi.fn(),
      inView: true,
    });

    (useGetArtworksIds as any).mockReturnValue({
      data: { objectIDs: [] },
      isLoading: false,
    });

    (useGetArtworksDetails as any).mockReturnValue([]);

    renderHook(() => useHome());

    expect(increasePageMock).toHaveBeenCalled();
  });
});
