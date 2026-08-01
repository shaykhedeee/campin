---
name: campin-launch-validator
description: >-
  Audits the CampIn codebase for launch readiness, checks public-admin separation, validates that exactly 10 blog posts exist with verified local hero images, scans index.html for correct SEO/AEO metadata schemas, and checks for broken routing elements.
---

# CampIn Launch Validator

## Overview
This skill executes checks to ensure the CampIn platform is production-ready. It verifies admin-public separation, blog images, content formatting, and search optimization structures.

## Dependencies
- None (uses local Python standard libraries)

## Quick Start
To audit the entire project root workspace:
```bash
python tools/campin-launch-validator/scripts/audit_launch.py .
```

## Utility Scripts
The custom validator Python script supports running specific sub-checks:
* **Route Separation Check**:
  ```bash
  python tools/campin-launch-validator/scripts/audit_launch.py . --check-routes
  ```
* **Blog Posts Assets Check**:
  ```bash
  python tools/campin-launch-validator/scripts/audit_launch.py . --check-blogs
  ```
* **SEO Metadata Check**:
  ```bash
  python tools/campin-launch-validator/scripts/audit_launch.py . --check-seo
  ```

## Common Mistakes
* **Relative Workspace Paths**: Make sure to pass a valid path containing the CampIn root folder structure, otherwise checks will fail to find `src/` or `index.html`.
* **Missing Local Assets**: If you add new blog entries, you must place the corresponding image files in `public/` and reference them starting with a leading slash (e.g. `/images/blog_example.png`).
