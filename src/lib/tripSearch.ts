export type TripDraft = { query: string; arrive: string; depart: string; guests: number };
export const todayIso = () => new Date().toISOString().slice(0, 10);
export function validateTrip(draft: TripDraft) {
  if (!draft.arrive && !draft.depart) return "";
  if (!draft.arrive || !draft.depart) return "Choose both arrival and departure dates.";
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
