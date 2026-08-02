import { CheckCircle, Flame, Shield, Users } from "lucide-react";
import CampfireSignup from "../components/newsletter/CampfireSignup";
import { CamperWaitlistForm } from "../components/validation/ValidationForms";

const benefits = [
  "Early access to permissioned camping spots around Bangalore and South India.",
  "Safety notes that explain permission, washrooms, arrival time, and local support.",
  "The weekly Campfire newsletter with route and host progress.",
  "Pilot-trip consideration when a reviewed host and route fit your request.",
];

export default function Signup() {
  return (
    <div className="min-h-screen bg-offwhite pt-28 pb-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <section>
          <p className="font-bold text-orange">Camper community</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight text-forest sm:text-5xl">
            Help shape India's most useful camping community.
          </h1>
          <p className="mt-4 text-lg leading-8 text-textgrey">
            CampIn is starting with Bangalore, Coorg, Wayanad, Chikmagalur, Ramanagara, and Kanakapura. Share what
            you want to find so we can review the right camps, stays, routes, and road stops first.
          </p>

          <div className="mt-8 grid gap-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex gap-3 rounded-2xl border border-forest/10 bg-white p-4">
                <CheckCircle size={20} className="mt-0.5 shrink-0 text-orange" />
                <p className="text-sm font-semibold leading-6 text-forest">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-sand p-5">
            <p className="flex items-center gap-2 font-bold text-forest">
              <Users size={19} className="text-orange" />
              CampIn community promise
            </p>
            <p className="mt-2 text-sm leading-6 text-textgrey">
              Your answers help CampIn prioritize useful guides, safer places, host questions, and routes worth reviewing.
            </p>
          </div>

          <div className="mt-6 rounded-2xl bg-forest p-5 text-white">
            <p className="flex items-center gap-2 font-bold text-orange">
              <Shield size={18} />
              CampIn promise
            </p>
            <p className="mt-2 text-sm leading-6 text-white/75">
              This is a request-first launch. CampIn is collecting real needs first, then reviewing places carefully.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <CamperWaitlistForm />
          <div className="rounded-2xl border border-orange/20 bg-orange/10 p-5">
            <p className="flex items-center gap-2 font-bold text-forest">
              <Flame size={18} className="text-orange" />
              Newsletter-only option
            </p>
            <p className="mt-2 text-sm leading-6 text-textgrey">
              If someone is not ready to share trip details, subscribe them to The Campfire first.
            </p>
          </div>
          <CampfireSignup />
        </section>
      </div>
    </div>
  );
}
