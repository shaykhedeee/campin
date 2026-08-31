import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { expect, it } from "vitest";
import { ListingCard } from "./Explore";
import ListingDetail from "./ListingDetail";
import { getListings } from "../data/listings";

it("discloses regional editorial imagery on Explore cards", () => {
  const listing = getListings()[0];
  render(<MemoryRouter><ListingCard listing={listing} /></MemoryRouter>);

  expect(screen.getByText("Regional editorial image")).toBeInTheDocument();
  expect(screen.getByRole("img")).toHaveAttribute("srcset", expect.stringContaining("900w"));
  expect(screen.getByRole("img")).toHaveAttribute("alt", expect.stringContaining("houseboat"));
});

it("discloses regional editorial imagery on listing detail", () => {
  render(
    <MemoryRouter initialEntries={["/listing/coorg-estate"]}>
      <Routes>
        <Route path="/listing/:id" element={<ListingDetail />} />
      </Routes>
    </MemoryRouter>,
  );

  expect(screen.getAllByText("Regional editorial image").length).toBeGreaterThan(0);
  expect(screen.getAllByRole("img", { name: /tea plants|mountain valley|forest stream/i })[0]).toHaveAttribute(
    "srcset",
    expect.stringContaining("900w"),
  );
});
