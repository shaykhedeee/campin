import type { LeadSubmissionState } from "./useLeadSubmission";

interface LeadSubmissionStatusProps {
  state: LeadSubmissionState;
  message: string;
  className?: string;
}

export default function LeadSubmissionStatus({ state, message, className = "" }: LeadSubmissionStatusProps) {
  return (
    <p
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`${state === "idle" ? "sr-only" : "mt-3 text-sm font-semibold"} ${className}`.trim()}
      data-submission-state={state}
    >
      {message || "Submission status"}
    </p>
  );
}
