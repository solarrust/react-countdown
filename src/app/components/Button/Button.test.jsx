import { render, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import Button from "./Button";

afterEach(() => {
  cleanup();
});

describe("Button component", () => {
  it("renders correctly with given action and calls onClick when button is clicked", () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <Button action="Click me" onClick={handleClick} />,
    );
    expect(getByText("Click me")).toBeInTheDocument();

    fireEvent.click(getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
