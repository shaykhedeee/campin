import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Download, LockKeyhole, Mail, MapPin, Phone, ShieldCheck, Tent } from "lucide-react";
import { campingGuides } from "../data/campingGuides";

const statusLabels = {
  public_preview: "Public preview",
  lead_magnet: "Email + phone unlock",
  founder_review: "Founder review",
};

export default function Guides() {
  const totalMinutes = campingGuides.reduce((sum, guide) => sum + guide.estimatedReadMinutes, 0);

  return (
    <div className="min-h-screen bg-offwhite pt-28 pb-20">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-[2rem] bg-forest p-6 text-white shadow-xl sm:p-8 lg:grid-cols-[1fr_0.75fr] lg:p-10">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-orange">
              <BookOpen size={18} />
              CampIn guide vault
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
              Turn camping questions into qualified CampIn leads.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/75">
              Every guide gives a public preview, then asks for email and phone before access or download.
              This builds a permissioned audience while keeping CampIn honest about safety, permission and verification.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-extrabold text-forest">{campingGuides.length} guide magnets</span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-extrabold text-white">{totalMinutes} min total reading</span>
              <span className="rounded-full bg-orange px-4 py-2 text-sm font-extrabold text-white">Local capture now, Supabase later</span>
            </div>
          </div>
          <div className="grid gap-3 rounded-2xl bg-white p-5 text-forest">
            {[
              { icon: Mail, title: "Email capture", body: "Builds newsletter and SEO retargeting base." },
              { icon: Phone, title: "Phone capture", body: "Enables WhatsApp only after consent and policy setup." },
              { icon: ShieldCheck, title: "Trust-first framing", body: "No guide pretends unverified places are bookable." },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 rounded-xl bg-offwhite p-4">
                <item.icon className="mt-1 shrink-0 text-orange" size={21} />
                <div>
                  <h2 className="font-extrabold">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-textgrey">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {campingGuides.map((guide) => (
            <Link
              key={guide.slug}
              to={`/camping-guides/${guide.slug}`}
              className="group flex min-h-full flex-col rounded-2xl border border-forest/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest text-white">
                  <Tent size={24} />
                </div>
                <span className="rounded-full bg-orange/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-orange">
                  {statusLabels[guide.status]}
                </span>
              </div>
              <h2 className="mt-5 text-2xl font-black leading-tight text-forest">{guide.title}</h2>
              <p className="mt-3 text-sm leading-6 text-textgrey">{guide.preview}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-lg bg-offwhite px-3 py-1.5 text-xs font-bold text-forest">
                  <MapPin size={14} />
                  {guide.region.split(",")[0]}
                </span>
                <span className="rounded-lg bg-offwhite px-3 py-1.5 text-xs font-bold text-forest">{guide.difficulty}</span>
                <span className="rounded-lg bg-offwhite px-3 py-1.5 text-xs font-bold text-forest">{guide.estimatedReadMinutes} min</span>
              </div>
              <div className="mt-5 border-t border-forest/10 pt-5">
                <p className="flex items-center gap-2 text-sm font-extrabold text-orange">
                  <LockKeyhole size={16} />
                  Unlock guide + download
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-forest/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-bold text-orange">Founder use</p>
              <h2 className="mt-1 text-3xl font-black text-forest">Use guides before outreach.</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-textgrey">
                Share guide previews publicly. Capture demand. Then prioritize host research by region, not by assumptions.
              </p>
            </div>
            <Link to="/validation" className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-5 py-3 font-extrabold text-white">
              Open validation machine
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {["Publish previews on Instagram", "Collect email + phone", "Rank host research by guide demand"].map((item) => (
              <div key={item} className="rounded-xl bg-offwhite p-4 text-sm font-bold leading-6 text-forest">
                <Download className="mb-3 text-orange" size={20} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
