import { Link } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  CheckCircle,
  Flame,
  Mail,
  MapPin,
  MessageCircle,
  Shield,
  Tent,
  Users,
} from "lucide-react";
import CampfireSignup from "../components/newsletter/CampfireSignup";
import { CamperWaitlistForm } from "../components/validation/ValidationForms";

const groups = [
  {
    name: "CampIn Announcements",
    purpose: "Founder updates, pilot calls, safety notes, and newsletter drops.",
    target: "Admin-only",
  },
  {
    name: "CampIn Bangalore Core",
    purpose: "The first demand circle for weekend campers, own-gear users, and early testers.",
    target: "100 members",
  },
  {
    name: "CampIn South India Routes",
    purpose: "Coorg, Wayanad, Chikmagalur, Ramanagara, Kanakapura, and road-stop intelligence.",
    target: "150 members",
  },
  {
    name: "CampIn Own-Tent Campers",
    purpose: "People who want permissioned places to pitch their own tent.",
    target: "100 members",
  },
  {
    name: "CampIn Founding Hosts",
    purpose: "Private landowners, estates, farms, homestays, and road-stop candidates.",
    target: "50 hosts",
  },
  {
    name: "CampIn First-Time Campers",
    purpose: "Beginner safety, packing, family concerns, and confidence before first trip.",
    target: "100 members",
  },
];

const rituals = [
  "Monday: where do you want to camp and what is stopping you?",
  "Tuesday: one permission, washroom, water, route, or safety answer.",
  "Wednesday: one Bangalore/South India route prompt.",
  "Thursday: host spotlight or would-you-camp-here poll.",
  "Friday: The Campfire preview and weekend checklist.",
  "Weekend: trip photos, campsite feedback, and member stories.",
];

const rules = [
  "No spam, promotions, politics, or unrelated forwards.",
  "Do not share private pins, private contacts, or sensitive locations without consent.",
  "Mark unverified information as unverified.",
  "No unsafe or illegal camping instructions.",
  "Respect hosts, locals, wildlife, quiet hours, and fire rules.",
  "Report safety, harassment, payment, or host concerns immediately.",
];

const metrics = [
  { value: "350", label: "90-day WhatsApp members" },
  { value: "120", label: "weekly active members" },
  { value: "60", label: "UGC submissions" },
  { value: "100", label: "referral signups" },
];

export default function Community() {
  return (
    <div className="min-h-screen bg-offwhite pt-28">
      <section className="relative overflow-hidden bg-forest text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1800&q=80"
            alt="Friends around a warm campsite fire"
            className="h-full w-full object-cover opacity-34"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/90 to-forest/55" />
        </div>

        <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-lg bg-orange px-4 py-2 text-sm font-black text-white">
              <MessageCircle size={17} />
              WhatsApp-first, trust-first
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              The CampIn community makes camping in India easier to trust.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
              CampIn starts with people, not inventory. Join the group that helps verify routes, share safety concerns,
              suggest hosts, and make permissioned camping normal for Indians.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#join"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange px-6 py-4 font-black text-white transition-colors hover:bg-orange-dark"
              >
                Join community
                <ArrowRight size={18} />
              </a>
              <Link
                to="/coming-soon"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 py-4 font-black text-white backdrop-blur transition-colors hover:bg-white/16"
              >
                Early access
                <Tent size={18} />
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/15 bg-white/95 p-5 text-forest shadow-2xl">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-orange">
              <Users size={17} />
              Community goals
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-lg bg-offwhite p-4">
                  <p className="text-3xl font-black text-forest">{metric.value}</p>
                  <p className="mt-1 text-sm font-bold leading-5 text-textgrey">{metric.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-textgrey">
              These are quality targets, not vanity numbers. CampIn needs active, helpful members who generate trust
              signals, host referrals, and honest objections.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-black text-orange">Community structure</p>
            <h2 className="mt-2 text-3xl font-black text-forest sm:text-4xl">One community, focused rooms.</h2>
          </div>
          <Link to="/validation" className="inline-flex items-center gap-2 font-black text-forest hover:text-orange">
            Open validation dashboard
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <article key={group.name} className="rounded-lg border border-forest/10 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest text-white">
                <MessageCircle size={21} />
              </div>
              <h3 className="mt-4 text-lg font-black text-forest">{group.name}</h3>
              <p className="mt-2 text-sm leading-6 text-textgrey">{group.purpose}</p>
              <p className="mt-4 inline-flex rounded-lg bg-orange/10 px-3 py-1 text-sm font-black text-orange">
                {group.target}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-forest/10 bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="font-black text-orange">Weekly rhythm</p>
            <h2 className="mt-2 text-3xl font-black text-forest">Community should feel useful every week.</h2>
            <p className="mt-4 text-base leading-7 text-textgrey">
              The best community habit is simple: answer real camping questions, gather safety objections, and turn
              useful member knowledge into better CampIn pages, routes, and host checks.
            </p>
          </div>
          <div className="grid gap-3">
            {rituals.map((ritual) => (
              <div key={ritual} className="flex gap-3 rounded-lg bg-offwhite p-4">
                <Flame size={19} className="mt-0.5 shrink-0 text-orange" />
                <p className="text-sm font-semibold leading-6 text-forest">{ritual}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div>
          <p className="font-black text-orange">Rules</p>
          <h2 className="mt-2 text-3xl font-black text-forest">Trust is moderated.</h2>
          <div className="mt-6 space-y-3">
            {rules.map((rule) => (
              <div key={rule} className="flex gap-3 rounded-lg border border-forest/10 bg-white p-4">
                <Shield size={19} className="mt-0.5 shrink-0 text-orange" />
                <p className="text-sm font-semibold leading-6 text-forest">{rule}</p>
              </div>
            ))}
          </div>
        </div>
        <div id="join" className="space-y-6">
          <div className="rounded-lg bg-forest p-6 text-white">
            <p className="flex items-center gap-2 font-black text-orange">
              <CheckCircle size={19} />
              Join flow
            </p>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Fill the camper form, opt into WhatsApp if you want community access, accept the responsible camping
              pledge, then CampIn routes you into the most relevant group.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["Waitlist", "Pledge", "Invite", "Newsletter"].map((step) => (
                <div key={step} className="rounded-lg bg-white/10 p-3 text-sm font-black text-white">
                  {step}
                </div>
              ))}
            </div>
          </div>
          <CamperWaitlistForm />
          <CampfireSignup />
        </div>
      </section>

      <section className="border-t border-forest/10 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <div className="rounded-lg bg-offwhite p-5">
            <Camera size={22} className="text-orange" />
            <h3 className="mt-4 font-black text-forest">Submit UGC</h3>
            <p className="mt-2 text-sm leading-6 text-textgrey">
              Real campsite photos, route notes, and host stories become CampIn&apos;s trust moat.
            </p>
          </div>
          <div className="rounded-lg bg-offwhite p-5">
            <MapPin size={22} className="text-orange" />
            <h3 className="mt-4 font-black text-forest">Suggest places</h3>
            <p className="mt-2 text-sm leading-6 text-textgrey">
              Members can suggest private land, farms, estates, and road stops for founder verification.
            </p>
          </div>
          <div className="rounded-lg bg-offwhite p-5">
            <Mail size={22} className="text-orange" />
            <h3 className="mt-4 font-black text-forest">Read The Campfire</h3>
            <p className="mt-2 text-sm leading-6 text-textgrey">
              Weekly route, safety, host, and verification notes keep CampIn useful before bookings scale.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
