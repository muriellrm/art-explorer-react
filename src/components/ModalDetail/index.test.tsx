import { render, screen } from "@testing-library/react";
import { describe, it, beforeEach } from "vitest";
import { useArtworkModalStore } from "#/store/use-artwork-modal-store";
import { ModalDetails } from "./";
import type { Artwork } from "#/api/art-work/interface";

const mockArtwork: Artwork = {
  objectID: 1,
  primaryImage: "https://image.url/image.jpg",
  primaryImageSmall: "https://image.url/image.jpg",
  title: "Artwork Title",
  artistDisplayName: "Artist Name",
  objectDate: "2023",
  medium: "Oil on canvas",
  department: "Paintings",
};

describe("components > ModalDetails", () => {
  beforeEach(() => {
    useArtworkModalStore.setState({
      isOpen: true,
      artwork: mockArtwork,
    });
  });

  it("renders artwork details when modal is open", () => {
    render(<ModalDetails />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    expect(screen.getByText(mockArtwork.title)).toBeInTheDocument();
    expect(screen.getByText("Artista")).toBeInTheDocument();
    expect(screen.getByText(mockArtwork.artistDisplayName)).toBeInTheDocument();
    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText(mockArtwork.objectDate)).toBeInTheDocument();
    expect(screen.getByText("Técnica")).toBeInTheDocument();
    expect(screen.getByText(mockArtwork.medium)).toBeInTheDocument();
    expect(screen.getByText("Departamento")).toBeInTheDocument();
    expect(screen.getByText(mockArtwork.department)).toBeInTheDocument();

    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img.src).toBe(mockArtwork.primaryImage);
    expect(img.alt).toBe(mockArtwork.title);

    expect(screen.getByText("Abrir em nova aba")).toHaveAttribute(
      "href",
      mockArtwork.primaryImage
    );
  });

  it("renders fallback texts when artwork data is missing", () => {
    useArtworkModalStore.setState({
      isOpen: true,
      artwork: {},
    } as any);

    render(<ModalDetails />);

    expect(screen.getByText("Sem título")).toBeInTheDocument();
    expect(screen.getAllByText("Não identificado").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Não informada").length).toBeGreaterThanOrEqual(
      1
    );

    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img.alt).toBe("Imagem");
  });
});
