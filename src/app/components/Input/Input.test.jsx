import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import Input from "./Input";

afterEach(() => {
  cleanup();
});

describe("Input Component", () => {
  it("renders correctly and calls onChange with correct value and type", () => {
    const handleChange = vi.fn();
    render(
      <Input
        type="seconds"
        value={10}
        onChange={handleChange}
        disabled={false}
      />,
    );

    const inputElement = screen.getByTestId("input");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(10);
    expect(inputElement).not.toBeDisabled();

    fireEvent.change(inputElement, { target: { value: "20" } });
    expect(handleChange).toHaveBeenCalledWith(20, "seconds");
  });

  it("disables the input and does not call onChange when input is disabled", () => {
    const handleChange = vi.fn();
    render(
      <Input
        type="seconds"
        value={10}
        onChange={handleChange}
        disabled={true}
      />,
    );

    const inputElement = screen.getByTestId("input");
    expect(inputElement).toBeDisabled();

    fireEvent.change(inputElement, { target: { value: "20" } });
    expect(handleChange).not.toHaveBeenCalled();
  });
});
