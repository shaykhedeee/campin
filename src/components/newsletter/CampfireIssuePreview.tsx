import { Flame, MapPinned, MessageCircle, ShieldCheck, Tent } from "lucide-react";

const sections = [
  {
    icon: Tent,
    title: "What CampIn learned",
    text: "People want own-tent camping, but only where permission, washroom access, and local safety are clear.",
  },
  {
    icon: MapPinned,
    title: "Route of the week",
    text: "Bangalore-Coorg-Wayanad is the first validation route because it combines weekend demand with farm and estate supply.",
  },
  {
    icon: ShieldCheck,
    title: "Safety note",
    text: "Do not treat random public land as a campsite. CampIn starts with clear host permission and arrival-before-dark rules.",
  },
  {
    icon: MessageCircle,
    title: "Community question",
    text: "Would you pay for a quiet own-tent spot if it had a washroom, water, parking, and a reachable host?",
  },
];

export default function CampfireIssuePreview() {
  return (
    <article className="min-w-0 rounded-2xl border border-forest/10 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange text-white">
          <Flame size={24} />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-orange">Issue template</p>
          <h2 className="mt-1 text-2xl font-extrabold text-forest">The Campfire #001: Safe own-tent camping near Bangalore</h2>
          <p className="mt-2 text-sm leading-6 text-textgrey">
            This is the reusable editorial shape for the weekly newsletter system.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <div key={section.title} className="rounded-lg border border-forest/10 bg-offwhite p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-orange">
                <section.icon size={20} />
              </div>
              <h3 className="font-extrabold text-forest">{section.title}</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-textgrey">{section.text}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
