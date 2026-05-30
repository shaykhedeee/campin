import type { CampInIconName } from "../components/icons/CampInIcon";

export const airbnbLessons = [
  {
    title: "Win a tight wedge first",
    airbnbPattern: "Airbnb focused on New York when it saw concentrated demand, then improved that supply by hand.",
    campinMove: "Make Bangalore and South India the first battlefield: Bangalore, Ramanagara, Kanakapura, Coorg, Chikmagalur, and Wayanad.",
    avoid: "Do not launch as a pan-India directory before trust and supply depth exist.",
  },
  {
    title: "Do the unscalable trust work",
    airbnbPattern: "The founders visited hosts, photographed homes, and learned the supply problem directly.",
    campinMove: "Founder-verify the first 10 sites with permission notes, washroom proof, water status, route photos, and host/caretaker checks.",
    avoid: "Do not let unverified listings create the first CampIn reputation.",
  },
  {
    title: "Make trust visible",
    airbnbPattern: "Airbnb turns reliability into badges, reviews, identity verification, and host/guest protections.",
    campinMove: "Show dimensional trust: permission, exact pin, host present, washroom, water, night safety, local contact, and incident history.",
    avoid: "Do not use a vague verified label without explaining what was checked.",
  },
  {
    title: "Design for discovery",
    airbnbPattern: "Categories made browsing feel visual, specific, and curiosity-led.",
    campinMove: "Create CampIn categories around outdoor intent: Own Tent Friendly, First-Time Safe, Road Stop, Washroom Verified, Bike Friendly.",
    avoid: "Do not bury the main decision filters inside generic search.",
  },
  {
    title: "Expand from the core journey",
    airbnbPattern: "Airbnb expanded from homes into services, experiences, and selective hotel supply.",
    campinMove: "Expand from verified stays into road stops, gear, route kits, local food, guided micro-experiences, and then bookings.",
    avoid: "Do not add unrelated lifestyle services before camping is loved.",
  },
  {
    title: "Protect host economics",
    airbnbPattern: "Host trust can weaken when policy, fees, and ranking feel opaque.",
    campinMove: "Give founding hosts clear ranking inputs, payout expectations, verification requirements, and manual founder support.",
    avoid: "Do not surprise hosts with fee or algorithm changes.",
  },
] as const;

export const campinFlows = [
  {
    name: "Camper Validation",
    steps: ["Answer page", "Waitlist", "Lead score", "Campfire welcome", "Safety survey", "Manual pilot"],
    metric: "100 high-intent camper leads",
  },
  {
    name: "Host Supply",
    steps: ["Outreach", "Host form", "Founder call", "Verification checklist", "Shortlist", "Pilot stay"],
    metric: "30 host applications and 10 verified candidate sites",
  },
  {
    name: "Road Stop Network",
    steps: ["Route research", "Lead form", "Amenity score", "Night safety call", "Road Stop Standard", "Route page"],
    metric: "Road-stop candidates on priority routes",
  },
  {
    name: "Content Engine",
    steps: ["Research insight", "Page brief", "Answer block", "FAQ/schema", "Newsletter", "Community proof"],
    metric: "One source-backed page brief per week",
  },
] as const;

export const trustStack: Array<{ label: string; icon: CampInIconName; description: string }> = [
  { label: "Permission", icon: "permission", description: "Owner-controlled or permissioned camping status, never assumed." },
  { label: "Exact Pin", icon: "exact-pin", description: "Location confidence or meeting point clarity before arrival." },
  { label: "Washroom", icon: "washroom", description: "Toilet type, distance, cleanliness expectation, and source of claim." },
  { label: "Water", icon: "water", description: "Drinking/usable water availability and backup advice." },
  { label: "Host Present", icon: "host-present", description: "Caretaker or host availability during check-in and night hours." },
  { label: "Quiet Zone", icon: "quiet-zone", description: "Noise expectations, neighbors, and local-interference risk." },
  { label: "First Aid", icon: "first-aid", description: "Basic emergency readiness and contact path." },
  { label: "CampIn Reviewed", icon: "reviewed", description: "Earned after manual verification, not a decorative badge." },
];

export const originalIconShowcase: Array<{ name: CampInIconName; label: string; family: string }> = [
  { name: "tent", label: "Tent Pitch", family: "Stay" },
  { name: "own-tent", label: "Own Tent", family: "Stay" },
  { name: "farm-camp", label: "Farm Camp", family: "Stay" },
  { name: "forest-edge", label: "Forest Edge", family: "Stay" },
  { name: "road-stop", label: "Road Stop", family: "Road" },
  { name: "bike", label: "Bike Friendly", family: "Road" },
  { name: "campervan", label: "Campervan", family: "Road" },
  { name: "route", label: "Route", family: "Road" },
  { name: "washroom", label: "Washroom", family: "Amenity" },
  { name: "water", label: "Water", family: "Amenity" },
  { name: "power", label: "Power", family: "Amenity" },
  { name: "food", label: "Food", family: "Amenity" },
  { name: "permission", label: "Permission", family: "Trust" },
  { name: "exact-pin", label: "Exact Pin", family: "Trust" },
  { name: "host-present", label: "Host Present", family: "Trust" },
  { name: "family-safe", label: "Family Safe", family: "Trust" },
] as const;

export const automationBlueprints = [
  { name: "Airbnb Intelligence Sweep", cadence: "Mon 09:00", output: "Strategy actions and risk notes" },
  { name: "Validation Metrics Review", cadence: "Wed 10:00", output: "Target progress and founder actions" },
  { name: "Campfire Newsletter Draft", cadence: "Fri 09:00", output: "Newsletter draft with source-backed CTA" },
  { name: "UX QA And Icon Review", cadence: "Sat 11:00", output: "Build result, mobile risks, and icon fixes" },
] as const;
