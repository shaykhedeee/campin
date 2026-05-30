import { ArrowRight, Calendar, CheckCircle, Compass, FileText, Layers, Shield, Target } from "lucide-react";
import CampInIcon from "../components/icons/CampInIcon";
import {
  airbnbLessons,
  automationBlueprints,
  campinFlows,
  originalIconShowcase,
  trustStack,
} from "../data/airbnbCampinPlaybook";

export default function StrategyLab() {
  return (
    <div className="min-h-screen bg-offwhite pt-28">
      <section className="border-b border-forest/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-lg bg-forest/10 px-3 py-2 text-sm font-bold text-forest">
              <Compass size={17} />
              CampIn Strategy Lab
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-forest md:text-5xl">
              Airbnb marketplace lessons, rebuilt for camping in India.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-textgrey">
              This is the internal operating surface for CampIn's pre-website phase: strategy, trust rules,
              validation flows, automations, and original outdoor iconography.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {[
              ["First wedge", "Bangalore and South India"],
              ["Trust model", "Permission, washrooms, water, exact pin"],
              ["Expansion path", "Stays, road stops, gear, routes"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-forest/10 bg-offwhite p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-orange">{label}</p>
                <p className="mt-2 text-lg font-black text-forest">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center gap-3">
          <Layers className="text-orange" size={22} />
          <h2 className="text-2xl font-black text-forest">Marketplace Lessons</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {airbnbLessons.map((lesson) => (
            <article key={lesson.title} className="rounded-lg border border-forest/10 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-black text-forest">{lesson.title}</h3>
              <p className="mt-3 text-sm leading-6 text-textgrey">{lesson.airbnbPattern}</p>
              <div className="mt-4 rounded-lg bg-forest/5 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-forest">CampIn move</p>
                <p className="mt-2 text-sm leading-6 text-textgrey">{lesson.campinMove}</p>
              </div>
              <p className="mt-4 text-sm font-semibold text-orange">{lesson.avoid}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-forest/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-center gap-3">
            <Target className="text-orange" size={22} />
            <h2 className="text-2xl font-black text-forest">User Flow Framework</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-4">
            {campinFlows.map((flow) => (
              <article key={flow.name} className="rounded-lg border border-forest/10 bg-offwhite p-5">
                <h3 className="text-lg font-black text-forest">{flow.name}</h3>
                <div className="mt-4 space-y-3">
                  {flow.steps.map((step, index) => (
                    <div key={step} className="flex items-center gap-2 text-sm font-semibold text-textgrey">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-black text-forest">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-orange">
                  <ArrowRight size={16} />
                  {flow.metric}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <Shield className="text-orange" size={22} />
            <h2 className="text-2xl font-black text-forest">Trust Stack</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {trustStack.map((item) => (
              <div key={item.label} className="rounded-lg border border-forest/10 bg-white p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest text-white">
                    <CampInIcon name={item.icon} className="h-5 w-5" title={item.label} />
                  </span>
                  <h3 className="font-black text-forest">{item.label}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-textgrey">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-center gap-3">
            <CheckCircle className="text-orange" size={22} />
            <h2 className="text-2xl font-black text-forest">Original Icon Set</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {originalIconShowcase.map((icon) => (
              <div key={icon.name} className="rounded-lg border border-forest/10 bg-white p-4 text-center">
                <CampInIcon name={icon.name} className="mx-auto h-8 w-8 text-forest" title={icon.label} />
                <p className="mt-3 text-sm font-black text-forest">{icon.label}</p>
                <p className="text-xs font-semibold text-textgrey">{icon.family}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-forest/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Calendar className="text-orange" size={22} />
              <h2 className="text-2xl font-black text-forest">Automation Blueprint</h2>
            </div>
            <div className="space-y-3">
              {automationBlueprints.map((automation) => (
                <div key={automation.name} className="min-w-0 rounded-lg border border-forest/10 bg-offwhite p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="min-w-0 break-words font-black text-forest">{automation.name}</h3>
                    <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-orange">{automation.cadence}</span>
                  </div>
                  <p className="mt-2 break-words text-sm leading-6 text-textgrey">{automation.output}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 rounded-lg border border-forest/10 bg-forest p-6 text-white">
            <div className="flex items-center gap-3">
              <FileText className="text-orange" size={22} />
              <h2 className="text-2xl font-black">Files Created</h2>
            </div>
            <div className="mt-5 space-y-3 text-sm leading-6 text-white/75">
              <p className="break-all">Docs/Business/CampIn_Airbnb_Strategy_Teardown.md</p>
              <p className="break-all">Docs/Design/CampIn_Airbnb_Learning_UX_System.md</p>
              <p className="break-all">Docs/Design/CampIn_Iconography_System.md</p>
              <p className="break-all">Docs/Business/CampIn_Agentic_Workflows.md</p>
              <p className="break-all">data/design/campin_icon_inventory.json</p>
              <p className="break-all">data/workflows/agentic_workflows.json</p>
              <p className="break-all">brand/icons/campin-outdoor-icons.svg</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
