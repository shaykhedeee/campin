import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ExternalLink, ListChecks, Target } from "lucide-react";
import {
  dashboardBlueprints,
  freeToolStack,
  nextFounderActions,
  readinessPillIcon,
  setupTasks,
  workflowCadence,
  type OpsStatus,
} from "../data/campinOps";
import { researchSystemHealth } from "../data/listings";
import { exportMvpLeadsToCsv, readMvpLeads } from "../lib/mvpLeadStore";
import { getValidationProgress, readValidationLeads } from "../lib/validationMachine";

const checklistStorageKey = "campin.ops.checklist.v1";

const statusStyles: Record<OpsStatus, string> = {
  Live: "bg-forest text-white",
  "Live locally": "bg-forest/10 text-forest",
  "Ready to connect": "bg-orange/10 text-orange",
  "Needs account": "bg-sky-mist text-forest",
  "Needs proof": "bg-sand text-forest",
  Paused: "bg-textgrey/10 text-textgrey",
};

export default function OpsCenter() {
  const [checkedTaskIds, setCheckedTaskIds] = useState<Set<string>>(() => readCheckedTasks());
  const [progress, setProgress] = useState(() => getValidationProgress());
  const [leadCount, setLeadCount] = useState(() => readValidationLeads().length);
  const [mvpLeadCount, setMvpLeadCount] = useState(() => readMvpLeads().length);
  const ReadinessIcon = readinessPillIcon;

  useEffect(() => {
    const syncValidation = () => {
      setProgress(getValidationProgress());
      setLeadCount(readValidationLeads().length);
      setMvpLeadCount(readMvpLeads().length);
    };

    window.addEventListener("campin-validation-updated", syncValidation);
    window.addEventListener("campin-mvp-leads-updated", syncValidation);
    return () => {
      window.removeEventListener("campin-validation-updated", syncValidation);
      window.removeEventListener("campin-mvp-leads-updated", syncValidation);
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem(checklistStorageKey, JSON.stringify([...checkedTaskIds]));
  }, [checkedTaskIds]);

  const checkedCount = checkedTaskIds.size;
  const setupCompletion = Math.round((checkedCount / setupTasks.length) * 100);
  const proofTargetsComplete = progress.filter((item) => item.current >= item.target).length;
  const liveTools = freeToolStack.filter((tool) => tool.status === "Live" || tool.status === "Live locally").length;

  const readinessItems = useMemo(
    () => [
      { label: "Local systems live", value: `${liveTools}/${freeToolStack.length}` },
      { label: "Setup checklist", value: `${setupCompletion}%` },
      { label: "Validation leads", value: String(leadCount) },
      { label: "MVP form leads", value: String(mvpLeadCount) },
      { label: "Research leads", value: String(researchSystemHealth.totalLeads) },
      { label: "Proof targets met", value: `${proofTargetsComplete}/${progress.length}` },
    ],
    [leadCount, liveTools, mvpLeadCount, proofTargetsComplete, progress.length, setupCompletion],
  );

  const toggleTask = (taskId: string) => {
    setCheckedTaskIds((current) => {
      const next = new Set(current);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      return next;
    });
  };

  const downloadMvpLeadCsv = () => {
    const blob = new Blob([exportMvpLeadsToCsv()], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "campin-mvp-leads.csv";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-offwhite pt-28">
      <section className="border-b border-forest/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-lg bg-forest/10 px-3 py-2 text-sm font-bold text-forest">
                <ReadinessIcon size={17} />
                CampIn Ops Center
              </div>
              <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-forest md:text-5xl">
                The founder dashboard before the website scales.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-textgrey">
                Track readiness, free-tool setup, dashboards, automations, and validation proof from one place.
              </p>
            </div>
            <Link
              to="/validation"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange px-5 py-3 text-sm font-extrabold text-white transition-colors hover:bg-orange-dark"
            >
              Open validation machine
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {readinessItems.map((item) => (
              <div key={item.label} className="rounded-lg border border-forest/10 bg-offwhite p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-textgrey">{item.label}</p>
                <p className="mt-2 text-3xl font-black text-forest">{item.value}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={downloadMvpLeadCsv}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-forest/15 bg-white px-4 py-3 text-sm font-extrabold text-forest transition hover:border-orange hover:text-orange"
          >
            Export MVP leads CSV
            <ExternalLink size={16} />
          </button>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="min-w-0">
          <SectionHeader icon={<Target size={22} />} title="90-Day Proof Targets" />
          <div className="space-y-3">
            {progress.map((item) => {
              const percent = Math.min(100, Math.round((item.current / item.target) * 100));
              return (
                <div key={item.key} className="rounded-lg border border-forest/10 bg-white p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="font-black text-forest">{item.label}</h2>
                      <p className="mt-1 text-sm leading-6 text-textgrey">{item.description}</p>
                    </div>
                    <p className="text-xl font-black text-orange">
                      {item.current}/{item.target}
                    </p>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-forest/10">
                    <div className="h-full rounded-full bg-orange" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="min-w-0">
          <SectionHeader icon={<ListChecks size={22} />} title="Founder Setup Checklist" />
          <div className="rounded-lg border border-forest/10 bg-white p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-textgrey">Stored locally in this browser</p>
              <span className="rounded-lg bg-forest px-3 py-1 text-sm font-bold text-white">
                {checkedCount}/{setupTasks.length}
              </span>
            </div>
            <div className="space-y-3">
              {setupTasks.map((task) => {
                const checked = checkedTaskIds.has(task.id);
                return (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    className="flex w-full items-start gap-3 rounded-lg border border-forest/10 bg-offwhite p-3 text-left transition hover:border-orange"
                  >
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border ${
                        checked ? "border-forest bg-forest text-white" : "border-forest/20 bg-white text-transparent"
                      }`}
                    >
                      <Check size={15} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-black text-forest">{task.task}</span>
                      <span className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold">
                        <StatusBadge status={task.status} />
                        <span className="text-textgrey">{task.workstream}</span>
                        <span className="text-textgrey">{task.owner}</span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-forest/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <SectionHeader icon={<Target size={22} />} title="Research Ingestion Health" />
          <div className="grid gap-4 lg:grid-cols-4">
            {[
              ["New leads found", researchSystemHealth.newLeads, "Research leads and community suggestions awaiting review."],
              ["Publishable drafts", researchSystemHealth.publishableDrafts, "Leads with source URLs, last checked dates, and gated relay policy."],
              ["Missing proof blockers", researchSystemHealth.missingProofBlockers, "Unknown fields that block reviewed or confirmed labels."],
              ["Guide opportunities", researchSystemHealth.guideOpportunities, "Demand clusters that should rank without booking CTAs."],
            ].map(([label, value, description]) => (
              <article key={label} className="rounded-lg border border-forest/10 bg-offwhite p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-textgrey">{label}</p>
                <p className="mt-2 text-3xl font-black text-forest">{value}</p>
                <p className="mt-3 text-sm leading-6 text-textgrey">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-forest/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <SectionHeader icon={<ExternalLink size={22} />} title="Free Tool Stack" />
          <div className="grid gap-4 lg:grid-cols-3">
            {freeToolStack.map((tool) => {
              const Icon = tool.icon;
              return (
                <article key={tool.name} className="min-w-0 rounded-lg border border-forest/10 bg-offwhite p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest text-white">
                        <Icon size={20} />
                      </span>
                      <div className="min-w-0">
                        <h2 className="break-words text-lg font-black text-forest">{tool.name}</h2>
                        <p className="text-sm font-bold text-orange">{tool.category}</p>
                      </div>
                    </div>
                    <StatusBadge status={tool.status} />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-textgrey">{tool.freeUse}</p>
                  <p className="mt-4 break-words rounded-lg bg-white p-3 text-xs font-bold text-forest">{tool.localAsset}</p>
                  <p className="mt-3 text-xs leading-5 text-textgrey">Upgrade trigger: {tool.upgradeTrigger}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeader icon={<ListChecks size={22} />} title="Dashboard Map" />
        <div className="grid gap-4 lg:grid-cols-3">
          {dashboardBlueprints.map((dashboard) => {
            const Icon = dashboard.icon;
            return (
              <article key={dashboard.name} className="min-w-0 rounded-lg border border-forest/10 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest text-white">
                    <Icon size={20} />
                  </span>
                  <StatusBadge status={dashboard.status} />
                </div>
                <h2 className="mt-4 text-lg font-black text-forest">{dashboard.name}</h2>
                <p className="mt-1 text-sm font-bold text-orange">{dashboard.owner}</p>
                <p className="mt-3 text-sm leading-6 text-textgrey">{dashboard.decision}</p>
                <p className="mt-4 break-words rounded-lg bg-offwhite p-3 text-xs font-bold text-forest">{dashboard.surface}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {dashboard.metrics.map((metric) => (
                    <span key={metric} className="rounded-lg bg-forest/10 px-3 py-1 text-xs font-bold text-forest">
                      {metric}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-forest/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="min-w-0">
            <SectionHeader icon={<ListChecks size={22} />} title="Automation Cadence" />
            <div className="space-y-3">
              {workflowCadence.map((workflow) => (
                <div key={workflow.name} className="min-w-0 rounded-lg border border-forest/10 bg-offwhite p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="break-words font-black text-forest">{workflow.name}</h2>
                    <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-orange">{workflow.cadence}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-textgrey">{workflow.output}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 rounded-lg border border-forest/10 bg-forest p-6 text-white">
            <SectionHeader icon={<ArrowRight size={22} />} title="Next Founder Actions" inverted />
            <div className="mt-5 space-y-3">
              {nextFounderActions.map((action, index) => (
                <div key={action} className="flex gap-3 rounded-lg bg-white/10 p-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-white/80">{action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Email Automation & Marketing Simulator Hub */}
      <EmailAutomationHub />
    </div>
  );
}

function EmailAutomationHub() {
  const [logs, setLogs] = useState<any[]>([]);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [activeTemplate, setActiveTemplate] = useState<any>(null);
  const [testEmail, setTestEmail] = useState("");
  const [selectedTemplateName, setSelectedTemplateName] = useState("");
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    // Dynamic import to avoid SSR or bundle problems
    import("../lib/emailSimulator").then((mod) => {
      setLogs(mod.readEmailLogs());
      setTemplates(mod.emailTemplates);
      if (mod.emailTemplates.length > 0) {
        setActiveTemplate(mod.emailTemplates[0]);
        setSelectedTemplateName(mod.emailTemplates[0].name);
      }
    });

    const handleSync = () => {
      import("../lib/emailSimulator").then((mod) => {
        setLogs(mod.readEmailLogs());
      });
    };

    window.addEventListener("campin-email-logs-updated", handleSync);
    return () => window.removeEventListener("campin-email-logs-updated", handleSync);
  }, []);

  const triggerTestSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail || !selectedTemplateName) return;

    const mod = await import("../lib/emailSimulator");
    const result = mod.triggerSimulatedEmail(testEmail, selectedTemplateName);
    if (result) {
      setSelectedLog(result);
      setTestEmail("");
    }
  };

  const handleClear = async () => {
    const mod = await import("../lib/emailSimulator");
    mod.clearEmailLogs();
    setSelectedLog(null);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 border-t border-forest/10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <p className="font-bold text-orange">📨 Email Automation & Campaign Simulator</p>
          <h2 className="text-3xl font-black text-forest">Outbound Hub: support@campin.co.in</h2>
          <p className="text-sm text-textgrey mt-1">
            Simulate dynamic welcome sequences, overlanding safety broadcasts, and gated contact auto-triggers.
          </p>
        </div>
        <button
          type="button"
          onClick={handleClear}
          className="rounded-lg bg-offwhite px-4 py-2 text-xs font-black text-forest hover:text-orange hover:bg-orange/5 transition-all border border-forest/10"
        >
          Clear simulator logs
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Templates Picker & Trigger Panel */}
        <div className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-black text-forest mb-4">1. Dispatch Automated Campaign</h3>
          <form onSubmit={triggerTestSend} className="space-y-4">
            <label className="block">
              <span className="text-xs font-black uppercase text-orange tracking-wider">Select Sequence Template</span>
              <select
                value={selectedTemplateName}
                onChange={(e) => {
                  setSelectedTemplateName(e.target.value);
                  const temp = templates.find((t) => t.name === e.target.value);
                  if (temp) setActiveTemplate(temp);
                }}
                className="mt-2 h-11 w-full rounded-xl border border-forest/10 bg-offwhite px-3 text-xs font-semibold text-forest outline-none focus:border-orange focus:bg-white"
              >
                {templates.map((t) => (
                  <option key={t.name} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-black uppercase text-orange tracking-wider">Recipient Email</span>
              <input
                required
                type="email"
                placeholder="camper@domain.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-forest/10 bg-offwhite px-3 text-xs font-semibold text-forest outline-none focus:border-orange focus:bg-white"
              />
            </label>

            <button
              type="submit"
              className="h-11 w-full rounded-xl bg-forest hover:bg-forest-light text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-2"
            >
              Trigger Simulated Email
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Active Template Design Preview */}
          {activeTemplate && (
            <div className="mt-6 border-t border-forest/10 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-orange">Template Draft View</span>
                <span className="rounded bg-orange/10 px-2 py-0.5 text-[9px] font-black text-orange uppercase tracking-wide">
                  {activeTemplate.category}
                </span>
              </div>
              <div className="rounded-lg bg-offwhite p-3 text-[11px] leading-5 text-forest/80 max-h-44 overflow-y-auto">
                <p className="font-extrabold text-forest mb-1">Subject: {activeTemplate.subject}</p>
                <hr className="border-forest/10 my-2" />
                <pre className="whitespace-pre-wrap font-sans text-xs">{activeTemplate.bodyText}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Transactional Outgoing Logs */}
        <div className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm max-h-[500px] overflow-y-auto">
          <h3 className="text-lg font-black text-forest mb-2">2. Outbound simulated transactions</h3>
          <p className="text-xs text-textgrey mb-4">Click any outgoing mail to preview the simulated dispatch.</p>
          
          <div className="space-y-3">
            {logs.length === 0 ? (
              <div className="text-center py-12 rounded-lg bg-offwhite border border-dashed border-forest/10">
                <p className="text-xs text-textgrey font-semibold">No emails sent yet.</p>
                <p className="text-[10px] text-textgrey/60 mt-1">Submit waitlist forms or click the dispatcher above to send.</p>
              </div>
            ) : (
              logs.map((log) => (
                <button
                  key={log.id}
                  type="button"
                  onClick={() => setSelectedLog(log)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex flex-col gap-1.5 ${
                    selectedLog?.id === log.id
                      ? "border-orange bg-orange/5 text-forest shadow-sm"
                      : "border-forest/10 bg-offwhite hover:bg-forest/5 text-forest"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-orange tracking-tight">{log.id}</span>
                    <span className="text-[9px] text-textgrey font-semibold">
                      {new Date(log.sentAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="font-bold truncate">To: {log.recipient}</p>
                  <p className="text-textgrey/80 truncate font-semibold">{log.subject}</p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Dynamic Outbox Email Previewer */}
        <div className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-black text-forest mb-4">3. Outbox Email Inspector</h3>
          {selectedLog ? (
            <div className="rounded-xl bg-[#fafafa] border border-forest/10 p-5 font-sans">
              <div className="border-b border-forest/10 pb-4 mb-4 text-xs space-y-1.5 text-textgrey font-semibold">
                <p>
                  <strong className="text-forest">From:</strong> support@campin.co.in
                </p>
                <p>
                  <strong className="text-forest">To:</strong> {selectedLog.recipient}
                </p>
                <p>
                  <strong className="text-forest">Subject:</strong> {selectedLog.subject}
                </p>
                <p>
                  <strong className="text-forest">Status:</strong>{" "}
                  <span className="rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[9px] font-black uppercase">
                    {selectedLog.status}
                  </span>
                </p>
              </div>
              <pre className="text-xs whitespace-pre-wrap font-sans text-forest bg-white p-4 rounded-xl border border-forest/5 leading-6 shadow-inner max-h-64 overflow-y-auto">
                {selectedLog.bodyText}
              </pre>
            </div>
          ) : (
            <div className="text-center py-24 rounded-xl bg-offwhite border border-forest/10 text-textgrey">
              <p className="text-sm font-bold">Inbox Preview Empty</p>
              <p className="text-xs mt-1 text-textgrey/60">Select a logged outgoing email to verify templates.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ icon, title, inverted = false }: { icon: ReactNode; title: string; inverted?: boolean }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="text-orange">{icon}</span>
      <h2 className={`text-2xl font-black ${inverted ? "text-white" : "text-forest"}`}>{title}</h2>
    </div>
  );
}

function StatusBadge({ status }: { status: OpsStatus }) {
  return (
    <span className={`shrink-0 rounded-lg px-3 py-1 text-xs font-black ${statusStyles[status]}`}>
      {status}
    </span>
  );
}

function readCheckedTasks() {
  if (typeof window === "undefined") return new Set<string>();

  try {
    const parsed = JSON.parse(window.localStorage.getItem(checklistStorageKey) || "[]");
    return new Set<string>(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set<string>();
  }
}
