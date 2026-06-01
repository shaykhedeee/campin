export type ListingType =
  | "caravan-park"
  | "overland"
  | "byot"
  | "road-stop"
  | "farm"
  | "desert"
  | "beach"
  | "forest";

export type AvailabilityMode =
  | "unknown"
  | "call_to_confirm"
  | "request_to_book"
  | "campin_confirmed"
  | "calendar_synced";

export type PermissionStatus =
  | "host_approved"
  | "local_permission_required"
  | "public_permit_required"
  | "not_verified";

export type VerificationStage =
  | "community_suggested"
  | "lead"
  | "reviewed"
  | "date_confirmed"
  | "calendar_synced";

export type SourceType =
  | "official"
  | "host_direct"
  | "aggregator"
  | "community_forum"
  | "manual_research";

export type ContactPolicy = "gated_relay" | "direct_business_contact" | "campin_review_required";

export type ContactVerificationStatus =
  | "not_found"
  | "public_business_contact_found"
  | "site_confirms_number_on_page"
  | "human_confirmed"
  | "host_confirmed";

export interface ListingAvailability {
  mode: AvailabilityMode;
  lastCheckedAt?: string;
  lastSyncedAt?: string;
  hostResponseTargetHours?: number;
  freshnessHours?: number;
  minNights?: number;
  maxNights?: number;
}

export interface ListingInventoryUnit {
  id: string;
  label: string;
  unitType: "tent_pitch" | "car_camping_bay" | "campervan_bay" | "caravan_bay" | "room" | "pre_pitched_tent";
  quantity: number;
  maxGuestsPerUnit: number;
  pricePerNight: number;
}

export interface ListingClaimConfidence {
  byotAllowed: "unknown" | "low" | "medium" | "high";
  overnightParking: "unknown" | "low" | "medium" | "high";
  washroom: "unknown" | "low" | "medium" | "high";
  water: "unknown" | "low" | "medium" | "high";
  electricity: "unknown" | "low" | "medium" | "high";
  directBusinessContact: "unknown" | "low" | "medium" | "high";
  campervanSuitability: "unknown" | "low" | "medium" | "high";
}

export interface Listing {
  id: string;
  title: string;
  location: string;
  state: string;
  region: string;
  type: ListingType;
  typeLabel: string;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  hostName: string;
  googlePin: string;
  campervanFriendly: boolean;
  roadStop: boolean;
  byotFriendly: boolean;
  maxGuests: number;
  amenities: string[];
  essentials: string[];
  tags: string[];
  highlights: string[];
  verification: string[];
  bestFor: string;
  accessNote: string;
  signal: string;
  permissionStatus: PermissionStatus;
  availability: ListingAvailability;
  inventory: ListingInventoryUnit[];
  hostContactMode: "campin_relay" | "direct_whatsapp" | "direct_phone" | "external_booking";
  contactPolicy: ContactPolicy;
  contactVerificationStatus: ContactVerificationStatus;
  publicBusinessContact?: string;
  sourceType: SourceType;
  sourceUrls: string[];
  unknowns: string[];
  verificationStage: VerificationStage;
  confidence: ListingClaimConfidence;
  nextAction: string;
}

export interface Category {
  id: ListingType | "all";
  title: string;
  description: string;
  count: string;
}

export interface ResearchGuide {
  slug: string;
  title: string;
  region: string;
  status: "guide" | "community_suggested" | "research_lead";
  summary: string;
  targetQuery: string;
  listingIds: string[];
  safetyNotes: string[];
  nextAction: string;
}

const imageSet = {
  caravan: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80",
  hills: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80",
  water: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1600&q=80",
  forest: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80",
  desert: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=80",
  road: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80",
  beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80",
};

const defaultConfidence: ListingClaimConfidence = {
  byotAllowed: "unknown",
  overnightParking: "unknown",
  washroom: "unknown",
  water: "unknown",
  electricity: "unknown",
  directBusinessContact: "unknown",
  campervanSuitability: "unknown",
};

function makeListing(input: Omit<Listing, "image" | "gallery" | "rating" | "reviews" | "contactPolicy" | "hostContactMode"> & { imageKey: keyof typeof imageSet }): Listing {
  const image = imageSet[input.imageKey];
  return {
    ...input,
    image,
    gallery: [image, imageSet.road, imageSet.forest],
    rating: input.verificationStage === "reviewed" ? 4.8 : 0,
    reviews: 0,
    contactPolicy: "gated_relay",
    hostContactMode: "campin_relay",
  };
}

export const listings: Listing[] = [
  makeListing({
    id: "kava-eco-camp-caravan-park",
    title: "KAVA Eco Camp and Caravan Park",
    location: "Manthuruthy, Malampuzha",
    state: "Kerala",
    region: "Palakkad caravan corridor",
    type: "caravan-park",
    typeLabel: "Official caravan park",
    price: 0,
    description: "Official tourism-backed caravan park lead with bays, water, waste handling and EV charging signals.",
    longDescription:
      "Kerala Tourism describes KAVA as a benchmark caravan park with caravan and camper van facilities. CampIn treats it as a high-priority onboarding lead until current tariffs, plug type, waste policy and host contact are confirmed.",
    imageKey: "caravan",
    hostName: "Kerala Tourism / operator lead",
    googlePin: "https://maps.google.com/?q=KAVA+Eco+Camp+and+Caravan+Park+Malampuzha",
    campervanFriendly: true,
    roadStop: true,
    byotFriendly: false,
    maxGuests: 12,
    amenities: ["Drinking water", "EV charging", "Sewage handling", "Restaurant", "Driver dormitory"],
    essentials: ["Water", "Parking", "Electricity", "Washroom"],
    tags: ["Kerala", "Caravan", "Official tourism", "High-priority onboarding"],
    highlights: ["Official source found", "Camper van capacity mentioned", "Waste handling signal"],
    verification: ["Official tourism source reviewed", "Facilities listed publicly", "Current operations need founder call"],
    bestFor: "Caravans, camper vans and Kerala road-trip validation",
    accessNote: "Confirm bay dimensions, plug type, tariffs and waste policy before any camper handoff.",
    signal: "Unknown until host confirmation",
    permissionStatus: "not_verified",
    availability: { mode: "request_to_book", lastCheckedAt: "2026-05-25", hostResponseTargetHours: 24 },
    inventory: [{ id: "campervan-bay", label: "Camper van bay", unitType: "campervan_bay", quantity: 6, maxGuestsPerUnit: 4, pricePerNight: 0 }],
    contactVerificationStatus: "public_business_contact_found",
    sourceType: "official",
    sourceUrls: ["https://www.keralatourism.org/newsletter/news/2025/kava-eco-camp-and-caravan-park-a-new-benchmark/2292"],
    unknowns: ["Current tariff", "Plug type", "Waste policy", "Direct operator workflow"],
    verificationStage: "reviewed",
    confidence: { ...defaultConfidence, overnightParking: "high", washroom: "high", water: "high", electricity: "high", campervanSuitability: "high", directBusinessContact: "medium" },
    nextAction: "Call operator and verify current booking path.",
  }),
  makeListing({
    id: "caravan-meadows-vagamon",
    title: "Caravan Meadows Vagamon",
    location: "Nallathanni, Vagamon-Elappara Road",
    state: "Kerala",
    region: "Idukki caravan corridor",
    type: "caravan-park",
    typeLabel: "Official caravan park",
    price: 0,
    description: "Kerala caravan park lead with public signals for water filling, electric points and waste handling.",
    longDescription:
      "Caravan Meadows is listed by Kerala Tourism as a caravan park. CampIn can draft it as an availability-request listing only after confirming current operations and the right host or tourism office contact.",
    imageKey: "hills",
    hostName: "Kerala Tourism / operator lead",
    googlePin: "https://maps.google.com/?q=Caravan+Meadows+Vagamon",
    campervanFriendly: true,
    roadStop: true,
    byotFriendly: false,
    maxGuests: 10,
    amenities: ["Water filling", "Electric points", "Waste handling", "Cooking area", "Campfire area"],
    essentials: ["Water", "Parking", "Electricity", "Washroom"],
    tags: ["Kerala", "Vagamon", "Caravan", "Official tourism"],
    highlights: ["Official park signal", "Route-friendly location", "Infrastructure mentioned publicly"],
    verification: ["Official tourism source reviewed", "Caravan park status noted", "Current contact not yet human-confirmed"],
    bestFor: "Kerala caravan and campervan corridor validation",
    accessNote: "Confirm current operator, opening days and whether non-package campervans can book.",
    signal: "Unknown until host confirmation",
    permissionStatus: "not_verified",
    availability: { mode: "request_to_book", lastCheckedAt: "2026-05-25", hostResponseTargetHours: 24 },
    inventory: [{ id: "caravan-bay", label: "Caravan bay", unitType: "caravan_bay", quantity: 4, maxGuestsPerUnit: 4, pricePerNight: 0 }],
    contactVerificationStatus: "public_business_contact_found",
    sourceType: "official",
    sourceUrls: ["https://www.keralatourism.org/newsletter/news/2022/wagamon-caravan-park/2058"],
    unknowns: ["Current operations", "Booking contact", "Tariff", "Vehicle limits"],
    verificationStage: "reviewed",
    confidence: { ...defaultConfidence, overnightParking: "high", washroom: "high", water: "high", electricity: "high", campervanSuitability: "high", directBusinessContact: "medium" },
    nextAction: "Verify current operations and direct booking contact.",
  }),
  ...[
    ["caravaanlife-mountain-lake", "CaravaanLife - A Mountain Lake Escapade", "Murshet, Nashik region", "Maharashtra", "CaravaanLife network lists this as a caravansite/campsite with fenced, verified park signals.", "Verify exact host, GPS and non-network camper acceptance."],
    ["caravaanlife-wakan", "CaravaanLife - The Chronicles of Wakan", "Wakan, Konkan region", "Maharashtra", "CaravaanLife network lead for the Konkan corridor with water, electricity and waste-disposal signals.", "Verify current host and exact GPS."],
    ["caravaanlife-panshet", "CaravaanLife - An Exquisite Backwater Getaway", "Panshet Backwaters, Pune region", "Maharashtra", "Backwater caravansite lead for the Pune weekend corridor with network-level infrastructure claims.", "Confirm monsoon access and independent camper acceptance."],
    ["caravaanlife-satara", "CaravaanLife - Enjoy a Riverside Escapade", "Satara, Pune region", "Maharashtra", "Riverside caravansite lead with strong route fit but river and road-safety questions still open.", "Confirm road width, river safety and overnight rules."],
    ["caravaanlife-lonavala", "CaravaanLife - Of Valleys and Lakes", "Lonavala, Pune region", "Maharashtra", "Lonavala caravansite lead for Mumbai-Pune weekend demand.", "Confirm current operator and BYOT rules."],
  ].map(([id, title, location, state, description, nextAction]) =>
    makeListing({
      id,
      title,
      location,
      state,
      region: "Maharashtra caravan corridor",
      type: "caravan-park",
      typeLabel: "Caravansite lead",
      price: 0,
      description,
      longDescription: `${description} CampIn should keep this as a gated request lead until the specific property host, exact GPS and independent booking terms are confirmed.`,
      imageKey: "water",
      hostName: "CaravaanLife network lead",
      googlePin: `https://maps.google.com/?q=${encodeURIComponent(title)}`,
      campervanFriendly: true,
      roadStop: true,
      byotFriendly: true,
      maxGuests: 12,
      amenities: ["Water refill signal", "Electricity signal", "Waste disposal signal", "Fenced park signal"],
      essentials: ["Water", "Parking", "Electricity"],
      tags: ["Maharashtra", "Caravan", "Network lead", "Request only"],
      highlights: ["Network-level facility claims", "Strong corridor fit", "Needs direct host confirmation"],
      verification: ["Public network source reviewed", "Direct host not confirmed", "Availability not live"],
      bestFor: "Campervan, caravan and road-trip supply validation",
      accessNote: "Do not expose as available until the specific host and nightly rules are confirmed.",
      signal: "Unknown until host confirmation",
      permissionStatus: "not_verified",
      availability: { mode: "call_to_confirm", lastCheckedAt: "2026-05-25", hostResponseTargetHours: 24 },
      inventory: [{ id: "caravan-bay", label: "Caravan or campervan bay", unitType: "caravan_bay", quantity: 1, maxGuestsPerUnit: 4, pricePerNight: 0 }],
      contactVerificationStatus: "public_business_contact_found",
      sourceType: "aggregator",
      sourceUrls: ["https://caravaanlife.com/"],
      unknowns: ["Exact host", "Exact GPS", "Tariff", "Independent camper acceptance"],
      verificationStage: "lead",
      confidence: { ...defaultConfidence, overnightParking: "medium", washroom: "medium", water: "medium", electricity: "medium", campervanSuitability: "medium", directBusinessContact: "medium" },
      nextAction,
    }),
  ),
  makeListing({
    id: "mtdc-resort-parking-network",
    title: "MTDC Resort Parking Network",
    location: "Multiple resort premises",
    state: "Maharashtra",
    region: "Mumbai-Pune-Goa corridors",
    type: "road-stop",
    typeLabel: "Partnership network",
    price: 0,
    description: "Route-level partnership lead for caravan parking at MTDC resort premises.",
    longDescription:
      "Public reports indicate MTDC resort parking can support caravan guests with toilets, electricity and water fill-up. This is not a single listing; it should become a route partnership pipeline after MTDC confirms participating resorts and tariffs.",
    imageKey: "road",
    hostName: "MTDC partnership lead",
    googlePin: "https://maps.google.com/?q=MTDC+resorts+Maharashtra",
    campervanFriendly: true,
    roadStop: true,
    byotFriendly: false,
    maxGuests: 8,
    amenities: ["Resort toilet signal", "Water fill-up signal", "Electricity connection signal", "Parking network"],
    essentials: ["Water", "Parking", "Electricity", "Washroom"],
    tags: ["Maharashtra", "Partnership", "Road stop", "Network"],
    highlights: ["Policy-aligned", "Multi-site potential", "Needs resort list"],
    verification: ["Public report reviewed", "Participating resorts not confirmed", "Tariffs not confirmed"],
    bestFor: "Caravan parking partnerships and route infrastructure",
    accessNote: "Ask MTDC for exact participating resort list before showing individual stops.",
    signal: "Varies by resort",
    permissionStatus: "not_verified",
    availability: { mode: "unknown", lastCheckedAt: "2026-05-25" },
    inventory: [],
    contactVerificationStatus: "public_business_contact_found",
    sourceType: "manual_research",
    sourceUrls: ["https://www.overdrive.in/news-cars-auto/features/counter-to-covid-mtdc-flags-off-its-motorhome-and-campervan"],
    unknowns: ["Participating resorts", "Tariffs", "Booking workflow", "Vehicle bay limits"],
    verificationStage: "community_suggested",
    confidence: { ...defaultConfidence, overnightParking: "medium", washroom: "medium", water: "medium", electricity: "medium", campervanSuitability: "medium" },
    nextAction: "Ask MTDC for current participating resorts and tariffs.",
  }),
  ...[
    ["white-water-village", "White Water Village", "Shillong / Umtrew side", "Meghalaya", "Dedicated overlander campsite signal with toilet, bathroom, charging point and drinking water.", "reviewed"],
    ["sohra-view-lodge", "Sohra View Lodge", "Cherrapunji", "Meghalaya", "Overlanding booking UI includes caravan, rooftop tent, ground tent and room options.", "lead"],
    ["black-bridge-resort", "Black Bridge Resort", "Kyrdemkhla", "Meghalaya", "Overlanding lead with caravan and tent options plus bathroom, kitchen, charging and drinking water signals.", "lead"],
    ["high-winds-jowai", "High Winds", "Jowai", "Meghalaya", "Short-break overland stop lead with drinking water, toilet, bathroom and charging signals.", "lead"],
    ["lalimou-camp-nameri", "Lalimou Camp", "Nameri", "Assam", "Overland and camping site lead for Guwahati-Arunachal movement.", "lead"],
    ["sapoi-tea-estate", "Sapoi Tea Estate", "Dhekiajuli", "Assam", "Tea estate camping and agritourism lead with overland network amenities.", "lead"],
    ["three-guys-adventure", "3 Guys Adventure", "Bhalukpong", "Arunachal Pradesh", "Adventure campsite and overland stop lead with permit questions.", "lead"],
    ["letro-homestay-sangti", "Letro Homestay", "Sangti", "Arunachal Pradesh", "Homestay and overland stop lead with road-access and local permit questions.", "lead"],
    ["wild-himalaya-glamping-narkanda", "Wild Himalaya Glamping Camp", "Narkanda", "Himachal Pradesh", "Glamping and overland lead from search/public network evidence that needs direct page verification.", "community_suggested"],
  ].map(([id, title, location, state, description, stage]) =>
    makeListing({
      id,
      title,
      location,
      state,
      region: state === "Meghalaya" ? "Northeast overlanding" : state === "Assam" ? "Assam-Arunachal corridor" : "North India overlanding",
      type: "overland",
      typeLabel: "Overlanding lead",
      price: 0,
      description,
      longDescription: `${description} CampIn should use this as a draft-autonomous lead and require direct host confirmation before showing date availability or direct contact.`,
      imageKey: state === "Himachal Pradesh" ? "hills" : "forest",
      hostName: "Overlanding host lead",
      googlePin: `https://maps.google.com/?q=${encodeURIComponent(`${title} ${location}`)}`,
      campervanFriendly: true,
      roadStop: true,
      byotFriendly: true,
      maxGuests: 8,
      amenities: ["Toilet signal", "Bathroom signal", "Drinking water signal", "Charging point signal"],
      essentials: ["Washroom", "Water", "Parking", "Electricity"],
      tags: ["Overlanding", state, "Gated request", "Host confirmation needed"],
      highlights: ["Camper/overland fit", "Amenities visible in public source", "Needs direct acceptance check"],
      verification: ["Public source reviewed", "Direct booking not confirmed", "Availability not live"],
      bestFor: "Overlanders, rooftop tents, road travelers and BYOT validation",
      accessNote: "Confirm direct host acceptance, vehicle size limits and local permits before sending campers.",
      signal: "Unknown until host confirmation",
      permissionStatus: "not_verified",
      availability: { mode: "call_to_confirm", lastCheckedAt: "2026-05-25", hostResponseTargetHours: 24 },
      inventory: [{ id: "overland-bay", label: "Overlanding bay", unitType: "car_camping_bay", quantity: 1, maxGuestsPerUnit: 4, pricePerNight: 0 }],
      contactVerificationStatus: "public_business_contact_found",
      sourceType: "aggregator",
      sourceUrls: [`https://www.camping-co.com/destination/${title.replace(/ /g, "-")}/`],
      unknowns: ["Direct host acceptance", "Tariff", "Vehicle size limits", "Local permit rules"],
      verificationStage: stage as VerificationStage,
      confidence: { ...defaultConfidence, byotAllowed: "medium", overnightParking: "medium", washroom: "high", water: "high", electricity: "high", campervanSuitability: "medium", directBusinessContact: "medium" },
      nextAction: "Verify direct host acceptance and current operations.",
    }),
  ),
  ...[
    ["chukkimane-byot", "ChukkiMane Eco Resort BYOT", "Near Bangalore", "Karnataka", "BYOT resort campsite with clean restrooms, showers, potable water and security signals.", "https://www.chukkimane.com/byot-camping/", "lead"],
    ["chayagruha-homestay", "Chayagruha Homestay Tenting Space", "Chikkamagaluru", "Karnataka", "Homestay tenting space with bring-your-own-tent, clean washrooms, safe drinking water and charging signals.", "https://chayagruhahomestay.in/", "reviewed"],
    ["campers-creek-kabbal", "Campers Creek - Kabbal Forest", "Kanchanahalli / Kabbal Forest", "Karnataka", "Paid campsite and car-camping lead with BYOT, parking, toilets, electricity and drinking water signals.", "https://campershub.in/camps/campers-creek-kabbal-forest/", "lead"],
    ["sea-shore-beach-stay", "Sea Shore Beach Stay", "Hosabettu Beach, Mangaluru", "Karnataka", "Coastal Karnataka BYOT and car-camping lead with parking, toilets, electricity and drinking water signals.", "https://campershub.in/camps/sea-shore-beach-stay-hosabettu-beach-mangalore/", "lead"],
    ["backyard-camp-bangalore", "Backyard Camp", "66 km from Bangalore", "Karnataka", "DIY camping lead where guests can bring a tent and cook, but water and vehicle details need confirmation.", "https://thebackyardcamp.in/", "community_suggested"],
    ["wilderness-jungle-camp", "Wilderness Jungle Camp", "Malavalli / Mandya", "Karnataka", "BYOT tariff lead with parking, toilet, drinking water and electricity still needing confirmation.", "https://www.wildernessjunglecamp.com/tariff.php", "community_suggested"],
    ["dreamtime-bungalows-jaisalmer", "Dreamtime Bungalows BYOT Area", "Near Kuldhara, Jaisalmer", "Rajasthan", "Desert eco-stay with defined BYOT camping area and common washroom access signal.", "https://dreamtimebungalows.com/", "lead"],
  ].map(([id, title, location, state, description, sourceUrl, stage]) =>
    makeListing({
      id,
      title,
      location,
      state,
      region: state === "Karnataka" ? "South India BYOT wedge" : "Jaisalmer desert corridor",
      type: state === "Rajasthan" ? "desert" : title.includes("Beach") ? "beach" : "byot",
      typeLabel: state === "Rajasthan" ? "Desert BYOT lead" : "BYOT lead",
      price: 0,
      description,
      longDescription: `${description} CampIn should draft the page around request-first availability and verify host consent, current facilities and arrival rules before any direct contact handoff.`,
      imageKey: state === "Rajasthan" ? "desert" : title.includes("Beach") ? "beach" : "hills",
      hostName: "Public business lead",
      googlePin: `https://maps.google.com/?q=${encodeURIComponent(`${title} ${location}`)}`,
      campervanFriendly: !title.includes("ChukkiMane") && !title.includes("Wilderness"),
      roadStop: title.includes("Campers Creek") || title.includes("Sea Shore"),
      byotFriendly: true,
      maxGuests: 8,
      amenities: ["BYOT signal", "Washroom signal", "Water signal", "Parking signal"],
      essentials: ["Washroom", "Water", "Parking"],
      tags: ["BYOT", state, "Gated request", "Founder call needed"],
      highlights: ["Own tent signal", "Public business page found", "Facilities need freshness check"],
      verification: ["Public page reviewed", "Availability not live", "Host consent not yet recorded"],
      bestFor: "Own-tent campers, car campers and early host validation",
      accessNote: "Confirm current rules, parking location, night safety and whether CampIn can publish the contact.",
      signal: "Unknown until host confirmation",
      permissionStatus: "not_verified",
      availability: { mode: "call_to_confirm", lastCheckedAt: "2026-05-25", hostResponseTargetHours: 24 },
      inventory: [{ id: "tent-pitch", label: "BYOT pitch", unitType: "tent_pitch", quantity: 1, maxGuestsPerUnit: 4, pricePerNight: 0 }],
      contactVerificationStatus: "public_business_contact_found",
      sourceType: "host_direct",
      sourceUrls: [sourceUrl],
      unknowns: ["Host consent", "Current tariff", "Night safety", "Campervan limits"],
      verificationStage: stage as VerificationStage,
      confidence: { ...defaultConfidence, byotAllowed: "high", overnightParking: "medium", washroom: title.includes("Backyard") || title.includes("Wilderness") ? "medium" : "high", water: title.includes("Backyard") || title.includes("Wilderness") ? "medium" : "high", electricity: title.includes("ChukkiMane") || title.includes("Wilderness") || title.includes("Dreamtime") ? "unknown" : "high", campervanSuitability: "medium", directBusinessContact: "medium" },
      nextAction: "Run founder-call verification checklist before publishing as reviewed.",
    }),
  ),
  makeListing({
    id: "meghalaya-terrace",
    title: "The Cloud-Catcher Terrace",
    location: "Cherrapunji",
    state: "Meghalaya",
    region: "Northeast overlanding",
    type: "byot",
    typeLabel: "Verified Terrace Site",
    price: 1200,
    description: "A private terrace suspended over the wettest valley on Earth. Wake up above the clouds.",
    longDescription: "This isn't just land; it's a sanctuary in the sky. Located on a private Khasi family estate, this terrace offers a 270-degree view of the Cherrapunji valley. We spent three years carving this site manually to ensure zero impact on the root systems below. You'll wake up surrounded by mist, with the smell of wild orchids and the distant roar of a dozen waterfalls. The trail to the living root bridges starts right at your tent peg.",
    imageKey: "hills",
    hostName: "Basil Khasi",
    googlePin: "https://maps.google.com/?q=Cherrapunji",
    campervanFriendly: false,
    roadStop: false,
    byotFriendly: true,
    maxGuests: 4,
    amenities: ["Stone Fire Place", "Western Washroom", "Drinking Water", "Local Khasi Meals", "Guide Support"],
    essentials: ["Water", "Washroom", "Parking"],
    tags: ["High Altitude", "Northeast", "Monsoon Magic", "Verified"],
    highlights: ["270° Valley View", "Hand-Carved Stone Pit", "Zero-Noise Zone", "Verified Safe for Solo Women"],
    verification: ["On-site audit completed", "GPS coordinates verified", "Host agreement signed"],
    bestFor: "High altitude adventure, landscape lovers, and solo travel",
    accessNote: "Accessible via a scenic 5-minute staircase trek from the secure village parking lot.",
    signal: "Strong 4G Jio & Airtel coverage",
    permissionStatus: "host_approved",
    availability: { mode: "request_to_book", lastCheckedAt: "2026-05-30", hostResponseTargetHours: 4 },
    inventory: [{ id: "tent-pitch", label: "Premium terrace pitch", unitType: "tent_pitch", quantity: 2, maxGuestsPerUnit: 2, pricePerNight: 1200 }],
    contactVerificationStatus: "host_confirmed",
    sourceType: "host_direct",
    sourceUrls: ["https://maps.google.com/?q=Cherrapunji"],
    unknowns: [],
    verificationStage: "reviewed",
    confidence: { ...defaultConfidence, byotAllowed: "high", overnightParking: "low", washroom: "high", water: "high", electricity: "medium", campervanSuitability: "low", directBusinessContact: "high" },
    nextAction: "Keep listing active and coordinate check-in workflows.",
  }),
  makeListing({
    id: "coorg-estate",
    title: "Old Heritage Coffee Glade",
    location: "Madikeri",
    state: "Karnataka",
    region: "South India BYOT wedge",
    type: "farm",
    typeLabel: "Verified Estate Site",
    price: 1500,
    description: "Pitch your tent under hundred-year-old shade trees in a working coffee estate.",
    longDescription: "Escape the concrete of Bangalore. Our estate has been family-owned since 1924. We have designated a specific 'Disconnection Zone' deep within the coffee plants where mobile signals fade and the only sound is the breeze through the cardamom vines. This specific site is flat, elevated, and provides a clear view of the Western Ghats ridge. We provide fresh estate-grown coffee and traditional Kodava meals cooked over wood-fire.",
    imageKey: "forest",
    hostName: "Pravin Kuttappa",
    googlePin: "https://maps.google.com/?q=Madikeri",
    campervanFriendly: true,
    roadStop: true,
    byotFriendly: true,
    maxGuests: 6,
    amenities: ["Traditional Fire Place", "Private Washroom", "Electricity Point", "Secure Parking", "Home-Cooked Food"],
    essentials: ["Water", "Washroom", "Parking", "Electricity"],
    tags: ["Heritage Farm", "Western Ghats", "Coffee Culture", "Verified"],
    highlights: ["90-Year Old Shade Trees", "Kodava Spice Experience", "Verified Drinking Water", "Fenced Security"],
    verification: ["Property audit completed", "Water purity human checked", "Fencing boundaries confirmed"],
    bestFor: "Estates overlanding, weekend Bangalore disconnect, and coffee lovers",
    accessNote: "Excellent tar road leading directly to the property gate; supports campervans up to 6.5 meters.",
    signal: "Weak cellular signal (Perfect for detox)",
    permissionStatus: "host_approved",
    availability: { mode: "request_to_book", lastCheckedAt: "2026-05-30", hostResponseTargetHours: 6 },
    inventory: [{ id: "campervan-bay", label: "Estate campervan bay", unitType: "campervan_bay", quantity: 3, maxGuestsPerUnit: 4, pricePerNight: 1500 }],
    contactVerificationStatus: "host_confirmed",
    sourceType: "host_direct",
    sourceUrls: ["https://maps.google.com/?q=Madikeri"],
    unknowns: [],
    verificationStage: "reviewed",
    confidence: { ...defaultConfidence, byotAllowed: "high", overnightParking: "high", washroom: "high", water: "high", electricity: "high", campervanSuitability: "high", directBusinessContact: "high" },
    nextAction: "Monitor estate road approach status during heavy rainfall.",
  }),
  makeListing({
    id: "jibhi-river",
    title: "The Banjar Valley Sanctuary",
    location: "Jibhi",
    state: "Himachal Pradesh",
    region: "North India overlanding",
    type: "forest",
    typeLabel: "Verified Riverside Forest",
    price: 1100,
    description: "Beside the Tirthan river, under a canopy of ancient cedars. The home of silence.",
    longDescription: "If your soul is tired of city noise, this is the remedy. This forest site is located on a private riverfront property in Jibhi. We only accept one booking at a time to ensure total privacy. The site is a 10-minute hike from the nearest road stop, meaning no engine sounds, just the Tirthan river. The cedars here are over 200 years old, creating a natural cathedral of silence. We provide local Himachali Siddu and Tudkiya for dinner.",
    imageKey: "water",
    hostName: "Dinesh Thakur",
    googlePin: "https://maps.google.com/?q=Jibhi",
    campervanFriendly: false,
    roadStop: false,
    byotFriendly: true,
    maxGuests: 4,
    amenities: ["Riverside Fire Pit", "Eco-Washroom", "Trekking Trails", "Natural Stream Water", "Himachali Cuisine"],
    essentials: ["Water", "Washroom"],
    tags: ["Riverside", "Digital Detox", "Ancient Forest", "Verified"],
    highlights: ["Private River Access", "No Mobile Signal Zone", "Fresh Trout Catching", "Stargazing Deck"],
    verification: ["Site verification complete", "Riverfront safety boundaries marked", "Local permit checklist confirmed"],
    bestFor: "Total isolation, river quietness, and deep digital detox",
    accessNote: "Requires a 10-minute flat footpath walk from the village road stop. Luggage support available.",
    signal: "Zero cellular coverage (Pure quiet zone)",
    permissionStatus: "host_approved",
    availability: { mode: "request_to_book", lastCheckedAt: "2026-05-30", hostResponseTargetHours: 8 },
    inventory: [{ id: "tent-pitch", label: "Riverfront forest pitch", unitType: "tent_pitch", quantity: 1, maxGuestsPerUnit: 4, pricePerNight: 1100 }],
    contactVerificationStatus: "host_confirmed",
    sourceType: "host_direct",
    sourceUrls: ["https://maps.google.com/?q=Jibhi"],
    unknowns: [],
    verificationStage: "reviewed",
    confidence: { ...defaultConfidence, byotAllowed: "high", overnightParking: "low", washroom: "high", water: "high", electricity: "low", campervanSuitability: "low", directBusinessContact: "high" },
    nextAction: "Ensure fire pit clearance bounds are regularly managed.",
  }),
  makeListing({
    id: "jaisalmer-stars",
    title: "The Golden Dune Hideout",
    location: "Sam Sand Dunes",
    state: "Rajasthan",
    region: "Jaisalmer desert corridor",
    type: "desert",
    typeLabel: "Verified Desert Site",
    price: 1400,
    description: "Deep desert camping away from the tourist crowds. Just you and the Milky Way.",
    longDescription: "While Jaisalmer is full of 'desert resorts', we offer the real Thar experience. This site is located 12km away from the commercial Sam dune area on a private desert estate. It is accessible only by 4x4 or camel. The dunes here are pristine and shifting. Zero light pollution makes this the best stargazing spot in India. We provide authentic Rajasthani folk music by a local Manganiyar family around the campfire.",
    imageKey: "desert",
    hostName: "Hanif Khan",
    googlePin: "https://maps.google.com/?q=Sam+Sand+Dunes",
    campervanFriendly: true,
    roadStop: true,
    byotFriendly: true,
    maxGuests: 8,
    amenities: ["Desert Fire Pit", "Basic Washroom", "Camel Transfers", "Traditional Dinner", "Local Musicians"],
    essentials: ["Water", "Washroom", "Parking"],
    tags: ["Deep Desert", "Milky Way Views", "Cultural Heritage", "Verified"],
    highlights: ["Deep Desert Isolation", "Milky Way Guarantee", "Authentic Folk Music", "Local Desert Guides"],
    verification: ["Desert access audited", "Light pollution verified at 0%", "4x4 trails mapped"],
    bestFor: "Stargazing, campervan overlanding, and cultural heritage",
    accessNote: "Accessible via 4x4 desert trails. Caravan/campervan overlanders should park at base camp.",
    signal: "Sparse 2G voice signal present",
    permissionStatus: "host_approved",
    availability: { mode: "request_to_book", lastCheckedAt: "2026-05-30", hostResponseTargetHours: 12 },
    inventory: [{ id: "tent-pitch", label: "Prisinte dune pitch", unitType: "tent_pitch", quantity: 4, maxGuestsPerUnit: 2, pricePerNight: 1400 }],
    contactVerificationStatus: "host_confirmed",
    sourceType: "host_direct",
    sourceUrls: ["https://maps.google.com/?q=Sam+Sand+Dunes"],
    unknowns: [],
    verificationStage: "reviewed",
    confidence: { ...defaultConfidence, byotAllowed: "high", overnightParking: "high", washroom: "medium", water: "high", electricity: "medium", campervanSuitability: "high", directBusinessContact: "high" },
    nextAction: "Coordinate base camp parking handoff checklists for campers.",
  }),
  makeListing({
    id: "spiti-base",
    title: "The Roof of the World Site",
    location: "Kaza",
    state: "Himachal Pradesh",
    region: "North India overlanding",
    type: "forest",
    typeLabel: "Verified Himalayan Base",
    price: 900,
    description: "A high-altitude sanctuary at 12,000ft. Rugged, beautiful, and profoundly silent.",
    longDescription: "This isn't just camping; it's a test of spirit. Located near Kaza in the Spiti Valley, our site is a private mountain clearing with a direct view of the Key Monastery. The air is thin, the light is sharp, and the silence is humming. We provide heavy local wool blankets and hot Butter Tea (Gur-Gur Chai) on arrival. This is where the mountains teach you who you really are.",
    imageKey: "hills",
    hostName: "Tenzin Dorje",
    googlePin: "https://maps.google.com/?q=Kaza",
    campervanFriendly: true,
    roadStop: false,
    byotFriendly: true,
    maxGuests: 4,
    amenities: ["Indoor Fire Place", "Heated Washroom", "BSNL Mobile Signal", "Local Spitian Meals", "Mountain Guides"],
    essentials: ["Water", "Washroom", "Parking", "Electricity"],
    tags: ["High Altitude", "Adventure", "Himalayan Soul", "Verified"],
    highlights: ["Key Monastery View", "12,000ft Experience", "Stargazing Deck", "Verified Safe Corridor"],
    verification: ["High altitude safety audited", "Thermal washrooms confirmed", "BSNL coverage verified"],
    bestFor: "High-altitude caravans, spiritual disconnection, and Himalayan peak treks",
    accessNote: "Fully tarred road access leading straight to the monastery base camp; safe for SUVs and campervans.",
    signal: "Stable BSNL cellular signal present",
    permissionStatus: "host_approved",
    availability: { mode: "request_to_book", lastCheckedAt: "2026-05-30", hostResponseTargetHours: 8 },
    inventory: [{ id: "tent-pitch", label: "Monastery view pitch", unitType: "tent_pitch", quantity: 2, maxGuestsPerUnit: 2, pricePerNight: 900 }],
    contactVerificationStatus: "host_confirmed",
    sourceType: "host_direct",
    sourceUrls: ["https://maps.google.com/?q=Kaza"],
    unknowns: [],
    verificationStage: "reviewed",
    confidence: { ...defaultConfidence, byotAllowed: "high", overnightParking: "high", washroom: "high", water: "high", electricity: "high", campervanSuitability: "high", directBusinessContact: "high" },
    nextAction: "Verify winter road access updates from local BRO bulletins.",
  }),
];

export const categories: Category[] = [
  { id: "all", title: "All leads", description: "Browse the CampIn research network", count: `${listings.length} places` },
  { id: "caravan-park", title: "Caravan Parks", description: "Campervan and caravan-ready leads", count: `${listings.filter((item) => item.type === "caravan-park").length} leads` },
  { id: "overland", title: "Overlanding", description: "Northeast and highway overland stops", count: `${listings.filter((item) => item.type === "overland").length} leads` },
  { id: "byot", title: "BYOT", description: "Bring-your-own-tent candidates", count: `${listings.filter((item) => item.type === "byot").length} leads` },
  { id: "road-stop", title: "Road Stops", description: "Route support and parking networks", count: `${listings.filter((item) => item.type === "road-stop").length} leads` },
  { id: "desert", title: "Desert", description: "Desert BYOT and camping corridors", count: `${listings.filter((item) => item.type === "desert").length} leads` },
  { id: "beach", title: "Beach", description: "Coastal BYOT candidates", count: `${listings.filter((item) => item.type === "beach").length} leads` },
  { id: "farm", title: "Farms", description: "Farm and agri-tourism candidates", count: `${listings.filter((item) => item.type === "farm").length} leads` },
  { id: "forest", title: "Forest", description: "Forest-edge candidates", count: `${listings.filter((item) => item.type === "forest").length} leads` },
];

export const researchGuides: ResearchGuide[] = [
  {
    slug: "byot-camping-near-bangalore",
    title: "BYOT camping near Bangalore",
    region: "Bangalore, Ramanagara, Kanakapura, Chikkamagaluru",
    status: "research_lead",
    summary: "Own-tent demand is real, but CampIn should publish only private-property or host-controlled options with washroom, water and arrival rules.",
    targetQuery: "safe BYOT camping near Bangalore with washroom",
    listingIds: ["chukkimane-byot", "campers-creek-kabbal", "backyard-camp-bangalore", "wilderness-jungle-camp"],
    safetyNotes: ["Avoid wild pins and protected areas", "Require host-controlled boundary", "Verify washroom and water before publishing"],
    nextAction: "Call the top four Karnataka leads and ask the BYOT verification checklist.",
  },
  {
    slug: "kerala-maharashtra-caravan-corridor",
    title: "Kerala and Maharashtra caravan corridors",
    region: "Kerala, Maharashtra",
    status: "research_lead",
    summary: "Official caravan parks and operator networks create the cleanest early road-trip wedge, but CampIn still needs direct operator confirmation.",
    targetQuery: "caravan park India water electricity washroom",
    listingIds: ["kava-eco-camp-caravan-park", "caravan-meadows-vagamon", "mtdc-resort-parking-network", "caravaanlife-lonavala"],
    safetyNotes: ["Separate public tourism claims from current availability", "Confirm plug type and grey-water rules", "Do not imply instant booking"],
    nextAction: "Build a founder outreach queue for tourism bodies and caravan operators.",
  },
  {
    slug: "northeast-overlanding-stops",
    title: "Northeast overlanding stops",
    region: "Meghalaya, Assam, Arunachal Pradesh",
    status: "community_suggested",
    summary: "Overlanding supply appears concentrated around Camping Co-style partner campsites. CampIn should verify direct host acceptance before listing.",
    targetQuery: "northeast India overlanding campsite toilet charging water",
    listingIds: ["white-water-village", "sohra-view-lodge", "lalimou-camp-nameri", "letro-homestay-sangti"],
    safetyNotes: ["Check local permits and seasonal road access", "Confirm direct host booking outside packages", "Avoid exposing fragile exact pins before consent"],
    nextAction: "Contact operators for direct host intros and route-safe stop criteria.",
  },
];

export const trustStandards = [
  {
    title: "Gated relay first",
    description: "CampIn collects trip details before revealing or relaying a public business contact so demand stays measurable.",
  },
  {
    title: "No fake live availability",
    description: "Listings say call, request, or confirmed by date. They never show available unless a host or calendar proves it.",
  },
  {
    title: "Evidence before badges",
    description: "A reviewed state requires source URLs, known unknowns, claim confidence, and a last-checked date.",
  },
  {
    title: "Human verification queue",
    description: "Automation can draft and score leads, but verified claims wait for founder or host confirmation.",
  },
];

export const roadStopFeatures = [
  "Safe overnight parking",
  "Water refill",
  "Washroom access",
  "Charging point",
  "Mobile signal note",
  "Host or operator on call",
];

export const stats = [
  { value: String(listings.length), label: "trust-scoped leads" },
  { value: String(listings.filter((item) => item.verificationStage === "reviewed").length), label: "source-reviewed" },
  { value: String(listings.filter((item) => item.campervanFriendly).length), label: "vehicle-fit leads" },
  { value: String(researchGuides.length), label: "guide clusters" },
];

export const researchSystemHealth = {
  totalLeads: listings.length,
  newLeads: listings.filter((item) => item.verificationStage === "lead" || item.verificationStage === "community_suggested").length,
  sourceReviewed: listings.filter((item) => item.verificationStage === "reviewed").length,
  publishableDrafts: listings.filter((item) => item.sourceUrls.length > 0 && item.availability.lastCheckedAt && item.contactPolicy === "gated_relay").length,
  missingProofBlockers: listings.reduce((total, item) => total + item.unknowns.length, 0),
  staleRecords: listings.filter((item) => !item.availability.lastCheckedAt).length,
  dedupedLeads: 0,
  guideOpportunities: researchGuides.length,
};

export const faqs = [
  {
    q: "Can I book instantly today?",
    a: "No. Phase 1 is discovery and request-first validation. Availability must be confirmed by the host, CampIn, or a future calendar sync.",
  },
  {
    q: "What does source-reviewed mean?",
    a: "CampIn has reviewed public evidence and logged unknowns, but it is not a final verified badge or a live booking promise.",
  },
  {
    q: "Why gate contact instead of showing phone numbers immediately?",
    a: "Gated relay captures dates, guests, vehicle type and lead source before a host conversation, which makes marketplace learning measurable.",
  },
  {
    q: "Where do unverified regions go?",
    a: "They become guide pages or community-suggested cards until a host-controlled place clears the verification checklist.",
  },
];
