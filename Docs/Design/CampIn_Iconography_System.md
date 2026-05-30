# CampIn Iconography System

Created: 2026-05-20

CampIn needs a recognizable camping icon language for category discovery, trust badges, filters, dashboards, and future app navigation. This system is original to CampIn and must not copy Airbnb's icon shapes, Airbnb's "Icons" campaign, or Airbnb's product category artwork.

## Visual Grammar

- Canvas: 24 by 24.
- Stroke: 1.8 to 2px.
- Corners: rounded.
- Fill: none by default.
- Color: currentColor in code; forest, orange, white, or status colors in UI.
- Detail level: simple enough to read at 20px.
- Labels: every icon needs a text label or tooltip.
- Usage: one meaning per icon; avoid decorative icons that do not help decisions.

## Icon Families

### Stay Type Icons

- tent: campsite or tent pitch.
- own-tent: users can bring their own tent.
- farm-camp: farmland or orchard stay.
- forest-edge: wooded/private forest-edge site.
- lake-nearby: water body nearby, not necessarily waterfront.
- hill-view: highland or valley-facing stay.
- desert-camp: dry/arid camping region.
- terrace-camp: controlled rooftop or terrace camp.

### Road And Vehicle Icons

- road-stop: safe route support stop.
- parking: vehicle parking.
- bike: motorcycle-friendly.
- campervan: campervan or van access.
- suv-access: SUV-friendly approach.
- route: route/itinerary.
- fuel-nearby: fuel or vehicle support nearby.
- signal: phone network signal.

### Amenity Icons

- washroom: toilet available.
- shower: bathing facility.
- water: drinking or usable water.
- power: charging/electricity.
- food: food or kitchen support.
- fire-safe: fire-safe zone or fire restriction note.
- first-aid: first-aid readiness.
- shade: shaded area.
- pet-friendly: pet access.

### Trust Icons

- reviewed: CampIn reviewed.
- permission: permission status.
- exact-pin: exact location or meeting pin.
- host-present: host or caretaker on site.
- women-aware: women-aware host process.
- family-safe: suitable for families.
- quiet-zone: low-noise expectation.
- incident-log: incident or issue history.
- emergency-contact: emergency contact available.

### Action Icons

- search: search.
- filter: refine.
- save: shortlist.
- share: share.
- apply: submit application.
- export: export leads.
- score: validation score.
- message: contact or CampChat.
- newsletter: The Campfire signup.

## Implementation Files

- SVG sprite: `brand/icons/campin-outdoor-icons.svg`
- Inventory JSON: `data/design/campin_icon_inventory.json`
- React renderer: `src/components/icons/CampInIcon.tsx`

## Naming Rules

- Use lowercase kebab-case IDs.
- Prefix symbols with `campin-icon-` in SVG.
- Keep React names user-facing and explicit.
- If an icon becomes ambiguous, split it into two icons.

## Accessibility Rules

- Decorative icons should use `aria-hidden`.
- Informational icons need a visible label or `aria-label`.
- Do not rely on color alone for verification state.
- Do not use icon-only controls without tooltips or labels in dense admin tools.

## Product Usage

### Category Rail

Use stay and road icons only. Keep trust icons out of the rail so category browsing does not confuse users with verification status.

### Listing Cards

Use a maximum of four icons:

1. Primary stay type.
2. Washroom.
3. Permission.
4. Host-present or exact-pin.

### Listing Detail

Use the full trust and amenity grid. Each icon must reveal a plain-language status such as "Washroom: western toilet, host-declared" or "Permission: owner-controlled, CampIn call pending."

### Host Dashboard

Use action and trust icons for checklist progress, not decoration.

## Expansion Backlog

- Weather icons: rain, heat, cold, windy.
- Terrain icons: mud road, steps, river crossing, steep approach.
- Gear icons: sleeping bag, mat, lantern, stove, backpack.
- Group icons: couples, families, solo, college group, corporate group.
- Compliance icons: ID check, waiver, local authority, waste plan.
