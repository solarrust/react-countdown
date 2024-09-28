import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  cleanup,
} from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import Timer from "./Timer";

afterEach(() => {
  cleanup();
});

describe("Timer Component", () => {
  it("should render the Timer component", () => {
    render(<Timer />);
    expect(screen.getByTestId("form")).toBeInTheDocument();
  });

  it("should start the timer when the start button is clicked", () => {
    render(<Timer />);
    const startButton = screen.getByRole("button", { name: /start/i });
    fireEvent.click(startButton);
    expect(screen.getByTestId("form")).toHaveClass("_run");
  });

  it("should pause the timer when the pause button is clicked", () => {
    render(<Timer />);
    const startButton = screen.getByRole("button", { name: /start/i });
    const pauseButton = screen.getByRole("button", { name: /pause/i });

    fireEvent.click(startButton);
    fireEvent.click(pauseButton);

    expect(screen.getByTestId("form")).toHaveClass("_paused");
  });

  it("should stop the timer when the stop button is clicked", () => {
    render(<Timer />);
    const startButton = screen.getByRole("button", { name: /start/i });
    const stopButton = screen.getByRole("button", { name: /stop/i });

    fireEvent.click(startButton);
    fireEvent.click(stopButton);

    expect(screen.getByTestId("form")).not.toHaveClass("_run");
    expect(screen.getByTestId("form")).not.toHaveClass("_paused");
  });

  it("should not start the timer if it is already running", () => {
    render(<Timer />);
    const startButton = screen.getByRole("button", { name: /start/i });

    fireEvent.click(startButton);
    fireEvent.click(startButton);

    expect(screen.getByTestId("form")).toHaveClass("_run");
  });

  it("should update the time left correctly", () => {
    vi.useFakeTimers();
    render(<Timer />);
    const startButton = screen.getByRole("button", { name: /start/i });

    fireEvent.click(startButton);

    act(() => {
      vi.advanceTimersByTime(3000); // Advance 3 seconds
    });

    expect(screen.getByText("7 sec left")).toBeInTheDocument(); // Assuming initial seconds is 10
    vi.useRealTimers();
  });

  it("should stop the timer when time runs out", () => {
    vi.useFakeTimers();
    render(<Timer />);
    const startButton = screen.getByRole("button", { name: /start/i });

    fireEvent.click(startButton);

    act(() => {
      vi.advanceTimersByTime(10000); // Advance 10 seconds
    });

    expect(screen.getByTestId("form")).not.toHaveClass("_run");
    vi.useRealTimers();
  });

  it("should not allow input changes when timer is running", () => {
    render(<Timer />);
    const startButton = screen.getByRole("button", { name: /start/i });
    const hoursInput = screen.getByLabelText(/hours/i);

    fireEvent.click(startButton);
    expect(hoursInput).toBeDisabled();
  });

  it("should allow input changes when timer is stopped", () => {
    render(<Timer />);
    const hoursInput = screen.getByLabelText(/hours/i);

    expect(hoursInput).not.toBeDisabled();
  });
});
