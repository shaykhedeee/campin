# CampIn Research Collector

This tool supports the pre-website CampIn Research OS. It is intentionally conservative.

It does not scrape Google HTML. It does not scrape Reddit user profiles. It does not bypass login walls. It only collects from:

- Local fixture data for dry-run validation.
- Manual CSV imports.
- Reddit API/OAuth when credentials are provided and the usage is allowed.
- Approved search/SERP APIs when credentials are provided.

## Quick Checks

Dry-run using fixture data:

```powershell
npm run research:dry-run
```

Write fixture output:

```powershell
npm run research:fixture
```

Normalize the researched campsite lead set into candidate leads, draft listings, and guide opportunities:

```powershell
npm run research:site-leads
```

Output files:

```text
data/research/outputs/raw_results.json
data/research/outputs/research_insights.csv
data/research/outputs/normalized_candidate_leads.json
data/research/outputs/draft_listings.json
data/research/outputs/guide_opportunities.json
```

## Environment Variables

For Reddit API mode:

```powershell
$env:REDDIT_CLIENT_ID="..."
$env:REDDIT_CLIENT_SECRET="..."
$env:REDDIT_USER_AGENT="CampInResearchBot/0.1 by CampIn"
```

Or provide:

```powershell
$env:REDDIT_BEARER_TOKEN="..."
```

For SerpApi mode:

```powershell
$env:SERPAPI_KEY="..."
```

## Commands

Fixture dry-run:

```powershell
node tools/research-collector/collector.mjs --provider fixture --dry-run
```

SerpApi collection:

```powershell
node tools/research-collector/collector.mjs --provider serpapi --out data/research/outputs
```

Reddit API collection:

```powershell
node tools/research-collector/collector.mjs --provider reddit --out data/research/outputs
```

Manual CSV import:

```powershell
node tools/research-collector/collector.mjs --provider manual --manual data/research/templates/research_insights_seed.csv --out data/research/outputs
```

Camper-friendly site lead import:

```powershell
node tools/research-collector/collector.mjs --provider site-leads --out data/research/outputs
```

Robots.txt check for a forum URL:

```powershell
node tools/research-collector/collector.mjs --robots https://example.com/forum/thread
```

## Compliance Notes

- Store summaries, not raw copied comment archives.
- Keep source URLs in every row.
- Do not contact individual Reddit users.
- Only contact businesses/hosts through public business channels or CampIn form submissions.
- Review provider terms before using output outside internal validation.
