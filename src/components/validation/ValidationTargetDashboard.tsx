import { useEffect, useMemo, useState } from "react";
import { Download, Minus, Plus, Target, Trash2 } from "lucide-react";
import {
  clearValidationLeads,
  exportLeadsToCsv,
  getValidationProgress,
  readManualMetrics,
  readValidationLeads,
  writeManualMetrics,
  type ManualValidationMetrics,
  type ValidationLead,
} from "../../lib/validationMachine";

export default function ValidationTargetDashboard() {
  const [leads, setLeads] = useState<ValidationLead[]>([]);
  const [manualMetrics, setManualMetrics] = useState<ManualValidationMetrics>({ manualBookingAttempts: 0, paidPilotStays: 0 });

  const refresh = () => {
    setLeads(readValidationLeads());
    setManualMetrics(readManualMetrics());
  };

  useEffect(() => {
    refresh();
    window.addEventListener("campin-validation-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("campin-validation-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const progress = useMemo(() => getValidationProgress(leads, manualMetrics), [leads, manualMetrics]);
  const recentLeads = leads.slice(0, 5);

  const updateManualMetric = (key: keyof ManualValidationMetrics, change: number) => {
    const next = { ...manualMetrics, [key]: Math.max(0, manualMetrics[key] + change) };
    writeManualMetrics(next);
    window.dispatchEvent(new Event("campin-validation-updated"));
  };

  const downloadCsv = () => {
    const blob = new Blob([exportLeadsToCsv(leads)], { type: "text/csv;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `campin-validation-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(href);
  };

  const clearDemoData = () => {
    clearValidationLeads();
    writeManualMetrics({ manualBookingAttempts: 0, paidPilotStays: 0 });
    window.dispatchEvent(new Event("campin-validation-updated"));
  };

  return (
    <section className="min-w-0 rounded-2xl border border-forest/10 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="font-bold text-orange">90-day validation dashboard</p>
          <h2 className="mt-1 text-3xl font-extrabold text-forest">Trust targets before booking engine.</h2>
          <p className="mt-2 max-w-3xl break-words text-sm leading-6 text-textgrey">
            This local dashboard proves the validation machine works. Later, the same metrics should come from Airtable,
            Supabase, or your CRM.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={downloadCsv}
            className="inline-flex items-center gap-2 rounded-lg bg-forest px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-forest-light"
          >
            <Download size={16} />
            Export CSV
          </button>
          <button
            type="button"
            onClick={clearDemoData}
            className="inline-flex items-center gap-2 rounded-lg bg-offwhite px-4 py-3 text-sm font-bold text-forest transition-colors hover:text-orange"
          >
            <Trash2 size={16} />
            Clear local data
          </button>
        </div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {progress.map((item) => {
          const percent = Math.min(100, Math.round((item.current / item.target) * 100));
          return (
            <div key={item.key} className="min-w-0 rounded-xl border border-forest/10 bg-offwhite p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-textgrey">{item.label}</p>
                  <p className="mt-2 text-3xl font-extrabold text-forest">
                    {item.current}
                    <span className="text-base text-textgrey">/{item.target}</span>
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-orange">
                  <Target size={20} />
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-orange" style={{ width: `${percent}%` }} />
              </div>
              <p className="mt-3 min-h-12 break-words text-sm leading-6 text-textgrey">{item.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="min-w-0 rounded-xl border border-forest/10 bg-offwhite p-5">
          <p className="font-extrabold text-forest">Manual proof tracker</p>
          <p className="mt-2 text-sm leading-6 text-textgrey">
            These are founder-led milestones that forms cannot prove automatically.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ManualCounter
              label="Manual booking attempts"
              value={manualMetrics.manualBookingAttempts}
              onDecrease={() => updateManualMetric("manualBookingAttempts", -1)}
              onIncrease={() => updateManualMetric("manualBookingAttempts", 1)}
            />
            <ManualCounter
              label="Paid pilot stays"
              value={manualMetrics.paidPilotStays}
              onDecrease={() => updateManualMetric("paidPilotStays", -1)}
              onIncrease={() => updateManualMetric("paidPilotStays", 1)}
            />
          </div>
        </div>

        <div className="min-w-0 rounded-xl border border-forest/10 bg-offwhite p-5">
          <p className="font-extrabold text-forest">Recent captured leads</p>
          <div className="mt-4 space-y-3">
            {recentLeads.length === 0 ? (
              <p className="text-sm leading-6 text-textgrey">No leads captured in this browser yet. Submit a form to populate the validation inbox.</p>
            ) : (
              recentLeads.map((lead) => (
                <div key={lead.id} className="grid gap-2 rounded-lg bg-white p-3 text-sm sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <p className="font-extrabold text-forest">{lead.id}</p>
                    <p className="text-textgrey">
                      {lead.type} • {lead.status}
                    </p>
                  </div>
                  <span className="rounded-lg bg-orange/10 px-3 py-1 font-bold text-orange">Score {lead.score}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ManualCounterProps {
  label: string;
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

function ManualCounter({ label, value, onDecrease, onIncrease }: ManualCounterProps) {
  return (
    <div className="rounded-lg bg-white p-4">
      <p className="text-sm font-bold text-textgrey">{label}</p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onDecrease}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-offwhite text-forest transition-colors hover:text-orange"
          aria-label={`Decrease ${label}`}
        >
          <Minus size={18} />
        </button>
        <p className="text-3xl font-extrabold text-forest">{value}</p>
        <button
          type="button"
          onClick={onIncrease}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest text-white transition-colors hover:bg-forest-light"
          aria-label={`Increase ${label}`}
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
