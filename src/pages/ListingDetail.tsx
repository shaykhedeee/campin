import { useEffect, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bath,
  CalendarDays,
  Car,
  CheckCircle,
  Clock3,
  Droplets,
  ExternalLink,
  Flame,
  Heart,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Share2,
  Shield,
  ShieldCheck,
  Signal,
  Tent,
  Users,
  Zap,
} from "lucide-react";
import { listings, type Listing, type VerificationStage } from "../data/listings";
import { submitMvpLead } from "../lib/mvpLeadStore";

const requestStorageKey = "campin.listing.requests.v1";

const stageLabels: Record<VerificationStage, string> = {
  community_suggested: "Community suggested",
  lead: "Research lead",
  reviewed: "Source reviewed",
  date_confirmed: "Date confirmed",
  calendar_synced: "Calendar synced",
};

const availabilityCopy: Record<Listing["availability"]["mode"], { label: string; body: string; cta: string }> = {
  unknown: {
    label: "Availability unknown",
    body: "This is demand or partnership intelligence. CampIn needs a host-controlled contact before any trip handoff.",
    cta: "Join alert for this region",
  },
  call_to_confirm: {
    label: "Call to confirm",
    body: "A public business or operator source exists, but dates and rules must be confirmed before travel.",
    cta: "Request gated contact",
  },
  request_to_book: {
    label: "Request to book",
    body: "Send dates, guests and vehicle details first. CampIn or the host confirms before any stay is treated as real.",
    cta: "Request availability",
  },
  campin_confirmed: {
    label: "CampIn date confirmed",
    body: "CampIn recently checked dates, but the final handoff still runs through the request ledger.",
    cta: "Request this slot",
  },
  calendar_synced: {
    label: "Calendar synced",
    body: "Calendar data can guide planning, but CampIn still requires a final host check for last-minute arrivals.",
    cta: "Check dates",
  },
};

function getAmenityIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("washroom")) return <Bath size={18} />;
  if (lower.includes("fire")) return <Flame size={18} />;
  if (lower.includes("water")) return <Droplets size={18} />;
  if (lower.includes("electric") || lower.includes("charging")) return <Zap size={18} />;
  if (lower.includes("parking")) return <Car size={18} />;
  if (lower.includes("signal")) return <Signal size={18} />;
  if (lower.includes("tent") || lower.includes("byot")) return <Tent size={18} />;
  return <CheckCircle size={18} />;
}

function saveRequest(payload: Record<string, unknown>) {
  const current = JSON.parse(window.localStorage.getItem(requestStorageKey) || "[]");
  const requests = Array.isArray(current) ? current : [];
  window.localStorage.setItem(requestStorageKey, JSON.stringify([payload, ...requests]));
  window.dispatchEvent(new Event("campin-validation-updated"));
}

export default function ListingDetail() {
  const { id } = useParams();
  const listing = listings.find((item) => item.id === id);
  const [guestProfile, setGuestProfile] = useState<{ name: string; email: string; phone: string } | null>(() => {
    try {
      const stored = window.localStorage.getItem("campin.guest.profile.v1");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [showHandshakeModal, setShowHandshakeModal] = useState(false);
  const [handshakeForm, setHandshakeForm] = useState({ name: "", email: "", phone: "" });
  const [handshakeStatus, setHandshakeStatus] = useState<"idle" | "saving" | "saved">("idle");

  const [formData, setFormData] = useState({
    name: guestProfile?.name || "",
    email: guestProfile?.email || "",
    phone: guestProfile?.phone || "",
    arrive: "",
    depart: "",
    guests: "2",
    vehicleType: "car",
    ownTent: listing?.byotFriendly ? "yes" : "no",
    essentials: "parking, washroom, water",
  });

  useEffect(() => {
    if (guestProfile) {
      setFormData((current) => ({
        ...current,
        name: guestProfile.name,
        email: guestProfile.email,
        phone: guestProfile.phone,
      }));
    }
  }, [guestProfile]);

  const [requestId, setRequestId] = useState("");

  if (!listing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-offwhite px-4 pt-24 text-center">
        <div className="max-w-md rounded-lg border border-forest/10 bg-white p-8 shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-offwhite text-orange">
            <MapPin size={26} />
          </div>
          <h1 className="mt-5 text-2xl font-extrabold text-forest">Listing not found</h1>
          <p className="mt-2 text-sm leading-6 text-textgrey">This place is not in the current CampIn research network.</p>
          <Link to="/explore" className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-5 py-3 font-bold text-white">
            <ArrowLeft size={18} />
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const availability = availabilityCopy[listing.availability.mode];
  const serviceFee = listing.price > 0 ? Math.round(listing.price * 0.06) : 0;
  const total = listing.price + serviceFee;

  const submitRequest = async (event: FormEvent) => {
    event.preventDefault();
    if (!guestProfile || !formData.email || !formData.phone) {
      setHandshakeForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
      setShowHandshakeModal(true);
      return;
    }

    const idValue = `REQ-${Date.now().toString(36).toUpperCase()}`;
    const payload = {
      id: idValue,
      listingId: listing.id,
      listingTitle: listing.title,
      createdAt: new Date().toISOString(),
      status: "Awaiting CampIn review",
      ...formData,
    };
    saveRequest(payload);
    void submitMvpLead({
      type: "listing_inquiry",
      sourcePage: `/listing/${listing.id}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: listing.location,
      status: "awaiting_campin_review",
      score: formData.phone.trim() ? 5 : 4,
      consent: true,
      payload,
    });
    setRequestId(idValue);
  };

  return (
    <div className="min-h-screen bg-offwhite pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link to="/explore" className="inline-flex items-center gap-2 text-sm font-bold text-forest hover:text-orange">
            <ArrowLeft size={17} />
            Back to Explore
          </Link>
          <div className="flex gap-2">
            <button type="button" className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-forest shadow-sm hover:text-orange" aria-label="Save listing">
              <Heart size={19} />
            </button>
            <button type="button" className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-forest shadow-sm hover:text-orange" aria-label="Share listing">
              <Share2 size={19} />
            </button>
          </div>
        </div>

        <section className="grid items-start gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative h-[440px] overflow-hidden rounded-lg bg-forest lg:h-[520px]">
            <img src={listing.image} alt={listing.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-lg bg-orange px-3 py-1.5 text-sm font-bold text-white">
                  <Shield size={16} />
                  {stageLabels[listing.verificationStage]}
                </span>
                {listing.roadStop && (
                  <span className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-sm font-bold text-forest">
                    <Car size={16} />
                    Road Stop
                  </span>
                )}
                {listing.byotFriendly && (
                  <span className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-sm font-bold text-forest">
                    <Tent size={16} />
                    BYOT
                  </span>
                )}
              </div>
              <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">{listing.title}</h1>
              <p className="mt-4 flex flex-wrap items-center gap-2 text-base font-semibold text-white/80">
                <MapPin size={18} className="text-orange" />
                {listing.location}, {listing.state}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {listing.gallery.slice(0, 3).map((image, index) => (
              <div key={`${image}-${index}`} className="relative min-h-32 overflow-hidden rounded-lg bg-white">
                <img src={image} alt={`${listing.title} visual proof ${index + 1}`} className="h-full min-h-32 w-full object-cover" />
                <div className="absolute left-3 top-3 rounded-lg bg-white/90 px-2.5 py-1 text-xs font-bold text-forest">
                  Source visual {index + 1}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_390px]">
          <main className="space-y-8">
            <section className="rounded-lg border border-forest/10 bg-white p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-4">
                <div>
                  <p className="text-sm text-textgrey">Trust stage</p>
                  <p className="mt-1 font-extrabold text-forest">{stageLabels[listing.verificationStage]}</p>
                </div>
                <div>
                  <p className="text-sm text-textgrey">Availability</p>
                  <p className="mt-1 font-extrabold text-forest">{availability.label}</p>
                </div>
                <div>
                  <p className="text-sm text-textgrey">Permission</p>
                  <p className="mt-1 font-extrabold text-forest">{listing.permissionStatus.replace(/_/g, " ")}</p>
                </div>
                <div>
                  <p className="text-sm text-textgrey">Last checked</p>
                  <p className="mt-1 font-extrabold text-forest">{listing.availability.lastCheckedAt || "Not checked"}</p>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-forest/10 bg-white p-6 sm:p-8">
              <p className="font-bold text-orange">Trust ledger</p>
              <h2 className="mt-2 text-2xl font-extrabold text-forest">Known, unknown, and next verification step</h2>
              <p className="mt-4 text-base leading-8 text-textgrey">{listing.longDescription}</p>
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-lg bg-offwhite p-5">
                  <p className="font-extrabold text-forest">Known evidence</p>
                  <div className="mt-4 space-y-3">
                    {listing.verification.map((item) => (
                      <p key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-forest">
                        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-orange" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg bg-offwhite p-5">
                  <p className="font-extrabold text-forest">Open unknowns</p>
                  <div className="mt-4 space-y-3">
                    {listing.unknowns.map((item) => (
                      <p key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-forest">
                        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-orange" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-forest/10 bg-white p-6 sm:p-8">
              <p className="font-bold text-orange">Amenities and claim confidence</p>
              <h2 className="mt-2 text-2xl font-extrabold text-forest">Facilities are signals until checked directly</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {listing.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 rounded-lg bg-offwhite p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-orange shadow-sm">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="text-sm font-bold text-forest">{amenity}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
                {Object.entries(listing.confidence).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between gap-3 rounded-lg bg-offwhite px-4 py-3">
                    <span className="font-bold text-forest">{key.replace(/([A-Z])/g, " $1")}</span>
                    <span className="rounded-lg bg-white px-3 py-1 font-bold text-orange">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-forest/10 bg-white p-6 sm:p-8">
              <p className="font-bold text-orange">Sources and access</p>
              <h2 className="mt-2 text-2xl font-extrabold text-forest">The source trail stays visible</h2>
              <p className="mt-4 text-base leading-7 text-textgrey">{listing.accessNote}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {listing.sourceUrls.map((url) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-forest px-5 py-3 font-bold text-white transition-colors hover:bg-forest-light"
                  >
                    Source
                    <ExternalLink size={17} />
                  </a>
                ))}
                <a
                  href={listing.googlePin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-bold text-forest shadow-sm transition-colors hover:text-orange"
                >
                  Map search
                  <ExternalLink size={17} />
                </a>
              </div>
            </section>
          </main>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <form onSubmit={submitRequest} className="rounded-lg border border-forest/10 bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-textgrey">Price state</p>
                  <p className="text-3xl font-extrabold text-forest">{listing.price > 0 ? `INR ${listing.price}` : "Confirm tariff"}</p>
                  <p className="mt-1 text-sm text-textgrey">No instant booking in phase 1</p>
                </div>
                <div className="rounded-lg bg-offwhite px-3 py-2 text-right">
                  <p className="text-sm font-bold text-forest">{listing.hostName}</p>
                  <p className="text-xs text-textgrey">Contact gated</p>
                </div>
              </div>

              <div className="mt-5 rounded-lg border border-orange/20 bg-orange/10 p-4">
                <p className="flex items-start gap-2 text-sm font-bold text-forest">
                  <LockKeyhole size={17} className="mt-0.5 shrink-0 text-orange" />
                  {availability.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-textgrey">{availability.body}</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <label className="col-span-2 block">
                  <span className="text-sm font-bold text-forest">Name</span>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                    className="mt-2 h-12 w-full rounded-lg border border-forest/10 bg-offwhite px-3 text-sm outline-none focus:border-orange"
                  />
                </label>
                <label className="col-span-2 block sm:col-span-1">
                  <span className="text-sm font-bold text-forest">Email</span>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-textgrey" size={17} />
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                      className="h-12 w-full rounded-lg border border-forest/10 bg-offwhite pl-10 pr-3 text-sm outline-none focus:border-orange"
                    />
                  </div>
                </label>
                <label className="col-span-2 block sm:col-span-1">
                  <span className="text-sm font-bold text-forest">Phone / WhatsApp</span>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-textgrey" size={17} />
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
                      className="h-12 w-full rounded-lg border border-forest/10 bg-offwhite pl-10 pr-3 text-sm outline-none focus:border-orange"
                    />
                  </div>
                </label>
                <label className="block">
                  <span className="text-sm font-bold text-forest">Arrive</span>
                  <input
                    required
                    type="date"
                    value={formData.arrive}
                    onChange={(event) => setFormData((current) => ({ ...current, arrive: event.target.value }))}
                    className="mt-2 h-12 w-full rounded-lg border border-forest/10 bg-offwhite px-3 text-sm outline-none focus:border-orange"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-bold text-forest">Depart</span>
                  <input
                    required
                    type="date"
                    value={formData.depart}
                    onChange={(event) => setFormData((current) => ({ ...current, depart: event.target.value }))}
                    className="mt-2 h-12 w-full rounded-lg border border-forest/10 bg-offwhite px-3 text-sm outline-none focus:border-orange"
                  />
                </label>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-sm font-bold text-forest">Guests</span>
                  <select
                    value={formData.guests}
                    onChange={(event) => setFormData((current) => ({ ...current, guests: event.target.value }))}
                    className="mt-2 h-12 w-full rounded-lg border border-forest/10 bg-offwhite px-3 text-sm outline-none focus:border-orange"
                  >
                    {Array.from({ length: Math.max(1, listing.maxGuests) }, (_, index) => index + 1).map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-bold text-forest">Vehicle</span>
                  <select
                    value={formData.vehicleType}
                    onChange={(event) => setFormData((current) => ({ ...current, vehicleType: event.target.value }))}
                    className="mt-2 h-12 w-full rounded-lg border border-forest/10 bg-offwhite px-3 text-sm outline-none focus:border-orange"
                  >
                    <option value="bike">Bike</option>
                    <option value="car">Car</option>
                    <option value="suv">SUV</option>
                    <option value="campervan">Campervan</option>
                    <option value="caravan">Caravan</option>
                  </select>
                </label>
              </div>

              <label className="mt-4 block">
                <span className="text-sm font-bold text-forest">Own tent?</span>
                <select
                  value={formData.ownTent}
                  onChange={(event) => setFormData((current) => ({ ...current, ownTent: event.target.value }))}
                  className="mt-2 h-12 w-full rounded-lg border border-forest/10 bg-offwhite px-3 text-sm outline-none focus:border-orange"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="not-sure">Not sure</option>
                </select>
              </label>

              <label className="mt-4 block">
                <span className="text-sm font-bold text-forest">Needed essentials</span>
                <textarea
                  rows={3}
                  value={formData.essentials}
                  onChange={(event) => setFormData((current) => ({ ...current, essentials: event.target.value }))}
                  className="mt-2 w-full resize-none rounded-lg border border-forest/10 bg-offwhite px-3 py-3 text-sm outline-none focus:border-orange"
                />
              </label>

              <button type="submit" className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-orange px-5 py-4 font-extrabold text-white transition-colors hover:bg-orange-dark">
                {availability.cta}
                <ArrowRight size={18} />
              </button>

              {requestId && (
                <div className="mt-5 rounded-lg bg-forest p-4 text-white">
                  <p className="font-extrabold">Request saved: {requestId}</p>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    Contact stays gated until CampIn reviews the request and verification gaps.
                  </p>
                </div>
              )}

              <div className="mt-5 rounded-lg bg-offwhite p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-textgrey">Stay estimate</span>
                  <span className="font-bold text-forest">{listing.price > 0 ? `INR ${listing.price}` : "Host confirmed"}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-textgrey">Camper service fee</span>
                  <span className="font-bold text-forest">{serviceFee > 0 ? `INR ${serviceFee}` : "Later"}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-forest/10 pt-3 text-base font-extrabold">
                  <span className="text-forest">Estimated total</span>
                  <span className="text-orange">{total > 0 ? `INR ${total}` : "Not live"}</span>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm text-textgrey">
                <p className="flex items-start gap-2">
                  <CalendarDays size={17} className="mt-0.5 shrink-0 text-orange" />
                  Availability is request-based, not inferred from public pages.
                </p>
                <p className="flex items-start gap-2">
                  <Clock3 size={17} className="mt-0.5 shrink-0 text-orange" />
                  Target response: {listing.availability.hostResponseTargetHours || 24} hours after CampIn review.
                </p>
                <p className="flex items-start gap-2">
                  <Phone size={17} className="mt-0.5 shrink-0 text-orange" />
                  Public business contact status: {listing.contactVerificationStatus.replace(/_/g, " ")}.
                </p>
                <p className="flex items-start gap-2">
                  <Users size={17} className="mt-0.5 shrink-0 text-orange" />
                  Host payout and service fee apply only after a confirmed pilot model exists.
                </p>
              </div>
            </form>
          </aside>
        </div>
      </div>

      {/* Smart Profile Handshake Modal */}
      {showHandshakeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-[#2f6548]/30 bg-[#0a1e14] p-8 text-white shadow-2xl">
            {/* Mesh glow effects */}
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-orange/10 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-emerald-500/5 blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-orange">
                  🤝 Smart Profile Handshake
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-black tracking-tight leading-tight">
                Unlock Contact Details & Booking Request
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                CampIn protects land owners and guests by requiring a verified profile before granting direct contact details.
                Save your profile details once to unlock requests, whatsapp coordination, and route maps across the entire website instantly.
              </p>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!handshakeForm.email || !handshakeForm.phone) return;
                  setHandshakeStatus("saving");

                  try {
                    const profileData = {
                      name: handshakeForm.name || "Guest Camper",
                      email: handshakeForm.email,
                      phone: handshakeForm.phone,
                    };
                    window.localStorage.setItem("campin.guest.profile.v1", JSON.stringify(profileData));
                    
                    // submit as waitlist or profile lead
                    await submitMvpLead({
                      type: "camper_waitlist",
                      sourcePage: `/listing/${listing.id}`,
                      name: profileData.name,
                      email: profileData.email,
                      phone: profileData.phone,
                      consent: true,
                      status: "profile_handshake_completed",
                      score: 5,
                      payload: {
                        action: "unlock_listing_contact",
                        listingId: listing.id,
                        listingTitle: listing.title,
                      }
                    });

                    setGuestProfile(profileData);
                    setFormData((current) => ({
                      ...current,
                      name: profileData.name,
                      email: profileData.email,
                      phone: profileData.phone,
                    }));
                    
                    setHandshakeStatus("saved");
                    setShowHandshakeModal(false);

                    // Re-trigger actual inquiry booking flow now that credentials are saved!
                    const idValue = `REQ-${Date.now().toString(36).toUpperCase()}`;
                    const payload = {
                      id: idValue,
                      listingId: listing.id,
                      listingTitle: listing.title,
                      createdAt: new Date().toISOString(),
                      status: "Awaiting CampIn review",
                      ...formData,
                      name: profileData.name,
                      email: profileData.email,
                      phone: profileData.phone,
                    };
                    saveRequest(payload);
                    await submitMvpLead({
                      type: "listing_inquiry",
                      sourcePage: `/listing/${listing.id}`,
                      name: profileData.name,
                      email: profileData.email,
                      phone: profileData.phone,
                      city: listing.location,
                      status: "awaiting_campin_review",
                      score: 5,
                      consent: true,
                      payload,
                    });
                    setRequestId(idValue);
                  } catch {
                    setHandshakeStatus("idle");
                  }
                }}
                className="mt-6 space-y-4"
              >
                <label className="block">
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange">Full Name</span>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={handshakeForm.name}
                    onChange={(e) => setHandshakeForm((curr) => ({ ...curr, name: e.target.value }))}
                    className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-semibold text-white outline-none focus:border-orange focus:bg-white/10"
                  />
                </label>

                <label className="block">
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange">Email (For Gated Access)</span>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={15} />
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={handshakeForm.email}
                      onChange={(e) => setHandshakeForm((curr) => ({ ...curr, email: e.target.value }))}
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-xs font-semibold text-white outline-none focus:border-orange focus:bg-white/10"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange">WhatsApp / Phone</span>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={15} />
                    <input
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      value={handshakeForm.phone}
                      onChange={(e) => setHandshakeForm((curr) => ({ ...curr, phone: e.target.value }))}
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-xs font-semibold text-white outline-none focus:border-orange focus:bg-white/10"
                    />
                  </div>
                </label>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowHandshakeModal(false)}
                    className="h-12 w-1/3 rounded-xl border border-white/10 bg-transparent text-xs font-bold text-white hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={handshakeStatus === "saving"}
                    className="h-12 w-2/3 rounded-xl bg-orange hover:bg-orange-dark text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange/20"
                  >
                    {handshakeStatus === "saving" ? "Unlocking..." : "Verify & Unlock Contact"}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>

              <div className="mt-4 border-t border-white/5 pt-4 text-center">
                <p className="text-[9px] text-white/40 font-semibold leading-relaxed">
                  🔒 We never share details without active landowners consent. No password required. Stored securely inside local sandbox.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
