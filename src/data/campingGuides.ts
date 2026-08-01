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
  status: "public_preview" | "lead_magnet" | "team_review";
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
    slug: "camping-near-bangalore-complete-guide",
    title: "Camping Near Bangalore: Complete Starter Guide",
    subtitle: "A permission-first route guide for Ramanagara, Kanakapura, Sakleshpur, Coorg, and Chikkamagaluru weekends.",
    region: "Bangalore, Ramanagara, Kanakapura, Sakleshpur, Coorg, Chikkamagaluru",
    audience: ["camper", "family"],
    status: "lead_magnet",
    difficulty: "Beginner",
    estimatedReadMinutes: 12,
    primaryKeyword: "camping near Bangalore",
    captureReason: "Highest-intent weekend camping query for South India and CampIn's strongest starter geography.",
    preview:
      "Camping near Bangalore works best when you choose hosted private land, confirm washrooms and water, and avoid random lakebeds or forest-edge pins.",
    whatYouGet: ["Bangalore weekend route shortlist", "Permission-first site questions", "Packing list", "Red flags before you pay"],
    safetyNotes: [
      "Do not assume a scenic pin is legal or safe for overnight camping.",
      "Ask whether the place is private, hosted, and currently accepting own tents.",
      "Avoid isolated DIY pitches for first-time or family trips.",
    ],
    sections: [
      {
        title: "Direct answer",
        body:
          "The best camping near Bangalore for first-time campers is usually hosted private land around Ramanagara, Kanakapura, Sakleshpur, Coorg, or Chikkamagaluru, where permission, toilets, water, parking, and arrival support are clear before you travel.",
      },
      {
        title: "Best route choices",
        body:
          "Ramanagara and Kanakapura suit short one-night trips. Sakleshpur, Coorg, and Chikkamagaluru suit longer weekend trips with estate stays and cooler weather. Pick the route based on driving time, washroom quality, host support, and rain backup rather than only views.",
        checklist: ["Ramanagara for short drives", "Kanakapura for quick BYOT checks", "Sakleshpur for estate stays", "Coorg and Chikkamagaluru for two-night trips"],
      },
      {
        title: "What to confirm before booking",
        body:
          "Ask whether own tents are allowed, whether the pitch is on private land, whether washrooms stay usable at night, whether drinking water is provided, where your vehicle stays, and who is reachable after dark.",
      },
      {
        title: "CampIn request-first rule",
        body:
          "CampIn keeps early Bangalore listings request-first until host permission, current facilities, arrival rules, and seasonal access are reviewed.",
      },
    ],
    downloadFileName: "campin-camping-near-bangalore-guide.md",
  },
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
    slug: "is-camping-legal-in-india-guide",
    title: "Is Camping Legal In India?",
    subtitle: "A plain-English permission guide for private land, forests, beaches, lakes, farms, and treks.",
    region: "India",
    audience: ["camper", "trekker", "road-tripper"],
    status: "lead_magnet",
    difficulty: "Beginner",
    estimatedReadMinutes: 10,
    primaryKeyword: "is camping legal in India",
    captureReason: "High-trust search intent that CampIn can answer conservatively without legal overclaims.",
    preview:
      "Camping in India depends on land type, local rules, host permission, forest restrictions, weather, and whether the operator is actually authorized to host.",
    whatYouGet: ["Permission decision tree", "Land-type checklist", "Questions to ask operators", "No-go situations"],
    safetyNotes: [
      "This guide is practical planning information, not legal advice.",
      "Protected forests, wildlife areas, dams, beaches, and lakebeds can have restrictions.",
      "When in doubt, choose hosted private land or a licensed operator.",
    ],
    sections: [
      {
        title: "Direct answer",
        body:
          "Camping is not automatically legal everywhere in India. It is usually safer to camp on hosted private land or through permissioned operators, while forests, wildlife areas, public beaches, lakebeds, and trekking routes may require specific permission or may be restricted.",
      },
      {
        title: "Private land versus public land",
        body:
          "Private land still needs owner permission and clear guest rules. Public land can involve local authorities, forest departments, tourism bodies, police rules, or community norms. A booking page alone is not enough proof.",
      },
      {
        title: "Questions to ask",
        body:
          "Ask who owns or manages the land, whether overnight stays are allowed, whether fires are banned, how waste is handled, whether a host is present, and what happens if local officials or weather conditions require cancellation.",
        checklist: ["Land owner or authority", "Overnight permission", "Fire rule", "Waste plan", "Host presence", "Cancellation rule"],
      },
      {
        title: "CampIn position",
        body:
          "CampIn should not promote hidden wild pins. It should collect interest, publish permission-first guides, and move listings forward only when the host-controlled stay is reviewed.",
      },
    ],
    downloadFileName: "campin-camping-legal-india-guide.md",
  },
  {
    slug: "camping-gear-checklist-india",
    title: "Camping Gear Checklist India",
    subtitle: "A practical packing guide for BYOT weekends, monsoon trips, road stops, and first-time families.",
    region: "India",
    audience: ["camper", "family", "road-tripper"],
    status: "lead_magnet",
    difficulty: "Beginner",
    estimatedReadMinutes: 11,
    primaryKeyword: "camping gear checklist India",
    captureReason: "Evergreen buyer-intent keyword with strong checklist-download fit.",
    preview:
      "Most camping problems start before the trip: wrong tent, weak rain cover, missing light, no water plan, or no backup layer.",
    whatYouGet: ["Printable packing checklist", "Beginner kit list", "Monsoon add-ons", "Family and road-trip extras"],
    safetyNotes: [
      "Carry drinking water backup even when the host says water is available.",
      "Pack rain protection in the Western Ghats and hill routes even outside peak monsoon.",
      "Do not rely on phone torch as your only light source.",
    ],
    sections: [
      {
        title: "Direct answer",
        body:
          "For camping in India, carry a weather-suitable tent, groundsheet, sleeping bag or blanket, headlamp, water bottle, basic first aid, power bank, rain layer, warm layer, waste bags, toiletries, and route-specific extras for monsoon, desert, or high-altitude trips.",
      },
      {
        title: "Core beginner kit",
        body:
          "A first-time camper should prioritize sleep, dryness, light, hydration, and hygiene before buying expensive gadgets.",
        checklist: ["Tent", "Groundsheet", "Sleeping layer", "Headlamp", "Water bottle", "First-aid kit", "Power bank", "Waste bags"],
      },
      {
        title: "India-specific additions",
        body:
          "For Indian trips, add mosquito protection, reusable cutlery, ORS, sun protection, rain poncho, quick-dry towel, cash, ID, and a written host contact in case the phone battery dies.",
      },
      {
        title: "What not to overpack",
        body:
          "Avoid heavy cookware, big speakers, glass bottles, bulky decor, or anything that creates waste. The best camping kit is boring, dry, visible at night, and easy to carry back clean.",
      },
    ],
    downloadFileName: "campin-camping-gear-checklist-india.md",
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
    slug: "camping-near-pune-pawna-lonavala",
    title: "Camping Near Pune, Pawna, And Lonavala",
    subtitle: "A request-first guide for lake, hill, farm, and road-trip camping around the Mumbai-Pune corridor.",
    region: "Pune, Pawna, Lonavala, Panshet, Satara",
    audience: ["camper", "road-tripper", "family"],
    status: "lead_magnet",
    difficulty: "Beginner",
    estimatedReadMinutes: 10,
    primaryKeyword: "camping near Pune Pawna Lonavala",
    captureReason: "High-click weekend camping cluster with strong demand but quality and crowd concerns.",
    preview:
      "Pawna and Lonavala camping searches are crowded. CampIn's angle is permission, toilets, quiet hours, rain access, and request-first host clarity.",
    whatYouGet: ["Mumbai-Pune corridor questions", "Lake-camping caution list", "Road-stop checklist", "Family suitability screen"],
    safetyNotes: [
      "Do not camp beside water without host permission and a clear weather plan.",
      "Monsoon access can change quickly around ghats and lake areas.",
      "Check crowd, music, quiet-hour, and washroom conditions before paying.",
    ],
    sections: [
      {
        title: "Direct answer",
        body:
          "Camping near Pune, Pawna, and Lonavala should be chosen by host permission, washroom quality, crowd rules, monsoon access, and safe distance from water rather than only lake views.",
      },
      {
        title: "Where demand concentrates",
        body:
          "Pawna and Lonavala attract lake and hill campers, while Panshet and Satara can work for quieter road-trip stays. Demand is strong, but CampIn should review operators carefully because quality, crowding, and seasonal access vary.",
      },
      {
        title: "Before you choose a lake camp",
        body:
          "Ask how far the pitch is from the waterline, whether the route is drivable after rain, whether toilets are shared with large groups, what the music policy is, and whether the host can relocate or cancel in bad weather.",
        checklist: ["Water distance", "Rain road access", "Toilet quality", "Quiet hours", "Host relocation plan"],
      },
      {
        title: "CampIn request angle",
        body:
          "For this corridor, CampIn should collect trip dates and group type first, then match campers to quieter, permission-first options as hosts clear the review checklist.",
      },
    ],
    downloadFileName: "campin-pune-pawna-lonavala-camping-guide.md",
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
    slug: "responsible-camping-india-guide",
    title: "Responsible Camping In India",
    subtitle: "A low-impact outdoor code for campers, hosts, families, and road trippers.",
    region: "India",
    audience: ["camper", "family", "road-tripper", "host"],
    status: "lead_magnet",
    difficulty: "Beginner",
    estimatedReadMinutes: 9,
    primaryKeyword: "responsible camping India",
    captureReason: "Trust-building evergreen guide that supports every lead-capture route and host conversation.",
    preview:
      "Responsible camping in India means permission first, low noise, no hidden pins, no unmanaged fires, waste carried back, and respect for local communities.",
    whatYouGet: ["Leave-no-trace style checklist", "Host etiquette rules", "Waste plan", "Campfire and noise policy"],
    safetyNotes: [
      "Do not share fragile exact pins publicly without host or community consent.",
      "Avoid unmanaged fires, loud music, littering, and trespass.",
      "Respect local rules even if a place appears on maps or social media.",
    ],
    sections: [
      {
        title: "Direct answer",
        body:
          "Responsible camping in India starts with permissioned land, clean waste handling, low noise, fire discipline, respect for local communities, and choosing hosted sites over fragile random pins.",
      },
      {
        title: "The CampIn camper code",
        body:
          "Arrive before dark, follow host boundaries, keep music low, use toilets properly, avoid campfires unless allowed, carry waste out, and never pressure a host to ignore local rules.",
        checklist: ["Arrive before dark", "Stay inside boundaries", "No unmanaged fires", "Carry waste out", "Respect quiet hours"],
      },
      {
        title: "Why hidden pins are risky",
        body:
          "A pin can be scenic and still be unsafe, restricted, private, ecologically fragile, or locally unwelcome. CampIn should publish route context and reviewed host-led stays rather than pushing unmanaged traffic.",
      },
      {
        title: "Host-side responsibility",
        body:
          "Hosts should publish guest limits, washroom rules, water access, fire rules, parking boundaries, quiet hours, waste rules, and a local emergency contact before accepting campers.",
      },
    ],
    downloadFileName: "campin-responsible-camping-india-guide.md",
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
    captureReason: "Supply acquisition page for the CampIn team to qualify landowners and businesses.",
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
    status: "team_review",
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

This guide is for planning and review. Do not treat any place as verified or available unless CampIn shows evidence, a last-checked timestamp, and a matching verification stage.
`;
}
