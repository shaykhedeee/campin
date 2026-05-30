import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const checks = [
  {
    group: "Core business docs",
    items: [
      "Docs/Business/CampIn_Research_OS.md",
      "Docs/Business/CampIn_Validation_Machine.md",
      "Docs/Business/CampIn_SEO_AEO_GEO_Briefs.md",
      "Docs/Business/CampIn_Newsletter_System.md",
      "Docs/Business/CampIn_Airbnb_Strategy_Teardown.md",
      "Docs/Business/CampIn_Free_Tool_Stack_And_Dashboards.md",
      "Docs/Business/CampIn_Agentic_Workflows.md",
    ],
  },
  {
    group: "Design and dashboard docs",
    items: [
      "Docs/Design/CampIn_Airbnb_Learning_UX_System.md",
      "Docs/Design/CampIn_Iconography_System.md",
      "Docs/Design/CampIn_Dashboard_UX_System.md",
    ],
  },
  {
    group: "Form and CRM templates",
    items: [
      "data/forms/camper_waitlist_form.json",
      "data/forms/host_interest_form.json",
      "data/forms/road_stop_lead_form.json",
      "data/forms/safety_survey_form.json",
      "data/research/schemas/research_os_fields.csv",
      "data/research/templates/host_leads_template.csv",
      "data/research/templates/road_stop_leads_template.csv",
      "data/research/templates/content_brief_tracker.csv",
    ],
  },
  {
    group: "Ops stack data",
    items: [
      "data/ops/free_tool_stack.json",
      "data/ops/dashboard_blueprint.json",
      "data/ops/setup_checklist.csv",
      "data/workflows/agentic_workflows.json",
    ],
  },
  {
    group: "App surfaces",
    items: [
      "src/pages/ValidationMachine.tsx",
      "src/pages/StrategyLab.tsx",
      "src/pages/OpsCenter.tsx",
      "src/lib/validationMachine.ts",
      "src/data/campinOps.ts",
      "src/data/airbnbCampinPlaybook.ts",
    ],
  },
  {
    group: "Brand assets",
    items: [
      "brand/campin-logo.svg",
      "brand/campin-reviewed-badge.svg",
      "brand/founding-host-badge.svg",
      "brand/road-stop-standard-badge.svg",
      "brand/icons/campin-outdoor-icons.svg",
    ],
  },
  {
    group: "Local tools",
    items: [
      "tools/research-collector/collector.mjs",
      "tools/research-collector/queries.json",
      "tools/pdf-extract/extract_pdf_text.py",
      "tools/ops-check/ops_check.mjs",
    ],
  },
];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

const groups = checks.map((group) => {
  const items = group.items.map((item) => ({ path: item, exists: exists(item) }));
  const present = items.filter((item) => item.exists).length;
  return {
    group: group.group,
    present,
    total: items.length,
    percent: Math.round((present / items.length) * 100),
    items,
  };
});

const totalPresent = groups.reduce((sum, group) => sum + group.present, 0);
const totalItems = groups.reduce((sum, group) => sum + group.total, 0);
const report = {
  generatedAt: new Date().toISOString(),
  score: {
    present: totalPresent,
    total: totalItems,
    percent: Math.round((totalPresent / totalItems) * 100),
  },
  groups,
  nextActions: groups
    .flatMap((group) => group.items.filter((item) => !item.exists).map((item) => `Create or restore ${item.path}`))
    .slice(0, 10),
};

const outDir = path.join(root, "data", "ops");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "ops_readiness_report.json"), `${JSON.stringify(report, null, 2)}\n`);

const markdown = [
  "# CampIn Ops Readiness Report",
  "",
  `Generated: ${report.generatedAt}`,
  "",
  `Overall readiness: ${report.score.present}/${report.score.total} (${report.score.percent}%)`,
  "",
  "## Groups",
  "",
  ...groups.flatMap((group) => [
    `### ${group.group}`,
    "",
    `${group.present}/${group.total} (${group.percent}%)`,
    "",
    ...group.items.map((item) => `- ${item.exists ? "[x]" : "[ ]"} ${item.path}`),
    "",
  ]),
  "## Next Actions",
  "",
  ...(report.nextActions.length ? report.nextActions.map((action) => `- ${action}`) : ["- No missing local assets found."]),
  "",
].join("\n");

fs.writeFileSync(path.join(outDir, "ops_readiness_report.md"), markdown);

console.log(`CampIn Ops readiness: ${report.score.present}/${report.score.total} (${report.score.percent}%)`);
