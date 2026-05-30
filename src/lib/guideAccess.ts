import type { CampingGuide } from "../data/campingGuides";
import { submitMvpLead } from "./mvpLeadStore";

export interface GuideAccessLead {
  id: string;
  guideSlug: string;
  guideTitle: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  interest: string;
  consent: boolean;
  createdAt: string;
}

const storageKey = "campin_guide_access_leads";

export function getGuideAccessLeads(): GuideAccessLead[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as GuideAccessLead[]) : [];
  } catch {
    return [];
  }
}

export function hasGuideAccess(slug: string) {
  return getGuideAccessLeads().some((lead) => lead.guideSlug === slug);
}

export function saveGuideAccessLead(guide: CampingGuide, input: Omit<GuideAccessLead, "id" | "guideSlug" | "guideTitle" | "createdAt">) {
  const lead: GuideAccessLead = {
    ...input,
    id: `GUIDE-${Date.now().toString(36).toUpperCase()}`,
    guideSlug: guide.slug,
    guideTitle: guide.title,
    createdAt: new Date().toISOString(),
  };

  const leads = getGuideAccessLeads();
  window.localStorage.setItem(storageKey, JSON.stringify([lead, ...leads]));
  void submitMvpLead({
    type: "guide_unlock",
    sourcePage: `/camping-guides/${guide.slug}`,
    name: input.name,
    email: input.email,
    phone: input.phone,
    city: input.city,
    status: "guide_unlocked",
    score: 3,
    consent: input.consent,
    payload: {
      guideSlug: guide.slug,
      guideTitle: guide.title,
      interest: input.interest,
      localLeadId: lead.id,
    },
  });
  return lead;
}
