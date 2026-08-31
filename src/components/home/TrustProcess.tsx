import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CampInIcon from "../icons/CampInIcon";

const publicListingStages = [
  "Community suggested",
  "Awaiting host confirmation",
  "Source reviewed",
  "Date confirmed",
  "Calendar synced",
] as const;

const trustStages = [
  {
    number: "01",
    title: "Permission and host context",
    body: "We record who manages the land, the permission shared with CampIn, and the local rules campers need to know.",
    iconName: "permission",
  },
  {
    number: "02",
    title: "Access and essentials",
    body: "We capture arrival notes and host-reported details such as washrooms, water, road access, and stay limits.",
    iconName: "route",
  },
  {
    number: "03",
    title: "Status and unknowns",
    body: "Public listing stages show how far CampIn's evidence has progressed. Host-confirmed details are shown separately where they apply, alongside anything still unknown.",
    iconName: "exact-pin",
  },
] as const;

export default function TrustProcess() {
  return (
    <section
      id="trust"
      aria-labelledby="trust-process-heading"
      className="border-b border-[#173525]/10 bg-[#eef1e6] py-14 sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-10">
        <div className="grid gap-7 border-b border-[#173525]/15 pb-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16 lg:pb-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#A94F08]">Permission-first discovery</p>
            <h2
              id="trust-process-heading"
              className="mt-3 max-w-2xl font-serif text-4xl font-black leading-[0.98] tracking-[-0.045em] text-[#173525] sm:text-6xl"
            >
              How CampIn builds trust
            </h2>
          </div>
          <p className="max-w-2xl text-sm font-medium leading-7 text-[#313831] sm:text-base sm:leading-8">
            Trust comes from clear context, not a blanket badge. We separate the public evidence stage from details a host has confirmed, and keep missing details visible.
          </p>
        </div>

        <ol className="grid lg:grid-cols-3">
          {trustStages.map((stage) => (
            <li
              key={stage.number}
              className="grid grid-cols-[auto_1fr] gap-4 border-b border-[#173525]/15 py-7 last:border-b-0 lg:block lg:border-b-0 lg:border-r lg:px-8 lg:py-10 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#173525]/20 text-[#173525]">
                <CampInIcon name={stage.iconName} className="h-5 w-5" />
              </div>
              <div className="lg:mt-7">
                <p className="text-xs font-black tracking-[0.16em] text-[#A94F08]">{stage.number}</p>
                <h3 className="mt-2 font-serif text-2xl font-bold tracking-[-0.025em] text-[#173525]">{stage.title}</h3>
                <p className="mt-3 max-w-sm text-sm font-medium leading-7 text-[#4f574f]">{stage.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mb-5 border-y border-[#173525]/15 py-5 lg:flex lg:items-center lg:gap-7">
          <p className="shrink-0 text-xs font-black uppercase tracking-[0.16em] text-[#173525]">Public listing stages</p>
          <ul aria-label="Public listing stages" className="mt-3 flex flex-wrap gap-2 lg:mt-0">
            {publicListingStages.map((stage) => (
              <li key={stage} className="rounded-full border border-[#173525]/20 bg-[#fffaf0]/55 px-3 py-1.5 text-xs font-bold text-[#4f574f]">
                {stage}
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/responsible-camping-pledge"
          className="light-surface-focus mt-2 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-black text-[#173525] underline decoration-[#A94F08] decoration-2 underline-offset-4 transition-colors hover:text-[#A94F08] lg:mt-0"
        >
          Read the responsible camping pledge
          <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </div>
    </section>
  );
}
