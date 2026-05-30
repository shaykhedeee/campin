#!/usr/bin/env node
import { Buffer } from "node:buffer";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../..");

const defaultQueriesPath = path.join(__dirname, "queries.json");
const defaultFixturePath = path.join(__dirname, "fixtures/sample_results.json");
const defaultOutDir = path.join(repoRoot, "data/research/outputs");

const args = parseArgs(process.argv.slice(2));

if (args.help || args.h) {
  printHelp();
  process.exit(0);
}

if (args.robots) {
  const result = await checkRobots(args.robots);
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.allowed ? 0 : 2);
}

const provider = args.provider || "fixture";
const limit = Number(args.limit || 25);
const dryRun = Boolean(args["dry-run"]);
const queries = await readJson(args.queries || defaultQueriesPath);

let rawResults = [];

if (provider === "fixture") {
  rawResults = await readJson(args.fixture || defaultFixturePath);
} else if (provider === "manual") {
  const manualPath = args.manual || path.join(repoRoot, "data/research/templates/research_insights_seed.csv");
  rawResults = await readManualCsv(manualPath);
} else if (provider === "site-leads") {
  const siteLeadPath = args.manual || path.join(repoRoot, "data/research/camper_friendly_site_leads_2026-05-25.csv");
  rawResults = await readSiteLeadCsv(siteLeadPath);
} else if (provider === "serpapi") {
  rawResults = await collectSerpApi(queries.searchQueries || [], limit);
} else if (provider === "reddit") {
  rawResults = await collectReddit(queries.reddit || {}, limit);
} else {
  throw new Error(`Unknown provider "${provider}". Use fixture, manual, serpapi, or reddit.`);
}

const normalized = rawResults.slice(0, limit).map((item, index) => normalizeResult(item, index));
const classified = normalized.map(classifyInsight);
const candidateLeads = buildCandidateLeads(classified);
const draftListings = buildDraftListings(candidateLeads);
const guideOpportunities = buildGuideOpportunities(candidateLeads);

const summary = {
  ...summarize(classified),
  candidateLeads: candidateLeads.length,
  publishableDrafts: draftListings.length,
  guideOpportunities: guideOpportunities.length,
  missingProofBlockers: candidateLeads.reduce((total, lead) => total + lead.verificationGaps.length, 0)
};

if (dryRun) {
  console.log("CampIn Research Collector dry run");
  console.log(`Provider: ${provider}`);
  console.log(`Rows: ${classified.length}`);
  console.log(JSON.stringify(summary, null, 2));
  console.log("\nSample rows:");
  console.log(toCsv(classified).split("\n").slice(0, 6).join("\n"));
  console.log("\nSample normalized candidate:");
  console.log(JSON.stringify(candidateLeads[0] || {}, null, 2));
} else {
  const outDir = path.resolve(repoRoot, args.out || defaultOutDir);
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "raw_results.json"), JSON.stringify(rawResults, null, 2));
  await fs.writeFile(path.join(outDir, "research_insights.csv"), toCsv(classified));
  await fs.writeFile(path.join(outDir, "summary.json"), JSON.stringify(summary, null, 2));
  await fs.writeFile(path.join(outDir, "normalized_candidate_leads.json"), JSON.stringify(candidateLeads, null, 2));
  await fs.writeFile(path.join(outDir, "draft_listings.json"), JSON.stringify(draftListings, null, 2));
  await fs.writeFile(path.join(outDir, "guide_opportunities.json"), JSON.stringify(guideOpportunities, null, 2));
  console.log(`Wrote ${classified.length} insights to ${outDir}`);
}

function parseArgs(argv) {
  const parsed = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = true;
    } else {
      parsed[key] = next;
      i += 1;
    }
  }
  return parsed;
}

function printHelp() {
  console.log(`
CampIn Research Collector

Usage:
  node tools/research-collector/collector.mjs --provider fixture --dry-run
  node tools/research-collector/collector.mjs --provider serpapi --out data/research/outputs
  node tools/research-collector/collector.mjs --provider reddit --out data/research/outputs
  node tools/research-collector/collector.mjs --provider manual --manual data/research/templates/research_insights_seed.csv
  node tools/research-collector/collector.mjs --provider site-leads --out data/research/outputs
  node tools/research-collector/collector.mjs --robots https://example.com/forum/thread

Providers:
  fixture  Safe local fixture data. Default.
  manual   Import an existing CSV.
  site-leads Import CampIn's camper-friendly campsite lead CSV.
  serpapi  Uses SERPAPI_KEY.
  reddit   Uses REDDIT_BEARER_TOKEN or REDDIT_CLIENT_ID/REDDIT_CLIENT_SECRET.
`);
}

async function readJson(filePath) {
  const content = await fs.readFile(path.resolve(repoRoot, filePath), "utf8").catch(async () => {
    return fs.readFile(filePath, "utf8");
  });
  return JSON.parse(content);
}

async function readManualCsv(filePath) {
  const content = await fs.readFile(path.resolve(repoRoot, filePath), "utf8").catch(async () => {
    return fs.readFile(filePath, "utf8");
  });
  const rows = parseCsv(content);
  return rows.map((row) => ({
    sourceType: row["Source Type"] || "Manual",
    sourceName: row["Source Name"] || "",
    url: row.URL || "",
    query: row.Query || "",
    title: row["Evidence Summary"] || "",
    snippet: row["Evidence Summary"] || "",
    date: row["Date Added"] || new Date().toISOString().slice(0, 10)
  }));
}

async function readSiteLeadCsv(filePath) {
  const content = await fs.readFile(path.resolve(repoRoot, filePath), "utf8").catch(async () => {
    return fs.readFile(filePath, "utf8");
  });
  const rows = parseCsv(content);
  return rows.map((row) => ({
    recordType: "siteLead",
    sourceType: "Public business lead",
    sourceName: row.site || "",
    url: row.source_url || "",
    query: `${row.region || ""} ${row.type || ""} camping lead`.trim(),
    title: row.site || "",
    snippet: [
      row.camper_signal,
      row.water_signal,
      row.washroom_signal,
      row.electricity_signal,
      row.next_action
    ].filter(Boolean).join(" "),
    date: "2026-05-25",
    site: row.site || "",
    tier: row.tier || "",
    region: row.region || "",
    state: row.state || "",
    siteType: row.type || "",
    status: row.status || "",
    camperSignal: row.camper_signal || "",
    waterSignal: row.water_signal || "",
    washroomSignal: row.washroom_signal || "",
    electricitySignal: row.electricity_signal || "",
    nextAction: row.next_action || ""
  }));
}

async function collectSerpApi(searchQueries, limit) {
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    throw new Error("SERPAPI_KEY is required for --provider serpapi.");
  }

  const out = [];
  for (const query of searchQueries.slice(0, Math.ceil(limit / 5))) {
    const url = new URL("https://serpapi.com/search.json");
    url.searchParams.set("engine", "google");
    url.searchParams.set("q", query.text);
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("num", "10");
    url.searchParams.set("gl", "in");
    url.searchParams.set("hl", "en");
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`SerpApi request failed ${response.status}: ${await response.text()}`);
    }
    const json = await response.json();
    for (const result of json.organic_results || []) {
      out.push({
        sourceType: "Google/Search API",
        sourceName: "SerpApi",
        url: result.link,
        query: query.text,
        title: result.title,
        snippet: result.snippet || "",
        date: new Date().toISOString().slice(0, 10)
      });
    }
  }
  return out.slice(0, limit);
}

async function collectReddit(redditConfig, limit) {
  const token = await getRedditToken();
  const userAgent = process.env.REDDIT_USER_AGENT || "CampInResearchBot/0.1";
  const subreddits = redditConfig.subreddits || [];
  const redditQueries = redditConfig.queries || [];
  const out = [];

  for (const subreddit of subreddits) {
    for (const query of redditQueries) {
      if (out.length >= limit) return out;
      const url = new URL(`https://oauth.reddit.com/r/${subreddit}/search`);
      url.searchParams.set("q", query);
      url.searchParams.set("restrict_sr", "1");
      url.searchParams.set("sort", "relevance");
      url.searchParams.set("t", "year");
      url.searchParams.set("limit", "10");

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": userAgent
        }
      });
      if (!response.ok) {
        throw new Error(`Reddit request failed ${response.status}: ${await response.text()}`);
      }
      const json = await response.json();
      for (const child of json.data?.children || []) {
        const data = child.data || {};
        out.push({
          sourceType: "Reddit",
          sourceName: `r/${subreddit}`,
          url: `https://www.reddit.com${data.permalink || ""}`,
          query,
          title: data.title || "",
          snippet: stripMarkdown(data.selftext || data.link_flair_text || ""),
          date: new Date((data.created_utc || Date.now() / 1000) * 1000).toISOString().slice(0, 10)
        });
      }
    }
  }
  return out.slice(0, limit);
}

async function getRedditToken() {
  if (process.env.REDDIT_BEARER_TOKEN) return process.env.REDDIT_BEARER_TOKEN;

  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("Reddit mode needs REDDIT_BEARER_TOKEN or REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET.");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const body = new URLSearchParams();
  body.set("grant_type", "client_credentials");

  const response = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": process.env.REDDIT_USER_AGENT || "CampInResearchBot/0.1"
    },
    body
  });

  if (!response.ok) {
    throw new Error(`Reddit token request failed ${response.status}: ${await response.text()}`);
  }

  const json = await response.json();
  return json.access_token;
}

function normalizeResult(item, index) {
  if (item.recordType === "siteLead") {
    const text = [item.title, item.snippet, item.region, item.state, item.siteType].filter(Boolean).join(" ");
    return {
      "Insight ID": item["Insight ID"] || `LEAD-${String(index + 1).padStart(4, "0")}`,
      "Date Added": item.date || new Date().toISOString().slice(0, 10),
      "Source Type": item.sourceType || "Public business lead",
      "Source Name": item.sourceName || item.site || "",
      URL: item.url || "",
      Query: item.query || "",
      Location: item.region || detectLocation(text),
      Persona: detectPersona(text),
      "Pain Point": detectPainPoints(text).join("|"),
      "Demand Signal": item.tier === "A" ? "Strong" : "Medium",
      "Evidence Summary": summarizeText(item.snippet || item.title || ""),
      "Safety/Legal Concern": detectSafetyConcern(text),
      "Competitor Mention": detectCompetitor(text),
      "Lead Type": text.toLowerCase().includes("caravan") || text.toLowerCase().includes("overland") ? "Road Stop Lead" : "Host Lead",
      Confidence: item.tier === "A" ? "High" : item.tier === "B" ? "Medium" : "Low",
      "Next Action": item.nextAction || "Contact Host",
      Status: "Reviewed",
      _siteLead: item
    };
  }

  const text = [item.title, item.snippet, item.query].filter(Boolean).join(" ");
  return {
    "Insight ID": item["Insight ID"] || `INS-${String(index + 1).padStart(4, "0")}`,
    "Date Added": item.date || item["Date Added"] || new Date().toISOString().slice(0, 10),
    "Source Type": item.sourceType || item["Source Type"] || "Unknown",
    "Source Name": item.sourceName || item["Source Name"] || "",
    URL: item.url || item.URL || "",
    Query: item.query || item.Query || "",
    Location: detectLocation(text),
    Persona: detectPersona(text),
    "Pain Point": detectPainPoints(text).join("|"),
    "Demand Signal": "Medium",
    "Evidence Summary": summarizeText(item.snippet || item.title || item["Evidence Summary"] || ""),
    "Safety/Legal Concern": detectSafetyConcern(text),
    "Competitor Mention": detectCompetitor(text),
    "Lead Type": "Content Idea",
    Confidence: "Medium",
    "Next Action": "Review",
    Status: "New"
  };
}

function classifyInsight(row) {
  if (row._siteLead) {
    return {
      ...row,
      "Next Action": row["Next Action"] || nextActionFor(row["Lead Type"], row.Confidence === "High" ? 8 : 5),
      Status: "Reviewed"
    };
  }

  const text = [
    row.Query,
    row.Location,
    row.Persona,
    row["Pain Point"],
    row["Evidence Summary"],
    row["Safety/Legal Concern"]
  ].join(" ").toLowerCase();

  const score = scoreDemand(text);
  const leadType = detectLeadType(text, row["Source Type"]);

  return {
    ...row,
    "Demand Signal": score >= 8 ? "Strong" : score >= 5 ? "Medium" : "Weak",
    "Lead Type": leadType,
    Confidence: score >= 8 ? "High" : score >= 5 ? "Medium" : "Low",
    "Next Action": nextActionFor(leadType, score),
    Status: "Reviewed"
  };
}

function detectLocation(text) {
  const haystack = text.toLowerCase();
  const locations = [
    "Bangalore",
    "Coorg",
    "Wayanad",
    "Chikmagalur",
    "Ramanagara",
    "Kanakapura",
    "Mumbai",
    "Pune",
    "Delhi",
    "Himachal",
    "Uttarakhand",
    "Goa",
    "India"
  ];
  const hits = locations.filter((location) => haystack.includes(location.toLowerCase()));
  return hits.length ? hits.join("|") : "India";
}

function detectPersona(text) {
  const haystack = text.toLowerCase();
  if (haystack.includes("host") || haystack.includes("farm") || haystack.includes("estate")) return "Private-Land Host";
  if (haystack.includes("campervan") || haystack.includes("overnight parking") || haystack.includes("road trip") || haystack.includes("overlanding")) return "Road Traveler";
  if (haystack.includes("women") || haystack.includes("woman") || haystack.includes("solo")) return "Solo Woman Traveler";
  if (haystack.includes("family") || haystack.includes("kids")) return "Family Camper";
  if (haystack.includes("own tent") || haystack.includes("pitch") || haystack.includes("gear")) return "Own-Gear Camper";
  return "First-time Camper";
}

function detectPainPoints(text) {
  const haystack = text.toLowerCase();
  const tests = [
    ["Safety", ["safe", "safety", "security", "women", "solo"]],
    ["Permission", ["permission", "allowed", "legal", "ownership", "local", "forest"]],
    ["Washroom", ["washroom", "toilet", "loo", "bathroom"]],
    ["Water", ["water", "drinking"]],
    ["Local Interference", ["local", "interfere", "demanded money", "hassle"]],
    ["Crowd", ["crowd", "noise", "loud", "peaceful", "quiet"]],
    ["Spammy Organizers", ["organizer", "package", "commercial", "spam"]],
    ["Gear", ["gear", "own tent", "tent", "sleeping bag"]],
    ["Weather", ["rain", "monsoon", "weather"]],
    ["Wildlife/Protected Land", ["wildlife", "protected", "reserve", "forest"]],
    ["Price Transparency", ["price", "fee", "pay", "cost"]],
    ["Road Access", ["parking", "road", "vehicle", "route"]],
    ["Mobile Signal", ["signal", "network", "phone"]]
  ];
  const hits = tests.filter(([, terms]) => terms.some((term) => haystack.includes(term))).map(([label]) => label);
  return hits.length ? hits : ["Discovery"];
}

function detectSafetyConcern(text) {
  const pain = detectPainPoints(text);
  const concerns = pain.filter((label) => ["Safety", "Permission", "Washroom", "Water", "Local Interference", "Wildlife/Protected Land", "Road Access"].includes(label));
  return concerns.join("; ");
}

function detectCompetitor(text) {
  const haystack = text.toLowerCase();
  const competitors = ["CampMonk", "HireACamp", "Exoticamp", "Thrillophilia", "OverlandingCamping", "Airbnb", "MakeMyTrip"];
  return competitors.filter((name) => haystack.includes(name.toLowerCase())).join("|");
}

function detectLeadType(text, sourceType) {
  if (sourceType === "Competitor") return "Competitor Note";
  if (text.includes("policy") || text.includes("guideline") || text.includes("legal")) return "Policy Note";
  if (text.includes("road stop") || text.includes("overnight parking") || text.includes("campervan") || text.includes("overlanding")) return "Road Stop Lead";
  if (text.includes("host") || text.includes("farm") || text.includes("estate") || text.includes("homestay")) return "Host Lead";
  if (text.includes("camping near") || text.includes("safe camping") || text.includes("pitch")) return "Camper Demand";
  return "Content Idea";
}

function scoreDemand(text) {
  let score = 0;
  if (/(bangalore|coorg|wayanad|chikmagalur|ramanagara|kanakapura|route)/.test(text)) score += 2;
  if (/(own tent|pitch|gear|campervan|car camping|overlanding)/.test(text)) score += 2;
  if (/(safe|safety|permission|allowed|legal|local)/.test(text)) score += 2;
  if (/(pay|fee|price|cost|donation)/.test(text)) score += 2;
  if (/(washroom|toilet|water|parking|electricity|power)/.test(text)) score += 1;
  if (/(2025|2026)/.test(text)) score += 1;
  return score;
}

function nextActionFor(leadType, score) {
  if (score < 5) return "Watch";
  if (leadType === "Camper Demand") return "Validate in Survey";
  if (leadType === "Host Lead") return "Contact Host";
  if (leadType === "Road Stop Lead") return "Contact Host";
  if (leadType === "Policy Note") return "Add to Brief";
  if (leadType === "Competitor Note") return "Watch";
  return "Add to Brief";
}

function buildCandidateLeads(rows) {
  const seen = new Set();
  const candidates = [];
  for (const row of rows) {
    const source = row._siteLead || {};
    const title = source.site || row["Source Name"] || row["Evidence Summary"] || row["Insight ID"];
    const key = slugify(`${title}-${source.state || row.Location}`);
    if (seen.has(key)) continue;
    seen.add(key);
    const evidenceText = [
      row["Evidence Summary"],
      source.camperSignal,
      source.waterSignal,
      source.washroomSignal,
      source.electricitySignal,
      source.siteType,
      source.status
    ].join(" ").toLowerCase();
    const confidence = confidenceFor(evidenceText);
    const verificationGaps = verificationGapsFor(confidence, evidenceText);
    const sourceType = classifySourceType(row.URL, row["Source Type"]);
    const stage = row.Confidence === "High" && row.URL ? "reviewed" : row.Confidence === "Low" ? "community_suggested" : "lead";
    candidates.push({
      id: key,
      title,
      region: source.region || row.Location,
      state: source.state || "",
      type: source.siteType || row.Persona,
      sourceUrl: row.URL,
      sourceType,
      leadType: row["Lead Type"],
      verificationStage: stage,
      availabilityMode: stage === "community_suggested" ? "unknown" : "call_to_confirm",
      contactPolicy: "gated_relay",
      contactVerificationStatus: row.URL ? "public_business_contact_found" : "not_found",
      confidence,
      verificationGaps,
      evidenceSummary: row["Evidence Summary"],
      safetyLegalConcern: row["Safety/Legal Concern"],
      nextAction: row["Next Action"],
      status: row.Status,
      lastCheckedAt: row["Date Added"]
    });
  }
  return candidates;
}

function buildDraftListings(candidates) {
  return candidates
    .filter((candidate) => candidate.sourceUrl && candidate.contactPolicy === "gated_relay")
    .map((candidate) => ({
      id: candidate.id,
      title: candidate.title,
      region: candidate.region,
      state: candidate.state,
      verificationStage: candidate.verificationStage,
      availability: {
        mode: candidate.availabilityMode,
        lastCheckedAt: candidate.lastCheckedAt,
        hostResponseTargetHours: 24
      },
      permissionStatus: "not_verified",
      contactPolicy: candidate.contactPolicy,
      contactVerificationStatus: candidate.contactVerificationStatus,
      sourceType: candidate.sourceType,
      sourceUrls: [candidate.sourceUrl],
      unknowns: candidate.verificationGaps,
      confidence: candidate.confidence,
      nextAction: candidate.nextAction
    }));
}

function buildGuideOpportunities(candidates) {
  const clusters = [
    {
      slug: "byot-camping-near-bangalore",
      title: "BYOT camping near Bangalore",
      matcher: (candidate) => /bangalore|karnataka|chikkamagaluru|mandya|mangaluru/i.test(`${candidate.region} ${candidate.state}`),
      safetyNotes: ["Do not publish wild pins", "Verify host-controlled boundary", "Require washroom and water proof"]
    },
    {
      slug: "kerala-maharashtra-caravan-corridor",
      title: "Kerala and Maharashtra caravan corridors",
      matcher: (candidate) => /kerala|maharashtra|caravan/i.test(`${candidate.region} ${candidate.state} ${candidate.type}`),
      safetyNotes: ["Confirm plug type", "Confirm grey-water or waste rules", "Do not imply live availability"]
    },
    {
      slug: "northeast-overlanding-stops",
      title: "Northeast overlanding stops",
      matcher: (candidate) => /meghalaya|assam|arunachal|overland/i.test(`${candidate.region} ${candidate.state} ${candidate.type}`),
      safetyNotes: ["Check permit requirements", "Confirm direct host acceptance", "Avoid fragile exact pins before consent"]
    }
  ];

  return clusters.map((cluster) => {
    const matches = candidates.filter(cluster.matcher);
    return {
      slug: cluster.slug,
      title: cluster.title,
      status: matches.some((candidate) => candidate.verificationStage === "reviewed") ? "research_lead" : "community_suggested",
      candidateIds: matches.map((candidate) => candidate.id),
      candidateCount: matches.length,
      safetyNotes: cluster.safetyNotes,
      nextAction: matches.length ? "Review matched candidates and select founder-call targets." : "Collect more compliant public sources."
    };
  });
}

function confidenceFor(text) {
  const has = (pattern) => pattern.test(text);
  return {
    byotAllowed: has(/byot|own tent|bring.*tent|ground tent/) ? "high" : "unknown",
    overnightParking: has(/overnight|parking|caravan|camper van|campervan|overland/) ? "high" : "unknown",
    washroom: has(/washroom|toilet|bathroom|restroom/) ? "high" : "unknown",
    water: has(/drinking water|water filling|water refill|potable water|water/) ? "high" : "unknown",
    electricity: has(/electric|charging|ev charging|power/) ? "high" : "unknown",
    directBusinessContact: has(/contact|phone|whatsapp/) ? "medium" : "unknown",
    campervanSuitability: has(/campervan|camper van|caravan|overland|rooftop/) ? "high" : "unknown"
  };
}

function verificationGapsFor(confidence, text) {
  const gaps = [];
  if (confidence.byotAllowed === "unknown") gaps.push("BYOT or tent rules");
  if (confidence.overnightParking === "unknown") gaps.push("Overnight parking permission");
  if (confidence.washroom === "unknown") gaps.push("Washroom proof");
  if (confidence.water === "unknown") gaps.push("Drinking or usable water proof");
  if (confidence.electricity === "unknown") gaps.push("Electricity or charging proof");
  if (confidence.directBusinessContact === "unknown") gaps.push("Public business contact");
  if (!/tariff|price|fee|cost/.test(text)) gaps.push("Current tariff");
  if (!/permission|approved|controlled|government|tourism|operator/.test(text)) gaps.push("Host or permission authority");
  return gaps;
}

function classifySourceType(url, sourceType) {
  const text = `${url} ${sourceType}`.toLowerCase();
  if (/tourism|gov|official/.test(text)) return "official";
  if (/camping-co|campershub|makemytrip|operator|network/.test(text)) return "aggregator";
  if (/reddit|forum|indiamike|team-bhp/.test(text)) return "community_forum";
  if (/public business|host|homestay|resort|camp/.test(text)) return "host_direct";
  return "manual_research";
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function summarizeText(value) {
  return stripMarkdown(String(value || "")).replace(/\s+/g, " ").slice(0, 500);
}

function stripMarkdown(value) {
  return String(value || "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .trim();
}

function summarize(rows) {
  const countBy = (field) => rows.reduce((acc, row) => {
    const values = String(row[field] || "").split("|").filter(Boolean);
    for (const value of values) acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  return {
    totalRows: rows.length,
    bySourceType: countBy("Source Type"),
    byLeadType: countBy("Lead Type"),
    byLocation: countBy("Location"),
    byPainPoint: countBy("Pain Point"),
    highConfidence: rows.filter((row) => row.Confidence === "High").length
  };
}

function toCsv(rows) {
  const headers = [
    "Insight ID",
    "Date Added",
    "Source Type",
    "Source Name",
    "URL",
    "Query",
    "Location",
    "Persona",
    "Pain Point",
    "Demand Signal",
    "Evidence Summary",
    "Safety/Legal Concern",
    "Competitor Mention",
    "Lead Type",
    "Confidence",
    "Next Action",
    "Status"
  ];
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((header) => csvEscape(row[header] || "")).join(","));
  }
  return `${lines.join("\n")}\n`;
}

function csvEscape(value) {
  const text = String(value);
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function parseCsv(content) {
  const rows = [];
  const parsedRows = [];
  let field = "";
  let row = [];
  let inQuotes = false;
  for (let i = 0; i < content.length; i += 1) {
    const char = content[i];
    const next = content[i + 1];
    if (char === '"' && inQuotes && next === '"') {
      field += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(field);
      field = "";
      if (row.some((cell) => cell.length > 0)) parsedRows.push(row);
      row = [];
    } else {
      field += char;
    }
  }
  if (field || row.length) {
    row.push(field);
    parsedRows.push(row);
  }
  const headers = parsedRows.shift() || [];
  for (const item of parsedRows) {
    rows.push(Object.fromEntries(headers.map((header, index) => [header, item[index] || ""])));
  }
  return rows;
}

async function checkRobots(inputUrl) {
  const url = new URL(inputUrl);
  const robotsUrl = `${url.origin}/robots.txt`;
  let body = "";
  try {
    const response = await fetch(robotsUrl, { headers: { "User-Agent": "CampInResearchBot/0.1" } });
    if (!response.ok) {
      return { url: inputUrl, robotsUrl, allowed: true, reason: `robots.txt returned ${response.status}; manual review advised` };
    }
    body = await response.text();
  } catch (error) {
    return { url: inputUrl, robotsUrl, allowed: false, reason: `Could not fetch robots.txt: ${error.message}` };
  }

  const pathName = url.pathname || "/";
  const rules = parseRobots(body);
  const disallowed = rules.some((rule) => pathName.startsWith(rule));
  return {
    url: inputUrl,
    robotsUrl,
    allowed: !disallowed,
    matchedDisallow: disallowed ? rules.find((rule) => pathName.startsWith(rule)) : "",
    note: "This is a basic User-agent:* check. Review site terms before automated collection."
  };
}

function parseRobots(body) {
  const lines = body.split(/\r?\n/);
  let applies = false;
  const disallow = [];
  for (const raw of lines) {
    const line = raw.split("#")[0].trim();
    if (!line) continue;
    const [keyRaw, ...rest] = line.split(":");
    const key = keyRaw.toLowerCase();
    const value = rest.join(":").trim();
    if (key === "user-agent") {
      applies = value === "*";
    }
    if (applies && key === "disallow" && value) {
      disallow.push(value);
    }
  }
  return disallow;
}
