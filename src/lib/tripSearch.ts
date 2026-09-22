export type TripDraft = { query: string; arrive: string; depart: string; guests: number };
export const todayIso = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
export function isCalendarDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
export function nextDate(value: string) {
  if (!isCalendarDate(value)) return todayIso();
  return new Date(Date.parse(`${value}T00:00:00Z`) + 86400000).toISOString().slice(0, 10);
}
export function validateTrip(draft: TripDraft) {
  if (!Number.isInteger(draft.guests) || draft.guests < 1 || draft.guests > 50) return "Choose between 1 and 50 guests.";
  if (!draft.arrive && !draft.depart) return "";
  if (!draft.arrive || !draft.depart) return "Choose both arrival and departure dates.";
  if (!isCalendarDate(draft.arrive) || !isCalendarDate(draft.depart)) return "Choose valid calendar dates.";
  if (draft.arrive < todayIso()) return "Choose an arrival date from today onward.";
  if (draft.depart <= draft.arrive) return "Departure must be after arrival.";
  if (!Number.isInteger(draft.guests) || draft.guests < 1 || draft.guests > 50) return "Choose between 1 and 50 guests.";
  return "";
}
export function draftToParams(draft: TripDraft) {
  const params = new URLSearchParams();
  if (draft.query.trim()) params.set("query", draft.query.trim());
  if (draft.arrive) params.set("arrive", draft.arrive);
  if (draft.depart) params.set("depart", draft.depart);
  params.set("guests", String(draft.guests));
  return params;
}
