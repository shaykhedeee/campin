import { useCallback, useState } from "react";
import { ZodError } from "zod";
import type { LeadSubmissionResult } from "../../lib/mvpLeadStore";

export type LeadSubmissionState = "idle" | "saving" | "saved" | "queued" | "validation_error" | "error";

export function useLeadSubmission() {
  const [state, setState] = useState<LeadSubmissionState>("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<LeadSubmissionResult | null>(null);

  const run = useCallback(async (operation: () => Promise<LeadSubmissionResult>) => {
    if (state === "saving") return null;
    setState("saving");
    setMessage("Saving your details securely…");
    setResult(null);

    try {
      const nextResult = await operation();
      setResult(nextResult);
      if (nextResult.remote === "queued") {
        setState("queued");
        setMessage("CampIn's secure store could not be reached. Your details are queued on this device for retry; please do not clear this browser's data.");
      } else {
        setState("saved");
        setMessage("Your details were saved for CampIn review.");
      }
      return nextResult;
    } catch (error) {
      const validationMessage = error instanceof ZodError ? error.issues[0]?.message : undefined;
      setState(validationMessage ? "validation_error" : "error");
      setMessage(validationMessage || (error instanceof Error ? error.message : "We could not save your details. Please try again."));
      return null;
    }
  }, [state]);

  const reset = useCallback(() => {
    setState("idle");
    setMessage("");
    setResult(null);
  }, []);

  return { state, message, result, isSaving: state === "saving", run, reset };
}
