import { submitMvpLead, type MvpLeadType } from "./mvpLeadStore";

export type LeadType = "camper" | "host" | "roadStop" | "newsletter";

export type LeadValue = string | number | boolean | string[];

export type LeadData = Record<string, LeadValue>;

export interface ValidationLead {
  id: string;
  type: LeadType;
  createdAt: string;
  score: number;
  status: string;
  data: LeadData;
}

export interface ManualValidationMetrics {
  manualBookingAttempts: number;
  paidPilotStays: number;
}

export interface ValidationProgressItem {
  key: keyof ValidationProgressSnapshot;
  label: string;
  target: number;
  current: number;
  description: string;
}

export interface ValidationProgressSnapshot {
  emailSubscribers: number;
  highIntentCamperLeads: number;
  hostApplications: number;
  verifiedCandidateSites: number;
  manualBookingAttempts: number;
  paidPilotStays: number;
}

export const validationTargets = [
  {
    key: "emailSubscribers",
    label: "Email subscribers",
    target: 500,
    description: "Camper and newsletter emails captured with consent.",
  },
  {
    key: "highIntentCamperLeads",
    label: "High-intent camper leads",
    target: 100,
    description: "Campers with strong own-gear, safety, region, or payment signal.",
  },
  {
    key: "hostApplications",
    label: "Host applications",
    target: 30,
    description: "Private-land or road-side hosts who submit a usable application.",
  },
  {
    key: "verifiedCandidateSites",
    label: "Verified candidate sites",
    target: 10,
    description: "Host or road-stop leads with strong amenity and permission fit.",
  },
  {
    key: "manualBookingAttempts",
    label: "Manual booking attempts",
    target: 3,
    description: "Founder-led camper-host matches before booking-engine build.",
  },
  {
    key: "paidPilotStays",
    label: "Paid pilot stay",
    target: 1,
    description: "One completed paid stay proves marketplace behavior.",
  },
] as const;

const leadsStorageKey = "campin.validation.leads.v1";
const manualMetricsStorageKey = "campin.validation.manualMetrics.v1";

export function saveValidationLead(type: LeadType, data: LeadData, score: number, status?: string) {
  const lead: ValidationLead = {
    id: createLeadId(type),
    type,
    createdAt: new Date().toISOString(),
    score,
    status: status || defaultStatusFor(type, score),
    data,
  };

  const leads = readValidationLeads();
  writeValidationLeads([lead, ...leads]);
  void submitMvpLead({
    type: mvpTypeFor(type),
    sourcePage: "/validation",
    name: typeof data.name === "string" ? data.name : undefined,
    email: typeof data.email === "string" ? data.email : undefined,
    phone: typeof data.phone === "string" ? data.phone : typeof data.phoneWhatsapp === "string" ? data.phoneWhatsapp : undefined,
    city: typeof data.city === "string" ? data.city : undefined,
    score,
    status: lead.status,
    consent: true,
    payload: data,
  });
  return lead;
}

export function readValidationLeads(): ValidationLead[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(leadsStorageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function clearValidationLeads() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(leadsStorageKey);
}

export function readManualMetrics(): ManualValidationMetrics {
  if (typeof window === "undefined") {
    return { manualBookingAttempts: 0, paidPilotStays: 0 };
  }

  try {
    const raw = window.localStorage.getItem(manualMetricsStorageKey);
    if (!raw) return { manualBookingAttempts: 0, paidPilotStays: 0 };
    const parsed = JSON.parse(raw) as Partial<ManualValidationMetrics>;
    return {
      manualBookingAttempts: Number(parsed.manualBookingAttempts || 0),
      paidPilotStays: Number(parsed.paidPilotStays || 0),
    };
  } catch {
    return { manualBookingAttempts: 0, paidPilotStays: 0 };
  }
}

export function writeManualMetrics(metrics: ManualValidationMetrics) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(manualMetricsStorageKey, JSON.stringify(metrics));
}

export function getValidationProgress(leads = readValidationLeads(), manualMetrics = readManualMetrics()) {
  const emailSet = new Set<string>();
  leads.forEach((lead) => {
    const email = typeof lead.data.email === "string" ? lead.data.email.trim().toLowerCase() : "";
    if (email) emailSet.add(email);
  });

  const snapshot: ValidationProgressSnapshot = {
    emailSubscribers: emailSet.size,
    highIntentCamperLeads: leads.filter((lead) => lead.type === "camper" && lead.score >= 8).length,
    hostApplications: leads.filter((lead) => lead.type === "host").length,
    verifiedCandidateSites: leads.filter((lead) => (lead.type === "host" || lead.type === "roadStop") && lead.score >= 8).length,
    manualBookingAttempts: manualMetrics.manualBookingAttempts,
    paidPilotStays: manualMetrics.paidPilotStays,
  };

  return validationTargets.map((target) => ({
    ...target,
    current: snapshot[target.key],
  })) satisfies ValidationProgressItem[];
}

export function scoreCamperLead(data: LeadData) {
  let score = 0;
  if (String(data.city || "").trim()) score += 1;
  if (String(data.ownGear) === "yes") score += 2;
  if (String(data.willingToPay) === "yes") score += 2;
  if (Boolean(data.whatsappOptIn)) score += 1;
  if (Array.isArray(data.safetyConcern) && data.safetyConcern.length > 0) score += 1;
  if (Array.isArray(data.preferredRegion) && data.preferredRegion.some((region) => region !== "other")) score += 1;
  if (Array.isArray(data.campingType) && data.campingType.includes("own-tent")) score += 2;
  return Math.min(score, 10);
}

export function scoreHostLead(data: LeadData) {
  let score = 0;
  if (Array.isArray(data.propertyType) && data.propertyType.length > 0) score += 1;
  if (String(data.locationPin || "").startsWith("http")) score += 2;
  if (String(data.washroom) !== "none") score += 2;
  if (String(data.water) !== "none") score += 1;
  if (String(data.parking) !== "none") score += 1;
  if (String(data.permissionStatus) === "owned" || String(data.permissionStatus) === "controlled") score += 2;
  if (String(data.photos || "").trim()) score += 1;
  if (Number(data.expectedPrice || 0) > 0) score += 1;
  return Math.min(score, 10);
}

export function scoreRoadStopLead(data: LeadData) {
  let score = 0;
  if (String(data.route || "").trim()) score += 1;
  if (Number(data.parkingCapacity || 0) > 0) score += 2;
  if (String(data.washroom) !== "none") score += 2;
  if (String(data.water) !== "none") score += 1;
  if (String(data.power) !== "none") score += 1;
  if (String(data.nightSafety || "").trim().length > 20) score += 2;
  if (Array.isArray(data.vehicleAccess) && data.vehicleAccess.length > 0) score += 1;
  return Math.min(score, 10);
}

export function scoreNewsletterLead(data: LeadData) {
  let score = 1;
  if (String(data.email || "").trim()) score += 2;
  if (String(data.city || "").trim()) score += 1;
  if (String(data.segment || "") !== "newsletter-only") score += 1;
  return Math.min(score, 5);
}

export function exportLeadsToCsv(leads = readValidationLeads()) {
  const headers = ["id", "type", "createdAt", "score", "status", "data"];
  const rows = leads.map((lead) => [
    lead.id,
    lead.type,
    lead.createdAt,
    String(lead.score),
    lead.status,
    JSON.stringify(lead.data),
  ]);
  return [headers, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
}

function writeValidationLeads(leads: ValidationLead[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(leadsStorageKey, JSON.stringify(leads));
  window.dispatchEvent(new Event("campin-validation-updated"));
}

function createLeadId(type: LeadType) {
  const prefixMap: Record<LeadType, string> = {
    camper: "CAMP",
    host: "HOST",
    roadStop: "STOP",
    newsletter: "NEWS",
  };

  return `${prefixMap[type]}-${Date.now().toString(36).toUpperCase()}`;
}

function defaultStatusFor(type: LeadType, score: number) {
  if (type === "camper") return score >= 8 ? "High Intent" : "New Waitlist";
  if (type === "host") return score >= 8 ? "Candidate Review" : "New Application";
  if (type === "roadStop") return score >= 8 ? "Amenities Review" : "Road Stop Candidate";
  return "Subscribed";
}

function mvpTypeFor(type: LeadType): MvpLeadType {
  if (type === "camper") return "camper_waitlist";
  if (type === "host") return "host_interest";
  if (type === "roadStop") return "road_stop";
  return "newsletter";
}

function csvEscape(value: string) {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}
