import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Lock, Compass, Sparkles, CheckCircle2 } from "lucide-react";
import { campingGuides } from "../data/campingGuides";
import CampInIcon, { type CampInIconName } from "../components/icons/CampInIcon";

const statusLabels = {
  public_preview: "Public preview",
  lead_magnet: "Email + phone unlock",
  founder_review: "Email + phone unlock", // Ensure locked status is clearly marked
};

const guideIcons: Record<string, CampInIconName> = {
  "safe-byot-camping-near-bangalore": "own-tent",
  "campervan-road-stops-india-standard": "campervan",
  "monsoon-camping-western-ghats-safety": "forest-edge",
  "host-land-for-camping-starter-kit": "farm-camp",
  "first-time-family-camping-india": "family-safe",
  "trekking-with-camping-permission-guide": "route",
};

export default function Guides() {
  const totalMinutes = campingGuides.reduce((sum, guide) => sum + guide.estimatedReadMinutes, 0);

  return (
    <div className="min-h-screen bg-[#07130c] pt-28 pb-20 text-white overflow-hidden relative">
      {/* Premium Glowing Mesh Background Effect */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[#E67E22]/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 h-[600px] w-[600px] rounded-full bg-[#1b4332]/25 blur-[150px] pointer-events-none" />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Stunning Premium Hero Section */}
        <div className="grid gap-8 rounded-[2.5rem] border border-white/10 bg-[#0a1e14]/60 backdrop-blur-xl p-8 text-white shadow-2xl sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-orange">
              <Sparkles size={14} className="animate-pulse" />
              CampIn Outdoor Vault
            </p>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl tracking-tight">
              Premium Guides. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-orange-dark">No Guesswork.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">
              Stop pitching your tent based on random listicles. Every manual details legal permits, safety standards, 
              washroom availability, and ground truths. Instantly preview or unlock high-intent guides designed by seasoned Indian overlanders.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold text-white/80">{campingGuides.length} Active Guides</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold text-white/80">{totalMinutes} Mins Reading</span>
              <span className="rounded-full border border-orange/20 bg-orange/5 px-4 py-2 text-xs font-extrabold text-orange">Verified Safety Norms</span>
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h3 className="text-lg font-black text-orange flex items-center gap-2">
              <Compass size={20} className="text-orange" />
              Our Editorial Standard
            </h3>
            {[
              { icon: "permission", title: "100% Legal & Safe", body: "No guides promote trespass stays. We verify land classification first." },
              { icon: "reviewed", title: "Human Inspected", body: "We physically check toilets, cellular signals, and vehicle turning room." },
              { icon: "washroom", title: "Water & Restrooms", body: "Clear markers showing whether drinking water and restrooms are operational." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:border-white/10 transition-colors">
                <div className="mt-1 shrink-0 flex items-center justify-center h-9 w-9 rounded-lg bg-orange/10 text-orange">
                  <CampInIcon name={item.icon as CampInIconName} className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">{item.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Grid View */}
        <div className="mt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Comprehensive Handbooks</h2>
              <p className="mt-2 text-white/60">Unlock practical itineraries, hidden locations, and packing checklists.</p>
            </div>
            <div className="h-[2px] flex-grow bg-gradient-to-r from-orange/20 to-transparent hidden md:block" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campingGuides.map((guide) => {
              const isLeadMagnet = guide.status === "lead_magnet" || guide.status === "founder_review";
              const isFreePreview = guide.slug === "first-time-family-camping-india";

              return (
                <Link
                  key={guide.slug}
                  to={`/camping-guides/${guide.slug}`}
                  className="group flex min-h-full flex-col rounded-3xl border border-white/10 bg-[#0a1e14]/40 hover:bg-[#0c2419]/60 hover:border-white/20 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 border border-orange/20 text-orange group-hover:scale-110 transition-transform">
                      <CampInIcon name={guideIcons[guide.slug] || "tent"} className="h-6 w-6" />
                    </div>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
                      isFreePreview 
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                        : "bg-orange/20 text-orange border border-orange/30"
                    }`}>
                      {isFreePreview ? "Free preview" : statusLabels[guide.status]}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-black leading-snug tracking-tight text-white group-hover:text-orange transition-colors">
                    {guide.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60 flex-grow">
                    {guide.preview}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-xs font-bold text-white/80">
                      <Compass size={12} className="text-orange" />
                      {guide.region.split(",")[0]}
                    </span>
                    <span className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-xs font-bold text-white/80">
                      {guide.difficulty}
                    </span>
                    <span className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-xs font-bold text-white/80">
                      {guide.estimatedReadMinutes} min read
                    </span>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-5 flex items-center justify-between text-sm font-extrabold text-orange">
                    <span className="flex items-center gap-2">
                      {isFreePreview ? (
                        <>
                          <CheckCircle2 size={16} />
                          Read online immediately
                        </>
                      ) : (
                        <>
                          <Lock size={15} />
                          Unlock full guide + download
                        </>
                      )}
                    </span>
                    <ArrowRight size={16} className="transition group-hover:translate-x-1.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Clean, Non-Admin FAQ & Pitch Section */}
        <div className="mt-20 rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0c2419]/60 to-[#0a1e14]/40 p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-orange/5 blur-2xl pointer-events-none" />
          
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-wider text-orange">Community Standard</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">Need a customized route planning guide?</h2>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              We continually survey India's corridors. If you are scouting new caravan routes, high-altitude Western Ghat terrains, 
              or BYOT spots, share your destination with our team. We perform checkups so you travel safely.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="mailto:support@campin.co.in" className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange hover:bg-orange-dark px-6 py-3.5 text-sm font-black transition-all hover:-translate-y-0.5">
                Contact Route Experts
                <ArrowRight size={16} />
              </a>
              <Link to="/coming-soon" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-sm font-black transition-all">
                Join Founding Waitlist
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
