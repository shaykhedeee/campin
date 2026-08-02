import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, CheckCircle2, MapPin, Search, ShieldCheck } from "lucide-react";

type Landing = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  keywords: string[];
  checks: string[];
};

const landings: Record<string, Landing> = {
  "camping-near-bangalore": {
    slug: "camping-near-bangalore",
    title: "Camping Near Bangalore: Campsites, Pitches and Weekend Stays",
    description: "Find camping near Bangalore, including tent pitches, farm stays, glamping and road-trip options around Ramanagara, Kanakapura, Sakleshpur and Coorg.",
    intro: "Plan a weekend outdoors without sorting through vague pins. CampIn brings together camping formats, route context, facilities and questions to ask before you travel.",
    keywords: ["Ramanagara", "Kanakapura", "Sakleshpur", "Coorg", "BYOT camping", "farm camping"],
    checks: ["Whether own tents are welcome", "Night-time toilet and water access", "Road, parking and vehicle fit", "Host contact and weather backup"],
  },
  "camping-in-coorg": {
    slug: "camping-in-coorg",
    title: "Camping in Coorg: Coffee Estates, Tents and Outdoor Stays",
    description: "Explore camping in Coorg with coffee estate stays, tent pitches, glamping and outdoor experiences. Compare access, amenities and host details before a Kodagu trip.",
    intro: "Coorg camping can mean a private estate, a pre-pitched tent, a BYOT pitch or a simple farm stay. CampIn helps you understand the difference before booking or enquiring.",
    keywords: ["coffee estate camping", "BYOT camping", "glamping", "farm stays", "trekking", "nature walks"],
    checks: ["Estate access and last-mile road conditions", "Rain drainage and indoor backup", "Drinking water and washrooms", "Bonfire, quiet-hour and local rules"],
  },
  "camping-in-wayanad": {
    slug: "camping-in-wayanad",
    title: "Camping in Wayanad: Forest-Edge Stays and Rain-Ready Planning",
    description: "Plan camping in Wayanad with hosted stays, tent pitches, farm camping and nature experiences. Check weather, access, facilities and local rules first.",
    intro: "Wayanad rewards careful planning. Use CampIn to compare the kind of stay, setting, route and facilities you need, especially during heavy rain or changing road conditions.",
    keywords: ["forest camping", "farm camping", "tent stays", "wildlife experiences", "hiking", "monsoon camping"],
    checks: ["Distance from streams and runoff paths", "Rain-safe access and cancellation plan", "Night contact and emergency route", "Wildlife, fire and noise guidance"],
  },
  "glamping-india": {
    slug: "glamping-india",
    title: "Glamping in India: Tents, Domes, Cabins and Outdoor Stays",
    description: "Discover glamping in India, from bell tents and safari tents to domes, yurts, cabins and eco huts, with practical details for planning a stay.",
    intro: "Glamping is more than a beautiful photo. CampIn helps campers understand shelter, bedding, bathrooms, power, access, food and weather backup before they choose a stay.",
    keywords: ["bell tents", "safari tents", "geodesic domes", "yurts", "cabins", "eco huts"],
    checks: ["What is included inside the accommodation", "Bathroom, power and mobile coverage", "Vehicle access and parking", "Weather, cancellation and quiet-hour rules"],
  },
};

export default function SeoLanding() {
  const { slug = "camping-near-bangalore" } = useParams();
  const page = landings[slug] || landings["camping-near-bangalore"];

  useEffect(() => {
    document.title = `${page.title} | CampIn`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", page.description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://campin.co.in/${page.slug}`);
  }, [page]);

  return (
    <div className="min-h-screen bg-offwhite pt-28 pb-20">
      <section className="bg-forest text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-orange/15 px-4 py-2 text-sm font-black text-orange"><MapPin size={16} /> CampIn destination guide</p>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-6xl">{page.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">{page.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/explore" className="inline-flex items-center gap-2 rounded-xl bg-orange px-5 py-3 font-black text-white">Explore camps <ArrowRight size={17} /></Link>
              <Link to="/community" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-black text-white">Share a request</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-16">
        <div className="rounded-3xl border border-forest/10 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-orange">What you can find</p>
          <h2 className="mt-3 text-3xl font-black text-forest">Choose a stay that fits your trip</h2>
          <div className="mt-6 flex flex-wrap gap-3">{page.keywords.map((keyword) => <span key={keyword} className="rounded-full bg-sand px-4 py-2 text-sm font-bold text-forest">{keyword}</span>)}</div>
          <p className="mt-7 text-base leading-8 text-textgrey">CampIn is building an India-wide directory for motorhomes, caravans, campervans, travel trailers, own-tent pitches, pre-pitched tents, cabins, farm stays and nature-led experiences. Availability and listing status are kept clear while the community grows.</p>
        </div>
        <div className="rounded-3xl bg-[#10291c] p-6 text-white sm:p-8">
          <div className="flex items-center gap-3"><ShieldCheck className="text-orange" /><h2 className="text-2xl font-black">Plan with better details</h2></div>
          <ul className="mt-6 space-y-4">{page.checks.map((check) => <li key={check} className="flex gap-3 text-sm leading-6 text-white/75"><CheckCircle2 className="mt-1 shrink-0 text-orange" size={18} />{check}</li>)}</ul>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="rounded-3xl border border-orange/20 bg-orange/10 p-6 sm:p-8"><div className="flex items-start gap-4"><Search className="mt-1 shrink-0 text-orange" /><div><h2 className="text-2xl font-black text-forest">Can’t find the right place yet?</h2><p className="mt-2 max-w-2xl leading-7 text-textgrey">Tell the CampIn community what you need. Requests help us prioritise host reviews, local guides and useful campsite information.</p><Link to="/coming-soon" className="mt-5 inline-flex items-center gap-2 font-black text-forest">Join the community <ArrowRight size={17} /></Link></div></div></div></section>
    </div>
  );
}
