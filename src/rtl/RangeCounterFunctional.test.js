import React from "react";
import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import { toBeVisible } from "@testing-library/jest-dom/matchers";

import RangeCounterFunctional from "./RangeCounterFunctional";

expect.extend({ toBeVisible });

describe("RangeCounterFunctional", () => {
  afterEach(cleanup);

  it("does not show range reached alert on initial load", () => {
    render(<RangeCounterFunctional />);
    expect(screen.queryByText("Range limit reached!")).toBeNull();
  });

  it("shows range reached alert when reached limit by clicking control buttons", () => {
    render(<RangeCounterFunctional min={0} max={1} />);
    const incrementButton = screen.getByText("+");
    fireEvent.click(incrementButton);
    expect(screen.getByText("Range limit reached!")).toBeVisible();
  });

  describe("when incrementing counter is allowed", () => {
    it("updates the counter value", async () => {
      render(<RangeCounterFunctional min={2} />);
      const incrementButton = screen.getByText("+");
      fireEvent.click(incrementButton);
      expect(screen.getByTestId("counter-value").innerHTML).toEqual("3");
    });
  });

  describe("when incrementing counter is not allowed", () => {
    it("does not update the counter value", async () => {
      render(<RangeCounterFunctional min={0} max={0} />);
      const incrementButton = screen.getByText("+");
      fireEvent.click(incrementButton);
      expect(screen.getByTestId("counter-value").innerHTML).toEqual("0");
    });
  });

  describe("when decrementing counter is allowed", () => {
    it("updates the counter value", async () => {
      render(<RangeCounterFunctional />);
      const incrementButton = screen.getByText("+");
      const decrementButton = screen.getByText("-");
      fireEvent.click(incrementButton);
      fireEvent.click(decrementButton);
      expect(screen.getByTestId("counter-value").innerHTML).toEqual("0");
    });
  });

  describe("when decrementing counter is not allowed", () => {
    it("does not update the counter value", async () => {
      render(<RangeCounterFunctional />);
      const incrementButton = screen.getByText("-");
      fireEvent.click(incrementButton);
      expect(screen.getByTestId("counter-value").innerHTML).toEqual("0");
    });
  });
});
