import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bath,
  CalendarClock,
  Camera,
  Car,
  CheckCircle,
  Droplets,
  FileSearch,
  MapPin,
  Search,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Tent,
  X,
  Zap,
} from "lucide-react";
import {
  categories,
  getListings,
  type Listing,
  type ListingType,
  type VerificationStage,
  isListingPubliclyPublishable,
} from "../data/listings";
import { parseExploreCategory, type ExploreCategory } from "../lib/exploreFilters";
import SeoFaq from "../components/SeoFaq";
import { mediaSrcSet } from "../data/mediaRegistry";

const exploreFaqs = [
  { question: "What can I find on CampIn?", answer: "Explore camping and outdoor stays across India, including tent pitches, BYOT sites, glamping, farm stays, motorhome-friendly places, and road-stop leads when details are confirmed." },
  { question: "How does CampIn show verification?", answer: "Each public listing must pass CampIn's review gate. We show the verification stage and avoid publishing unresolved property details as confirmed facts." },
  { question: "Can I request a place that is not listed?", answer: "Yes. Use the location request or community form and tell us the destination, stay type, and trip dates. Requests go to support@campin.co.in for review." },
];

type ActiveType = ListingType | "all";
type VehicleFilter = "all" | "byot" | "campervan" | "road-stop";
type StageFilter = VerificationStage | "all";

const amenityFilters = ["Washroom", "Water", "Parking", "Electricity"];
const vehicleOptions = [
  { value: "all", label: "All", icon: FileSearch },
  { value: "byot", label: "BYOT", icon: Tent },
  { value: "campervan", label: "Campervan", icon: Car },
  { value: "road-stop", label: "Road stop", icon: MapPin },
] satisfies { value: VehicleFilter; label: string; icon: typeof FileSearch }[];

const stageLabels: Record<VerificationStage, string> = {
  community_suggested: "Community suggested",
  lead: "Awaiting host confirmation",
  reviewed: "Source reviewed",
  date_confirmed: "Date confirmed",
  calendar_synced: "Calendar synced",
};

const availabilityLabels: Record<Listing["availability"]["mode"], string> = {
  unknown: "Unknown",
  call_to_confirm: "Call to confirm",
  request_to_book: "Request to book",
  campin_confirmed: "CampIn confirmed",
  calendar_synced: "Calendar synced",
};

function getTypeFromSearch(search: string): ActiveType {
  const value = new URLSearchParams(search).get("type");
  if (value && categories.some((category) => category.id === value)) {
    return value as ActiveType;
  }
  return "all";
}

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

function matchesExploreCategory(listing: Listing, category: ExploreCategory | null) {
  if (!category) return true;

  const searchableListingText = [listing.title, listing.typeLabel, listing.description, ...listing.tags].join(" ").toLowerCase();

  switch (category) {
    case "bring-your-own-tent":
    case "road-trip-stops":
      return true;
    case "pre-pitched-glamping":
      return listing.inventory.some((unit) => unit.unitType === "pre_pitched_tent") || /pre-pitched|glamping/.test(searchableListingText);
    case "farms-estates":
      return listing.type === "farm" || /farm|estate/.test(searchableListingText);
    case "mountains-forests":
      return listing.type === "forest" || /mountain|forest|high altitude/.test(searchableListingText);
    case "waterside":
      return /river|riverside|waterside|lake|waterfront/.test(searchableListingText);
  }
}

function AmenityIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();
  if (lower.includes("washroom")) return <Bath size={16} />;
  if (lower.includes("water")) return <Droplets size={16} />;
  if (lower.includes("parking")) return <Car size={16} />;
  if (lower.includes("electric")) return <Zap size={16} />;
  return <CheckCircle size={16} />;
}

function stageClass(stage: VerificationStage) {
  if (stage === "reviewed" || stage === "date_confirmed" || stage === "calendar_synced") return "bg-forest text-white";
  if (stage === "lead") return "bg-orange/10 text-orange";
  return "bg-white text-forest";
}

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      to={`/listing/${listing.id}`}
      className="group overflow-hidden rounded-lg border border-forest/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={listing.image}
          alt={listing.imageAsset?.alt ?? listing.title}
          srcSet={listing.imageAsset ? mediaSrcSet(listing.imageAsset) : undefined}
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        {listing.imageAsset?.usage === "editorial-region" && (
          <div className="absolute right-3 top-3 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold text-forest shadow-sm">
            Regional editorial image
          </div>
        )}
        <div className={`absolute left-3 top-3 rounded-lg px-3 py-1 text-xs font-bold shadow-sm ${stageClass(listing.verificationStage)}`}>
          {stageLabels[listing.verificationStage]}
        </div>
        <div className="absolute bottom-3 left-3 rounded-lg bg-white px-3 py-1 text-xs font-bold text-forest shadow-sm">
          {listing.typeLabel}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-textgrey">
          <MapPin size={15} className="text-orange" />
          <span>{listing.location}</span>
          <span className="text-textgrey/40">/</span>
          <span>{listing.state}</span>
        </div>

        <h2 className="mt-3 min-h-14 text-xl font-extrabold leading-7 text-forest">{listing.title}</h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-textgrey">{listing.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {listing.essentials.slice(0, 4).map((item) => (
            <span key={item} className="inline-flex items-center gap-1 rounded-lg bg-offwhite px-2.5 py-1 text-xs font-semibold text-forest">
              <AmenityIcon name={item} />
              {item}
            </span>
          ))}
        </div>

        <div className="mt-5 grid gap-2 border-t border-forest/10 pt-4 text-sm">
          <span className="flex items-center gap-2 font-semibold text-forest">
            <CalendarClock size={16} className="text-orange" />
            {availabilityLabels[listing.availability.mode]}
          </span>
          <span className="flex items-center gap-2 font-semibold text-forest">
            {listing.contactPolicy === "gated_relay" ? <ShieldCheck size={16} className="text-orange" /> : <ShieldAlert size={16} className="text-orange" />}
            Gated request flow
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-orange">
            See how CampIn checks places
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Explore() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(() => new URLSearchParams(location.search).get("query") || "");
  const [activeType, setActiveType] = useState<ActiveType>(() => getTypeFromSearch(location.search));
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [vehicleFilter, setVehicleFilter] = useState<VehicleFilter>(() => {
    const params = new URLSearchParams(location.search);
    const vehicle = params.get("vehicle");
    if (vehicle && ["byot", "campervan", "road-stop"].includes(vehicle)) {
      return vehicle as VehicleFilter;
    }
    return "all";
  });
  const [stageFilter, setStageFilter] = useState<StageFilter>("all");
  const [stateFilter, setStateFilter] = useState(() => new URLSearchParams(location.search).get("state") || "all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [activeListings, setActiveListings] = useState(() => getListings().filter(isListingPubliclyPublishable));
  const activeCategory = parseExploreCategory(location.search);
  const categoryVehicleFilter: VehicleFilter | null =
    activeCategory === "bring-your-own-tent" ? "byot" : activeCategory === "road-trip-stops" ? "road-stop" : null;
  const activeVehicleTab = activeCategory && !categoryVehicleFilter ? null : categoryVehicleFilter ?? vehicleFilter;
  const effectiveVehicleFilter = categoryVehicleFilter ?? vehicleFilter;

  useEffect(() => {
    const handleSync = () => setActiveListings(getListings().filter(isListingPubliclyPublishable));
    window.addEventListener("campin-listings-updated", handleSync);
    return () => window.removeEventListener("campin-listings-updated", handleSync);
  }, []);

  useEffect(() => {
    setActiveType(getTypeFromSearch(location.search));
    const params = new URLSearchParams(location.search);
    const vehicle = params.get("vehicle");
    if (vehicle && ["byot", "campervan", "road-stop"].includes(vehicle)) {
      setVehicleFilter(vehicle as VehicleFilter);
    } else if (!vehicle) {
      setVehicleFilter("all");
    }
    setSearchQuery(params.get("query") || "");
    setStateFilter(params.get("state") || "all");
  }, [location.search]);

  const stateOptions = useMemo(() => uniqueSorted(activeListings.map((listing) => listing.state)), [activeListings]);
  const regionOptions = useMemo(() => {
    const source = stateFilter === "all" ? activeListings : activeListings.filter((listing) => listing.state === stateFilter);
    return uniqueSorted(source.map((listing) => listing.region));
  }, [stateFilter, activeListings]);
  const locationOptions = useMemo(() => {
    const source = activeListings.filter((listing) => {
      const matchesState = stateFilter === "all" || listing.state === stateFilter;
      const matchesRegion = regionFilter === "all" || listing.region === regionFilter;
      return matchesState && matchesRegion;
    });
    return uniqueSorted(source.map((listing) => listing.location));
  }, [regionFilter, stateFilter, activeListings]);

  const filteredListings = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return activeListings.filter((listing) => {
      // Exclude unverified raw leads and raw scraper suggestions from public Campsites view
      const isVerified =
        listing.verificationStage === "reviewed" ||
        listing.verificationStage === "date_confirmed" ||
        listing.verificationStage === "calendar_synced";
      if (!isVerified) return false;

      const matchesSearch =
        normalizedQuery.length === 0 ||
        [
          listing.title,
          listing.location,
          listing.state,
          listing.region,
          listing.typeLabel,
          listing.description,
          ...listing.tags,
          ...listing.unknowns,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesType = activeType === "all" || listing.type === activeType;
      const matchesCategory = matchesExploreCategory(listing, activeCategory);
      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((filter) =>
          [...listing.amenities, ...listing.essentials].some((amenity) => amenity.toLowerCase().includes(filter.toLowerCase())),
        );
      const matchesVehicle =
        effectiveVehicleFilter === "all" ||
        (effectiveVehicleFilter === "byot" && listing.byotFriendly) ||
        (effectiveVehicleFilter === "campervan" && listing.campervanFriendly) ||
        (effectiveVehicleFilter === "road-stop" && listing.roadStop);
      const matchesStage = stageFilter === "all" || listing.verificationStage === stageFilter;
      const matchesState = stateFilter === "all" || listing.state === stateFilter;
      const matchesRegion = regionFilter === "all" || listing.region === regionFilter;
      const matchesLocation = locationFilter === "all" || listing.location === locationFilter;
      return matchesSearch && matchesType && matchesCategory && matchesAmenities && matchesVehicle && matchesStage && matchesState && matchesRegion && matchesLocation;
    });
  }, [activeCategory, activeType, effectiveVehicleFilter, locationFilter, regionFilter, searchQuery, selectedAmenities, stageFilter, stateFilter, activeListings]);

  const resetFilters = () => {
    setSearchQuery("");
    setActiveType("all");
    setSelectedAmenities([]);
    setVehicleFilter("all");
    setStageFilter("all");
    setStateFilter("all");
    setRegionFilter("all");
    setLocationFilter("all");
  };

  const clearActiveCategory = () => {
    const params = new URLSearchParams(location.search);
    params.delete("category");
    navigate({ pathname: location.pathname, search: params.toString() ? `?${params.toString()}` : "", hash: location.hash });
  };

  return (
    <div className="min-h-screen bg-offwhite pt-28 pb-20">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-[2rem] bg-forest p-6 text-white shadow-xl sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div>
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-orange">Campsites</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Find a campsite in India.</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
              Filter real published campsites by destination, stay type, amenities, and vehicle fit. Trip dates are a request; the host confirms availability.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-textdark flex flex-col justify-center">
            <label className="text-xs font-black uppercase tracking-wider text-orange" htmlFor="explore-search">
              Search campsites
            </label>
            <div className="relative mt-2">
              <Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-textgrey" />
              <input
                id="explore-search"
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search Bengaluru, Coorg, campervan, farm stay..."
                className="h-12 w-full rounded-xl border border-forest/10 bg-offwhite pl-11 pr-4 text-sm outline-none transition focus:border-orange focus:bg-white"
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-textgrey">Can’t find a place? <Link className="font-bold text-orange underline" to="/suggest-campsite">Suggest a campsite</Link>.</p>
          </div>
        </div>
      </section>

      <section className="sticky top-20 z-30 mt-8 border-y border-forest/10 bg-offwhite/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            {[
              { value: "all", label: "🏕️ All campsites" },
              { value: "byot", label: "⛺ Own-Tent (BYOT)" },
              { value: "campervan", label: "🚐 Campervan & RV Bays" },
              { value: "road-stop", label: "🅿️ Highway Road Stops" },
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setVehicleFilter(tab.value as VehicleFilter)}
                aria-pressed={activeVehicleTab === tab.value}
                className={`shrink-0 rounded-lg px-4 py-2.5 text-sm font-black transition-all ${
                  activeVehicleTab === tab.value
                    ? "bg-forest text-white shadow-sm"
                    : "bg-white text-forest hover:bg-[#eef1e6]/60 border border-forest/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setShowFilters((value) => !value)}
              className={`ml-auto inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${
                showFilters ? "bg-orange text-white" : "bg-white text-forest hover:bg-[#eef1e6]/60 border border-forest/10"
              }`}
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 grid gap-5 rounded-lg border border-forest/10 bg-white p-5 lg:grid-cols-3">
              <div className="lg:col-span-3">
                <p className="flex items-center gap-2 text-sm font-bold text-forest">
                  <MapPin size={16} className="text-orange" />
                  Location
                </p>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-textgrey">State</span>
                    <select
                      value={stateFilter}
                      onChange={(event) => {
                        setStateFilter(event.target.value);
                        setRegionFilter("all");
                        setLocationFilter("all");
                      }}
                      className="mt-2 h-11 w-full rounded-lg border border-forest/10 bg-offwhite px-3 text-sm font-semibold text-forest outline-none transition focus:border-orange focus:bg-white"
                    >
                      <option value="all">All states</option>
                      {stateOptions.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-textgrey">Region / corridor</span>
                    <select
                      value={regionFilter}
                      onChange={(event) => {
                        setRegionFilter(event.target.value);
                        setLocationFilter("all");
                      }}
                      className="mt-2 h-11 w-full rounded-lg border border-forest/10 bg-offwhite px-3 text-sm font-semibold text-forest outline-none transition focus:border-orange focus:bg-white"
                    >
                      <option value="all">All regions</option>
                      {regionOptions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-textgrey">City / area</span>
                    <select
                      value={locationFilter}
                      onChange={(event) => setLocationFilter(event.target.value)}
                      className="mt-2 h-11 w-full rounded-lg border border-forest/10 bg-offwhite px-3 text-sm font-semibold text-forest outline-none transition focus:border-orange focus:bg-white"
                    >
                      <option value="all">All cities / areas</option>
                      {locationOptions.map((listingLocation) => (
                        <option key={listingLocation} value={listingLocation}>
                          {listingLocation}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-forest">Essentials</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {amenityFilters.map((amenity) => (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() =>
                        setSelectedAmenities((current) =>
                          current.includes(amenity) ? current.filter((item) => item !== amenity) : [...current, amenity],
                        )
                      }
                      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                        selectedAmenities.includes(amenity) ? "bg-forest text-white" : "bg-offwhite text-forest hover:bg-sky-mist"
                      }`}
                    >
                      {selectedAmenities.includes(amenity) ? <X size={14} /> : <CheckCircle size={14} />}
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-forest">Vehicle fit</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {vehicleOptions.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setVehicleFilter(value)}
                      aria-pressed={activeVehicleTab === value}
                      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                        activeVehicleTab === value ? "bg-forest text-white" : "bg-offwhite text-forest hover:bg-sky-mist"
                      }`}
                    >
                      <Icon size={15} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-forest">Trust stage</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(["all", "community_suggested", "lead", "reviewed"] as StageFilter[]).map((stage) => (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => setStageFilter(stage)}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                        stageFilter === stage ? "bg-forest text-white" : "bg-offwhite text-forest hover:bg-sky-mist"
                      }`}
                    >
                      {stage === "all" ? "All stages" : stageLabels[stage]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-orange">Results</p>
            <h2 className="mt-1 text-2xl font-extrabold text-forest">
              {filteredListings.length} trust-scoped {filteredListings.length === 1 ? "place" : "places"}
            </h2>
            {activeCategory && (
              <div className="mt-3 flex flex-wrap items-center gap-2" aria-live="polite">
                <span className="rounded-full bg-forest px-3 py-1.5 text-sm font-bold text-white">
                  Category: {activeCategory.replace(/-/g, " ")}
                </span>
                <button
                  type="button"
                  onClick={clearActiveCategory}
                  className="inline-flex min-h-11 items-center rounded-lg border border-forest/20 bg-white px-3 text-sm font-bold text-forest transition-colors hover:text-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                >
                  Clear category
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-forest shadow-sm transition-colors hover:text-orange"
          >
            <X size={16} />
            Clear filters
          </button>
        </div>

        {filteredListings.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg border border-forest/10 bg-white p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-offwhite text-orange">
              <Camera size={24} />
            </div>
            <h2 className="mt-5 text-2xl font-extrabold text-forest">No campsites match these filters</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-textgrey">
              Try clearing a filter, choose a nearby destination, or tell us about a campsite we should review.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={resetFilters} className="rounded-lg bg-forest px-5 py-3 font-bold text-white">Reset search</button>
              <Link to="/suggest-campsite" className="rounded-lg border border-forest/20 bg-white px-5 py-3 font-bold text-forest">Suggest a campsite</Link>
            </div>
          </div>
        )}
      </section>
      <SeoFaq items={exploreFaqs} />
    </div>
  );
}
