import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Flame, Mail, MapPin, User } from "lucide-react";
import { saveValidationLead, scoreNewsletterLead, type LeadData, type ValidationLead } from "../../lib/validationMachine";

const segments = [
  { value: "camper", label: "Camper" },
  { value: "own-gear-camper", label: "Own-gear camper" },
  { value: "road-traveler", label: "Road traveler" },
  { value: "host", label: "Host" },
  { value: "newsletter-only", label: "Just the newsletter" },
];

export default function CampfireSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    segment: "camper",
    newsletterConsent: false,
    acknowledgePrivacy: false,
    agreeToTerms: false,
  });
  const [submittedLead, setSubmittedLead] = useState<ValidationLead | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const data: LeadData = formData;
    const lead = saveValidationLead("newsletter", data, scoreNewsletterLead(data), "Subscribed");
    setSubmittedLead(lead);
  };

  if (submittedLead) {
    return (
      <div className="min-w-0 rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-forest text-white">
            <CheckCircle size={24} />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-orange">Subscribed</p>
            <h3 className="mt-1 text-xl font-extrabold text-forest">Welcome to The Campfire.</h3>
            <p className="mt-2 text-sm leading-6 text-textgrey">
              This email is now counted toward the 500-subscriber validation target.
            </p>
            <button
              type="button"
              onClick={() => setSubmittedLead(null)}
              className="mt-5 rounded-lg bg-offwhite px-4 py-2 text-sm font-bold text-forest transition-colors hover:text-orange"
            >
              Add another subscriber
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="min-w-0 rounded-2xl border border-forest/10 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange text-white">
          <Flame size={24} />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-orange">The Campfire by CampIn</p>
          <h2 className="mt-1 text-2xl font-extrabold text-forest">Weekly camping intelligence before the marketplace.</h2>
          <p className="mt-2 text-sm leading-6 text-textgrey">
            Routes, safety notes, verified-host progress, road-stop mapping, and one community question every week.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold text-forest">Name</span>
          <div className="relative mt-2">
            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textgrey" />
            <input
              required
              value={formData.name}
              onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
              placeholder="Your name"
              className="h-12 w-full rounded-lg border border-forest/10 bg-offwhite pl-11 pr-4 outline-none transition focus:border-orange focus:bg-white"
            />
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-bold text-forest">Email</span>
          <div className="relative mt-2">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textgrey" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
              placeholder="you@example.com"
              className="h-12 w-full rounded-lg border border-forest/10 bg-offwhite pl-11 pr-4 outline-none transition focus:border-orange focus:bg-white"
            />
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-bold text-forest">City</span>
          <div className="relative mt-2">
            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-textgrey" />
            <input
              required
              value={formData.city}
              onChange={(event) => setFormData((current) => ({ ...current, city: event.target.value }))}
              placeholder="Bangalore"
              className="h-12 w-full rounded-lg border border-forest/10 bg-offwhite pl-11 pr-4 outline-none transition focus:border-orange focus:bg-white"
            />
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-bold text-forest">I am mainly a</span>
          <select
            value={formData.segment}
            onChange={(event) => setFormData((current) => ({ ...current, segment: event.target.value }))}
            className="mt-2 h-12 w-full rounded-lg border border-forest/10 bg-offwhite px-4 text-forest outline-none transition focus:border-orange focus:bg-white"
          >
            {segments.map((segment) => (
              <option key={segment.value} value={segment.value}>
                {segment.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 space-y-3 rounded-2xl border border-forest/10 bg-offwhite p-4 text-sm text-textgrey">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            required
            checked={formData.newsletterConsent}
            onChange={(event) => setFormData((current) => ({ ...current, newsletterConsent: event.target.checked }))}
            className="mt-1 h-5 w-5 shrink-0 accent-orange"
          />
          <span>I want to receive The Campfire newsletter. I can unsubscribe anytime.</span>
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
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-forest px-6 py-4 font-extrabold text-white transition-colors hover:bg-forest-light"
      >
        Subscribe to The Campfire
        <ArrowRight size={18} />
      </button>
    </form>
  );
}
