import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { Container } from "./";

const mockNavigate = vi.fn();
const mockToggleColorMode = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("@chakra-ui/react", async () => {
  const actual = (await vi.importActual("@chakra-ui/react")) as any;
  return {
    ...actual,
    useColorMode: () => ({
      colorMode: "light",
      toggleColorMode: mockToggleColorMode,
    }),
  };
});

vi.mock("#/routes/constants", () => ({
  PAGE: {
    ROOT: () => "/",
    FAVORITES: () => "/favorites",
  },
}));

describe("components > Container", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all buttons", () => {
    render(<Container>children</Container>);
    expect(screen.getAllByRole("button")).toHaveLength(4);
  });

  it("navigates to root on logo and home button click", () => {
    render(<Container>children</Container>);
    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    expect(mockNavigate).toHaveBeenCalledTimes(2);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("navigates to favorites on heart button click", () => {
    render(<Container>children</Container>);
    const heartButton = screen.getAllByRole("button")[2];
    fireEvent.click(heartButton);
    expect(mockNavigate).toHaveBeenCalledWith("/favorites");
  });

  it("toggles color mode on toggle button click", () => {
    render(<Container>children</Container>);
    const toggleButton = screen.getAllByRole("button")[3];
    fireEvent.click(toggleButton);
    expect(mockToggleColorMode).toHaveBeenCalled();
  });

  it("shows Sun icon when in light mode", () => {
    render(<Container>children</Container>);
    expect(screen.getAllByRole("button")[3].querySelector("svg")).toBeDefined();
  });
});
