import { render, screen } from "@testing-library/react";
import { cleanup } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, expect, it } from "vitest";
import { ListingCard } from "./Explore";
import ListingDetail from "./ListingDetail";
import { getListings } from "../data/listings";
import { mediaRegistry } from "../data/mediaRegistry";

afterEach(cleanup);

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

it("keeps gallery alt text and responsive sources aligned per image", () => {
  const listing = getListings().find((item) => item.id === "coorg-estate");
  if (!listing) throw new Error("expected multi-image listing fixture");

  render(
    <MemoryRouter initialEntries={["/listing/coorg-estate"]}>
      <Routes>
        <Route path="/listing/:id" element={<ListingDetail />} />
      </Routes>
    </MemoryRouter>,
  );

  const galleryImages = screen.getAllByRole("img").slice(1, 4);
  const expectedAssets = [mediaRegistry.forest, mediaRegistry.road, mediaRegistry.farm];
  expect(galleryImages).toHaveLength(expectedAssets.length);
  for (const [index, image] of galleryImages.entries()) {
    const asset = expectedAssets[index];
    const compactSrc = asset.src.replace("-1600.webp", "-900.webp");
    expect(image).toHaveAttribute("src", asset.src);
    expect(image).toHaveAttribute("srcset", `${compactSrc} 900w, ${asset.src} 1600w`);
    expect(image).toHaveAttribute("sizes", "(min-width: 1024px) 38vw, (min-width: 640px) 31vw, 100vw");
    expect(image).toHaveAttribute("alt", asset.alt);
    if (asset.usage === "editorial-region") {
      expect(image.parentElement).toHaveTextContent("Regional editorial image");
    }
  }
});
