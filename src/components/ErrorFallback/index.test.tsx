import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import { ErrorFallback } from "./";
import { log } from "#/utils/logging";

vi.mock("#/utils/logging", () => ({
  log: {
    error: vi.fn(),
  },
}));

describe("components > ErrorFallback", () => {
  const error = new Error("Test error");
  const resetErrorBoundary = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls log.error and opens modal displaying error message", () => {
    render(
      <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
    );

    expect(log.error).toHaveBeenCalledWith("Algo deu errado!", {
      message: error.message,
      stack: error.stack,
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Ops! Algo deu errado")).toBeInTheDocument();
    expect(screen.getByText(error.message)).toBeInTheDocument();
  });

  it("calls resetErrorBoundary when button is clicked", () => {
    render(
      <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
    );

    const button = screen.getByRole("button", { name: /tentar novamente/i });
    fireEvent.click(button);

    expect(resetErrorBoundary).toHaveBeenCalledTimes(1);
  });
});
