import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle, Download, MapPin, ShieldCheck } from "lucide-react";
import { createGuideMarkdown, getCampingGuide } from "../data/campingGuides";

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
  if (!guide) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-offwhite px-4 pt-24 text-center">
        <div className="max-w-md rounded-2xl border border-forest/10 bg-white p-8 shadow-sm">
          <BookOpen className="mx-auto text-orange" size={30} />
          <h1 className="mt-5 text-2xl font-extrabold text-forest">Guide not found</h1>
          <p className="mt-2 text-sm leading-6 text-textgrey">This CampIn guide is not available yet.</p>
          <Link to="/camping-guides" className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-5 py-3 font-bold text-white">
            <ArrowLeft size={18} />
            Back to Guides
          </Link>
        </div>
      </div>
    );
  }

  const downloadGuide = () => {
    downloadTextFile(guide.downloadFileName, createGuideMarkdown(guide, "FREE-CAMPIN-GUIDE"));
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
              "Free guide + checklist"
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
            
            <button
                type="button"
                onClick={downloadGuide}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange hover:bg-orange-dark px-4 py-3 text-sm font-black text-white transition-all"
              >
                <Download size={16} />
                Download free guide (.md)
              </button>
          </div>
        </section>

        {/* Content & Lock Split */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] items-start">
          
          {/* Main Manual Content */}
          <div className="space-y-8">
            <div className="space-y-8 transition-all duration-500 relative">
              
              {/* Introduction & Overview */}
              <div className="rounded-3xl border border-white/10 bg-[#0a1e14]/30 p-6 sm:p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  <BookOpen size={20} className="text-orange" />
                  1. Practical Overview
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
                  Safety and permission notes
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

          </div>

          {/* Free guide download */}
          <div className="rounded-3xl border border-white/10 bg-[#0a1e14]/50 backdrop-blur-xl p-6 sm:p-8 shadow-xl sticky top-28">
            <div className="text-center py-6 space-y-5">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"><CheckCircle size={24} /></div>
              <h3 className="text-lg font-black text-white">Free, practical camping guide</h3>
              <p className="text-xs leading-relaxed text-white/60">Read the complete guide on this page or download an offline copy. No sign-up is needed.</p>
              <button type="button" onClick={downloadGuide} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange hover:bg-orange-dark h-11 text-xs font-black text-white transition-all"><Download size={14} />Download offline guide</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
