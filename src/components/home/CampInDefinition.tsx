import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const marketplacePaths = [
  {
    title: "For campers",
    description: "Find a place that fits the way you want to camp.",
    href: "/explore",
  },
  {
    title: "For hosts",
    description: "Share your land with thoughtful outdoor travellers.",
    href: "/host-your-land",
  },
] as const;

export default function CampInDefinition() {
  return (
    <section
      className="border-b border-[#173525]/10 bg-[#f0eadc] py-16 sm:py-24"
      aria-labelledby="campin-definition-heading"
    >
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 sm:px-8 lg:grid-cols-[0.94fr_1.06fr] lg:gap-20 lg:px-10">
        <div>
          <div className="mb-6 h-0.5 w-10 bg-orange" />
          <h2
            id="campin-definition-heading"
            className="max-w-2xl font-serif text-4xl font-black leading-[0.98] tracking-[-0.045em] text-[#173525] sm:text-6xl lg:text-[4.5rem]"
          >
            We connect people who want to camp with people who have land to share.
          </h2>
        </div>

        <div className="lg:pt-8">
          <p className="max-w-2xl text-base font-medium leading-8 tracking-[-0.018em] text-[#313831] sm:text-lg sm:leading-9">
            CampIn is building India&apos;s trusted camping platform—bringing campsites, private land, farm stays, and road-trip stops into one place. We check permission, access, and essential amenities so campers can plan with confidence, while helping hosts welcome responsible guests and earn from their space.
          </p>

          <div className="mt-10 border-y border-[#173525]/18 lg:grid lg:grid-cols-2">
            {marketplacePaths.map((path, index) => (
              <Link
                key={path.title}
                to={path.href}
                className={`light-surface-focus group flex min-h-28 items-center justify-between gap-5 py-6 transition-colors lg:px-7 ${
                  index === 0
                    ? "border-b border-[#173525]/18 lg:border-b-0 lg:border-r lg:pl-0"
                    : "lg:pr-0"
                }`}
              >
                <span>
                  <span className="block text-base font-black tracking-[-0.02em] text-[#173525] transition-colors group-hover:text-[#A94F08] group-focus-visible:text-[#A94F08]">
                    {path.title}
                  </span>
                  <span className="mt-1.5 block text-sm font-medium leading-6 text-[#5f5f5f]">
                    {path.description}
                  </span>
                </span>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#173525]/30 text-[#173525] transition duration-300 group-hover:border-[#A94F08] group-hover:bg-[#A94F08] group-hover:text-white group-focus-visible:border-[#A94F08] group-focus-visible:bg-[#A94F08] group-focus-visible:text-white">
                  <ArrowRight aria-hidden="true" focusable="false" size={18} strokeWidth={2.25} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
