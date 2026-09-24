import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { submitMvpLead } from "../lib/mvpLeadStore";
import { useLeadSubmission } from "../components/leads/useLeadSubmission";

export default function SuggestCampsite() {
  const navigate = useNavigate();
  const submission = useLeadSubmission();
  const [form, setForm] = useState({ name: "", email: "", place: "", location: "", map: "", relationship: "", notes: "", consent: false });
  const update = (key: keyof typeof form, value: string | boolean) => setForm(current => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const result = await submission.run(() => submitMvpLead({
      type: "road_stop", sourcePage: "/suggest-campsite", name: form.name, email: form.email,
      city: form.location, status: "suggested_for_review", consent: form.consent,
      payload: { submissionKind: "campsite_suggestion", place: form.place, mapLink: form.map, relationship: form.relationship, notes: form.notes },
    }));
    if (result?.remote === "synced") navigate(`/confirmation?kind=suggestion&ref=${encodeURIComponent(result.lead.id)}`);
  };

  const inputClass = "mt-2 h-12 w-full rounded-xl border border-forest/15 bg-offwhite px-3";
  return <main className="min-h-screen bg-offwhite px-4 pt-28 pb-20">
    <form onSubmit={submit} className="mx-auto max-w-2xl rounded-3xl bg-white p-7 shadow-sm">
      <p className="font-bold text-orange">Suggest a campsite</p>
      <h1 className="mt-2 text-3xl font-extrabold text-forest">Know a place worth adding?</h1>
      <p className="mt-2 text-sm leading-6 text-textgrey">Suggestions are reviewed before they appear on Campin.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-bold text-forest">Your name<input required autoComplete="name" value={form.name} onChange={e => update("name", e.target.value)} className={inputClass}/></label>
        <label className="text-sm font-bold text-forest">Email<input required type="email" autoComplete="email" value={form.email} onChange={e => update("email", e.target.value)} className={inputClass}/></label>
        <label className="text-sm font-bold text-forest">Place name<input required maxLength={180} value={form.place} onChange={e => update("place", e.target.value)} className={inputClass}/></label>
        <label className="text-sm font-bold text-forest">City or destination<input required maxLength={120} value={form.location} onChange={e => update("location", e.target.value)} className={inputClass}/></label>
      </div>
      <label className="mt-4 block text-sm font-bold text-forest">Google Maps link <span className="font-medium text-textgrey">optional</span><input type="url" value={form.map} onChange={e => update("map", e.target.value)} className={inputClass}/></label>
      <label className="mt-4 block text-sm font-bold text-forest">How do you know this place?<input required maxLength={500} value={form.relationship} onChange={e => update("relationship", e.target.value)} className={inputClass}/></label>
      <label className="mt-4 block text-sm font-bold text-forest">Notes<textarea maxLength={3000} value={form.notes} onChange={e => update("notes", e.target.value)} rows={4} className="mt-2 w-full rounded-xl border border-forest/15 bg-offwhite p-3"/></label>
      <label className="mt-4 flex gap-3 text-sm text-textgrey"><input required type="checkbox" checked={form.consent} onChange={e => update("consent", e.target.checked)}/>I agree Campin can review this suggestion.</label>
      <button disabled={submission.isSaving} className="mt-6 w-full rounded-xl bg-forest py-3 font-bold text-white">{submission.isSaving ? "Sending…" : "Send suggestion"}</button>
      <p role="status" className="mt-3 text-sm text-forest">{submission.message}</p>
    </form>
  </main>;
}
