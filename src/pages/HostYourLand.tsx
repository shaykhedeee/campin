import { Link } from "react-router-dom";
import { ArrowRight, Camera, CheckCircle, IndianRupee, MapPin, Shield, Zap } from "lucide-react";
import { HostInterestForm } from "../components/validation/ValidationForms";

const hostRequirements = [
  "Exact Google Maps pin before any listing decision.",
  "Usable washroom, water, and safe ground or parking.",
  "Actual photos of the site, access road, washroom, and camping area.",
  "Clear permission status and a host or caretaker reachable by phone.",
];

const hostBenefits = [
  {
    icon: IndianRupee,
    title: "Earn without becoming a resort",
    text: "CampIn is designed for farms, estates, homestays, and quiet land that can host responsibly.",
  },
  {
    icon: Shield,
    title: "You keep control",
    text: "Hosts decide rules, capacity, pricing, availability, and whether a stay is accepted.",
  },
  {
    icon: Camera,
    title: "Proof builds trust",
    text: "Honest photos and amenity clarity matter more than polished travel-portal language.",
  },
];

export default function HostYourLand() {
  return (
    <div className="min-h-screen bg-offwhite pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-bold text-orange">Founding host program</p>
            <h1 className="mt-2 text-4xl font-extrabold leading-tight text-forest sm:text-5xl">
              Help CampIn build India's verified camping supply.
            </h1>
            <p className="mt-4 text-lg leading-8 text-textgrey">
              This is the real host-intake system for the validation phase. CampIn is looking for safe private land,
              farms, estates, homestays, and road-side businesses before any booking engine is built.
            </p>

            <div className="mt-8 grid gap-4">
              {hostBenefits.map((item) => (
                <div key={item.title} className="flex gap-4 rounded-2xl border border-forest/10 bg-white p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-offwhite text-orange">
                    <item.icon size={21} />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-forest">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-textgrey">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-forest p-5 text-white">
              <p className="flex items-center gap-2 font-bold text-orange">
                <MapPin size={18} />
                Minimum review standard
              </p>
              <div className="mt-3 space-y-2 text-sm leading-6 text-white/75">
                {hostRequirements.map((requirement) => (
                  <p key={requirement} className="flex gap-2">
                    <CheckCircle size={16} className="mt-1 shrink-0 text-orange" />
                    {requirement}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-sky-mist p-5">
              <p className="flex items-center gap-2 font-bold text-forest">
                <Zap size={18} className="text-orange" />
                90-day supply target
              </p>
              <p className="mt-2 text-sm leading-6 text-textgrey">
                30 host applications and 10 verified candidate sites before CampIn builds paid booking infrastructure.
              </p>
            </div>

            <Link to="/validation" className="mt-6 inline-flex items-center gap-2 font-extrabold text-forest hover:text-orange">
              View validation dashboard
              <ArrowRight size={18} />
            </Link>
          </div>

          <HostInterestForm />
        </section>
      </div>
    </div>
  );
}
