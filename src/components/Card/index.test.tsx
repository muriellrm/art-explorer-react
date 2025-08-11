import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { Card } from "./";
import type { Artwork } from "#/api/art-work/interface";

const artworkMock: Artwork = {
  objectID: 42,
  primaryImage: "image.jpg",
  primaryImageSmall: "image-small.jpg",
  department: "Paintings",
  title: "Starry Night",
  artistDisplayName: "Vincent van Gogh",
  objectDate: "1889",
  medium: "Oil on canvas",
};

const toggleFavorite = vi.fn();
const onOpen = vi.fn();
const isFavorite = vi.fn();

vi.mock("#/store/use-favorite-artwork-store", () => ({
  useFavoriteArtworkStore: () => ({
    toggleFavorite,
    isFavorite,
  }),
}));

vi.mock("#/store/use-artwork-modal-store", () => ({
  useArtworkModalStore: () => ({
    onOpen,
  }),
}));

describe("components > Card", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders author, title and image", () => {
    render(
      <Card
        imageSrc={artworkMock.primaryImage}
        author={artworkMock.artistDisplayName}
        title={artworkMock.title}
        artwork={artworkMock}
      />
    );

    expect(screen.getByText(artworkMock.artistDisplayName)).toBeDefined();
    expect(screen.getByText(artworkMock.title)).toBeDefined();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", artworkMock.primaryImage);
  });

  it("calls onOpen with artwork when clicking image", () => {
    render(
      <Card
        imageSrc={artworkMock.primaryImage}
        author={artworkMock.artistDisplayName}
        title={artworkMock.title}
        artwork={artworkMock}
      />
    );

    const img = screen.getByRole("img");
    fireEvent.click(img);

    expect(onOpen).toHaveBeenCalledWith(artworkMock);
  });

  it("calls toggleFavorite when clicking favorite button", () => {
    isFavorite.mockReturnValue(false);

    render(
      <Card
        imageSrc={artworkMock.primaryImage}
        author={artworkMock.artistDisplayName}
        title={artworkMock.title}
        artwork={artworkMock}
      />
    );

    const button = screen.getByRole("button", { name: /favorite art/i });
    fireEvent.click(button);

    expect(toggleFavorite).toHaveBeenCalledWith(artworkMock);
  });

  it("renders Heart icon if artwork is favorite, HeartPlus otherwise", () => {
    isFavorite.mockReturnValue(false);
    const { rerender } = render(
      <Card
        imageSrc={artworkMock.primaryImage}
        author={artworkMock.artistDisplayName}
        title={artworkMock.title}
        artwork={artworkMock}
      />
    );

    expect(screen.queryByTestId("heart-plus-icon")).toBeDefined();
    expect(screen.queryByTestId("heart-icon")).toBeNull();

    isFavorite.mockReturnValue(true);
    rerender(
      <Card
        imageSrc={artworkMock.primaryImage}
        author={artworkMock.artistDisplayName}
        title={artworkMock.title}
        artwork={artworkMock}
      />
    );

    expect(screen.queryByTestId("heart-icon")).toBeDefined();
    expect(screen.queryByTestId("heart-plus-icon")).toBeNull();
  });
});
