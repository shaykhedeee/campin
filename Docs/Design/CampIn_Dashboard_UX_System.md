# CampIn Dashboard UX System

Created: 2026-05-20

CampIn dashboards should be practical operating surfaces, not presentation decks. They should make it obvious what is live, what is blocked, and what the founder should do next.

## Dashboard Family

### Ops Center

Audience: founder.

Job: show system readiness, free-tool setup, validation targets, workflow cadence, and next actions.

First implementation: `/ops`.

### Validation Machine

Audience: founder and research operator.

Job: capture leads and track the 90-day validation stage gates.

First implementation: `/validation`.

### Strategy Lab

Audience: founder, product, design.

Job: preserve Airbnb marketplace lessons, user flows, trust stack, icons, and automation blueprint.

First implementation: `/strategy`.

### Supply Desk

Audience: host ops.

Job: qualify hosts, road stops, amenities, permission, and pilot readiness.

First implementation: Airtable schema and future app page.

### Content Desk

Audience: SEO/content operator.

Job: manage SEO/AEO/GEO briefs, sources, newsletters, and original CampIn insight.

First implementation: Airtable/Notion and future app page.

## Visual Rules

- Dashboards use compact cards with 8px radius.
- Metric tiles must show current value, target, and next interpretation.
- Avoid large hero sections inside dashboards.
- Use badges for status and stage.
- Use progress bars only when they represent real progress.
- Use icon plus text for dashboard sections; avoid icon-only critical actions.
- Long filenames, URLs, and IDs must wrap safely on mobile.

## Status Vocabulary

- Live locally: working in the repo/app without external accounts.
- Ready to connect: schemas/templates exist, account setup required.
- Needs account: external account or API key required.
- Needs proof: business claim needs real data.
- Paused: intentionally deferred.

## Founder Cockpit Layout

1. Readiness strip: validation, research, newsletter, supply, SEO, automations.
2. 90-day proof targets.
3. Free-tool stack and setup status.
4. Dashboard map.
5. Weekly automation cadence.
6. Next 10 founder actions.

## Mobile Requirements

- No horizontal overflow at 390px width.
- Cards stack to one column.
- Buttons and toggles remain at least 44px high.
- Long text wraps instead of shrinking below readable size.
- Header uses compact logo on mobile.

## Data Model

The dashboard should read from:

- `src/lib/validationMachine.ts` for local validation progress.
- `src/data/campinOps.ts` for operating stack, dashboard map, setup tasks, and next actions.
- `data/ops/free_tool_stack.json` for external-tool setup planning.
- `data/ops/dashboard_blueprint.json` for future Airtable/Notion dashboard structure.

## Future Enhancements

- Import CSV from Tally/Airtable into local dashboard.
- Add host pipeline kanban.
- Add region demand heatmap.
- Add SEO brief production tracker.
- Add trust verification matrix.
- Add newsletter issue calendar.
- Add event analytics after public launch.
