import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Car,
  ClipboardCheck,
  Database,
  FileSearch,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  Tent,
  Users,
} from "lucide-react";
import CampfireIssuePreview from "../components/newsletter/CampfireIssuePreview";
import CampfireSignup from "../components/newsletter/CampfireSignup";
import ValidationTargetDashboard from "../components/validation/ValidationTargetDashboard";
import { CamperWaitlistForm, HostInterestForm, RoadStopLeadForm } from "../components/validation/ValidationForms";
import { listings, researchSystemHealth, type Listing } from "../data/listings";

type ActiveForm = "camper" | "host" | "roadStop";

interface ListingRequest {
  id: string;
  listingId: string;
  listingTitle: string;
  createdAt: string;
  status: string;
  arrive: string;
  depart: string;
  guests: string;
  vehicleType: string;
  ownTent: string;
}

const requestStorageKey = "campin.listing.requests.v1";

const formTabs = [
  { id: "camper", label: "Camper waitlist", icon: Tent },
  { id: "host", label: "Host interest", icon: ShieldCheck },
  { id: "roadStop", label: "Road-stop lead", icon: Car },
] satisfies { id: ActiveForm; label: string; icon: typeof Tent }[];

function readRequests(): ListingRequest[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(requestStorageKey) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getQueueBuckets(items: Listing[]) {
  return [
    {
      label: "Needs host call",
      value: items.filter((item) => item.verificationStage === "lead").length,
      description: "Draft-autonomous leads with public evidence but no host confirmation.",
      icon: Users,
    },
    {
      label: "Community suggested",
      value: items.filter((item) => item.verificationStage === "community_suggested").length,
      description: "Demand or public mentions that should become guides, not booking CTAs.",
      icon: FileSearch,
    },
    {
      label: "Source reviewed",
      value: items.filter((item) => item.verificationStage === "reviewed").length,
      description: "Source URLs and unknowns are logged, but contact remains gated.",
      icon: ShieldCheck,
    },
    {
      label: "Gated relay ready",
      value: items.filter((item) => item.contactPolicy === "gated_relay" && item.availability.lastCheckedAt).length,
      description: "Can accept trip details without exposing direct contact immediately.",
      icon: LockKeyhole,
    },
  ];
}

export default function ValidationMachine() {
  const [activeForm, setActiveForm] = useState<ActiveForm>("camper");
  const [requests, setRequests] = useState<ListingRequest[]>(() => readRequests());

  useEffect(() => {
    const refresh = () => setRequests(readRequests());
    window.addEventListener("campin-validation-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("campin-validation-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const queueBuckets = useMemo(() => getQueueBuckets(listings), []);
  const recentRequests = requests.slice(0, 5);
  const ActiveFormComponent =
    activeForm === "camper" ? CamperWaitlistForm : activeForm === "host" ? HostInterestForm : RoadStopLeadForm;

  return (
    <div className="min-h-screen bg-offwhite pt-28 pb-20">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div className="min-w-0">
            <p className="inline-flex rounded-lg bg-orange px-4 py-2 text-sm font-bold text-white">Validation machine</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-forest sm:text-5xl">
              A founder control room for trust, demand, and supply validation.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-textgrey">
              CampIn can now collect demand, score researched campsites, separate guides from listings, and keep every
              host contact behind a measurable request flow.
            </p>
          </div>
          <div className="min-w-0 rounded-lg border border-forest/10 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-forest text-white">
                <Database size={23} />
              </div>
              <div className="min-w-0">
                <p className="font-extrabold text-forest">Phase 1 scope</p>
                <p className="break-words text-sm leading-6 text-textgrey">
                  South India, Kerala and Maharashtra caravan corridors, plus selected Northeast overlanding leads.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {queueBuckets.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="min-w-0 rounded-lg border border-forest/10 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-offwhite text-orange">
                  <Icon size={21} />
                </div>
                <p className="mt-4 text-3xl font-extrabold text-forest">{card.value}</p>
                <h2 className="mt-1 font-extrabold text-forest">{card.label}</h2>
                <p className="mt-2 break-words text-sm leading-6 text-textgrey">{card.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="rounded-lg border border-forest/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="text-orange" size={23} />
            <div>
              <p className="font-bold text-orange">Research ingestion health</p>
              <h2 className="text-2xl font-extrabold text-forest">Draft-autonomous, review-gated pipeline.</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["Total leads", researchSystemHealth.totalLeads],
              ["New or suggested", researchSystemHealth.newLeads],
              ["Publishable drafts", researchSystemHealth.publishableDrafts],
              ["Proof blockers", researchSystemHealth.missingProofBlockers],
              ["Guide clusters", researchSystemHealth.guideOpportunities],
              ["Deduped leads", researchSystemHealth.dedupedLeads],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-offwhite p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-textgrey">{label}</p>
                <p className="mt-2 text-2xl font-extrabold text-forest">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-forest/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <MapPin className="text-orange" size={23} />
            <div>
              <p className="font-bold text-orange">Request status tracking</p>
              <h2 className="text-2xl font-extrabold text-forest">Gated handoffs saved locally.</h2>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {recentRequests.length === 0 ? (
              <p className="rounded-lg bg-offwhite p-4 text-sm leading-6 text-textgrey">
                No listing requests yet. Submit a request from a listing page to populate this queue.
              </p>
            ) : (
              recentRequests.map((request) => (
                <div key={request.id} className="rounded-lg bg-offwhite p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-extrabold text-forest">{request.listingTitle}</p>
                      <p className="mt-1 text-sm text-textgrey">
                        {request.arrive} to {request.depart} / {request.guests} guests / {request.vehicleType}
                      </p>
                    </div>
                    <span className="rounded-lg bg-white px-3 py-1 text-xs font-bold text-orange">{request.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section id="lead-capture" className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <ValidationTargetDashboard />
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-bold text-orange">Lead capture</p>
            <h2 className="mt-1 text-3xl font-extrabold text-forest">Three forms, one validation inbox.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {formTabs.map((tab) => {
              const active = activeForm === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveForm(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition-colors ${
                    active ? "bg-forest text-white" : "bg-white text-forest hover:text-orange"
                  }`}
                >
                  <Icon size={17} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        <ActiveFormComponent />
      </section>

      <section className="mx-auto mt-10 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <CampfireSignup />
        <CampfireIssuePreview />
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-forest p-6 text-white shadow-sm sm:p-8 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="font-bold text-orange">Next operating step</p>
            <h2 className="mt-2 max-w-3xl text-3xl font-extrabold">Work the verification queue before promising availability.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
              Automation can discover and score supply. Founder review still decides whether a lead becomes reviewed,
              date-confirmed, or stays as guide content.
            </p>
          </div>
          <a
            href="#lead-capture"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-orange px-5 py-3 font-extrabold text-white transition-colors hover:bg-orange-dark lg:mt-0"
          >
            Capture a lead
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
