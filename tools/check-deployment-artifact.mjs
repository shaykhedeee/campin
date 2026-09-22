import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readProjectFile = (...parts) => readFile(path.join(projectRoot, ...parts), "utf8");

// Every top-level script in this folder becomes a public serverless function.
const functionFiles = await readdir(path.join(projectRoot, "netlify", "functions"));
const expectedFunctions = ["account", "create-enquiry", "enquiry-whatsapp", "notify-lead", "search"];
const functionNames = functionFiles.filter((file) => /\.[cm]?[jt]s$/.test(file)).map((file) => file.replace(/\.[^.]+$/, ""));
assert.deepEqual(functionNames.sort(), expectedFunctions.sort(), "Only intended handlers may be deployed; keep tests and helpers outside netlify/functions");
for (const name of functionNames) assert.match(name, /^[a-zA-Z0-9_-]+$/, "Invalid Netlify function name");

const [publicEntry, adminEntry, netlifyRedirects, vercelConfigText] = await Promise.all([
  readProjectFile("dist", "index.html"),
  readProjectFile("dist", "admin.html"),
  readProjectFile("dist", "_redirects"),
  readProjectFile("vercel.json"),
]);

assert.match(publicEntry, /id=["']root["']/, "dist/index.html must remain the public app entry");
assert.match(adminEntry, /id=["']admin-root["']/, "dist/admin.html must contain the admin app mount");
assert.doesNotMatch(adminEntry, /src=["']\/src\/admin\.tsx["']/, "admin entry must contain production code");

const redirectLines = netlifyRedirects
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);
const adminRule = redirectLines.indexOf("/admin.html /admin.html 200");
const publicFallback = redirectLines.indexOf("/* /index.html 200");
assert.ok(adminRule >= 0, "Netlify redirects must preserve /admin.html");
assert.ok(publicFallback > adminRule, "Netlify admin routing must precede the public SPA fallback");
for (const route of ["/api/account", "/api/search", "/api/enquiries", "/api/enquiries/:id/whatsapp"]) {
  const index = redirectLines.findIndex((line) => line.startsWith(`${route} `));
  assert.ok(index >= 0 && index < publicFallback, `${route} must precede the SPA fallback`);
}

const vercelConfig = JSON.parse(vercelConfigText);
assert.equal(vercelConfig.outputDirectory, "dist", "Vercel must publish the combined deployment artifact");
assert.ok(
  vercelConfig.rewrites?.some(
    (rewrite) => rewrite.source === "/(.*)" && rewrite.destination === "/index.html",
  ),
  "Vercel must provide a public SPA fallback",
);

console.log("Deployment artifact check passed: public and admin entries share dist with protected SPA routing.");
