# Task 4 report: licensed Indian regional photography

## Implementation

- Added the typed `MediaAsset` registry in `src/data/mediaRegistry.ts` with source page, author, license, region, subject, alt text, and `editorial-region` usage for six reusable Commons photographs.
- Replaced the Unsplash listing image set with local regional WebP assets. Every generated listing receives `imageAsset`, exposing the editorial usage metadata without changing listing evidence or verification stages.
- Updated home category records to use typed media registry keys and updated the category explorer to resolve local registry paths.
- Added responsive local WebP derivatives at 1600px (quality 78) and 900px (quality 76) for each accepted source.
- Added `public/images/india/ATTRIBUTION.md` with exact original file pages, authors, licenses, modifications, subjects, regions, usage, and local filenames.

## Sources and licenses

The ledger records the exact file pages and license terms. Sources are Wikimedia Commons originals with explicit Creative Commons reuse rights:

- Kerala backwaters houseboat — Vyacheslav Argenberg, CC BY 4.0.
- Nohkalikai Falls of Cherrapunji in summer — Jyotishkardey, CC BY-SA 4.0.
- Bridge at Jibhi Waterfall — Rohan Pinto, CC BY-SA 4.0 (the Commons page uploader is Ciridae).
- Kerala tea plantations — Karin Šubrtová, CC BY-SA 4.0.
- The Great Indian Thar Desert — Kanthi Kiran, CC BY-SA 4.0.
- Chandra Taal tent landscape — Adarsh Patel, CC BY-SA 4.0.

No stock preview, search thumbnail, hotlink, or operator-supplied campsite photograph was used. Regional imagery is explicitly editorial and is not evidence of any particular listing.

## Image inspection

All six 1600px WebP outputs were opened and checked for non-blank pixels, intact aspect ratio, relevant regional subject matter, and sensible framing. The first Cherrapunji transfer was visibly truncated/corrupt and was rejected; the complete source was downloaded from the Wikimedia upload URL, reconverted, and inspected successfully. `webpinfo` confirmed each responsive output is 900px or 1600px wide and no file exceeds the 1600px maximum.

## TDD evidence

### RED

The required test was added before the registry implementation and failed for the intended missing-module reason:

```text
FAIL  src/data/mediaRegistry.test.ts (0 test)
Error: Failed to resolve import "./mediaRegistry" from "src/data/mediaRegistry.test.ts". Does the file exist?
```

### GREEN

After implementing the registry:

```text
Test Files  1 passed (1)
Tests       1 passed (1)
```

## Verification

- Focused registry test: 1 file passed, 1 test passed.
- Full Vitest suite: 4 files passed, 8 tests passed.
- Client production build: 1,849 modules transformed; `dist/index.html` built successfully.
- Admin production build: 1,819 modules transformed; `dist-admin/admin.html` built successfully.
- `git diff --check`: passed with no whitespace errors.

## Files

- Created `src/data/mediaRegistry.ts`.
- Created `src/data/mediaRegistry.test.ts`.
- Created `public/images/india/ATTRIBUTION.md` and twelve local WebP derivatives.
- Modified `src/data/homeCategories.ts`, `src/data/listings.ts`, and the category explorer's media-path resolver.

## Commit

Implementation commit: `a872fb9`. The report was recorded in the follow-up documentation commit.

## Short contract

`mediaRegistry` is a typed record of local, attributed regional imagery. Use `mediaRegistry[key].src` for discovery surfaces and inspect `imageAsset.usage` before treating a listing image as property-authorized. All current assets are `editorial-region`; none can upgrade a listing's verification or availability state.

## Review fixes

- Corrected the Jibhi author attribution to Rohan Pinto in the registry and ledger; Ciridae is retained only as the Commons uploader context.
- Explore listing cards and ListingDetail now use the editorial asset alt text, show `Regional editorial image`, and carry responsive 900w/1600w `srcSet` values. Gallery visuals receive the same disclosure and are not described as visual proof.
- Removed active homepage Unsplash hotlinks. Hero, guide, featured, category, and CTA imagery now resolve through local `mediaRegistry` assets. Featured cards use editorial status copy instead of a misleading Reviewed Site badge.
- Added UI regression coverage for local homepage sources, editorial featured cards, Explore listing cards, ListingDetail disclosure, and responsive source selection.

Review-fix focused tests: 4 files passed, 6 tests passed. Final full suite: 5 files passed, 11 tests passed (Vitest 4.1.11, 2.86s). Final client build: 1,849 modules transformed; `dist/index.html` built successfully in 4.15s. Final admin build: 1,819 modules transformed; `dist-admin/admin.html` built successfully in 3.75s. `git diff --check` passed after the review fixes.

Review-fix implementation commit: `1276237`.
