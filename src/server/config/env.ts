import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string().url().optional(),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  RAZORPAY_KEY_ID: z.string().optional(),
  RAZORPAY_KEY_SECRET: z.string().optional(),
  MAPBOX_ACCESS_TOKEN: z.string().optional(),
  GOOGLE_PLACES_API_KEY: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  WHATSAPP_ACCESS_TOKEN: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  POSTHOG_KEY: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
});

export type CampInEnv = z.infer<typeof envSchema>;

export function parseCampInEnv(input: NodeJS.ProcessEnv = process.env): CampInEnv {
  return envSchema.parse(input);
}
