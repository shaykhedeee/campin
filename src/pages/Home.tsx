import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { HeroRoute, TopographicPattern } from "../components/vectors/CampInVectors";
import { submitMvpLead } from "../lib/mvpLeadStore";
import CampInIcon from "../components/icons/CampInIcon";
import { blogPosts } from "../data/blogPosts";

const heroChecks = [
  { label: "Permission first", iconName: "permission", position: "left-[22%] top-[12%]" },
  { label: "Washroom check", iconName: "washroom", position: "left-[8%] top-[31%]" },
  { label: "Water check", iconName: "water", position: "left-[19%] top-[49%]" },
  { label: "Host reviewed", iconName: "host-present", position: "left-[15%] top-[66%]" },
] as const;

const principles = [
  {
    title: "Respect the land",
    body: "We start with permission and follow local rules, always.",
    iconName: "permission",
  },
  {
    title: "Trust over hype",
    body: "Every claim is checked and timestamped by humans.",
    iconName: "reviewed",
  },
  {
    title: "Curated, not crowded",
    body: "Better experiences over more listings. Quality beats quantity.",
    iconName: "forest-edge",
  },
  {
    title: "Community first",
    body: "Share knowledge, help hosts, and grow the community.",
    iconName: "host-present",
  },
] as const;

const verificationChecks = [
  { title: "Permission", body: "Landowner approval and local guidelines confirmed.", iconName: "permission" },
  { title: "Washroom", body: "Clean and functional washroom access verified.", iconName: "washroom" },
  { title: "Water", body: "Potable or safe water source available on-site.", iconName: "water" },
  { title: "Safety", body: "Host background review and location safety check.", iconName: "first-aid" },
  { title: "On-ground check", body: "Real photos and notes from our verification visits.", iconName: "exact-pin" },
] as const;

const guideCards = [
  {
    title: "Vanlife Guide to South India",
    body: "Routes, seasons, stays and local tips.",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=700&q=80",
  },
  {
    title: "Backyard Camping 101",
    body: "Gear, etiquette, safety and more.",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=700&q=80",
  },
  {
    title: "Monsoon Camping in India",
    body: "Where to go, what to pack.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=700&q=80",
  },
];

const heroPrinciples = [
  {
    title: "Permission first",
    body: "Every place starts with respect and landowner approval.",
    iconName: "permission",
  },
  {
    title: "Verified by humans",
    body: "Real checks, real hosts, real photos. No fake badges.",
    iconName: "reviewed",
  },
  {
    title: "Built for our community",
    body: "Share, learn, suggest places, and help CampIn grow.",
    iconName: "family-safe",
  },
] as const;

export default function Home() {
  const [waitlistForm, setWaitlistForm] = useState({ email: "", phone: "" });
  const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

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
          <div className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] animate-pulse rounded-full bg-emerald-500/10 blur-[120px] transition-all duration-[8000ms]" />
          <div className="absolute top-[40%] -right-[10%] h-[50%] w-[50%] animate-pulse rounded-full bg-orange/5 blur-[100px] transition-all duration-[6000ms]" style={{ animationDelay: "2s" }} />
        </div>

        <TopographicPattern className="animate-topo-drift absolute -inset-8 h-[110%] w-[110%] text-white/5 opacity-80" />

        <div className="relative mx-auto grid max-w-[1440px] gap-8 px-5 pb-10 pt-24 sm:px-8 sm:pt-32 lg:min-h-[920px] lg:grid-cols-[0.96fr_1.04fr] lg:gap-10 lg:px-10 lg:pb-0 lg:pt-28">
          <div className="animate-fade-up min-w-0 self-start pr-1 lg:pt-32 lg:pr-0">
            <h1 className="max-w-full break-words font-serif text-[clamp(2.9rem,12vw,3.35rem)] font-bold leading-[0.9] tracking-[-0.055em] text-[#fbf3e5] drop-shadow-[0_16px_38px_rgba(0,0,0,0.18)] sm:max-w-[760px] sm:text-8xl sm:leading-[0.88] lg:text-[6.75rem]">
              <span className="sm:whitespace-nowrap">India&apos;s Backyard,</span>
              <br />
              Unlocked.
            </h1>
            <p className="mt-5 max-w-[34rem] pr-2 text-[15px] font-medium leading-7 tracking-[-0.025em] text-white/78 sm:mt-7 sm:max-w-2xl sm:pr-0 sm:text-xl sm:leading-9 sm:text-white/82">
              Wake up to views, not hotel bills. Discover safe terraces, private farms, and permission-first camping
              leads for India&apos;s early outdoor community.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <Link
                to="/coming-soon"
                className="premium-focus inline-flex w-full items-center justify-center gap-3 rounded-lg bg-orange px-5 py-3.5 text-sm font-black text-white shadow-[0_18px_50px_rgba(230,126,34,0.34)] transition duration-300 hover:-translate-y-0.5 hover:bg-orange-dark hover:shadow-[0_24px_58px_rgba(230,126,34,0.42)] sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              >
                Join the community
                <ArrowRight size={19} />
              </Link>
              <Link
                to="/camping-guides"
                className="premium-focus inline-flex w-full items-center justify-center gap-3 rounded-lg border border-white/55 bg-white/6 px-5 py-3.5 text-sm font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/12 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              >
                Unlock camping guides
                <BookOpen size={19} />
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:mt-14 sm:grid-cols-3 sm:gap-5">
              {heroPrinciples.map((item) => (
                <div key={item.title} className="group rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:border-l sm:border-y-0 sm:border-r-0 sm:bg-transparent sm:pl-4">
                  <CampInIcon name={item.iconName} className="mb-3 h-5 w-5 text-[#fbf3e5] transition group-hover:text-orange sm:mb-4 sm:h-6 sm:w-6" />
                  <p className="text-sm font-black tracking-[-0.025em] text-[#fbf3e5] sm:text-base">{item.title}</p>
                  <p className="mt-1.5 text-xs font-medium leading-5 text-white/64 sm:mt-2 sm:text-sm sm:leading-6">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative min-h-[430px] self-start overflow-hidden rounded-[28px] border border-white/12 bg-white/8 shadow-[0_34px_95px_rgba(0,0,0,0.34)] ring-1 ring-white/8 sm:min-h-[620px] lg:min-h-[820px] lg:rounded-none"
            style={{ clipPath: "polygon(5% 0, 100% 0, 100% 100%, 0 100%, 2% 78%, 0 55%, 3% 30%, 0 12%)", borderTopLeftRadius: 46 }}
          >
            <img
              src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1800&q=85"
              alt="Private outdoor camping landscape"
              className="animate-image-breathe absolute left-0 top-0 h-[66%] w-full object-cover"
            />
            <div className="absolute left-0 top-0 h-[66%] w-full bg-gradient-to-br from-transparent via-transparent to-[#0f2b1d]/10" />
            <div className="absolute inset-x-0 bottom-0 grid h-[34%] grid-cols-2 gap-px bg-white/20">
              <img
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=80"
                alt="Quiet hammock campsite"
                className="h-full w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=900&q=80"
                alt="Tent under evening sky"
                className="h-full w-full object-cover"
              />
            </div>

            <HeroRoute className="route-dash absolute left-[28%] top-[9%] h-[60%] w-[44%] text-white/78 drop-shadow-[0_3px_8px_rgba(0,0,0,0.28)] sm:left-[26%] sm:top-[10%] sm:h-[62%] sm:w-[45%]" />
            <div className="absolute inset-0">
              {heroChecks.map((item, index) => (
                <div
                  key={item.label}
                  className={`animate-float-soft absolute flex w-max items-center gap-2 rounded-full bg-[#f8f1e4]/96 px-3 py-2 text-[10px] font-black tracking-[-0.025em] text-[#173525] shadow-[0_18px_35px_rgba(0,0,0,0.24)] ring-1 ring-white/60 backdrop-blur sm:gap-3 sm:px-5 sm:py-3 sm:text-sm ${item.position}`}
                  style={{ animationDelay: `${index * 0.35}s` }}
                >
                  <CampInIcon name={item.iconName} className="h-3.5 w-3.5 text-orange sm:h-4 sm:w-4" />
                  {item.label}
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#2f6548] text-[#f8f1e4] sm:h-8 sm:w-8">
                    <MapPin size={14} className="fill-[#2f6548] sm:h-[18px] sm:w-[18px]" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Exists Section */}
      <section id="trust" className="border-b border-[#173525]/10 bg-[#fffaf0] py-14 sm:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10 lg:px-10">
          <div>
            <h2 className="font-serif text-3xl font-black tracking-[-0.04em] text-[#173525] sm:text-5xl">Why CampIn exists</h2>
            <div className="mt-3 h-0.5 w-8 bg-orange" />
            <p className="mt-4 max-w-xl text-sm font-medium leading-7 tracking-[-0.015em] text-[#313831] sm:mt-5 sm:text-base sm:leading-8">
              India has incredible backyards. But finding the right place to camp legally, safely, and respectfully is hard.
            </p>
            <p className="mt-4 max-w-xl text-sm font-extrabold leading-7 tracking-[-0.018em] text-[#173525] sm:mt-5 sm:text-base sm:leading-8">
              CampIn is building the country&apos;s first permission-first camping community and trust ledger.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="group rounded-2xl border border-[#173525]/10 bg-white/45 px-5 py-5 text-left transition duration-300 hover:-translate-y-1 sm:border-l sm:border-y-0 sm:border-r-0 sm:bg-transparent sm:px-8 sm:py-2 sm:text-center"
              >
                <CampInIcon name={principle.iconName} className="h-8 w-8 text-[#2f6548] transition group-hover:text-orange sm:mx-auto sm:h-12 sm:w-12" />
                <h3 className="mt-4 text-base font-black tracking-[-0.025em] text-[#173525] sm:mt-6 sm:text-lg">{principle.title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-[#313831] sm:mt-3">{principle.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Pillars Section */}
      <section className="bg-[#fffdf9] py-14 sm:py-24 border-b border-[#173525]/10">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-forest/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#2f6548]">
              Trust Infrastructure
            </span>
            <h2 className="mt-4 font-serif text-3xl font-black tracking-[-0.04em] text-[#173525] sm:text-5xl">
              The Four CampIn Pillars
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-12 bg-orange" />
            <p className="mt-4 text-sm font-medium leading-7 text-[#313831] sm:text-base sm:leading-8">
              We verify and audit every campsite across these four core markers. No shortcuts, no fake badges.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "1. Landowner Permission",
                description: "We audit property papers, local authority permissions, and host codes of conduct so you camp 100% legally.",
                icon: "permission",
                benefit: "Zero harassment, zero disputes"
              },
              {
                title: "2. Washroom Standard",
                description: "Clean, functional water closets or dry toilets. We audit sanitization frequency, privacy locks, and layout.",
                icon: "washroom",
                benefit: "Clean and family-safe sanitization"
              },
              {
                title: "3. Verified Water",
                description: "On-site safe drinking water source, borewell water availability, or clear advice on camper-carried water requirements.",
                icon: "water",
                benefit: "Hydration assurance before arrival"
              },
              {
                title: "4. Exact Coordinates",
                description: "No generic landmarks. You get precision location pins, photos, road access rules, and driving guidelines.",
                icon: "exact-pin",
                benefit: "No lost detours or safety surprises"
              }
            ].map((pillar) => (
              <div key={pillar.title} className="group relative rounded-2xl border border-[#173525]/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-orange/20">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest/5 text-forest transition-colors group-hover:bg-orange/10 group-hover:text-orange">
                  <CampInIcon name={pillar.icon as any} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-black tracking-tight text-[#173525]">{pillar.title}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-[#313831]/80">{pillar.description}</p>
                <div className="mt-5 border-t border-[#173525]/5 pt-3">
                  <span className="text-xs font-black uppercase tracking-wider text-orange">
                    {pillar.benefit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification stage section */}
      <section className="relative overflow-hidden bg-[#eef1e6] py-14 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_38%,rgba(47,101,72,0.08),transparent_30%),linear-gradient(180deg,rgba(255,250,240,0.3),transparent_42%)]" />
        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-black leading-[0.98] tracking-[-0.04em] text-[#173525] sm:text-5xl">
              What gets checked before a place goes live
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-8 bg-orange" />
          </div>

          <div className="mt-8 grid items-center gap-7 sm:mt-12 lg:grid-cols-[1fr_500px]">
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-5 md:gap-4">
              {verificationChecks.map((check) => (
                <div
                  key={check.title}
                  className="group rounded-2xl border border-[#173525]/10 bg-white/28 px-4 py-5 text-center md:border-l md:border-y-0 md:border-r-0 md:bg-transparent md:px-5 md:first:border-l-0"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center text-[#173525] sm:h-12 sm:w-12">
                    <CampInIcon name={check.iconName} className="h-7 w-7 text-[#173525] transition group-hover:text-orange sm:h-[34px] sm:w-[34px]" />
                  </div>
                  <h3 className="mt-3 text-sm font-black tracking-[-0.02em] text-[#173525] sm:mt-5 sm:text-base">{check.title}</h3>
                  <p className="mt-2 text-xs font-medium leading-5 text-[#313831] sm:mt-3 sm:text-sm sm:leading-6">{check.body}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src="/images/campin-verification-scenery.png"
                alt="Line art of a campsite tent below mountain ridges and pine forest"
                className="w-full max-w-[370px] mix-blend-multiply opacity-88 contrast-125 saturate-50 lg:max-w-[660px]"
                loading="lazy"
              />
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center font-serif text-base italic text-[#6c716b] sm:mt-8 sm:text-lg">
            Every check includes source, photo, timestamp, and reviewer.
          </p>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-[#eef1e6]/60 py-14 sm:py-24 border-b border-[#173525]/10">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="rounded-full bg-forest/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#2f6548]">
              Operational Workflow
            </span>
            <h2 className="mt-4 font-serif text-3xl font-black tracking-[-0.04em] text-[#173525] sm:text-5xl">
              How We Verify Campsites
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-12 bg-orange" />
          </div>

          <div className="mt-12 relative">
            {/* Connecting line on desktop */}
            <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-[#2f6548]/15 -translate-y-1/2 hidden lg:block" />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
              {[
                {
                  step: "01",
                  title: "Scout & Research",
                  desc: "We parse community lists, geographic databases, and caravan routes to surface remote farm and lake stays.",
                  icon: "route"
                },
                {
                  step: "02",
                  title: "On-Ground Audit",
                  desc: "Our verification team visits the site to record photos, check amenities, inspect washrooms, and test cellular reception.",
                  icon: "reviewed"
                },
                {
                  step: "03",
                  title: "Trust Ledger Entry",
                  desc: "Every verified data point is logged with a human reviewer name, timestamp, and unedited proof photos.",
                  icon: "permission"
                },
                {
                  step: "04",
                  title: "Gated Booking",
                  desc: "Camper coordinates and contact info remain protected behind a respectful request-to-book relay mechanism.",
                  icon: "campervan"
                }
              ].map((item) => (
                <div key={item.step} className="group rounded-2xl bg-white p-6 border border-[#173525]/10 shadow-sm transition duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-black text-orange/30 group-hover:text-orange transition-colors">
                      {item.step}
                    </span>
                    <div className="h-10 w-10 rounded-lg bg-[#2f6548]/5 text-[#2f6548] flex items-center justify-center">
                      <CampInIcon name={item.icon as any} className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-base font-black text-[#173525]">{item.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-[#313831]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pre-launch guide vault */}
      <section className="bg-[#fffaf0] py-14 sm:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:px-10">
          <div>
            <h2 className="font-serif text-3xl font-black tracking-[-0.04em] text-[#173525] sm:text-5xl">Pre-launch guide vault</h2>
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
                  className="group overflow-hidden rounded-xl border border-[#173525]/10 bg-white shadow-[0_10px_28px_rgba(23,53,37,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(23,53,37,0.16)]"
                >
                  <div className="relative h-40 overflow-hidden sm:h-44">
                    <img src={guide.image} alt={guide.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/12 to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-orange px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white">
                      Coming soon
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
              className="premium-focus mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#173525]/45 bg-transparent px-5 py-3.5 text-sm font-black text-[#173525] transition duration-300 hover:-translate-y-0.5 hover:border-orange hover:text-orange sm:mt-6 sm:py-4 sm:text-base"
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
                Get early access to guides, behind-the-scenes updates, and the first permission-first camping leads.
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
                  ? "You are on the founding list. We stored this lead locally and will sync to Supabase when connected."
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
            {blogPosts.slice(0, 3).map((post) => (
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

      {/* Call to action section */}
      <section className="relative overflow-hidden bg-[#0f2b1d] px-4 py-16 text-center text-white sm:px-6 lg:px-8">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1800&q=80"
          alt="Warm outdoor landscape"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[#0f2b1d]/56" />
        <div className="relative mx-auto max-w-4xl">
          <h2 className="font-serif text-4xl font-black tracking-[-0.04em] text-[#f8f1e4] sm:text-5xl">
            Camp more. Respect more. Connect more.
          </h2>
          <p className="mt-4 text-xl text-white/78">India&apos;s backyard is calling.</p>
        </div>
      </section>
    </div>
  );
}
