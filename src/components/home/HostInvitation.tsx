import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { mediaRegistry, mediaSrcSet } from "../../data/mediaRegistry";
import CampInIcon from "../icons/CampInIcon";

const hostControls = [
  "Set your own rules, capacity, and availability",
  "Share access and essentials before guests arrive",
  "Review the fit before your place is presented publicly",
] as const;

export default function HostInvitation() {
  const hostImage = mediaRegistry.farm;

  return (
    <section aria-labelledby="host-invitation-heading" className="bg-[#0d281b] py-14 text-white sm:py-24">
      <div className="mx-auto grid max-w-[1440px] overflow-hidden px-4 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-10">
        <div className="relative min-h-[330px] overflow-hidden rounded-t-[28px] lg:min-h-[520px] lg:rounded-l-[28px] lg:rounded-tr-none">
          <img
            src={hostImage.src}
            srcSet={mediaSrcSet(hostImage)}
            sizes="(min-width: 1024px) 42vw, 100vw"
            alt={hostImage.alt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d281b]/55 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 rounded-full bg-[#0d281b]/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-white backdrop-blur-sm">
            Regional editorial image
          </p>
        </div>

        <div className="rounded-b-[28px] border border-white/10 bg-[#143522] p-6 sm:p-10 lg:flex lg:flex-col lg:justify-center lg:rounded-r-[28px] lg:rounded-bl-none lg:p-14">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f2a45f]">For landowners and operators</p>
          <h2
            id="host-invitation-heading"
            className="mt-4 max-w-2xl font-serif text-4xl font-black leading-[0.98] tracking-[-0.045em] text-[#fbf3e5] sm:text-6xl"
          >
            Welcome campers on your terms
          </h2>
          <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-white/75 sm:text-base sm:leading-8">
            Tell CampIn about your land, farm, estate, or road-trip stop. We help make the stay context clear while you stay in control of when and how you host.
          </p>

          <ul className="mt-7 space-y-3">
            {hostControls.map((control) => (
              <li key={control} className="flex gap-3 text-sm font-semibold leading-6 text-white/85">
                <CampInIcon name="permission" className="mt-0.5 h-5 w-5 shrink-0 text-[#f2a45f]" />
                <span>{control}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/host-your-land"
            className="premium-focus mt-8 inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-lg bg-orange px-6 py-3.5 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:bg-orange-dark sm:w-fit sm:px-8 sm:text-base"
          >
            List your land
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
          <p className="mt-3 text-xs font-medium leading-5 text-white/55">Share details for review. Listing interest does not guarantee publication or bookings.</p>
        </div>
      </div>
    </section>
  );
}
