import { z } from "zod";

export const mvpLeadTypes = [
  "camper_waitlist",
  "guide_unlock",
  "host_interest",
  "listing_inquiry",
  "newsletter",
  "road_stop",
] as const;

export type MvpLeadType = (typeof mvpLeadTypes)[number];

export interface MvpLeadInput {
  type: MvpLeadType;
  sourcePage: string;
  email?: string;
  phone?: string;
  name?: string;
  city?: string;
  status?: string;
  score?: number;
  consent?: boolean;
  payload: Record<string, unknown>;
}

const optionalText = (maximum: number) =>
  z
    .string()
    .trim()
    .max(maximum)
    .optional()
    .transform((value) => value || undefined);

export const leadInputSchema = z
  .object({
    type: z.enum(mvpLeadTypes, { error: "Unsupported lead type" }),
    sourcePage: z.string().trim().min(1).max(240).regex(/^\/[^\s]*$/, "Source page must be an application path"),
    email: optionalText(254).pipe(z.email("Enter a valid email address").optional()),
    phone: optionalText(32).refine(
      (value) => !value || /^[+()\d][+()\d\s.-]{6,31}$/.test(value),
      "Enter a valid phone number",
    ),
    name: optionalText(120),
    city: optionalText(120),
    status: optionalText(64),
    score: z.number().int().min(0).max(10).optional(),
    consent: z.literal(true, { error: "Consent is required" }),
    payload: z.record(z.string(), z.unknown()),
  })
  .superRefine((value, context) => {
    if (!value.email && !value.phone) {
      context.addIssue({ code: "custom", message: "An email or phone number is required", path: ["email"] });
    }

    try {
      if (new TextEncoder().encode(JSON.stringify(value.payload)).byteLength > 12_288) {
        context.addIssue({ code: "custom", message: "Lead payload must be 12 KB or smaller", path: ["payload"] });
      }
    } catch {
      context.addIssue({ code: "custom", message: "Lead payload must be serializable", path: ["payload"] });
    }
  })
  .transform((value) => ({ ...value, email: value.email?.toLowerCase() }));

export function normalizeLead(input: MvpLeadInput): MvpLeadInput {
  return leadInputSchema.parse(input) as MvpLeadInput;
}
