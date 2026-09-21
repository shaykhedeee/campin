import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CalendarDays, MapPin, Search, Tent, Users } from "lucide-react";
import { getListings, isListingPubliclyPublishable } from "../data/listings";
import { ListingCard } from "./Explore";

const styles = [["bring-your-own-tent", "Own-tent camping"], ["pre-pitched-glamping", "Glamping"], ["campervan", "Campervan & RV"], ["farms-estates", "Farm stays"], ["road-stop", "Road stops"]];

export default function Home() {
  const navigate = useNavigate();
  const published = getListings().filter(isListingPubliclyPublishable);
  const states = [...new Set(published.map((item) => item.state))];
  const destinations = [...new Set(published.map((item) => item.location))];
  const search = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const query = String(data.get("destination") || "");
    const dates = [data.get("arrive"), data.get("depart")].filter(Boolean).join(",");
    navigate(`/explore?query=${encodeURIComponent(query)}${dates ? `&dates=${encodeURIComponent(dates)}` : ""}&guests=${encodeURIComponent(String(data.get("guests") || ""))}`);
  };
  return <main className="bg-offwhite text-forest">
    <section className="relative overflow-hidden bg-forest pb-20 pt-28 text-white sm:pb-28">
      <img src="/images/campin-hero-wilderness.jpg" alt="Campers in an Indian wilderness landscape" className="absolute inset-0 h-full w-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/85 to-forest/50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="max-w-3xl font-serif text-5xl font-bold leading-[.9] sm:text-7xl">Find your next campsite in India.</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">Find a place that fits your trip, check the essentials, then connect with the host directly.</p>
        <form onSubmit={(event) => { event.preventDefault(); search(event.currentTarget); }} className="mt-9 grid gap-2 rounded-2xl bg-white p-2 text-forest shadow-2xl sm:grid-cols-[1.35fr_.9fr_.9fr_.7fr_auto]">
          <label className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-orange" size={18} /><input name="destination" placeholder="Where do you want to go?" className="h-12 w-full rounded-xl bg-offwhite pl-10 pr-3 text-sm font-bold outline-none focus:ring-2 focus:ring-orange" /></label>
          <input name="arrive" type="date" aria-label="Requested arrival date" className="h-12 w-full rounded-xl bg-offwhite px-3 text-sm font-bold" />
          <input name="depart" type="date" aria-label="Requested departure date" className="h-12 w-full rounded-xl bg-offwhite px-3 text-sm font-bold" />
          <label className="relative"><Users className="absolute left-3 top-1/2 -translate-y-1/2 text-orange" size={18} /><input name="guests" type="number" min="1" placeholder="Guests" className="h-12 w-full rounded-xl bg-offwhite pl-10 pr-3 text-sm font-bold" /></label>
          <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-orange px-6 text-sm font-black text-white hover:bg-orange-dark"><Search size={17} />Search</button>
        </form>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">{styles.map(([key, label]) => <Link key={key} to={`/explore?category=${key}`} className="shrink-0 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/20">{label}</Link>)}</div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="flex items-end justify-between"><div><h2 className="font-serif text-4xl font-bold">{published.length ? "Recommended campsites" : "Campsites are being verified"}</h2><p className="mt-2 text-textgrey">{published.length ? "Places ready to receive availability enquiries." : "We only publish real properties with approved details and a verified host contact."}</p></div><Link to="/explore" className="hidden items-center gap-1 font-bold text-orange sm:inline-flex">View all <ArrowRight size={16} /></Link></div>
      {published.length ? <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{published.slice(0, 6).map((listing) => <ListingCard key={listing.id} listing={listing} />)}</div> : <div className="mt-8 rounded-3xl border border-forest/10 bg-white p-8"><h3 className="text-xl font-extrabold">Have a place we should add?</h3><p className="mt-2 text-textgrey">Suggest it to Campin, or list your campsite if you host it.</p><div className="mt-5 flex flex-wrap gap-3"><Link to="/suggest-campsite" className="rounded-xl bg-forest px-5 py-3 font-bold text-white">Suggest a campsite</Link><Link to="/host-your-land" className="rounded-xl border border-forest/15 px-5 py-3 font-bold">List your campsite</Link></div></div>}</section>
    {states.length > 0 && <section className="bg-white py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><h2 className="font-serif text-4xl font-bold">Explore by state</h2><div className="mt-7 flex flex-wrap gap-3">{states.map((state) => <Link key={state} to={`/explore?state=${encodeURIComponent(state)}`} className="rounded-xl bg-offwhite px-5 py-4 font-bold hover:bg-sand">{state}</Link>)}</div><h2 className="mt-12 font-serif text-4xl font-bold">Popular destinations</h2><div className="mt-7 flex flex-wrap gap-3">{destinations.map((destination) => <Link key={destination} to={`/explore?query=${encodeURIComponent(destination)}`} className="rounded-xl bg-offwhite px-5 py-4 font-bold hover:bg-sand">{destination}</Link>)}</div></div></section>}
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><h2 className="text-center font-serif text-4xl font-bold">A simple way to plan a stay</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{[[Search, "Find", "Search destinations, camping styles, and practical amenities."], [CalendarDays, "Check availability", "Share your requested dates and trip details."], [Tent, "Connect with the host", "Open a prepared WhatsApp message and confirm the stay directly."]].map(([Icon, title, body]) => { const Component = Icon as typeof Search; return <article key={String(title)} className="rounded-3xl bg-white p-7 shadow-sm"><Component className="text-orange" size={28} /><h3 className="mt-5 text-xl font-extrabold">{String(title)}</h3><p className="mt-2 leading-7 text-textgrey">{String(body)}</p></article>; })}</div></section>
    <section className="bg-forest py-16 text-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8"><div><h2 className="font-serif text-4xl font-bold">Run a campsite or know a great one?</h2><p className="mt-2 text-white/70">Help Campin build a useful directory of real Indian campsites.</p></div><div className="flex gap-3"><Link to="/host-your-land" className="rounded-xl bg-orange px-5 py-3 font-bold">List your campsite</Link><Link to="/suggest-campsite" className="rounded-xl border border-white/25 px-5 py-3 font-bold">Suggest a campsite</Link></div></div></section>
  </main>;
}
