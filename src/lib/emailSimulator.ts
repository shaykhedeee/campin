export interface SimulatedEmail {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  sentAt: string;
  status: "delivered" | "bounced" | "opened";
  bodyText: string;
  templateName: string;
}

export interface EmailTemplate {
  name: string;
  subject: string;
  category: "camper" | "host" | "alerts" | "transactional";
  bodyText: string;
}

export const emailTemplates: EmailTemplate[] = [
  {
    name: "Camper Welcome #1: Welcome to The Campfire 🏕️",
    subject: "Welcome to The Campfire 🏕️ | Your India Backyard Trust Key",
    category: "camper",
    bodyText: `Hey there Camper,

Welcome to The Campfire—our weekly intelligence layer by CampIn. We're building India's backyard discoverability from the ground up, prioritizing permission, washrooms, clean water, and on-ground audits.

Here is what you can expect as a founding community member:
- Early access to physically reviewed coffee glades, high-altitude terraces, and overlanding bays.
- Safety-first overlanding corridors warnings (landslides, police permits, forest alerts).
- Practical handbooks (BYOT guides, vanlife standards, first-timer packing templates).

Let's camp responsibly, respect the land, and support local hosts.

Cheers,
The CampIn Team
support@campin.co.in`,
  },
  {
    name: "Camper Welcome #2: Top 5 Verified Coffee Glades & Terraces",
    subject: "Weekly Digest: 5 Audited Stays Near Bangalore You Can Trust",
    category: "camper",
    bodyText: `Hello outdoor enthusiast,

We don't trust polished travel portal descriptions, so we verified these Bangalore-accessible weekend sanctuaries on-ground:

1. Madikeri Coffee Glade (Madikeri, Karnataka) - Private estate coffee, fenced security, and clean flush restrooms.
2. Cloud-Catcher Terrace (Cherrapunji, Meghalaya) - Sunset valley camping with root bridge trails.
3. Banjar Valley Cedar Stream (Jibhi, Himachal) - Pure glacier water access, off-grid cedar meadow.

Each site is checked by our team for exact GPS locations, legal permits, and caretaker availability.

Pitch yours safely,
The CampIn Team
support@campin.co.in`,
  },
  {
    name: "Camper Welcome #3: Essential Gear & Permit Safety Checklist",
    subject: "Camper Safety: Crucial BYOT Gear & State Permit Rules in India",
    category: "camper",
    bodyText: `Dear Camper,

Before you head out with your tent (BYOT), here are three non-negotiable rules for safe camping in India:

1. Never Assume Permission: Pitching a tent on random public shores or national parks often leads to police fines or local confrontation. Use audited, permissioned land.
2. The Washroom Standard: Feces management near mountain water sources is a rising issue. Camp only where clean toilets or closed sanitary systems exist.
3. Arrive Before Dark: Indian rural corridors are active with wildlife and terrain shifting at night. Never check-in after 6:00 PM.

Ensure you check our locked guides for the complete safe overlanding checklist.

Warmly,
The CampIn Team
support@campin.co.in`,
  },
  {
    name: "Host Onboarding #1: We Received Your Host Application!",
    subject: "Your Host Application to CampIn: Setting Up the Verification Onboarding",
    category: "host",
    bodyText: `Hello Host Candidate,

Thank you for applying to the CampIn Founding Host cohort! We are incredibly excited to audit your private farm, estate, terrace, or overlanding bay.

To protect campers, we build trust dynamically. Our next step is a 10-minute founder call to verify:
- Google Maps exact pin coordinates.
- Property bounds, ownership, or lease terms.
- Washroom (Private vs. Shared) and water source.
- Caretaker accessibility.

Our team will reach out via WhatsApp/Call in the next 24 hours.

Best regards,
Host Operations | CampIn
support@campin.co.in`,
  },
  {
    name: "Host Onboarding #2: Upgrade Your Quality Score (GPS, Restrooms, Water)",
    subject: "Host Tip: How to Maximize Your Site's On-Ground Trust Score",
    category: "host",
    bodyText: `Hello Host Partner,

We are staging your land details! To maximize your site visibility and achieve a perfect 10/10 trust score, make sure you provide:

1. Exact GPS Coordinates: Send us the Google Maps coordinate pin. Street addresses do not work for remote overlanding.
2. Verified Washrooms: High-resolution photos of the guest toilet and access trails.
3. Water Source: Specify if your water is municipal, spring, borewell, or if campers must carry their own drinking water.

Clear proof matters infinitely more than polished descriptions.

Warmly,
Host Support | CampIn
support@campin.co.in`,
  },
  {
    name: "Live Safety Broadcast: Mudslide & Route Closures (Western Ghats)",
    subject: "⚠️ LIVE CORRIDOR WARNING: Western Ghats Terrain & Pass Closures",
    category: "alerts",
    bodyText: `⚠️ LIVE OUTDOOR CORRIDOR WARNING

To all campervans, overlanders, and own-tent campers in the Western Ghats/Coorg corridors:

Heavy monsoon precipitation has triggered severe terrain shifts:
- Route Blockage: Landslide blocks reported on the Madikeri-Mangalore corridor. Use the alternative pass.
- Approach Roads: Deep forest mud trails are inaccessible to standard two-wheel-drive cars. Campervans must consult hosts.
- BYOT Safety: Estuary levels are rising. All riverside camping pitches are closed until further notice. Caretakers are holding guests in upper terraces.

Contact support@campin.co.in or your host check-in line before attempting travel.

Stay safe,
CampIn safety broadcast
support@campin.co.in`,
  },
];

const emailLogsStorageKey = "campin.email.logs.v1";

export function readEmailLogs(): SimulatedEmail[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(emailLogsStorageKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveEmailLog(email: SimulatedEmail) {
  if (typeof window === "undefined") return;
  const current = readEmailLogs();
  window.localStorage.setItem(emailLogsStorageKey, JSON.stringify([email, ...current]));
  window.dispatchEvent(new Event("campin-email-logs-updated"));
}

export function clearEmailLogs() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(emailLogsStorageKey);
  window.dispatchEvent(new Event("campin-email-logs-updated"));
}

export function triggerSimulatedEmail(recipientEmail: string, templateName: string) {
  const template = emailTemplates.find((t) => t.name === templateName);
  if (!template) return;

  const emailLog: SimulatedEmail = {
    id: `MAIL-${Date.now().toString(36).toUpperCase()}`,
    sender: "support@campin.co.in",
    recipient: recipientEmail,
    subject: template.subject,
    sentAt: new Date().toISOString(),
    status: "delivered",
    bodyText: template.bodyText,
    templateName: template.name,
  };

  saveEmailLog(emailLog);
  return emailLog;
}
