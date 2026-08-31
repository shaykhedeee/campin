import type { CampingGuide } from "../data/campingGuides";
import { submitMvpLead, type LeadSubmissionResult } from "./mvpLeadStore";

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

export async function saveGuideAccessLead(
  guide: CampingGuide,
  input: Omit<GuideAccessLead, "id" | "guideSlug" | "guideTitle" | "createdAt">,
): Promise<{ lead: GuideAccessLead; submission: LeadSubmissionResult }> {
  const submission = await submitMvpLead({
    type: "guide_unlock",
    sourcePage: `/camping-guides/${guide.slug}`,
    name: input.name,
    email: input.email,
    phone: input.phone,
    city: input.city,
    status: "guide_unlocked",
    score: 3,
    consent: input.consent,
    payload: { guideSlug: guide.slug, guideTitle: guide.title, interest: input.interest },
  });
  const lead: GuideAccessLead = {
    ...input,
    id: submission.lead.id,
    guideSlug: guide.slug,
    guideTitle: guide.title,
    createdAt: submission.lead.createdAt,
  };

  const leads = getGuideAccessLeads();
  window.localStorage.setItem(storageKey, JSON.stringify([lead, ...leads]));
  return { lead, submission };
}
