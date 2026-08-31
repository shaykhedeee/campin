# Task 1 report: test harness and current-claims regression

## Implementation

- Added Vitest scripts (`test` and `test:watch`) to `package.json`.
- Added the requested development dependencies: Vitest, jsdom, Testing Library React, jest-dom, and user-event. The existing `package-lock.json` was updated using the repository's existing npm lockfile.
- Extended `vite.config.ts` with Vitest's jsdom environment, `src/test/setup.ts` setup file, and CSS processing while preserving the existing React, Tailwind, single-file, and path-alias Vite configuration.
- Added `src/test/setup.ts`, importing `@testing-library/jest-dom/vitest`.
- Added `src/pages/Home.claims.test.tsx`, rendering `Home` inside `MemoryRouter` and asserting that the unsupported `book instantly` and `every campsite is verified` claims are absent.

## Files changed

- `package.json`
- `package-lock.json`
- `vite.config.ts`
- `src/test/setup.ts`
- `src/pages/Home.claims.test.tsx`

## TDD evidence

### RED checkpoint

The supplied controller runtime does not expose `npm` (or `node`) on PATH. The initial requested command therefore failed before the harness could be exercised:

```text
npm test -- --run src/pages/Home.claims.test.tsx
The term 'npm' is not recognized as a name of a cmdlet, function, script file, or executable program.
```

After invoking the available bundled Node runtime against the newly added harness, the first test run also exposed the test setup defect (`ReferenceError: expect is not defined`). The test was corrected to import Vitest's `expect` explicitly.

### GREEN checkpoint

Focused regression test, using the bundled Node runtime:

```text
vitest run src/pages/Home.claims.test.tsx
Test Files  1 passed (1)
Tests       1 passed (1)
```

Full test run:

```text
vitest run
Test Files  1 passed (1)
Tests       1 passed (1)
```

Production builds (client and admin) both completed successfully using the existing build configurations.

`git diff --check` completed without whitespace errors.

## Self-review

- The regression uses `queryByText`, so it fails if either prohibited phrase is rendered by the home page.
- The test explicitly supplies `MemoryRouter`, matching Home's routing dependency.
- CSS remains enabled for tests and the production Vite plugin chain is unchanged apart from using Vitest's compatible `defineConfig` export.
- No product claims, booking behavior, payments, maps, or unrelated application code were changed.

## Concerns

- `npm` and `node` are unavailable as shell commands in the controller environment. Verification used the bundled Node executable directly; no lockfile or package-manager switch was made.
- The `user-event` dependency is installed for the requested harness but is not needed by this claims-only regression yet.
