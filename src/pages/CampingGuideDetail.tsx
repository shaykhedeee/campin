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

  const unlocked = alreadyUnlocked || Boolean(lead);
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
    <div className="min-h-screen bg-offwhite pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/camping-guides" className="inline-flex items-center gap-2 text-sm font-bold text-forest hover:text-orange">
          <ArrowLeft size={17} />
          Back to camping guides
        </Link>

        <section className="mt-6 grid gap-8 rounded-[2rem] bg-forest p-6 text-white sm:p-8 lg:grid-cols-[1fr_0.7fr] lg:p-10">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-orange">
              <LockKeyhole size={18} />
              {unlocked ? "Guide unlocked" : "Lead magnet guide"}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">{guide.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/75">{guide.subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-forest">
                <MapPin size={15} />
                {guide.region}
              </span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-extrabold">{guide.difficulty}</span>
              <span className="rounded-full bg-orange px-4 py-2 text-sm font-extrabold">{guide.estimatedReadMinutes} min read</span>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-5 text-forest">
            <p className="text-sm font-bold text-orange">Why capture this lead?</p>
            <p className="mt-2 text-sm leading-6 text-textgrey">{guide.captureReason}</p>
            <div className="mt-5 rounded-xl bg-offwhite p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-textgrey">Primary keyword</p>
              <p className="mt-1 font-extrabold">{guide.primaryKeyword}</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black text-forest">Public preview</h2>
              <p className="mt-3 leading-7 text-textgrey">{guide.preview}</p>
              <div className="mt-5 grid gap-3">
                {guide.whatYouGet.map((item) => (
                  <p key={item} className="flex items-start gap-3 rounded-xl bg-offwhite p-4 text-sm font-bold leading-6 text-forest">
                    <CheckCircle className="mt-0.5 shrink-0 text-orange" size={18} />
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-orange/20 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-orange" size={24} />
                <h2 className="text-2xl font-black text-forest">Safety notes</h2>
              </div>
              <div className="mt-5 space-y-3">
                {guide.safetyNotes.map((note) => (
                  <p key={note} className="rounded-xl bg-orange/10 p-4 text-sm font-bold leading-6 text-forest">
                    {note}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm sm:p-8">
            {!unlocked ? (
              <form onSubmit={submit}>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest text-white">
                    <LockKeyhole size={23} />
                  </div>
                  <div>
                    <p className="font-bold text-orange">Unlock full guide</p>
                    <h2 className="mt-1 text-2xl font-black text-forest">Enter email and phone to access/download.</h2>
                    <p className="mt-2 text-sm leading-6 text-textgrey">
                      This is stored locally for now. When Supabase is connected, it becomes the guide lead table.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    { key: "name", label: "Full name", type: "text", icon: User, required: true },
                    { key: "email", label: "Email", type: "email", icon: Mail, required: true },
                    { key: "phone", label: "Phone / WhatsApp", type: "tel", icon: Phone, required: true },
                    { key: "city", label: "City", type: "text", icon: MapPin, required: true },
                  ].map((field) => (
                    <label key={field.key} className="block">
                      <span className="text-sm font-bold text-forest">{field.label}</span>
                      <div className="relative mt-2">
                        <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-textgrey" size={18} />
                        <input
                          required={field.required}
                          type={field.type}
                          value={formData[field.key as keyof typeof formData] as string}
                          onChange={(event) => setFormData((current) => ({ ...current, [field.key]: event.target.value }))}
                          className="h-12 w-full rounded-lg border border-forest/10 bg-offwhite pl-11 pr-4 outline-none transition focus:border-orange focus:bg-white"
                        />
                      </div>
                    </label>
                  ))}
                </div>

                <label className="mt-5 block">
                  <span className="text-sm font-bold text-forest">Main interest</span>
                  <select
                    value={formData.interest}
                    onChange={(event) => setFormData((current) => ({ ...current, interest: event.target.value }))}
                    className="mt-2 h-12 w-full rounded-lg border border-forest/10 bg-offwhite px-4 text-forest outline-none transition focus:border-orange focus:bg-white"
                  >
                    <option value="safe-byot">Safe BYOT camping</option>
                    <option value="family">Family camping</option>
                    <option value="campervan">Campervan / road stops</option>
                    <option value="host">Hosting land</option>
                    <option value="trekking">Trekking with camping</option>
                  </select>
                </label>

                <label className="mt-5 flex items-start gap-3 rounded-xl bg-offwhite p-4 text-sm leading-6 text-textgrey">
                  <input
                    required
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(event) => setFormData((current) => ({ ...current, consent: event.target.checked }))}
                    className="mt-1 h-4 w-4 accent-orange"
                  />
                  I agree that CampIn can store this guide request and contact me about responsible camping updates. I understand this does not confirm any booking or verified availability.
                </label>

                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange px-5 py-4 text-base font-extrabold text-white transition hover:bg-orange-dark"
                >
                  Unlock full guide
                  <Download size={18} />
                </button>
              </form>
            ) : (
              <div>
                <div className="flex items-start gap-4 rounded-2xl bg-forest p-5 text-white">
                  <CheckCircle className="shrink-0 text-orange" size={28} />
                  <div>
                    <h2 className="text-2xl font-black">Full guide unlocked</h2>
                    <p className="mt-2 text-sm leading-6 text-white/75">
                      Lead ID: <span className="font-bold text-white">{leadId}</span>. Download the markdown guide or read it below.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={downloadGuide}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange px-5 py-4 text-base font-extrabold text-white transition hover:bg-orange-dark"
                >
                  Download guide
                  <Download size={18} />
                </button>

                <div className="mt-6 space-y-5">
                  {guide.sections.map((section) => (
                    <article key={section.title} className="rounded-xl bg-offwhite p-5">
                      <h3 className="text-xl font-black text-forest">{section.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-textgrey">{section.body}</p>
                      {section.checklist && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {section.checklist.map((item) => (
                            <span key={item} className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-forest">
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
