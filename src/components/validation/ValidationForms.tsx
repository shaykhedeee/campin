import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  Car,
  CheckCircle,
  Droplets,
  IndianRupee,
  Mail,
  MapPin,
  Phone,
  Shield,
  Tent,
  User,
  type LucideIcon,
} from "lucide-react";
import {
  saveValidationLead,
  scoreCamperLead,
  scoreHostLead,
  scoreRoadStopLead,
  type LeadData,
  type ValidationLead,
} from "../../lib/validationMachine";

const campingTypes = [
  { id: "own-tent", label: "Own tent" },
  { id: "hosted-tent", label: "Hosted tent" },
  { id: "car-camping", label: "Car camping" },
  { id: "campervan", label: "Campervan" },
  { id: "family", label: "Family camping" },
  { id: "trekking-add-on", label: "Trekking add-on" },
];

const preferredRegions = ["Bangalore", "Coorg", "Wayanad", "Chikmagalur", "Ramanagara", "Kanakapura", "Other"];

const safetyConcerns = ["Safety", "Permission", "Washroom", "Price", "Crowds", "Gear", "Family approval", "Road access"];

const hostPropertyTypes = [
  "Farm",
  "Coffee estate",
  "Homestay",
  "Orchard",
  "Terrace",
  "Forest-edge land",
  "Lake or river side",
  "Dhaba or road stop",
];

const roadRoutes = [
  "Bangalore-Coorg-Wayanad",
  "Bangalore-Chikmagalur",
  "Mumbai-Goa",
  "Delhi-Manali-Leh",
  "Jaipur-Jaisalmer",
  "Other",
];

const vehicleAccessOptions = ["Bike", "Car", "SUV", "Campervan"];

interface SuccessStateProps {
  lead: ValidationLead;
  title: string;
  message: string;
  onReset: () => void;
}

function SuccessState({ lead, title, message, onReset }: SuccessStateProps) {
  return (
    <div className="min-w-0 rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-forest text-white">
          <CheckCircle size={24} />
        </div>
        <div className="min-w-0">
          <h3 className="text-xl font-extrabold text-forest">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-textgrey">{message}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-offwhite p-3">
              <p className="text-xs font-bold uppercase tracking-wide text-textgrey">Lead ID</p>
              <p className="mt-1 font-extrabold text-forest">{lead.id}</p>
            </div>
            <div className="rounded-lg bg-offwhite p-3">
              <p className="text-xs font-bold uppercase tracking-wide text-textgrey">Score</p>
              <p className="mt-1 font-extrabold text-forest">{lead.score}/10</p>
            </div>
            <div className="rounded-lg bg-offwhite p-3">
              <p className="text-xs font-bold uppercase tracking-wide text-textgrey">Stage</p>
              <p className="mt-1 font-extrabold text-forest">{lead.status}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-orange px-5 py-3 text-sm font-extrabold text-white transition-colors hover:bg-orange-dark"
          >
            Add another lead
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  icon?: LucideIcon;
}

function TextInput({ label, value, onChange, required, type = "text", placeholder, icon: Icon }: TextInputProps) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-forest">{label}</span>
      <div className="relative mt-2">
        {Icon && <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textgrey" />}
        <input
          type={type}
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`h-12 w-full rounded-lg border border-forest/10 bg-offwhite pr-4 outline-none transition focus:border-orange focus:bg-white ${
            Icon ? "pl-11" : "px-4"
          }`}
        />
      </div>
    </label>
  );
}

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

function SelectInput({ label, value, onChange, options, required }: SelectInputProps) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-forest">{label}</span>
      <select
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-lg border border-forest/10 bg-offwhite px-4 text-forest outline-none transition focus:border-orange focus:bg-white"
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

interface PillGroupProps {
  label: string;
  options: { id: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

function PillGroup({ label, options, selected, onChange }: PillGroupProps) {
  const toggle = (id: string) => {
    onChange(selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]);
  };

  return (
    <div>
      <p className="text-sm font-bold text-forest">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggle(option.id)}
              className={`rounded-lg border px-3 py-2 text-sm font-bold transition-colors ${
                active ? "border-forest bg-forest text-white" : "border-forest/10 bg-offwhite text-forest hover:border-orange"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CamperWaitlistForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    ownGear: "",
    willingToPay: "",
    whatsappOptIn: false,
    newsletterConsent: false,
    acknowledgePrivacy: false,
    agreeToTerms: false,
    acceptPledge: false,
  });
  const [campingType, setCampingType] = useState<string[]>([]);
  const [preferredRegion, setPreferredRegion] = useState<string[]>(["Bangalore"]);
  const [safetyConcern, setSafetyConcern] = useState<string[]>(["Safety", "Permission"]);
  const [submittedLead, setSubmittedLead] = useState<ValidationLead | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const data: LeadData = { ...formData, campingType, preferredRegion, safetyConcern };
    const lead = saveValidationLead("camper", data, scoreCamperLead(data));
    setSubmittedLead(lead);
  };

  if (submittedLead) {
    return (
      <SuccessState
        lead={submittedLead}
        title="Camper waitlist lead captured"
        message="This lead is now part of the validation scoreboard. High-intent leads should receive the safety survey or a founder follow-up."
        onReset={() => setSubmittedLead(null)}
      />
    );
  }

  return (
    <form onSubmit={submit} className="min-w-0 rounded-2xl border border-forest/10 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-forest text-white">
          <Tent size={24} />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-orange">Camper waitlist</p>
          <h2 className="mt-1 text-2xl font-extrabold text-forest">Find safe, permissioned camping first.</h2>
          <p className="mt-2 text-sm leading-6 text-textgrey">
            Captures the exact fields needed to score early demand before building booking flows.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <TextInput
          label="Full name"
          required
          value={formData.name}
          onChange={(name) => setFormData((current) => ({ ...current, name }))}
          placeholder="Your name"
          icon={User}
        />
        <TextInput
          label="Email"
          required
          type="email"
          value={formData.email}
          onChange={(email) => setFormData((current) => ({ ...current, email }))}
          placeholder="you@example.com"
          icon={Mail}
        />
        <TextInput
          label="City"
          required
          value={formData.city}
          onChange={(city) => setFormData((current) => ({ ...current, city }))}
          placeholder="Bangalore"
          icon={MapPin}
        />
        <SelectInput
          label="Own gear?"
          required
          value={formData.ownGear}
          onChange={(ownGear) => setFormData((current) => ({ ...current, ownGear }))}
          options={[
            { value: "yes", label: "Yes, I can bring my own tent" },
            { value: "no", label: "No, I need hosted gear" },
            { value: "building-kit", label: "I am building my kit" },
          ]}
        />
      </div>

      <div className="mt-6 space-y-6">
        <PillGroup label="Camping type" options={campingTypes} selected={campingType} onChange={setCampingType} />
        <PillGroup
          label="Preferred validation region"
          options={preferredRegions.map((region) => ({ id: region, label: region }))}
          selected={preferredRegion}
          onChange={setPreferredRegion}
        />
        <PillGroup
          label="Safety concern"
          options={safetyConcerns.map((concern) => ({ id: concern, label: concern }))}
          selected={safetyConcern}
          onChange={setSafetyConcern}
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <SelectInput
          label="Would you pay for a permissioned safe spot?"
          required
          value={formData.willingToPay}
          onChange={(willingToPay) => setFormData((current) => ({ ...current, willingToPay }))}
          options={[
            { value: "yes", label: "Yes" },
            { value: "maybe", label: "Maybe" },
            { value: "no", label: "No" },
          ]}
        />
        <label className="flex min-h-12 items-center gap-3 rounded-lg border border-forest/10 bg-offwhite px-4 py-3">
          <input
            type="checkbox"
            checked={formData.whatsappOptIn}
            onChange={(event) => setFormData((current) => ({ ...current, whatsappOptIn: event.target.checked }))}
            className="h-5 w-5 accent-orange"
          />
          <span className="text-sm font-bold text-forest">WhatsApp pilot-trip updates</span>
        </label>
      </div>

      <div className="mt-6 space-y-3 rounded-2xl border border-forest/10 bg-offwhite p-4 text-sm text-textgrey">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={formData.newsletterConsent}
            onChange={(event) => setFormData((current) => ({ ...current, newsletterConsent: event.target.checked }))}
            className="mt-1 h-5 w-5 shrink-0 accent-orange"
          />
          <span>Send me The Campfire newsletter (optional). You can unsubscribe anytime.</span>
        </label>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            required
            checked={formData.acknowledgePrivacy}
            onChange={(event) => setFormData((current) => ({ ...current, acknowledgePrivacy: event.target.checked }))}
            className="mt-1 h-5 w-5 shrink-0 accent-orange"
          />
          <span>
            I have read the{" "}
            <Link to="/privacy" className="font-bold text-forest underline underline-offset-4 hover:text-orange">
              Privacy Notice
            </Link>
            .
          </span>
        </label>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            required
            checked={formData.agreeToTerms}
            onChange={(event) => setFormData((current) => ({ ...current, agreeToTerms: event.target.checked }))}
            className="mt-1 h-5 w-5 shrink-0 accent-orange"
          />
          <span>
            I agree to the{" "}
            <Link to="/terms" className="font-bold text-forest underline underline-offset-4 hover:text-orange">
              Terms of Service
            </Link>
            .
          </span>
        </label>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            required
            checked={formData.acceptPledge}
            onChange={(event) => setFormData((current) => ({ ...current, acceptPledge: event.target.checked }))}
            className="mt-1 h-5 w-5 shrink-0 accent-orange"
          />
          <span>
            I accept the{" "}
            <Link
              to="/responsible-camping-pledge"
              className="font-bold text-forest underline underline-offset-4 hover:text-orange"
            >
              Responsible Camping Pledge
            </Link>
            .
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange px-6 py-4 font-extrabold text-white transition-colors hover:bg-orange-dark"
      >
        Capture camper lead
        <ArrowRight size={18} />
      </button>
    </form>
  );
}

export function HostInterestForm() {
  const [formData, setFormData] = useState({
    contactName: "",
    phone: "",
    email: "",
    locationPin: "",
    washroom: "",
    water: "",
    electricity: "",
    parking: "",
    photos: "",
    permissionStatus: "",
    expectedPrice: "",
    acknowledgePrivacy: false,
    agreeToTerms: false,
  });
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [submittedLead, setSubmittedLead] = useState<ValidationLead | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const data: LeadData = { ...formData, propertyType, expectedPrice: Number(formData.expectedPrice || 0) };
    const lead = saveValidationLead("host", data, scoreHostLead(data));
    setSubmittedLead(lead);
  };

  if (submittedLead) {
    return (
      <SuccessState
        lead={submittedLead}
        title="Host application captured"
        message="This host is now in the validation pipeline. Strong leads should receive a founder call, pin review, photo review, and amenity check."
        onReset={() => setSubmittedLead(null)}
      />
    );
  }

  return (
    <form onSubmit={submit} className="min-w-0 rounded-2xl border border-forest/10 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-forest text-white">
          <Shield size={24} />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-orange">Host interest form</p>
          <h2 className="mt-1 text-2xl font-extrabold text-forest">Turn land into a reviewed outdoor stay.</h2>
          <p className="mt-2 text-sm leading-6 text-textgrey">
            The form asks only for inputs needed to judge permission, amenities, safety, and founder follow-up.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <TextInput
          label="Contact name"
          required
          value={formData.contactName}
          onChange={(contactName) => setFormData((current) => ({ ...current, contactName }))}
          placeholder="Host or manager"
          icon={User}
        />
        <TextInput
          label="Phone"
          required
          type="tel"
          value={formData.phone}
          onChange={(phone) => setFormData((current) => ({ ...current, phone }))}
          placeholder="+91"
          icon={Phone}
        />
        <TextInput
          label="Email"
          required
          type="email"
          value={formData.email}
          onChange={(email) => setFormData((current) => ({ ...current, email }))}
          placeholder="host@example.com"
          icon={Mail}
        />
        <TextInput
          label="Exact location pin"
          required
          type="url"
          value={formData.locationPin}
          onChange={(locationPin) => setFormData((current) => ({ ...current, locationPin }))}
          placeholder="Google Maps share link"
          icon={MapPin}
        />
        <TextInput
          label="Photo folder or link"
          required
          type="url"
          value={formData.photos}
          onChange={(photos) => setFormData((current) => ({ ...current, photos }))}
          placeholder="Drive/Instagram/website link"
          icon={Camera}
        />
      </div>

      <div className="mt-6">
        <PillGroup
          label="Property type (select all that apply)"
          options={hostPropertyTypes.map((type) => ({ id: type, label: type }))}
          selected={propertyType}
          onChange={setPropertyType}
        />
        {propertyType.length === 0 && (
          <p className="mt-2 text-xs font-semibold text-textgrey">Select at least one property type before submitting.</p>
        )}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <SelectInput
          label="Washroom"
          required
          value={formData.washroom}
          onChange={(washroom) => setFormData((current) => ({ ...current, washroom }))}
          options={[
            { value: "private", label: "Private/guest" },
            { value: "shared", label: "Shared/basic" },
            { value: "none", label: "None" },
          ]}
        />
        <SelectInput
          label="Water"
          required
          value={formData.water}
          onChange={(water) => setFormData((current) => ({ ...current, water }))}
          options={[
            { value: "drinking", label: "Drinking water" },
            { value: "basic", label: "Basic water" },
            { value: "none", label: "None" },
          ]}
        />
        <SelectInput
          label="Electricity"
          required
          value={formData.electricity}
          onChange={(electricity) => setFormData((current) => ({ ...current, electricity }))}
          options={[
            { value: "yes", label: "Yes" },
            { value: "limited", label: "Limited" },
            { value: "none", label: "None" },
          ]}
        />
        <SelectInput
          label="Parking"
          required
          value={formData.parking}
          onChange={(parking) => setFormData((current) => ({ ...current, parking }))}
          options={[
            { value: "bike", label: "Bike" },
            { value: "car", label: "Car" },
            { value: "suv", label: "SUV" },
            { value: "campervan", label: "Campervan" },
            { value: "none", label: "None" },
          ]}
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <SelectInput
          label="Permission status"
          required
          value={formData.permissionStatus}
          onChange={(permissionStatus) => setFormData((current) => ({ ...current, permissionStatus }))}
          options={[
            { value: "owned", label: "I own this land" },
            { value: "controlled", label: "I lease/control it" },
            { value: "family", label: "Family/community land" },
            { value: "unsure", label: "Unsure" },
          ]}
        />
        <TextInput
          label="Expected price per night"
          required
          type="number"
          value={formData.expectedPrice}
          onChange={(expectedPrice) => setFormData((current) => ({ ...current, expectedPrice }))}
          placeholder="1200"
          icon={IndianRupee}
        />
      </div>

      <div className="mt-6 space-y-3 rounded-2xl border border-forest/10 bg-offwhite p-4 text-sm text-textgrey">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            required
            checked={formData.acknowledgePrivacy}
            onChange={(event) => setFormData((current) => ({ ...current, acknowledgePrivacy: event.target.checked }))}
            className="mt-1 h-5 w-5 shrink-0 accent-orange"
          />
          <span>
            I have read the{" "}
            <Link to="/privacy" className="font-bold text-forest underline underline-offset-4 hover:text-orange">
              Privacy Notice
            </Link>
            .
          </span>
        </label>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            required
            checked={formData.agreeToTerms}
            onChange={(event) => setFormData((current) => ({ ...current, agreeToTerms: event.target.checked }))}
            className="mt-1 h-5 w-5 shrink-0 accent-orange"
          />
          <span>
            I agree to the{" "}
            <Link to="/terms" className="font-bold text-forest underline underline-offset-4 hover:text-orange">
              Terms of Service
            </Link>
            .
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={propertyType.length === 0}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange px-6 py-4 font-extrabold text-white transition-colors hover:bg-orange-dark"
      >
        Capture host application
        <ArrowRight size={18} />
      </button>
    </form>
  );
}

export function RoadStopLeadForm() {
  const [formData, setFormData] = useState({
    route: "Bangalore-Coorg-Wayanad",
    parkingCapacity: "",
    washroom: "",
    water: "",
    power: "",
    nightSafety: "",
    localContact: "",
    acknowledgePrivacy: false,
    agreeToTerms: false,
  });
  const [vehicleAccess, setVehicleAccess] = useState<string[]>(["Car", "SUV"]);
  const [submittedLead, setSubmittedLead] = useState<ValidationLead | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const data: LeadData = {
      ...formData,
      parkingCapacity: Number(formData.parkingCapacity || 0),
      vehicleAccess,
    };
    const lead = saveValidationLead("roadStop", data, scoreRoadStopLead(data));
    setSubmittedLead(lead);
  };

  if (submittedLead) {
    return (
      <SuccessState
        lead={submittedLead}
        title="Road-stop lead captured"
        message="This stop is now a candidate. Do not publish trust claims until overnight permission and amenities are checked."
        onReset={() => setSubmittedLead(null)}
      />
    );
  }

  return (
    <form onSubmit={submit} className="min-w-0 rounded-2xl border border-forest/10 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-forest text-white">
          <Car size={24} />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-orange">Road-stop lead form</p>
          <h2 className="mt-1 text-2xl font-extrabold text-forest">Map safe overnight stops for the Indian road.</h2>
          <p className="mt-2 text-sm leading-6 text-textgrey">
            Captures the minimum data needed to classify a stop as candidate, basic, standard, or rejected.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <SelectInput
          label="Route"
          required
          value={formData.route}
          onChange={(route) => setFormData((current) => ({ ...current, route }))}
          options={roadRoutes.map((route) => ({ value: route, label: route }))}
        />
        <TextInput
          label="Parking capacity"
          required
          type="number"
          value={formData.parkingCapacity}
          onChange={(parkingCapacity) => setFormData((current) => ({ ...current, parkingCapacity }))}
          placeholder="Number of vehicles"
          icon={Car}
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        <SelectInput
          label="Washroom"
          required
          value={formData.washroom}
          onChange={(washroom) => setFormData((current) => ({ ...current, washroom }))}
          options={[
            { value: "clean", label: "Clean" },
            { value: "basic", label: "Basic" },
            { value: "unknown", label: "Unknown" },
            { value: "none", label: "None" },
          ]}
        />
        <SelectInput
          label="Water"
          required
          value={formData.water}
          onChange={(water) => setFormData((current) => ({ ...current, water }))}
          options={[
            { value: "drinking", label: "Drinking" },
            { value: "basic", label: "Basic" },
            { value: "unknown", label: "Unknown" },
            { value: "none", label: "None" },
          ]}
        />
        <SelectInput
          label="Power"
          required
          value={formData.power}
          onChange={(power) => setFormData((current) => ({ ...current, power }))}
          options={[
            { value: "yes", label: "Yes" },
            { value: "limited", label: "Limited" },
            { value: "unknown", label: "Unknown" },
            { value: "none", label: "None" },
          ]}
        />
      </div>

      <div className="mt-6">
        <PillGroup
          label="Vehicle access"
          options={vehicleAccessOptions.map((vehicle) => ({ id: vehicle, label: vehicle }))}
          selected={vehicleAccess}
          onChange={setVehicleAccess}
        />
      </div>

      <label className="mt-6 block">
        <span className="text-sm font-bold text-forest">Night safety notes</span>
        <textarea
          required
          rows={4}
          value={formData.nightSafety}
          onChange={(event) => setFormData((current) => ({ ...current, nightSafety: event.target.value }))}
          placeholder="Lighting, caretaker, nearby business, road access, local safety context..."
          className="mt-2 w-full resize-none rounded-lg border border-forest/10 bg-offwhite px-4 py-3 outline-none transition focus:border-orange focus:bg-white"
        />
      </label>

      <TextInput
        label="Local contact"
        required
        value={formData.localContact}
        onChange={(localContact) => setFormData((current) => ({ ...current, localContact }))}
        placeholder="Public business phone or contact person"
        icon={Phone}
      />

      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-offwhite p-4 text-sm leading-6 text-textgrey">
        <Droplets size={18} className="mt-0.5 shrink-0 text-orange" />
        Road Stop Standard requires parking, washroom, water, and local support. Power improves the score but cannot replace safety.
      </div>

      <div className="mt-6 space-y-3 rounded-2xl border border-forest/10 bg-offwhite p-4 text-sm text-textgrey">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            required
            checked={formData.acknowledgePrivacy}
            onChange={(event) => setFormData((current) => ({ ...current, acknowledgePrivacy: event.target.checked }))}
            className="mt-1 h-5 w-5 shrink-0 accent-orange"
          />
          <span>
            I have read the{" "}
            <Link to="/privacy" className="font-bold text-forest underline underline-offset-4 hover:text-orange">
              Privacy Notice
            </Link>
            .
          </span>
        </label>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            required
            checked={formData.agreeToTerms}
            onChange={(event) => setFormData((current) => ({ ...current, agreeToTerms: event.target.checked }))}
            className="mt-1 h-5 w-5 shrink-0 accent-orange"
          />
          <span>
            I agree to the{" "}
            <Link to="/terms" className="font-bold text-forest underline underline-offset-4 hover:text-orange">
              Terms of Service
            </Link>
            .
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange px-6 py-4 font-extrabold text-white transition-colors hover:bg-orange-dark"
      >
        Capture road-stop lead
        <ArrowRight size={18} />
      </button>
    </form>
  );
}
