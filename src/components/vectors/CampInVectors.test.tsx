import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import {
  CompassMark,
  HeroRoute,
  LandFieldMark,
  MapPinMark,
  PermissionCheckpointMark,
  RouteMark,
  TentConstellation,
  TentMark,
  TopographicPattern,
} from "./CampInVectors";

afterEach(cleanup);

it("hides decorative scenery and gives informative scenery its rendered title", () => {
  const { rerender } = render(<HeroRoute decorative />);

  expect(screen.getByTestId("hero-route")).toHaveAttribute("aria-hidden", "true");

  rerender(
    <TentConstellation
      decorative={false}
      title="Tent below Indian mountain ridges"
    />,
  );

  expect(
    screen.getByRole("img", { name: "Tent below Indian mountain ridges" }),
  ).toBeInTheDocument();
});

it("supports a meaningful title for the topographic scenery", () => {
  render(
    <TopographicPattern
      decorative={false}
      title="Topographic contours of the campsite region"
    />,
  );

  expect(
    screen.getByRole("img", {
      name: "Topographic contours of the campsite region",
    }),
  ).toBeInTheDocument();
});

it("renders all six compact marks in decorative and meaningful title modes", () => {
  const { container, rerender } = render(
    <>
      <TentMark />
      <MapPinMark />
      <CompassMark />
      <RouteMark />
      <LandFieldMark />
      <PermissionCheckpointMark />
    </>,
  );

  const decorativeMarks = Array.from(container.querySelectorAll("svg"));
  expect(decorativeMarks).toHaveLength(6);
  decorativeMarks.forEach((mark) => {
    expect(mark).toHaveAttribute("aria-hidden", "true");
    expect(mark).toHaveAttribute("viewBox", "0 0 24 24");
  });

  const labels = [
    "Tent camping",
    "Place location",
    "Trip orientation",
    "Travel route",
    "Host land",
    "Permission checkpoint",
  ];

  rerender(
    <>
      <TentMark decorative={false} title={labels[0]} />
      <MapPinMark decorative={false} title={labels[1]} />
      <CompassMark decorative={false} title={labels[2]} />
      <RouteMark decorative={false} title={labels[3]} />
      <LandFieldMark decorative={false} title={labels[4]} />
      <PermissionCheckpointMark decorative={false} title={labels[5]} />
    </>,
  );

  labels.forEach((label) => {
    const mark = screen.getByRole("img", { name: label });
    expect(mark.querySelector('[stroke="currentColor"]')).not.toBeNull();
  });
});
