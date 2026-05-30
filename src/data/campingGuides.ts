export type GuideAudience = "camper" | "host" | "road-tripper" | "family" | "trekker";

export interface CampingGuideSection {
  title: string;
  body: string;
  checklist?: string[];
}

export interface CampingGuide {
  slug: string;
  title: string;
  subtitle: string;
  region: string;
  audience: GuideAudience[];
  status: "public_preview" | "lead_magnet" | "founder_review";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedReadMinutes: number;
  primaryKeyword: string;
  captureReason: string;
  preview: string;
  whatYouGet: string[];
  safetyNotes: string[];
  sections: CampingGuideSection[];
  downloadFileName: string;
}

export const campingGuides: CampingGuide[] = [
  {
    slug: "safe-byot-camping-near-bangalore",
    title: "Safe BYOT Camping Near Bangalore",
    subtitle: "A permission-first checklist for own-tent campers leaving the city for a weekend.",
    region: "Bangalore, Ramanagara, Kanakapura, Chikkamagaluru",
    audience: ["camper", "family"],
    status: "lead_magnet",
    difficulty: "Beginner",
    estimatedReadMinutes: 9,
    primaryKeyword: "own tent camping near Bangalore",
    captureReason: "High-intent Bangalore campers who want BYOT but need safety and permission clarity.",
    preview:
      "Use this guide when you want to bring your own tent near Bangalore without guessing whether the place is legal, safe, or actually has washrooms and water.",
    whatYouGet: [
      "The BYOT host verification checklist",
      "Questions to ask before you travel",
      "Red flags for fake or unsafe camping spots",
      "A request message you can send to a host",
    ],
    safetyNotes: [
      "Do not camp on random lakebeds, forest edges, farms, or viewpoints without permission.",
      "Avoid monsoon pitches below slopes or near water flow.",
      "Choose hosted land when camping with first-timers, families, or women travelers.",
    ],
    sections: [
      {
        title: "The minimum safe BYOT standard",
        body:
          "A CampIn-ready BYOT site should confirm land permission, a flat pitch, washroom access, drinking water, vehicle parking, night support, quiet hours, and weather backup. If any answer is unclear, treat the place as a lead, not a verified campsite.",
        checklist: ["Host permission", "Washroom", "Drinking water", "Vehicle access", "Weather backup", "Local support"],
      },
      {
        title: "What to ask before leaving Bangalore",
        body:
          "Ask whether own tents are allowed, whether the pitch is inside a host-controlled boundary, how late washrooms stay open, whether cooking or campfires are allowed, and what happens if rain makes the pitch unsafe.",
        checklist: ["Can I bring my own tent?", "Can my car/bike stay nearby?", "Is the toilet usable at night?", "What is the rain backup?"],
      },
      {
        title: "Red flags",
        body:
          "Avoid pages that sell only scenery, refuse to answer permission questions, do not mention toilets, or push you to arrive without a named host. The cheaper option is not worth it if the stay depends on luck.",
      },
    ],
    downloadFileName: "campin-safe-byot-bangalore-guide.md",
  },
  {
    slug: "campervan-road-stops-india-standard",
    title: "Campervan Road Stops India Standard",
    subtitle: "What a real overnight vehicle stop must provide before CampIn promotes it.",
    region: "India caravan and overlanding corridors",
    audience: ["road-tripper", "camper"],
    status: "lead_magnet",
    difficulty: "Intermediate",
    estimatedReadMinutes: 11,
    primaryKeyword: "campervan road stops India",
    captureReason: "Road travelers need overnight parking clarity and hosts need a simple standard.",
    preview:
      "A road stop is not just a parking spot. This guide defines the CampIn standard for permissioned vehicle stays with washrooms, water, safety, and host support.",
    whatYouGet: [
      "Road-stop facility checklist",
      "Vehicle suitability questions",
      "Host onboarding scorecard",
      "Camper request template",
    ],
    safetyNotes: [
      "Do not treat highway shoulders, public beaches, or unguarded lots as road stops.",
      "Confirm turning space, road width, surface firmness, and night security before arrival.",
      "Never publish exact fragile pins without host consent.",
    ],
    sections: [
      {
        title: "Road stop minimums",
        body:
          "A viable road stop needs overnight permission, safe parking, washrooms, water, a local human contact, arrival rules, and clear vehicle limits. Electricity, food, and waste disposal improve the score but should still be verified.",
        checklist: ["Overnight permission", "Washroom", "Water refill", "Safe parking", "Host contact", "Vehicle limits"],
      },
      {
        title: "Vehicle fit",
        body:
          "Record whether the stop works for bikes, cars, SUVs, campervans, caravans, rooftop tents, or trailers. Vehicle fit is not aesthetic; it depends on approach road, turning radius, ground surface, height restrictions, and exit routes.",
      },
      {
        title: "Availability language",
        body:
          "Use request-to-book until host confirmation exists. Do not show available-now wording for a lead or a public-source-only listing.",
      },
    ],
    downloadFileName: "campin-campervan-road-stop-standard.md",
  },
  {
    slug: "monsoon-camping-western-ghats-safety",
    title: "Monsoon Camping In The Western Ghats",
    subtitle: "A no-hype safety guide for Coorg, Wayanad, Chikmagalur, and nearby hill routes.",
    region: "Coorg, Wayanad, Chikmagalur, Western Ghats",
    audience: ["camper", "family", "trekker"],
    status: "lead_magnet",
    difficulty: "Intermediate",
    estimatedReadMinutes: 10,
    primaryKeyword: "monsoon camping Western Ghats",
    captureReason: "Seasonal demand is high, but safety questions are under-answered.",
    preview:
      "Monsoon camping can be beautiful, but only when the host has safe pitches, drainage awareness, approach-road clarity, and an indoor backup.",
    whatYouGet: ["Rain-season campsite checklist", "No-go conditions", "Host questions", "Packing and cancellation rules"],
    safetyNotes: [
      "Avoid riverbanks, low-lying pitches, loose slopes, and remote forest-edge sites during heavy rain.",
      "Check official weather warnings before travel.",
      "Require a covered or indoor backup for first-time and family campers.",
    ],
    sections: [
      {
        title: "When not to camp",
        body:
          "Do not camp when heavy rain warnings, poor road access, rising streams, landslide-prone slopes, or host uncertainty are present. A cancelled trip is cheaper than a rescue situation.",
      },
      {
        title: "Host proof needed",
        body:
          "Ask for pitch drainage, distance from streams, toilet access in rain, vehicle parking surface, emergency route, and whether the host will move or cancel the stay if conditions change.",
        checklist: ["Drainage", "Backup shelter", "Approach road", "Emergency access", "Host cancellation policy"],
      },
      {
        title: "CampIn status rule",
        body:
          "A monsoon guide can be published before listings are verified, but it must not imply safe availability. Use guide status and request capture until specific hosts clear the checklist.",
      },
    ],
    downloadFileName: "campin-monsoon-western-ghats-guide.md",
  },
  {
    slug: "host-land-for-camping-starter-kit",
    title: "Host Land For Camping Starter Kit",
    subtitle: "For farms, estates, homestays, resorts, orchards, and cafes that want to test camping safely.",
    region: "India host acquisition",
    audience: ["host"],
    status: "lead_magnet",
    difficulty: "Beginner",
    estimatedReadMinutes: 12,
    primaryKeyword: "host land for camping India",
    captureReason: "Supply acquisition page for founders to qualify landowners and businesses.",
    preview:
      "This kit helps landowners decide whether their property can responsibly host campers without becoming a full campsite on day one.",
    whatYouGet: ["Host readiness checklist", "Rules template", "Facility scorecard", "Manual pilot plan"],
    safetyNotes: [
      "Hosts should start request-first, not instant booking.",
      "Local permission, neighbor comfort, waste rules, and guest boundaries must be clear.",
      "Do not accept guests if washroom and water access are weak.",
    ],
    sections: [
      {
        title: "Minimum host readiness",
        body:
          "A founding host needs permissioned land, a clear pitch or parking area, washrooms, water, parking, guest rules, waste plan, quiet hours, and a responsible local contact.",
        checklist: ["Permissioned area", "Washroom", "Water", "Parking", "Rules", "Local contact"],
      },
      {
        title: "Manual pilot offer",
        body:
          "Start with one or two request-first stays. The goal is to learn the operational gaps before opening broader availability.",
      },
      {
        title: "What CampIn verifies",
        body:
          "CampIn should verify property type, guest limits, contact policy, facilities, safety notes, house rules, pricing, and last-checked evidence before stronger listing labels are shown.",
      },
    ],
    downloadFileName: "campin-host-land-starter-kit.md",
  },
  {
    slug: "first-time-family-camping-india",
    title: "First-Time Family Camping In India",
    subtitle: "A practical guide for parents who want outdoor stays without unnecessary risk.",
    region: "India beginner camping",
    audience: ["family", "camper"],
    status: "lead_magnet",
    difficulty: "Beginner",
    estimatedReadMinutes: 8,
    primaryKeyword: "family camping India",
    captureReason: "Families have high trust requirements and convert when safety is clear.",
    preview:
      "Family camping should start with hosted sites, clean toilets, water, food backup, mobile signal, and clear cancellation rules.",
    whatYouGet: ["Family campsite checklist", "Packing basics", "Kid safety rules", "Host questions"],
    safetyNotes: [
      "Avoid remote DIY sites for the first family trip.",
      "Prioritize toilets, water, lighting, food access, and host presence over views.",
      "Check weather and cancellation terms before taking children.",
    ],
    sections: [
      {
        title: "Choose hosted first",
        body:
          "Families should begin with hosted camping or homestay-supported tenting. A private host with toilets and water is safer than an isolated scenic spot.",
      },
      {
        title: "Non-negotiables",
        body:
          "The site should have clean toilets, drinking water, lighting, safe parking, emergency access, a reachable host, and weather backup.",
        checklist: ["Clean toilet", "Drinking water", "Lighting", "Parking", "Host on site", "Backup shelter"],
      },
      {
        title: "CampIn family label",
        body:
          "CampIn should only mark a place family-suitable after reviewing washroom, safety, access, noise, crowd, and emergency-support evidence.",
      },
    ],
    downloadFileName: "campin-family-camping-india-guide.md",
  },
  {
    slug: "trekking-with-camping-permission-guide",
    title: "Trekking With Camping: Permission Guide",
    subtitle: "How to think about trek add-on camping without violating forest, local, or host rules.",
    region: "Western Ghats, Himalayas, Northeast route planning",
    audience: ["trekker", "camper"],
    status: "founder_review",
    difficulty: "Advanced",
    estimatedReadMinutes: 13,
    primaryKeyword: "trekking with camping permission India",
    captureReason: "Trekkers ask for underrated routes, but this category needs the strongest safety and permission caveats.",
    preview:
      "Trek add-on camping is not the same as campsite booking. It needs route permission, local rules, weather checks, waste handling, and guide accountability.",
    whatYouGet: ["Permission checklist", "Route-risk screen", "Guide questions", "No-go rules"],
    safetyNotes: [
      "Protected forests, wildlife areas, and many trekking routes require explicit permission.",
      "Do not publish hidden camp coordinates.",
      "Use trained local guides for remote or permit-sensitive routes.",
    ],
    sections: [
      {
        title: "Permission layers",
        body:
          "A trekking camp may involve landowner permission, forest department permission, local panchayat or village norms, operator rules, and weather-related restrictions. If the responsible authority is unclear, the route is not listing-ready.",
      },
      {
        title: "Underrated does not mean unregulated",
        body:
          "CampIn can build guides for underrated regions, but should avoid encouraging unmanaged footfall. Demand pages should collect interest and route questions first.",
      },
      {
        title: "Guide/operator questions",
        body:
          "Ask who owns the pitch, what permits are required, how waste is carried out, what evacuation route exists, whether campfires are banned, and whether local communities support the stay.",
        checklist: ["Authority", "Permit", "Waste plan", "Evacuation", "Fire rule", "Local support"],
      },
    ],
    downloadFileName: "campin-trekking-camping-permission-guide.md",
  },
];

export function getCampingGuide(slug: string | undefined) {
  return campingGuides.find((guide) => guide.slug === slug);
}

export function createGuideMarkdown(guide: CampingGuide, leadId: string) {
  const sections = guide.sections
    .map((section) => {
      const checklist = section.checklist?.length
        ? `\n\nChecklist:\n${section.checklist.map((item) => `- ${item}`).join("\n")}`
        : "";
      return `## ${section.title}\n\n${section.body}${checklist}`;
    })
    .join("\n\n");

  return `# ${guide.title}

${guide.subtitle}

Region: ${guide.region}
Primary keyword: ${guide.primaryKeyword}
CampIn access lead: ${leadId}

## Preview

${guide.preview}

## What You Get

${guide.whatYouGet.map((item) => `- ${item}`).join("\n")}

## Safety Notes

${guide.safetyNotes.map((item) => `- ${item}`).join("\n")}

${sections}

## CampIn Trust Rule

This guide is for planning and validation. Do not treat any place as verified or available unless CampIn shows evidence, a last-checked timestamp, and a matching verification stage.
`;
}
