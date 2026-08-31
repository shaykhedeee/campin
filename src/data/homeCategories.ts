import type { ExploreCategory } from "../lib/exploreFilters";
import type { MediaKey } from "./mediaRegistry";

export type HomeCategory = {
  id: ExploreCategory;
  title: string;
  description: string;
  mediaKey: MediaKey;
  alt: string;
};

export const homeCategories: HomeCategory[] = [
  { id: "bring-your-own-tent", title: "Bring your own tent", description: "Private-property pitches and stays that welcome your own tent.", mediaKey: "tent", alt: "Small tent in the high-altitude landscape near Chandra Taal" },
  { id: "pre-pitched-glamping", title: "Pre-pitched & glamping", description: "Stays with a tent or glamping-style setup already on site.", mediaKey: "tent", alt: "Small tent in the high-altitude landscape near Chandra Taal" },
  { id: "farms-estates", title: "Farms & estates", description: "Farm and estate stays with outdoor space to explore.", mediaKey: "farm", alt: "Rows of tea plants covering a mountain valley in South India" },
  { id: "mountains-forests", title: "Mountains & forests", description: "Mountain and forest-edge places in the reviewed directory.", mediaKey: "hills", alt: "Nohkalikai Falls descending through the forested cliffs of Cherrapunji" },
  { id: "waterside", title: "Waterside", description: "Places described as being beside a river, lake, or other water.", mediaKey: "water", alt: "Traditional houseboat moving through the Kerala backwaters" },
  { id: "road-trip-stops", title: "Road-trip stops", description: "Vehicle-friendly stops for road-trip planning.", mediaKey: "road", alt: "Small tent in the high-altitude landscape near Chandra Taal" },
];
