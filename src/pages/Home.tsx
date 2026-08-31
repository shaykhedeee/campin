import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Mail,
  Phone,
} from "lucide-react";
import {
  CompassMark,
  HeroRoute,
  MapPinMark,
  TopographicPattern,
} from "../components/vectors/CampInVectors";
import { submitMvpLead } from "../lib/mvpLeadStore";
import CampInIcon from "../components/icons/CampInIcon";
import { getBlogPosts } from "../data/blogPosts";
import CampInDefinition from "../components/home/CampInDefinition";
import CategoryExplorer from "../components/home/CategoryExplorer";
import HostInvitation from "../components/home/HostInvitation";
import TrustProcess from "../components/home/TrustProcess";
import { mediaRegistry, mediaSrcSet } from "../data/mediaRegistry";

const heroChecks = [
  { label: "Permission first", iconName: "permission", position: "left-[22%] top-[12%]" },
  { label: "Washroom check", iconName: "washroom", position: "left-[8%] top-[31%]" },
  { label: "Water check", iconName: "water", position: "left-[19%] top-[49%]" },
  { label: "Host reviewed", iconName: "host-present", position: "left-[15%] top-[66%]" },
] as const;

const guideCards = [
  {
    title: "Vanlife Guide to South India",
    body: "Routes, seasons, stays and local tips.",
    image: mediaRegistry.water.src,
    imageAsset: mediaRegistry.water,
  },
  {
    title: "Backyard Camping 101",
    body: "Gear, etiquette, safety and more.",
    image: mediaRegistry.tent.src,
    imageAsset: mediaRegistry.tent,
  },
  {
    title: "Monsoon Camping in India",
    body: "Where to go, what to pack.",
    image: mediaRegistry.hills.src,
    imageAsset: mediaRegistry.hills,
  },
];

export default function Home() {
  const [waitlistForm, setWaitlistForm] = useState({ email: "", phone: "" });
  const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [activeBlogs, setActiveBlogs] = useState(() => getBlogPosts());

  useEffect(() => {
    document.title = "CampIn | Permission-First Camping Across India";
    const description = "Explore campsites, tent pitches, campervan stops, farm stays and glamping across India. Compare place context, permissions, access, amenities and unknowns before you travel.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
    return () => { document.title = "CampIn | Permission-First Camping in India"; };
  }, []);

  useEffect(() => {
    const handleSync = () => setActiveBlogs(getBlogPosts());
    window.addEventListener("campin-blogs-updated", handleSync);
    return () => window.removeEventListener("campin-blogs-updated", handleSync);
  }, []);

  const submitWaitlist = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWaitlistStatus("saving");

    try {
      await submitMvpLead({
        type: "camper_waitlist",
        sourcePage: "/",
        email: waitlistForm.email,
        phone: waitlistForm.phone,
        status: "founding_community_waitlist",
        score: waitlistForm.phone.trim() ? 4 : 3,
        consent: true,
        payload: {
          source: "homepage_founding_community_card",
          requestedUpdates: ["guide_access", "community_updates", "permission_first_leads"],
        },
      });
      setWaitlistStatus("saved");
      setWaitlistForm({ email: "", phone: "" });
    } catch {
      setWaitlistStatus("error");
    }
  };

  return (
    <div className="bg-[#f6f1e7] text-[#173525]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0a1e14] text-white lg:min-h-[920px]">
        {/* Deep, glowing organic mesh background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(46,125,50,0.28)_0%,transparent_35%),radial-gradient(circle_at_80%_15%,rgba(230,126,34,0.06)_0%,transparent_30%),radial-gradient(circle_at_50%_80%,rgba(34,139,34,0.12)_0%,transparent_40%),linear-gradient(145deg,#0d251a_0%,#081a12_50%,#040f0a_100%)]" />
        
        {/* Soft breathing visual glow overlays */}
        <div className="absolute inset-0 opacity-40 mix-blend-color-dodge">
          <div className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="absolute top-[40%] -right-[10%] h-[50%] w-[50%] rounded-full bg-orange/5 blur-[100px]" />
        </div>

        <TopographicPattern className="animate-topo-drift absolute -inset-8 h-[110%] w-[110%] text-white/5 opacity-80" />

        <div className="relative mx-auto grid max-w-[1440px] gap-7 px-4 pb-12 pt-20 sm:px-8 sm:pt-28 lg:min-h-[920px] lg:grid-cols-[0.96fr_1.04fr] lg:gap-10 lg:px-10 lg:pb-0 lg:pt-28">
          <div className="order-2 animate-fade-up min-w-0 self-start pr-1 sm:order-2 lg:order-1 lg:pt-32 lg:pr-0">
            <h1 className="max-w-full break-words font-serif text-[clamp(2.9rem,12vw,3.35rem)] font-bold leading-[0.9] tracking-[-0.055em] text-[#fbf3e5] drop-shadow-[0_16px_38px_rgba(0,0,0,0.18)] sm:max-w-[760px] sm:text-8xl sm:leading-[0.88] lg:text-[6.75rem]">
              <span className="sm:whitespace-nowrap">India&apos;s Backyard,</span>
              <br />
              Unlocked.
            </h1>
            <p className="mt-5 max-w-[34rem] pr-2 text-[15px] font-medium leading-7 tracking-[-0.025em] text-white/78 sm:mt-7 sm:max-w-2xl sm:pr-0 sm:text-xl sm:leading-9 sm:text-white/82">
              Discover campsites, tent pitches, campervan stops, farm stays and glamping across India. Compare the stay,
              setting, access, essentials and unknowns before you pack.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <Link
                to="/explore"
                className="premium-focus inline-flex w-full items-center justify-center gap-3 rounded-lg bg-orange px-5 py-3.5 text-sm font-black text-white shadow-[0_18px_50px_rgba(230,126,34,0.34)] transition duration-200 hover:-translate-y-0.5 hover:bg-orange-dark hover:shadow-[0_24px_58px_rgba(230,126,34,0.42)] sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              >
                Explore camps
                <ArrowRight size={19} />
              </Link>
              <Link
                to="/host-your-land"
                className="premium-focus inline-flex w-full items-center justify-center gap-3 rounded-lg border border-white/55 bg-white/6 px-5 py-3.5 text-sm font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-white/12 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              >
                List your land
                <ArrowRight size={19} />
              </Link>
            </div>
          </div>

          <div
            className="order-1 relative min-h-[520px] self-start overflow-hidden rounded-[32px] border border-white/12 bg-white/8 shadow-[0_34px_95px_rgba(0,0,0,0.34)] ring-1 ring-white/8 sm:min-h-[620px] lg:order-2 lg:min-h-[820px] lg:rounded-none"
            style={{ clipPath: "polygon(5% 0, 100% 0, 100% 100%, 0 100%, 2% 78%, 0 55%, 3% 30%, 0 12%)", borderTopLeftRadius: 46 }}
          >
            <img
              src={mediaRegistry.hills.src}
              srcSet={mediaSrcSet(mediaRegistry.hills)}
              sizes="(min-width: 1024px) 45vw, 100vw"
              alt={mediaRegistry.hills.alt}
              className="absolute left-0 top-0 h-[72%] w-full object-cover object-[center_top] sm:h-[66%] sm:object-center"
            />
            <div className="absolute left-0 top-0 h-[72%] w-full bg-gradient-to-br from-transparent via-transparent to-[#0f2b1d]/12 sm:h-[66%]" />
            <div className="absolute inset-x-0 bottom-0 grid h-[28%] grid-cols-2 gap-px bg-white/20 sm:h-[34%]">
              <img
                src={mediaRegistry.forest.src}
                srcSet={mediaSrcSet(mediaRegistry.forest)}
                sizes="50vw"
                alt={mediaRegistry.forest.alt}
                className="h-full w-full object-cover"
              />
              <img
                src={mediaRegistry.tent.src}
                srcSet={mediaSrcSet(mediaRegistry.tent)}
                sizes="50vw"
                alt={mediaRegistry.tent.alt}
                className="h-full w-full object-cover"
              />
            </div>

            <HeroRoute className="route-dash absolute left-[22%] top-[7%] h-[64%] w-[56%] text-white/78 drop-shadow-[0_3px_8px_rgba(0,0,0,0.28)] sm:left-[26%] sm:top-[10%] sm:h-[62%] sm:w-[45%]" />
            <div className="absolute inset-0">
              {heroChecks.map((item) => (
                <div
                  key={item.label}
                  className={`absolute flex w-max items-center gap-2 rounded-full bg-[#f8f1e4]/96 px-2.5 py-1.5 text-[9px] font-black tracking-[-0.025em] text-[#173525] shadow-[0_18px_35px_rgba(0,0,0,0.24)] ring-1 ring-white/60 backdrop-blur sm:gap-3 sm:px-5 sm:py-3 sm:text-sm ${item.position}`}
                >
                  <CampInIcon name={item.iconName} className="h-3 w-3 text-orange sm:h-4 sm:w-4" />
                  {item.label}
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[#2f6548] text-[#f8f1e4] sm:h-8 sm:w-8">
                    <MapPinMark className="h-3 w-3 sm:h-[18px] sm:w-[18px]" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CampInDefinition />

      <CategoryExplorer />

      {/* Featured places */}
      <section className="bg-[#fffaf0] py-14 sm:py-24 border-b border-[#173525]/10">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="rounded-full bg-orange/10 border border-orange/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-orange">
                Review candidates
              </span>
              <h2 className="mt-4 font-serif text-3xl font-black tracking-[-0.04em] text-[#173525] sm:text-5xl">
                Featured places
              </h2>
              <p className="mt-4 text-sm font-medium leading-relaxed text-[#313831]/80 sm:text-base">
                These are research and review candidates, not a blanket promise that every site is currently available. Confirm permission, facilities, access, and local rules before travelling.
              </p>
            </div>
            <Link
              to="/explore"
              className="premium-focus shrink-0 inline-flex items-center gap-2 rounded-xl bg-orange hover:bg-orange-dark px-6 py-3.5 text-sm font-black text-white transition-all shadow-[0_15px_30px_rgba(230,126,34,0.15)] hover:-translate-y-0.5"
            >
              Explore All Campsites
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "coorg-estate",
                title: "Old Heritage Coffee Glade",
                location: "Madikeri, Karnataka",
                price: "₹1,500 / night",
                type: "Working Coffee Estate",
                tag: "BYOT + Campervan Fit",
                image: mediaRegistry.farm.src,
                imageAlt: mediaRegistry.farm.alt,
                bullets: ["Private Restroom", "Secure Fencing", "Estate Coffee"],
              },
              {
                id: "meghalaya-terrace",
                title: "The Cloud-Catcher Terrace",
                location: "Cherrapunji, Meghalaya",
                price: "₹1,200 / night",
                type: "High-Altitude Suspension",
                tag: "Valley Sunset View",
                image: mediaRegistry.hills.src,
                imageAlt: mediaRegistry.hills.alt,
                bullets: ["Western Restroom", "Living Root Bridge Trail", "Solo-Safe"],
              },
              {
                id: "jibhi-river",
                title: "The Banjar Valley Sanctuary",
                location: "Jibhi, Himachal Pradesh",
                price: "₹1,100 / night",
                type: "Ancient Cedar Riverside",
                tag: "Digital Detox Pitches",
                image: mediaRegistry.forest.src,
                imageAlt: mediaRegistry.forest.alt,
                bullets: ["Eco-Washroom", "Tirthan Stream Water", "Zero Engine Noise"],
              },
            ].map((camp) => (
              <Link
                key={camp.id}
                to={`/listing/${camp.id}`}
                className="group relative flex flex-col rounded-3xl border border-[#173525]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl overflow-hidden"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={camp.image}
                    alt={camp.imageAlt}
                    srcSet={mediaSrcSet({ ...mediaRegistry.farm, src: camp.image })}
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-forest px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm border border-white/10">
                    Regional editorial image
                  </div>
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-black uppercase tracking-wider text-forest shadow-sm">
                    {camp.tag}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <span className="text-xs font-black uppercase tracking-wider text-orange">{camp.type}</span>
                  <h3 className="mt-2 text-xl font-black leading-snug tracking-tight text-[#173525] group-hover:text-forest transition-colors">
                    {camp.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-[#6c716b]">
                    <MapPinMark className="h-3.5 w-3.5 text-orange" />
                    {camp.location}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {camp.bullets.map((bullet) => (
                      <span key={bullet} className="inline-flex items-center gap-1.5 rounded-xl bg-[#eef1e6]/60 px-3 py-1 text-xs font-bold text-[#2f6548]">
                        <span className="h-1 w-1 rounded-full bg-orange" />
                        {bullet}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-[#173525]/10 pt-5 flex items-center justify-between text-[#173525]">
                    <div>
                      <p className="text-[10px] font-bold text-[#6c716b] uppercase tracking-wider">Indicative listing price</p>
                      <p className="text-lg font-black tracking-tight text-forest">{camp.price}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-xl bg-forest text-white group-hover:bg-orange transition-colors px-4 py-2.5 text-xs font-black">
                      Review details
                      <ArrowRight size={13} className="transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TrustProcess />

      <HostInvitation />

      {/* CampIn guide vault */}
      <section className="bg-[#fffaf0] py-14 sm:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:px-10">
          <div>
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#173525]/25 text-[#173525] sm:mt-1">
                <CompassMark className="h-5 w-5" />
              </span>
              <h2 className="font-serif text-3xl font-black tracking-[-0.04em] text-[#173525] sm:text-5xl">Plan better before you leave</h2>
            </div>
            <div className="mt-3 h-0.5 w-8 bg-orange" />
            <p className="mt-4 max-w-xl text-sm font-medium leading-7 tracking-[-0.015em] text-[#313831] sm:mt-5 sm:text-base sm:leading-8">
              In-depth, downloadable guides to help you plan better adventures.
              <br />
              Created by campers, for campers.
            </p>
            <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-3">
              {guideCards.map((guide) => (
                <Link
                  key={guide.title}
                  to="/camping-guides"
                  className="group overflow-hidden rounded-xl border border-[#173525]/10 bg-white shadow-[0_10px_28px_rgba(23,53,37,0.08)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(23,53,37,0.16)]"
                >
                  <div className="relative h-40 overflow-hidden sm:h-44">
                    <img
                      src={guide.image}
                      alt={guide.imageAsset.alt}
                      srcSet={mediaSrcSet(guide.imageAsset)}
                      sizes="(min-width: 640px) 18vw, 84vw"
                      className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.025]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/12 to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-orange px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white">
                      CampIn guide
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-black leading-6 tracking-[-0.02em] text-[#173525] sm:min-h-12">{guide.title}</h3>
                    <p className="mt-2 line-clamp-2 text-xs font-medium leading-5 text-[#313831]">{guide.body}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              to="/camping-guides"
              className="premium-focus mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#173525]/45 bg-transparent px-5 py-3.5 text-sm font-black text-[#173525] transition duration-200 hover:-translate-y-0.5 hover:border-orange hover:text-orange sm:mt-6 sm:py-4 sm:text-base"
            >
              Unlock all guides
              <BookOpen size={18} />
            </Link>
          </div>

          <div id="founding-community" className="relative overflow-hidden rounded-[14px] bg-[#143522] p-5 text-white shadow-[0_28px_70px_rgba(23,53,37,0.28)] ring-1 ring-white/10 sm:p-8 lg:p-9">
            <img
              src="/images/campin-community-tent-sketch.png"
              alt="Gold line art of a tent and pine trees under stars"
              className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-82"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,53,34,0.98)_0%,rgba(20,53,34,0.92)_43%,rgba(20,53,34,0.42)_100%),radial-gradient(circle_at_86%_12%,rgba(230,126,34,0.13),transparent_22%)]" />
            <div className="relative max-w-[610px]">
              <h2 className="max-w-[430px] font-serif text-3xl font-black leading-[0.94] tracking-[-0.045em] text-[#f8f1e4] sm:text-5xl">
                Be part of the founding community
              </h2>
              <div className="mt-3 h-0.5 w-8 bg-orange" />
              <p className="mt-4 max-w-[560px] text-xs font-medium leading-6 tracking-[-0.015em] text-white/74 sm:mt-5 sm:text-sm sm:leading-7">
                For the next two months, CampIn is focused on building a safety-conscious camper community with useful guide drops, route support, and host suggestions. Join the early community and help shape which places get reviewed first.
              </p>

              <div className="mt-6 space-y-4 sm:mt-7">
                {[
                  ["Early access", "Be the first to find new places and new guides."],
                  ["Shape the network", "Your feedback helps us build it the right way."],
                ].map(([title, body]) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange/70 text-orange">
                      <CampInIcon name="host-present" className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black tracking-[-0.02em] text-[#f8f1e4]">{title}</h3>
                      <p className="mt-1 max-w-[310px] text-xs font-medium leading-5 text-white/64">{body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={submitWaitlist} className="mt-6 grid gap-2 rounded-lg bg-white p-2.5 shadow-[0_24px_55px_rgba(0,0,0,0.18)] sm:mt-7 sm:grid-cols-[1fr_0.9fr_auto]">
                <label className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-orange" size={18} />
                  <input
                    required
                    type="email"
                    aria-label="Email address"
                    placeholder="Your email address"
                    value={waitlistForm.email}
                    onChange={(event) => setWaitlistForm((current) => ({ ...current, email: event.target.value }))}
                    className="premium-focus h-11 w-full rounded-md bg-[#f6f1e7] pl-10 pr-3 text-xs font-bold tracking-[-0.01em] text-[#173525] outline-none"
                  />
                </label>
                <label className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-orange" size={18} />
                  <input
                    type="tel"
                    aria-label="Phone number"
                    placeholder="+91 phone number"
                    value={waitlistForm.phone}
                    onChange={(event) => setWaitlistForm((current) => ({ ...current, phone: event.target.value }))}
                    className="premium-focus h-11 w-full rounded-md bg-[#f6f1e7] pl-10 pr-3 text-xs font-bold tracking-[-0.01em] text-[#173525] outline-none"
                  />
                </label>
                <button type="submit" disabled={waitlistStatus === "saving"} className="premium-focus inline-flex h-11 items-center justify-center rounded-md bg-orange px-5 text-xs font-black text-white transition duration-300 hover:bg-orange-dark disabled:cursor-wait disabled:opacity-70">
                  {waitlistStatus === "saving" ? "Saving..." : "Join waitlist"}
                </button>
              </form>
              <p className="mt-3 text-xs font-semibold text-white/50">
                {waitlistStatus === "saved"
                  ? "You are on the CampIn list. Watch for guide drops, route notes, and community updates."
                  : waitlistStatus === "error"
                    ? "Could not save right now. Please try again."
                    : "No spam. Unsubscribe anytime. Submitting does not confirm any booking."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* From the Journal (Recent Blog Posts) */}
      <section className="bg-[#fffaf0] py-14 sm:py-24 border-t border-[#173525]/10">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="rounded-full bg-forest/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#2f6548]">
                CampIn Journal
              </span>
              <h2 className="mt-4 font-serif text-3xl font-black tracking-[-0.04em] text-[#173525] sm:text-5xl">
                Recent Journal Entries
              </h2>
              <p className="mt-3 text-sm font-medium text-[#313831] max-w-xl">
                Read practical insights, legal guidelines, and safety manuals from our boots-on-the-ground camping team.
              </p>
            </div>
            <Link
              to="/blog"
              className="premium-focus inline-flex items-center gap-2 rounded-lg bg-forest text-white px-5 py-3 text-sm font-black transition duration-300 hover:bg-forest-light sm:px-6 sm:py-3.5"
            >
              Explore all journal posts
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeBlogs.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-[#173525]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-orange/20"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-forest/5">
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 rounded-lg bg-[#fffaf0] px-3 py-1 text-xs font-black text-orange shadow-sm">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-textgrey">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={13} className="text-orange" />
                      {new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(post.publishedAt))}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={13} className="text-orange" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-black leading-snug text-[#173525] group-hover:text-orange transition-colors min-h-[56px] line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-xs font-medium leading-5 text-[#313831]/80">
                    {post.summary}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-black text-[#2f6548] group-hover:text-orange transition-colors">
                    Read article
                    <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
