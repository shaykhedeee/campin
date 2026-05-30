import type { ReactNode, SVGProps } from "react";

export const campInIconNames = [
  "tent",
  "own-tent",
  "farm-camp",
  "forest-edge",
  "lake-nearby",
  "road-stop",
  "parking",
  "bike",
  "campervan",
  "route",
  "washroom",
  "water",
  "power",
  "food",
  "fire-safe",
  "first-aid",
  "reviewed",
  "permission",
  "exact-pin",
  "host-present",
  "women-aware",
  "family-safe",
  "quiet-zone",
  "newsletter",
] as const;

export type CampInIconName = (typeof campInIconNames)[number];

interface CampInIconProps extends SVGProps<SVGSVGElement> {
  name: CampInIconName;
  title?: string;
}

const iconPaths: Record<CampInIconName, ReactNode> = {
  tent: (
    <>
      <path d="M3 19h18L12 5 3 19Z" />
      <path d="M12 5v14M9 19l3-6 3 6" />
    </>
  ),
  "own-tent": (
    <>
      <path d="M4 19h16L12 7 4 19Z" />
      <path d="M8 7h8M12 7v12M7 19l5-7 5 7" />
    </>
  ),
  "farm-camp": (
    <>
      <path d="M4 18h16M6 18V9l6-4 6 4v9M9 18v-5h6v5" />
      <path d="M5 14c2-2 4-2 6 0s4 2 8 0" />
    </>
  ),
  "forest-edge": (
    <path d="M7 19V9M4 12l3-7 3 7H4ZM16 19V7M12 11l4-7 4 7h-8ZM3 19h18" />
  ),
  "lake-nearby": <path d="M5 8c2-2 4-2 7 0s5 2 7 0M4 14c2-2 5-2 8 0s6 2 8 0M5 19c2-1.5 4-1.5 7 0s5 1.5 7 0" />,
  "road-stop": (
    <>
      <path d="M6 20 9 4h6l3 16M12 4v16M8 14h8" />
      <path d="M17 6h3v6h-3z" />
    </>
  ),
  parking: <path d="M8 20V4h5.5a4.5 4.5 0 0 1 0 9H8" />,
  bike: (
    <path d="M6 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.5 15h4L10 9h3l2 6M14 9h3" />
  ),
  campervan: (
    <>
      <path d="M3 17V8c0-1.1.9-2 2-2h9l4 4h1c1.1 0 2 .9 2 2v5" />
      <path d="M7 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 10h5M14 10h4" />
    </>
  ),
  route: <path d="M6 6h.01M18 18h.01M6 6c7 0 12 1 12 5s-12 1-12 7h12" />,
  washroom: <path d="M7 4h10v7a5 5 0 0 1-10 0V4ZM8 20h8M9 8h6" />,
  water: (
    <>
      <path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11Z" />
      <path d="M9 15a3 3 0 0 0 3 3" />
    </>
  ),
  power: <path d="m13 3-7 11h6l-1 7 7-11h-6l1-7Z" />,
  food: <path d="M6 4v16M4 4v5a2 2 0 0 0 4 0V4M15 4v16M15 4c3 1 5 4 5 8h-5" />,
  "fire-safe": (
    <>
      <path d="M12 21a6 6 0 0 0 6-6c0-3-2-5-4-7 .2 2-.7 3.3-2 4-1-2-1.2-5-1-8-3 2-5 6-5 10a6 6 0 0 0 6 7Z" />
      <path d="M5 5 19 19" />
    </>
  ),
  "first-aid": <path d="M8 6V4h8v2h3v14H5V6h3ZM12 10v6M9 13h6" />,
  reviewed: (
    <>
      <path d="M12 3 19 6v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z" />
      <path d="m8.5 12 2.2 2.2L15.8 9" />
    </>
  ),
  permission: (
    <>
      <path d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6v-9Z" />
      <path d="m9 16 2 2 4-5" />
    </>
  ),
  "exact-pin": (
    <>
      <path d="M12 21s6-5.2 6-11a6 6 0 0 0-12 0c0 5.8 6 11 6 11Z" />
      <path d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    </>
  ),
  "host-present": (
    <>
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0" />
      <path d="m17 8 2 2 3-4" />
    </>
  ),
  "women-aware": (
    <>
      <path d="M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 13v8M9 18h6" />
      <path d="M17.5 4.5 20 2M20 2h-3M20 2v3" />
    </>
  ),
  "family-safe": (
    <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20a5 5 0 0 1 10 0M11 20a5 5 0 0 1 10 0" />
  ),
  "quiet-zone": (
    <>
      <path d="M4 14h4l5 4V6L8 10H4v4Z" />
      <path d="M17 9l4 4M21 9l-4 4" />
    </>
  ),
  newsletter: (
    <>
      <path d="M4 6h16v12H4V6Z" />
      <path d="m4 7 8 7 8-7" />
    </>
  ),
};

export default function CampInIcon({ name, title, className, ...props }: CampInIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...props}
    >
      {title && <title>{title}</title>}
      {iconPaths[name]}
    </svg>
  );
}
