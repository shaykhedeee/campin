import { useEffect, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle, Download, LockKeyhole, Mail, MapPin, Phone, ShieldCheck, User } from "lucide-react";
import { createGuideMarkdown, getCampingGuide } from "../data/campingGuides";
import { hasGuideAccess, saveGuideAccessLead, type GuideAccessLead } from "../lib/guideAccess";

function downloadTextFile(fileName: string, content: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export default function CampingGuideDetail() {
  const { slug } = useParams();
  const guide = getCampingGuide(slug);
  const [lead, setLead] = useState<GuideAccessLead | null>(null);
  const [alreadyUnlocked, setAlreadyUnlocked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    interest: "safe-byot",
    consent: false,
  });

  useEffect(() => {
    if (guide) setAlreadyUnlocked(hasGuideAccess(guide.slug));
  }, [guide]);

  if (!guide) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-offwhite px-4 pt-24 text-center">
        <div className="max-w-md rounded-2xl border border-forest/10 bg-white p-8 shadow-sm">
          <BookOpen className="mx-auto text-orange" size={30} />
          <h1 className="mt-5 text-2xl font-extrabold text-forest">Guide not found</h1>
          <p className="mt-2 text-sm leading-6 text-textgrey">This CampIn guide is not in the local guide vault.</p>
          <Link to="/camping-guides" className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-5 py-3 font-bold text-white">
            <ArrowLeft size={18} />
            Back to Guides
          </Link>
        </div>
      </div>
    );
  }

  const unlocked = alreadyUnlocked || Boolean(lead) || (guide?.slug === "first-time-family-camping-india");
  const leadId = lead?.id ?? "LOCAL-UNLOCKED";

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const savedLead = saveGuideAccessLead(guide, formData);
    setLead(savedLead);
    setAlreadyUnlocked(true);
  };

  const downloadGuide = () => {
    downloadTextFile(guide.downloadFileName, createGuideMarkdown(guide, leadId));
  };

  return (
    <div className="min-h-screen bg-[#07130c] text-white pt-28 pb-20 overflow-hidden relative">
      {/* Mesh gradients */}
      <div className="absolute top-0 right-1/4 h-[500px] w-[500px] rounded-full bg-[#E67E22]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-[#1b4332]/20 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <Link to="/camping-guides" className="inline-flex items-center gap-2 text-sm font-bold text-orange hover:text-white transition-colors mb-8">
          <ArrowLeft size={16} />
          Back to camping guides
        </Link>

        {/* Header Block */}
        <section className="grid gap-8 rounded-[2.5rem] border border-white/10 bg-[#0a1e14]/50 backdrop-blur-xl p-8 text-white sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-orange">
              {unlocked ? "✓ Guide unlocked" : "🔒 Premium handbook"}
            </p>
            <h1 className="mt-5 text-3xl font-black leading-tight sm:text-5xl lg:text-6xl tracking-tight">{guide.title}</h1>
            <p className="mt-5 text-base leading-relaxed text-white/70">{guide.subtitle}</p>
            
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs font-extrabold text-white/90">
                <MapPin size={13} className="text-orange" />
                {guide.region}
              </span>
              <span className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs font-extrabold text-white/90">{guide.difficulty}</span>
              <span className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs font-extrabold text-white/90">{guide.estimatedReadMinutes} Min Read</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-orange">Inside this manual</h3>
              <ul className="mt-4 space-y-2.5">
                {guide.whatYouGet.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-white/70 leading-relaxed">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {unlocked && (
              <button
                type="button"
                onClick={downloadGuide}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange hover:bg-orange-dark px-4 py-3 text-sm font-black text-white transition-all"
              >
                <Download size={16} />
                Download Markdown (.md)
              </button>
            )}
          </div>
        </section>

        {/* Content & Lock Split */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-start">
          
          {/* Main Manual Content */}
          <div className="space-y-8">
            {/* SEO-indexed core sections. If locked, we blur them but render fully. */}
            <div className={`space-y-8 transition-all duration-500 relative ${
              !unlocked ? "blur-md select-none pointer-events-none" : ""
            }`}>
              
              {/* Introduction & Overview */}
              <div className="rounded-3xl border border-white/10 bg-[#0a1e14]/30 p-6 sm:p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  <BookOpen size={20} className="text-orange" />
                  1. Comprehensive Overview
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/70">{guide.preview}</p>
              </div>

              {/* Step checklist details */}
              {guide.sections.map((section, idx) => (
                <div key={idx} className="rounded-3xl border border-white/10 bg-[#0a1e14]/30 p-6 sm:p-8 backdrop-blur-sm">
                  <h3 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                    <span className="text-orange font-bold">2.{idx + 1}</span>
                    {section.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">{section.body}</p>
                  
                  {section.checklist && (
                    <div className="mt-6">
                      <h4 className="text-xs font-black uppercase tracking-wider text-orange mb-3">Verification Checklist</h4>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {section.checklist.map((item, cIdx) => (
                          <div key={cIdx} className="flex items-center gap-2.5 rounded-xl bg-white/5 border border-white/5 p-3 text-xs font-bold text-white/95">
                            <CheckCircle className="text-orange shrink-0" size={16} />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Safety Rules block */}
              <div className="rounded-3xl border border-orange/20 bg-orange/5 p-6 sm:p-8 backdrop-blur-sm">
                <h3 className="text-xl font-black tracking-tight text-orange flex items-center gap-2">
                  <ShieldCheck size={22} />
                  Monitored Safety Guidelines
                </h3>
                <div className="mt-4 space-y-3">
                  {guide.safetyNotes.map((note, idx) => (
                    <p key={idx} className="text-xs leading-relaxed text-white/80 pl-4 border-l-2 border-orange/30">
                      {note}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* If locked, show absolute positioned alert banner */}
            {!unlocked && (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="max-w-md w-full rounded-2xl border border-white/10 bg-[#07130c]/90 backdrop-blur-md p-6 text-center shadow-2xl">
                  <Lock className="mx-auto text-orange animate-bounce" size={28} />
                  <h3 className="mt-4 text-lg font-black">Content Gated</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/60">
                    Submit your email and phone number using the form to instantly unlock this premium overlanding handbook.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Form / Unlock Sidebar */}
          <div className="rounded-3xl border border-white/10 bg-[#0a1e14]/50 backdrop-blur-xl p-6 sm:p-8 shadow-xl sticky top-28">
            {!unlocked ? (
              <form onSubmit={submit} className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange/10 border border-orange/20 text-orange">
                    <Lock size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">Unlock Full Guide</h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/60">
                      Unlock direct checklists, itineraries, and exact coordinates. Safe routing and zero spam.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-3">
                  {[
                    { key: "name", label: "Full Name", type: "text", placeholder: "e.g. Kabir Sen", required: true },
                    { key: "email", label: "Email Address", type: "email", placeholder: "e.g. kabir@gmail.com", required: true },
                    { key: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "e.g. +91 98765 43210", required: true },
                    { key: "city", label: "Current City", type: "text", placeholder: "e.g. Bangalore", required: true },
                  ].map((field) => (
                    <label key={field.key} className="block">
                      <span className="text-xs font-black text-white/80">{field.label}</span>
                      <input
                        required={field.required}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.key as keyof typeof formData] as string}
                        onChange={(event) => setFormData((current) => ({ ...current, [field.key]: event.target.value }))}
                        className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-orange focus:bg-white/10"
                      />
                    </label>
                  ))}
                </div>

                <label className="block">
                  <span className="text-xs font-black text-white/80">Main Interest</span>
                  <select
                    value={formData.interest}
                    onChange={(event) => setFormData((current) => ({ ...current, interest: event.target.value }))}
                    className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-[#07130c] px-3 text-sm text-white/80 outline-none transition focus:border-orange"
                  >
                    <option value="safe-byot">Safe BYOT camping</option>
                    <option value="family">Family camping</option>
                    <option value="campervan">Campervan / road stops</option>
                    <option value="host">Hosting land</option>
                    <option value="trekking">Trekking with camping</option>
                  </select>
                </label>

                <label className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/5 p-3 text-xs leading-relaxed text-white/60">
                  <input
                    required
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(event) => setFormData((current) => ({ ...current, consent: event.target.checked }))}
                    className="mt-1 h-4 w-4 shrink-0 accent-orange"
                  />
                  I agree that CampIn can contact me at the email or phone number provided about overlanding routes and private land stays.
                </label>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange hover:bg-orange-dark h-12 text-sm font-black text-white transition-all shadow-[0_15px_30px_rgba(230,126,34,0.15)]"
                >
                  Unlock Handbook
                  <ArrowLeft size={16} className="rotate-180" />
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-5">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Access Granted</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/60">
                    Lead logged successfully. You can download the markdown guide format to keep offline.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={downloadGuide}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange hover:bg-orange-dark h-11 text-xs font-black text-white transition-all"
                >
                  <Download size={14} />
                  Download offline manual
                </button>
                <div className="pt-4 border-t border-white/10 text-left">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">Local Lead Receipt</p>
                  <code className="block mt-2 rounded bg-white/5 p-2 text-[10px] text-orange border border-white/5 font-mono truncate">
                    {leadId}
                  </code>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
