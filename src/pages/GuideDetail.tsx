import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, AlertTriangle, BookOpen, MapPin, ShieldCheck } from "lucide-react";
import { listings, researchGuides } from "../data/listings";

export default function GuideDetail() {
  const { slug } = useParams();
  const guide = researchGuides.find((item) => item.slug === slug);

  if (!guide) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-offwhite px-4 pt-24 text-center">
        <div className="max-w-md rounded-lg border border-forest/10 bg-white p-8 shadow-sm">
          <BookOpen className="mx-auto text-orange" size={30} />
          <h1 className="mt-5 text-2xl font-extrabold text-forest">Guide not found</h1>
          <p className="mt-2 text-sm leading-6 text-textgrey">This research guide is not in the current CampIn wedge.</p>
          <Link to="/explore" className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-5 py-3 font-bold text-white">
            <ArrowLeft size={18} />
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const guideListings = listings.filter((listing) => guide.listingIds.includes(listing.id));

  return (
    <div className="min-h-screen bg-offwhite pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/explore" className="inline-flex items-center gap-2 text-sm font-bold text-forest hover:text-orange">
          <ArrowLeft size={17} />
          Back to Explore
        </Link>

        <section className="mt-6 grid gap-8 rounded-lg bg-forest p-6 text-white sm:p-8 lg:grid-cols-[1fr_0.65fr] lg:p-10">
          <div>
            <p className="font-bold text-orange">{guide.status.replace("_", " ")}</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl">{guide.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/75">{guide.summary}</p>
          </div>
          <div className="rounded-lg bg-white p-5 text-forest">
            <p className="text-sm font-bold text-orange">Target query</p>
            <p className="mt-2 text-xl font-extrabold">{guide.targetQuery}</p>
            <p className="mt-5 text-sm font-bold text-orange">Region</p>
            <p className="mt-2 text-sm leading-6 text-textgrey">{guide.region}</p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg border border-forest/10 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-orange" size={22} />
              <h2 className="text-2xl font-extrabold text-forest">Safety notes</h2>
            </div>
            <div className="mt-5 space-y-3">
              {guide.safetyNotes.map((note) => (
                <p key={note} className="flex items-start gap-3 rounded-lg bg-offwhite p-4 text-sm font-semibold leading-6 text-forest">
                  <ShieldCheck className="mt-0.5 shrink-0 text-orange" size={18} />
                  {note}
                </p>
              ))}
            </div>
            <div className="mt-5 rounded-lg bg-forest p-4 text-white">
              <p className="font-extrabold">Next action</p>
              <p className="mt-2 text-sm leading-6 text-white/75">{guide.nextAction}</p>
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-center gap-3">
              <MapPin className="text-orange" size={22} />
              <h2 className="text-2xl font-extrabold text-forest">Related trust-scoped leads</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {guideListings.map((listing) => (
                <Link key={listing.id} to={`/listing/${listing.id}`} className="rounded-lg border border-forest/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <p className="text-xs font-bold uppercase tracking-wide text-orange">{listing.verificationStage.replace("_", " ")}</p>
                  <h3 className="mt-2 text-xl font-extrabold text-forest">{listing.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-textgrey">{listing.description}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange">
                    Open trust ledger
                    <ArrowRight size={16} />
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
