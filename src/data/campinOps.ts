import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileText,
  Gavel,
  MessageCircle,
  Mail,
  Map,
  Megaphone,
  RadioTower,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  TableProperties,
  Users,
  Workflow,
} from "lucide-react";

export type OpsStatus = "Live" | "Live locally" | "Ready to connect" | "Needs account" | "Needs proof" | "Paused";

export interface ToolStackItem {
  name: string;
  category: string;
  status: OpsStatus;
  icon: LucideIcon;
  freeUse: string;
  localAsset: string;
  upgradeTrigger: string;
}

export interface DashboardBlueprint {
  name: string;
  owner: string;
  status: OpsStatus;
  icon: LucideIcon;
  surface: string;
  decision: string;
  metrics: string[];
}

export interface SetupTask {
  id: string;
  workstream: string;
  task: string;
  status: OpsStatus;
  owner: string;
}

export interface WorkflowCadence {
  name: string;
  cadence: string;
  status: OpsStatus;
  output: string;
}

export const freeToolStack: ToolStackItem[] = [
  {
    name: "Tally",
    category: "Forms",
    status: "Ready to connect",
    icon: ClipboardCheck,
    freeUse: "Camper waitlist, host interest, road-stop lead, and safety survey forms.",
    localAsset: "data/forms",
    upgradeTrigger: "Custom domain, team collaboration, data-retention controls, or email verification.",
  },
  {
    name: "Airtable Free",
    category: "Database",
    status: "Ready to connect",
    icon: TableProperties,
    freeUse: "Research OS, host leads, road-stop leads, content tracker, and validation pipeline.",
    localAsset: "data/research/schemas",
    upgradeTrigger: "Record limits, automation limits, interface limits, or multi-user workflow complexity.",
  },
  {
    name: "Brevo Free",
    category: "Newsletter",
    status: "Ready to connect",
    icon: Mail,
    freeUse: "The Campfire list, welcome sequence, and weekly newsletter sends for consented leads.",
    localAsset: "data/newsletter",
    upgradeTrigger: "Daily send cap, Brevo branding, advanced automation, or deliverability needs.",
  },
  {
    name: "WhatsApp Community",
    category: "Community",
    status: "Ready to connect",
    icon: MessageCircle,
    freeUse: "Founding Bangalore/South India community, host group, road-stop group, and announcement channel.",
    localAsset: "Docs/Business/CampIn_Community_Platform_And_Growth_OS.md",
    upgradeTrigger: "Need dedicated community ops, moderation tooling, or WhatsApp Business API workflows.",
  },
  {
    name: "Gmail + Instagram Manual Outreach",
    category: "Outreach",
    status: "Ready to connect",
    icon: Megaphone,
    freeUse: "Founder-led host, road-stop, and community outreach using daily draft queues.",
    localAsset: "Docs/Business/CampIn_Outreach_Operating_System.md",
    upgradeTrigger: "Move to sequencing tools only after reply quality and consent discipline are proven.",
  },
  {
    name: "Markdown + Notion",
    category: "Operating docs",
    status: "Live locally",
    icon: FileText,
    freeUse: "Strategy docs, founder notes, SOPs, design rules, and content calendars.",
    localAsset: "Docs",
    upgradeTrigger: "Team permission complexity, guests, or advanced knowledge-base collaboration.",
  },
  {
    name: "Google Drive",
    category: "File proof",
    status: "Needs account",
    icon: Database,
    freeUse: "Host photos, permission notes, route screenshots, and local proof folders.",
    localAsset: "brand, Docs, data",
    upgradeTrigger: "Need app-integrated uploads, signed URLs, or structured storage.",
  },
  {
    name: "Search Console + GA4",
    category: "Analytics",
    status: "Paused",
    icon: SearchCheck,
    freeUse: "Indexing, query monitoring, and page behavior after a public site exists.",
    localAsset: "Docs/Business/CampIn_SEO_AEO_GEO_Briefs.md",
    upgradeTrigger: "Only add paid analytics after real traffic and privacy needs are clear.",
  },
  {
    name: "Legal Docs",
    category: "Compliance",
    status: "Live locally",
    icon: Gavel,
    freeUse: "Terms, privacy, cancellation, community guidelines, host agreement, pledge, verification, and grievance drafts.",
    localAsset: "Docs/Legal",
    upgradeTrigger: "Legal review before payments, marketplace launch, or insurance commitments.",
  },
  {
    name: "Codex Automations",
    category: "Automation",
    status: "Live",
    icon: Workflow,
    freeUse: "Weekly intelligence, validation review, host enrichment, SEO briefs, newsletter draft, and UX QA.",
    localAsset: "data/workflows/agentic_workflows.json",
    upgradeTrigger: "External API integration, CI/CD, or account-level workflow orchestration.",
  },
];

export const dashboardBlueprints: DashboardBlueprint[] = [
  {
    name: "Founder Cockpit",
    owner: "Founder",
    status: "Live locally",
    icon: BarChart3,
    surface: "/ops",
    decision: "What should CampIn do this week?",
    metrics: ["Readiness", "90-day targets", "free-tool setup", "next actions"],
  },
  {
    name: "Validation Dashboard",
    owner: "Founder / research",
    status: "Live locally",
    icon: CheckCircle2,
    surface: "/validation",
    decision: "Is demand real enough to proceed?",
    metrics: ["Subscribers", "high-intent campers", "host applications", "candidate sites"],
  },
  {
    name: "Supply Desk",
    owner: "Host ops",
    status: "Ready to connect",
    icon: ShieldCheck,
    surface: "Airtable first",
    decision: "Which host or road stop should be verified next?",
    metrics: ["Permission", "washroom", "water", "exact pin", "founder call"],
  },
  {
    name: "Content Desk",
    owner: "Content operator",
    status: "Ready to connect",
    icon: SearchCheck,
    surface: "Airtable / Notion",
    decision: "Which answer-first page or newsletter should ship next?",
    metrics: ["Briefs", "FAQs", "schema", "sources", "original insight"],
  },
  {
    name: "Community Pulse",
    owner: "Community operator",
    status: "Ready to connect",
    icon: Users,
    surface: "WhatsApp + Airtable + Brevo",
    decision: "Which community segment is becoming real demand?",
    metrics: ["members", "weekly active", "opt-in rate", "UGC", "referrals"],
  },
  {
    name: "Outreach Desk",
    owner: "Founder",
    status: "Ready to connect",
    icon: Megaphone,
    surface: "Airtable + Gmail + Instagram",
    decision: "Which researched hosts and road stops deserve founder outreach today?",
    metrics: ["candidates", "drafts", "sends", "replies", "calls"],
  },
  {
    name: "Trust Matrix",
    owner: "Trust operator",
    status: "Ready to connect",
    icon: RadioTower,
    surface: "Airtable first",
    decision: "Which claims are verified, host-declared, or unknown?",
    metrics: ["Permission", "amenities", "night safety", "emergency contact", "incident log"],
  },
  {
    name: "Route Intelligence",
    owner: "Research operator",
    status: "Needs proof",
    icon: Map,
    surface: "Research OS",
    decision: "Which routes deserve road-stop validation?",
    metrics: ["Route demand", "stop candidates", "vehicle access", "night safety"],
  },
  {
    name: "Legal Readiness",
    owner: "Founder / counsel",
    status: "Live locally",
    icon: Gavel,
    surface: "Docs/Legal",
    decision: "Is CampIn ready to collect leads, run pilots, or accept payments?",
    metrics: ["terms", "privacy", "refunds", "host agreement", "grievance"],
  },
];

export const setupTasks: SetupTask[] = [
  {
    id: "ops-001",
    workstream: "Forms",
    task: "Create Tally camper waitlist from the local form schema.",
    status: "Ready to connect",
    owner: "Founder",
  },
  {
    id: "ops-002",
    workstream: "Forms",
    task: "Create Tally host interest and road-stop lead forms.",
    status: "Ready to connect",
    owner: "Founder",
  },
  {
    id: "ops-003",
    workstream: "Database",
    task: "Create Airtable Research OS base from CSV schemas.",
    status: "Ready to connect",
    owner: "Founder",
  },
  {
    id: "ops-004",
    workstream: "Newsletter",
    task: "Create Brevo list named The Campfire by CampIn.",
    status: "Ready to connect",
    owner: "Founder",
  },
  {
    id: "ops-004a",
    workstream: "Community",
    task: "Create WhatsApp Community groups from the platform decision matrix and add the pledge/rules to group descriptions.",
    status: "Ready to connect",
    owner: "Founder",
  },
  {
    id: "ops-005",
    workstream: "Trust",
    task: "Create host verification matrix for permission, washroom, water, exact pin, and emergency contact.",
    status: "Ready to connect",
    owner: "Founder",
  },
  {
    id: "ops-006",
    workstream: "Testing",
    task: "Run 5 camper and 5 host tests before public website expansion.",
    status: "Needs proof",
    owner: "Founder",
  },
  {
    id: "ops-007",
    workstream: "SEO",
    task: "Prepare first 5 Bangalore/South India answer-first page briefs.",
    status: "Live locally",
    owner: "Content",
  },
  {
    id: "ops-008",
    workstream: "Files",
    task: "Create Google Drive folders for host proof, route proof, and permission notes.",
    status: "Needs account",
    owner: "Founder",
  },
  {
    id: "ops-009",
    workstream: "Website",
    task: "Use the website IA to map campin.co.in pages before building public SEO pages.",
    status: "Live locally",
    owner: "Founder / Product",
  },
  {
    id: "ops-010",
    workstream: "Legal",
    task: "Review legal drafts with counsel before collecting payments or confirming paid pilots.",
    status: "Needs proof",
    owner: "Founder",
  },
  {
    id: "ops-011",
    workstream: "Metrics",
    task: "Add community, supply quality, trust, SEO, and liquidity metrics to Airtable dashboards.",
    status: "Live locally",
    owner: "Founder / Ops",
  },
  {
    id: "ops-012",
    workstream: "Outreach",
    task: "Create Airtable Outreach Desk from data/outreach/daily_outreach_template.csv and track every candidate by source, score, stage, and compliance note.",
    status: "Ready to connect",
    owner: "Founder",
  },
  {
    id: "ops-013",
    workstream: "Outreach",
    task: "Connect Gmail, Instagram, and WhatsApp Business as manual founder channels; send only approved personalized messages.",
    status: "Needs account",
    owner: "Founder",
  },
];

export const workflowCadence: WorkflowCadence[] = [
  {
    name: "Airbnb Intelligence Sweep",
    cadence: "Mon 09:00 IST",
    status: "Live",
    output: "Marketplace lessons, product moves, risks, and CampIn actions.",
  },
  {
    name: "Host Lead Enrichment",
    cadence: "Tue 11:00 IST",
    status: "Live",
    output: "Qualified host and road-stop candidates with founder-call questions.",
  },
  {
    name: "Validation Metrics Review",
    cadence: "Wed 10:00 IST",
    status: "Live",
    output: "90-day proof progress and next 5 founder actions.",
  },
  {
    name: "SEO AEO GEO Brief Factory",
    cadence: "Thu 14:00 IST",
    status: "Live",
    output: "One answer-first, source-backed page brief per week.",
  },
  {
    name: "Campfire Newsletter Draft",
    cadence: "Fri 09:00 IST",
    status: "Live",
    output: "Practical newsletter draft with one clear CTA.",
  },
  {
    name: "Community Pulse Review",
    cadence: "Sun 18:00 IST",
    status: "Ready to connect",
    output: "WhatsApp, Instagram, newsletter, referral, and UGC signals with next community action.",
  },
  {
    name: "Legal And Domain Readiness Review",
    cadence: "Monthly 1st Mon 15:00 IST",
    status: "Ready to connect",
    output: "Legal page, consent, domain, analytics, and paid-pilot readiness gaps.",
  },
  {
    name: "Daily Outreach Drafts",
    cadence: "Daily 09:30 IST",
    status: "Live",
    output: "10 researched candidates, 5 personalized drafts, lead scores, and compliance notes.",
  },
  {
    name: "UX QA And Icon Review",
    cadence: "Sat 11:00 IST",
    status: "Live",
    output: "Build/UX/icon QA and small safe fixes when appropriate.",
  },
];

export const nextFounderActions = [
  "Create the four Tally forms using the local schemas and paste the form links into the Ops Center notes later.",
  "Create the Airtable Research OS base and import the seed CSVs.",
  "Create the Brevo list and welcome sequence, but import only consented emails.",
  "Create the WhatsApp Community with Bangalore Core, South India Routes, Founding Hosts, Road Stops, and Announcements groups.",
  "Create the Outreach Desk and start founder-approved daily host/road-stop outreach from public business sources.",
  "Pick 20 Bangalore/South India camper communities to observe compliantly before outreach.",
  "Shortlist 15 host or road-stop candidates and run founder calls.",
  "Run 5 camper tests and 5 host tests using the validation forms on mobile.",
  "Review the legal drafts before any paid pilot and publish the required policy pages before public launch.",
  "Turn the first verified pilot into a newsletter issue and SEO page brief.",
];

export const readinessPillIcon = Sparkles;
