import type { ExploreCategory } from "../lib/exploreFilters";

export type HomeCategory = {
  id: ExploreCategory;
  title: string;
  description: string;
  mediaKey: string;
  alt: string;
};

export const homeCategories: HomeCategory[] = [
  { id: "bring-your-own-tent", title: "Bring your own tent", description: "Private-property pitches and stays that welcome your own tent.", mediaKey: "own-tent", alt: "Illustrative tent pitched on a private campsite" },
  { id: "pre-pitched-glamping", title: "Pre-pitched & glamping", description: "Stays with a tent or glamping-style setup already on site.", mediaKey: "pre-pitched", alt: "Illustrative pre-pitched camping tent" },
  { id: "farms-estates", title: "Farms & estates", description: "Farm and estate stays with outdoor space to explore.", mediaKey: "farm-estate", alt: "Illustrative campsite on a farm or estate" },
  { id: "mountains-forests", title: "Mountains & forests", description: "Mountain and forest-edge places in the reviewed directory.", mediaKey: "mountain-forest", alt: "Illustrative mountain and forest landscape" },
  { id: "waterside", title: "Waterside", description: "Places described as being beside a river, lake, or other water.", mediaKey: "waterside", alt: "Illustrative waterside camping landscape" },
  { id: "road-trip-stops", title: "Road-trip stops", description: "Vehicle-friendly stops for road-trip planning.", mediaKey: "road-trip", alt: "Illustrative road-trip camping stop" },
];
