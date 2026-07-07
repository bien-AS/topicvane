import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Home from "../app/page";

test("renders the component gallery link", () => {
  render(<Home />);
  expect(screen.getByText("View component gallery")).toBeDefined();
});

test("renders the heading text", () => {
  render(<Home />);
  const headings = screen.getAllByText(/To get started, edit the page/i);
  expect(headings.length).toBeGreaterThan(0);
});
