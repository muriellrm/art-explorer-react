import { fireEvent, render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { AutocompleteInput } from "./";

const dataOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
];

function Wrapper(props: { onClickButton?: () => void; errors?: any }) {
  const { control } = useForm({
    defaultValues: { fruit: "" },
  });

  return (
    <AutocompleteInput
      name="fruit"
      control={control}
      dataOptions={dataOptions}
      placeholder="Select a fruit"
      onClickButton={props.onClickButton}
      errors={props.errors}
    />
  );
}

describe("components > AutocompleteInput", () => {
  it("renders input and button", () => {
    render(<Wrapper />);
    expect(screen.getByPlaceholderText("Select a fruit")).toBeDefined();
    expect(screen.getByRole("button", { name: /pesquisar/i })).toBeDefined();
  });

  it("shows filtered options on typing and allows selecting", () => {
    render(<Wrapper />);
    const input = screen.getByPlaceholderText("Select a fruit");
    fireEvent.change(input, { target: { value: "ap" } });

    expect(screen.getByText("Apple")).toBeDefined();
    expect(screen.queryByText("Banana")).toBeNull();

    fireEvent.click(screen.getByText("Apple"));
    expect(input).toHaveValue("Apple");
  });

  it("calls onClickButton when button clicked", () => {
    const onClickButton = vi.fn();
    render(<Wrapper onClickButton={onClickButton} />);
    const button = screen.getByRole("button", { name: /pesquisar/i });
    fireEvent.click(button);
    expect(onClickButton).toHaveBeenCalled();
  });

  it("shows error message if errors provided", () => {
    const errors = { fruit: { message: "Required field" } };
    render(<Wrapper errors={errors} />);
    expect(screen.getByText("Required field")).toBeDefined();
  });
});
