# CampIn lead capture and support notification deployment

The public lead path writes validated records to Supabase first. If that write is unavailable or rejected, the browser retains a clearly labelled local retry record and tells the visitor that the submission is queued. A local retry receipt is not presented as successful delivery.

## Netlify environment

Configure these values in the Netlify site's server-side environment settings:

- `RESEND_API_KEY`: provider credential used only by `netlify/functions/notify-lead.ts`.
- `RESEND_FROM`: a sender identity verified by the provider.
- `LEAD_ALERT_TO`: set to `support@campin.co.in` for launch alerts.
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`: the public Supabase client configuration. Use the anonymous/publishable key only; never use a service-role key in a `VITE_` variable.

The notification function returns `skipped` when any email provider variable is absent. That is intentional: local development and an incomplete deployment must not simulate or claim that an email was sent.

## Optional Netlify Forms fallback

The six hidden launch forms already exist in `index.html`. Netlify Forms is disabled as a notification fallback by default. To accept that fallback explicitly, enable Netlify Forms for the site and set:

```text
VITE_ENABLE_NETLIFY_FORM_FALLBACK=true
```

The client attempts this fallback only when the server notification did not report `sent`. Its outcome is returned independently as `metadata.netlifyForm`, so it cannot hide a failed Supabase write or email notification.

## Deployment verification

1. Deploy a preview without provider variables and submit a test lead. Confirm the UI reports the Supabase outcome without claiming email delivery and the function responds with `status: "skipped"`.
2. Add the three server-only email variables to the preview environment and redeploy.
3. Submit one consented test lead. Confirm a row exists in `mvp_leads`, the function responds with `status: "sent"`, and the support inbox receives one concise alert.
4. Temporarily use an invalid Supabase preview configuration and confirm the form retains its typed values and announces that the lead is queued on that device.
5. Inspect the browser analytics/network tools and confirm no contact fields or full lead payloads are sent to analytics endpoints.

No database migration or external provider configuration is applied by this change. Existing RLS and authentication policies remain unchanged.
