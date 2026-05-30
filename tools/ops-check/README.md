# CampIn Ops Check

Free local readiness checker for the CampIn pre-website operating system.

Run:

```bash
npm run ops:check
```

It checks that the required docs, data templates, app surfaces, brand assets, and tools exist, then writes:

- `data/ops/ops_readiness_report.json`
- `data/ops/ops_readiness_report.md`

This does not connect external accounts. It is meant to keep the local operating system honest before Tally, Airtable, Brevo, Google Drive, or analytics are connected.
