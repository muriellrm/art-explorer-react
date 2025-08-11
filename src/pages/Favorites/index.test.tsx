import { render, screen } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

import { Favorites } from "./";
import { useFavoriteArtworkStore } from "#/store/use-favorite-artwork-store";
import { useFakeLoading } from "#/hooks/use-fake-loading";

vi.mock("#/store/use-favorite-artwork-store");
vi.mock("#/hooks/use-fake-loading");

describe("pages > Favorites", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders title", () => {
    (useFavoriteArtworkStore as any).mockReturnValue({ favoriteArtworks: [] });
    (useFakeLoading as any).mockReturnValue({ loading: false });

    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    );

    expect(screen.getByText(/obras favoritas/i)).toBeInTheDocument();
  });

  it("shows message when no favorite artworks", () => {
    (useFavoriteArtworkStore as any).mockReturnValue({ favoriteArtworks: [] });
    (useFakeLoading as any).mockReturnValue({ loading: false });

    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/sem itens salvo nos favoritos/i)
    ).toBeInTheDocument();
  });

  it("renders cards for each favorite artwork", () => {
    const artworks = [
      {
        objectID: 1,
        primaryImage: "image1.jpg",
        primaryImageSmall: "image1-small.jpg",
        department: "Paintings",
        title: "Title 1",
        artistDisplayName: "Artist 1",
        objectDate: "1500",
        medium: "Oil on canvas",
      },
      {
        objectID: 2,
        primaryImage: "image2.jpg",
        primaryImageSmall: "image2-small.jpg",
        department: "Sculpture",
        title: "Title 2",
        artistDisplayName: "Artist 2",
        objectDate: "1600",
        medium: "Marble",
      },
    ];
    (useFavoriteArtworkStore as any).mockReturnValue({
      favoriteArtworks: artworks,
      isFavorite: (id: number) => artworks.some((a) => a.objectID === id),
      toggleFavorite: vi.fn(),
    });

    (useFakeLoading as any).mockReturnValue({ loading: false });

    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    );

    expect(
      screen.queryByText(/sem itens salvo nos favoritos/i)
    ).not.toBeInTheDocument();

    artworks.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
});
