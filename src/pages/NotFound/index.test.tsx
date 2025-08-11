
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import NotFound from "./";

describe("pages > NotFound", () => {
  it("should render 404 message and update document title", () => {
    const { getByText } = render(<NotFound />);
    
    expect(getByText("404")).toBeDefined();
    expect(getByText("This page could not be found.")).toBeDefined();
    expect(document.title).toBe("404: This page could not be found.");
  });
});
