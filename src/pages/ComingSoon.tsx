import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  Car,
  CheckCircle,
  ClipboardCheck,
  Mail,
  MapPin,
  MessageCircle,
  Shield,
  Tent,
  Users,
} from "lucide-react";
import CampfireSignup from "../components/newsletter/CampfireSignup";
import { CamperWaitlistForm, HostInterestForm, RoadStopLeadForm } from "../components/validation/ValidationForms";

const proofTargets = [
  { value: "500", label: "email subscribers" },
  { value: "100", label: "high-intent campers" },
  { value: "30", label: "host applications" },
  { value: "10", label: "candidate sites" },
  { value: "3", label: "manual attempts" },
  { value: "1", label: "paid pilot stay" },
];

const validationLanes = [
  {
    icon: Tent,
    title: "Campers",
    text: "Tell CampIn where you want to camp, what scares you, and whether you have your own gear.",
  },
  {
    icon: Shield,
    title: "Hosts",
    text: "Apply with a private farm, estate, homestay, orchard, terrace, or quiet land parcel.",
  },
  {
    icon: Car,
    title: "Road stops",
    text: "Suggest safe overnight stops with parking, washrooms, water, power, and a local contact.",
  },
  {
    icon: MessageCircle,
    title: "Community",
    text: "Join the trust-first WhatsApp and newsletter loop before CampIn becomes a booking engine.",
  },
];

const launchRules = [
  "No instant bookings until verification and legal pages are ready.",
  "Every listing must separate verified, host-declared, community-reported, and unknown claims.",
  "Bangalore, Coorg, Wayanad, Chikmagalur, Ramanagara, and Kanakapura are the first validation wedge.",
  "The first pilots are manually matched so CampIn learns before it scales.",
];

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-offwhite">
      <section className="relative overflow-hidden bg-forest pt-28 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1533873984035-25970ab07461?w=1800&q=80"
            alt="A lit tent in a quiet Indian-style outdoor landscape"
            className="h-full w-full object-cover opacity-42"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/88 to-forest/50" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-4 pb-14 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-lg bg-orange px-4 py-2 text-sm font-extrabold text-white">
              <Bell size={17} />
              CampIn is opening soon
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-7xl">
              India&apos;s outdoors, verified.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
              CampIn is building the trust layer for camping in India: permissioned places, own-tent stays, road-stop
              intelligence, real washroom/water checks, and a community that helps first-time campers feel ready.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#lead-forms"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange px-6 py-4 font-extrabold text-white transition-colors hover:bg-orange-dark"
              >
                Join early access
                <ArrowRight size={18} />
              </a>
              <Link
                to="/community"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 py-4 font-extrabold text-white backdrop-blur transition-colors hover:bg-white/16"
              >
                See community
                <Users size={18} />
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/15 bg-white/95 p-5 text-forest shadow-2xl">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-orange">
              <ClipboardCheck size={17} />
              90-day proof gate
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight">We launch the marketplace only after proof.</h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {proofTargets.map((target) => (
                <div key={target.label} className="rounded-lg border border-forest/10 bg-offwhite p-4">
                  <p className="text-3xl font-black text-forest">{target.value}</p>
                  <p className="mt-1 text-sm font-bold leading-5 text-textgrey">{target.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-textgrey">
              This keeps CampIn from becoming a fake inventory site. We validate demand, qualify hosts, then run manual
              pilots before payment and booking automation.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-forest/10 bg-white py-10">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {validationLanes.map((lane) => {
            const Icon = lane.icon;
            return (
              <article key={lane.title} className="rounded-lg border border-forest/10 bg-offwhite p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest text-white">
                  <Icon size={21} />
                </div>
                <h2 className="mt-4 text-lg font-black text-forest">{lane.title}</h2>
                <p className="mt-2 text-sm leading-6 text-textgrey">{lane.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="lead-forms" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="font-black text-orange">Lead capture machine</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-forest sm:text-4xl">
              Three forms decide what CampIn becomes first.
            </h2>
            <p className="mt-4 text-base leading-7 text-textgrey">
              CampIn should capture demand, supply, and route infrastructure before spending energy on a heavy booking
              engine. These forms save locally now and are structured for Tally, Airtable, and later Supabase.
            </p>
            <div className="mt-6 space-y-3">
              {launchRules.map((rule) => (
                <div key={rule} className="flex gap-3 rounded-lg border border-forest/10 bg-white p-4">
                  <CheckCircle size={19} className="mt-0.5 shrink-0 text-orange" />
                  <p className="text-sm font-semibold leading-6 text-forest">{rule}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-sky-mist p-5">
              <p className="flex items-center gap-2 font-black text-forest">
                <Mail size={18} className="text-orange" />
                Newsletter layer
              </p>
              <p className="mt-2 text-sm leading-6 text-textgrey">
                The Campfire keeps people warm between signup and supply. It should be useful every week, even before
                bookings exist.
              </p>
            </div>
          </div>

          <div className="space-y-7">
            <CamperWaitlistForm />
            <HostInterestForm />
            <RoadStopLeadForm />
            <CampfireSignup />
          </div>
        </div>
      </section>

      <section className="border-t border-forest/10 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="font-black text-orange">First region</p>
            <h2 className="mt-2 text-3xl font-black text-forest">Bangalore and South India first.</h2>
            <p className="mt-4 text-base leading-7 text-textgrey">
              This wedge is narrow enough to validate quickly and large enough to matter: Bangalore weekend campers,
              Coorg coffee estates, Wayanad hosted land, Chikmagalur escapes, Ramanagara/Kanakapura day-to-night trips,
              and road-stop routes between them.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Bangalore", "Coorg", "Wayanad", "Chikmagalur", "Ramanagara", "Kanakapura"].map((region) => (
              <div key={region} className="flex items-center gap-3 rounded-lg bg-offwhite p-4">
                <MapPin size={18} className="shrink-0 text-orange" />
                <span className="font-black text-forest">{region}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
