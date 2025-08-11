import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Loader } from "./";

describe("components > Loader", () => {
  it("does not render anything if show is false", () => {
    const { container } = render(<Loader show={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders spinner overlay if show is true", () => {
    render(<Loader show={true} />);
    const spinner = screen.getByTestId("loader-spinner");
    expect(spinner).toBeDefined();

    const overlay = spinner.parentElement;
    const styles = window.getComputedStyle(overlay!);

    expect(styles.position).toBe("fixed");
    expect(styles.width).toBe("100vw");
    expect(styles.height).toBe("100vh");
    expect(styles.backgroundColor).toBeTruthy();
    expect(styles.zIndex).toBeTruthy();
  });
});
