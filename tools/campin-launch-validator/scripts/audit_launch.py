import argparse
import os
import re
import sys


PUBLIC_FILES = [
    "src/App.tsx",
    "src/main.tsx",
    "src/pages/Home.tsx",
    "src/pages/Explore.tsx",
    "src/pages/ListingDetail.tsx",
    "src/pages/BlogIndex.tsx",
    "src/pages/BlogPost.tsx",
    "src/pages/Guides.tsx",
    "src/pages/CampingGuideDetail.tsx",
    "src/pages/Community.tsx",
    "src/pages/Signup.tsx",
    "src/pages/HostYourLand.tsx",
    "src/pages/Support.tsx",
    "src/pages/ComingSoon.tsx",
    "src/components/newsletter/CampfireSignup.tsx",
    "src/components/newsletter/CampfireIssuePreview.tsx",
    "src/components/validation/ValidationForms.tsx",
    "src/data/listings.ts",
    "src/data/campingGuides.ts",
    "index.html",
]

BLOCKED_PUBLIC_PHRASES = [
    "backend",
    "founder",
    "lead magnet",
    "auto-publish",
    "exact coordinates",
    "content gated",
    "local guide vault",
    "booking engine",
    "marketplace",
    "supabase",
]


def read_file(path):
    with open(path, "r", encoding="utf-8") as handle:
        return handle.read()


def strip_urls(content):
    return re.sub(r"https?://\S+", "", content)


def check_routes(workspace_dir):
    app_tsx_path = os.path.join(workspace_dir, "src", "App.tsx")
    content = read_file(app_tsx_path)

    validation_active = re.search(r'^\s*<Route\s+path="/validation"', content, re.MULTILINE)
    strategy_active = re.search(r'^\s*<Route\s+path="/strategy"', content, re.MULTILINE)
    ops_active = re.search(r'^\s*<Route\s+path="/ops"', content, re.MULTILINE)

    if validation_active or strategy_active or ops_active:
        print("[-] Route audit failed: admin/debug route is exposed in public App.tsx.", file=sys.stderr)
        return False

    admin_html = os.path.join(workspace_dir, "admin.html")
    if not os.path.exists(admin_html):
        print("[-] Route audit failed: admin.html is missing.", file=sys.stderr)
        return False

    print("[+] Route audit: public/admin separation verified")
    return True


def check_blogs(workspace_dir):
    blog_file_path = os.path.join(workspace_dir, "src", "data", "blogPosts.ts")
    content = read_file(blog_file_path)

    slugs = re.findall(r'"slug":\s*"([^"]+)"', content)
    hero_images = re.findall(r'"heroImage":\s*"([^"]+)"', content)
    source_urls = re.findall(r'"url":\s*"https?://[^"]+"', content)
    faq_blocks = re.findall(r'"faqs":\s*\[', content)

    checks = [
        (len(slugs) >= 20, f"expected at least 20 published posts, found {len(slugs)}"),
        (len(set(slugs)) == len(slugs), "duplicate blog slugs found"),
        (len(hero_images) >= len(slugs), "each post should expose a hero image"),
        (len(source_urls) >= len(slugs), "source-backed posts should include URLs"),
        (len(faq_blocks) >= len(slugs), "each post should include FAQ data"),
        ("Publish (recommended)" in content, "published drafts should include conservative publish recommendations"),
    ]

    for passed, message in checks:
        if not passed:
            print(f"[-] Blog audit failed: {message}.", file=sys.stderr)
            return False

    for img in hero_images:
        if img.startswith("/"):
            local_path = os.path.join(workspace_dir, "public", img.lstrip("/"))
            if not os.path.exists(local_path):
                print(f"[-] Blog audit failed: missing local image {img}", file=sys.stderr)
                return False

    if re.search(r"[âðÂ]", content):
        print("[-] Blog audit failed: mojibake characters remain in blogPosts.ts.", file=sys.stderr)
        return False

    print(f"[+] Blog audit: {len(slugs)} published source-backed posts verified")
    return True


def check_guides(workspace_dir):
    guide_path = os.path.join(workspace_dir, "src", "data", "campingGuides.ts")
    detail_path = os.path.join(workspace_dir, "src", "pages", "CampingGuideDetail.tsx")
    guides = read_file(guide_path)
    detail = read_file(detail_path)

    required_keywords = [
        "camping near Bangalore",
        "own tent camping near Bangalore",
        "is camping legal in India",
        "camping gear checklist India",
        "monsoon camping Western Ghats",
        "camping near Pune Pawna Lonavala",
        "campervan road stops India",
        "family camping India",
        "host land for camping India",
        "responsible camping India",
    ]

    missing = [keyword for keyword in required_keywords if keyword.lower() not in guides.lower()]
    if missing:
        print(f"[-] Guide audit failed: missing SEO guide targets: {', '.join(missing)}", file=sys.stderr)
        return False

    if re.search(r'className="[^"]*(?:^|\s)blur-sm(?:\s|")', detail) or "Content Gated" in detail:
        print("[-] Guide audit failed: long-form content still appears gated.", file=sys.stderr)
        return False

    if "saveGuideAccessLead" not in detail or "submitMvpLead" not in detail:
        print("[-] Guide audit failed: guide unlock capture is not wired.", file=sys.stderr)
        return False

    print("[+] Guide audit: public long-form guides and checklist unlocks verified")
    return True


def check_seo(workspace_dir):
    index_html_path = os.path.join(workspace_dir, "index.html")
    content = read_file(index_html_path)

    required_tags = {
        "title": r"<title>.*?</title>",
        "meta-description": r'<meta\s+name="description"\s+content=".*?"',
        "open-graph-title": r'<meta\s+property="og:title"\s+content=".*?"',
        "open-graph-description": r'<meta\s+property="og:description"\s+content=".*?"',
        "structured-data": r'type="application/ld\+json"',
    }

    for tag_name, pattern in required_tags.items():
        if not re.search(pattern, content, re.IGNORECASE | re.DOTALL):
            print(f"[-] SEO audit failed: missing or invalid {tag_name}", file=sys.stderr)
            return False

    if re.search(r"[âðÂ]", content):
        print("[-] SEO audit failed: mojibake characters remain in index.html.", file=sys.stderr)
        return False

    print("[+] SEO audit: metadata and structured data verified")
    return True


def check_lead_capture(workspace_dir):
    required = {
        "homepage": ("src/pages/Home.tsx", "submitMvpLead"),
        "signup": ("src/components/validation/ValidationForms.tsx", "saveValidationLead"),
        "community": ("src/pages/Community.tsx", "CamperWaitlistForm"),
        "host": ("src/components/validation/ValidationForms.tsx", "scoreHostLead"),
        "listing request": ("src/pages/ListingDetail.tsx", "submitMvpLead"),
        "guide unlock": ("src/pages/CampingGuideDetail.tsx", "saveGuideAccessLead"),
        "campfire": ("src/components/newsletter/CampfireSignup.tsx", "preferredGuide"),
        "admin export": ("src/pages/OpsCenter.tsx", "exportMvpLeadsToCsv"),
    }

    for label, (relative_path, needle) in required.items():
        content = read_file(os.path.join(workspace_dir, relative_path))
        if needle not in content:
            print(f"[-] Lead capture audit failed: {label} missing {needle}.", file=sys.stderr)
            return False

    print("[+] Lead capture audit: starter-phase capture routes verified")
    return True


def check_public_copy(workspace_dir):
    for relative_path in PUBLIC_FILES:
        full_path = os.path.join(workspace_dir, relative_path)
        if not os.path.exists(full_path):
            continue
        content = strip_urls(read_file(full_path))
        for phrase in BLOCKED_PUBLIC_PHRASES:
            if re.search(rf"\b{re.escape(phrase)}\b", content, re.IGNORECASE):
                print(f"[-] Public copy audit failed: '{phrase}' found in {relative_path}.", file=sys.stderr)
                return False

    print("[+] Public copy audit: internal launch language not exposed")
    return True


def main():
    parser = argparse.ArgumentParser(description="CampIn Launch Audit Utility")
    parser.add_argument("workspace", help="Path to the CampIn project root workspace")
    parser.add_argument("--check-routes", action="store_true")
    parser.add_argument("--check-blogs", action="store_true")
    parser.add_argument("--check-guides", action="store_true")
    parser.add_argument("--check-seo", action="store_true")
    parser.add_argument("--check-lead-capture", action="store_true")
    parser.add_argument("--check-public-copy", action="store_true")
    args = parser.parse_args()

    workspace_path = os.path.abspath(args.workspace)
    requested = [
        args.check_routes,
        args.check_blogs,
        args.check_guides,
        args.check_seo,
        args.check_lead_capture,
        args.check_public_copy,
    ]
    run_all = not any(requested)

    checks = [
        (args.check_routes or run_all, check_routes),
        (args.check_blogs or run_all, check_blogs),
        (args.check_guides or run_all, check_guides),
        (args.check_seo or run_all, check_seo),
        (args.check_lead_capture or run_all, check_lead_capture),
        (args.check_public_copy or run_all, check_public_copy),
    ]

    success = True
    for should_run, check in checks:
        if should_run and not check(workspace_path):
            success = False

    if not success:
        sys.exit(1)

    print("[+] Launch check succeeded. CampIn is ready for starter-phase review.")


if __name__ == "__main__":
    main()
