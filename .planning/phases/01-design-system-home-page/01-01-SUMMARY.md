---
phase: 01-design-system-home-page
plan: 01
subsystem: ui
tags: [gsap, gsap-react, lenis, tailwind, design-system, motion]

requires: []
provides:
  - "Amber-accent Engineering Blueprint color tokens in tailwind.config.js"
  - "gsap, @gsap/react, lenis installed and human-approved"
  - "Four reusable structural primitives (BlueprintGrid, Panel, CoordinateLabel, HairlineRule)"
  - "Central motion-utils.ts module registering all GSAP plugins exactly once"
  - "SmoothScrollProvider.tsx (Lenis + GSAP ticker sync, not yet mounted)"
affects: [01-02-shell-wiring, 01-03-home-page-rebuild, phase-2, phase-3, phase-4, phase-5]

tech-stack:
  added: [gsap@3.15.0, "@gsap/react@2.1.2", lenis@1.3.25]
  patterns:
    - "Single GSAP plugin registration point (motion-utils.ts) — no other file calls gsap.registerPlugin"
    - "SSR-safe prefersReducedMotion() helper centralized for reuse by every future GSAP effect"
    - "Lenis autoRaf disabled, driven by gsap.ticker for a single unified animation loop"

key-files:
  created:
    - src/app/lib/motion-utils.ts
    - src/app/components/SmoothScrollProvider.tsx
    - src/app/components/BlueprintGrid.tsx
    - src/app/components/Panel.tsx
    - src/app/components/CoordinateLabel.tsx
    - src/app/components/HairlineRule.tsx
  modified:
    - tailwind.config.js
    - src/app/globals.css
    - package.json
    - package-lock.json

key-decisions:
  - "brand.accent-hover set to #D96816 (~15% darker than #FF7A1A) — no exact hover shade specified in UI-SPEC, derived value chosen for a normal hover contrast step"
  - "BlueprintGrid skips the optional major/minor grid line distinction (every-4th-line higher opacity) — UI-SPEC marks it implementer's discretion; a single uniform pitch/opacity satisfies the faint-texture requirement"
  - "Pre-existing unrelated tsc error in src/app/about/page.tsx (missing .jpg module declaration) confirmed present on baseline commit 748bc29 before this plan's changes; logged to deferred-items.md and left unfixed per scope boundary"

requirements-completed: ["Design system (Active #1)", "Motion system (Active #2)"]

coverage:
  - id: D1
    description: "gsap, @gsap/react, lenis installed after human-approved package legitimacy checkpoint"
    requirement: "Motion system (Active #2)"
    verification:
      - kind: other
        ref: "npm ls gsap @gsap/react lenis — all three resolved, no missing-peer warnings"
        status: pass
    human_judgment: false
  - id: D2
    description: "Tailwind brand color tokens migrated to signal-amber accent (#FF7A1A), brand.danger added, brand.pulse removed, fontFamily.mono mapped to Geist Mono, body line-height set to 1.5"
    requirement: "Design system (Active #1)"
    verification:
      - kind: other
        ref: "grep checks on tailwind.config.js and globals.css (FF7A1A present, pulse absent, var(--font-geist-mono) present, line-height: 1.5 present)"
        status: pass
    human_judgment: false
  - id: D3
    description: "Four structural primitive components (BlueprintGrid, Panel, CoordinateLabel, HairlineRule) created, reusable verbatim by future phases"
    requirement: "Design system (Active #1)"
    verification:
      - kind: unit
        ref: "npx tsc --noEmit (zero new errors) + grep default-export/accent-token checks on all four files"
        status: pass
    human_judgment: false
  - id: D4
    description: "motion-utils.ts registers ScrollTrigger/SplitText/DrawSVGPlugin/useGSAP exactly once and exports prefersReducedMotion; SmoothScrollProvider.tsx wraps ReactLenis root with autoRaf disabled, driven by gsap.ticker, synced to ScrollTrigger.update via useLenis"
    requirement: "Motion system (Active #2)"
    verification:
      - kind: unit
        ref: "npx tsc --noEmit (zero new errors) + npx eslint (clean) + grep checks for registerPlugin/autoRaf/lagSmoothing"
        status: pass
    human_judgment: false

duration: 20min
completed: 2026-07-22
status: complete
---

# Phase 1 Plan 01: Design System Foundation & Motion Stack Summary

**Installed gsap/@gsap/react/lenis (human-approved), migrated Tailwind to the amber-accent Engineering Blueprint palette, and built four reusable structural primitives plus a centralized GSAP/Lenis motion module.**

## Performance

- **Duration:** ~20 min (Tasks 2-4; Task 1 checkpoint approval occurred in a prior session)
- **Started:** 2026-07-22T17:06:00Z (approx, prior session)
- **Completed:** 2026-07-22T17:26:49Z
- **Tasks:** 4 (1 checkpoint + 3 auto)
- **Files modified:** 10

## Accomplishments
- Installed gsap@3.15.0, @gsap/react@2.1.2, lenis@1.3.25 after human-approved package legitimacy checkpoint
- Migrated Tailwind brand color tokens to the signal-amber Engineering Blueprint palette (#FF7A1A accent, #D96816 accent-hover, #E5484D danger), removed unused brand.pulse, mapped fontFamily.mono to Geist Mono
- Created four content-free structural primitives (BlueprintGrid, Panel, CoordinateLabel, HairlineRule) reusable verbatim by Phases 2-5
- Built a single-registration-point GSAP module (motion-utils.ts) plus an SSR-safe prefersReducedMotion() helper
- Built SmoothScrollProvider.tsx (Lenis root wrapped, autoRaf disabled, driven by gsap.ticker, ScrollTrigger synced via useLenis) — not yet mounted, ready for Plan 01-02

## Task Commits

Each task was committed atomically:

1. **Task 1: Verify npm package legitimacy before install** - human-verify checkpoint, approved in prior session (no code commit — human-judgment gate only)
2. **Task 2: Install motion stack + migrate Tailwind color/font tokens** - `245c966` (feat)
3. **Task 3: Create structural primitive components** - `1b11776` (feat)
4. **Task 4: Create the GSAP/Lenis motion module and smooth-scroll provider** - `c4bfe09` (feat)

**Plan metadata:** commit pending (final docs commit)

## Files Created/Modified
- `src/app/lib/motion-utils.ts` - Single GSAP plugin registration point + prefersReducedMotion() helper
- `src/app/components/SmoothScrollProvider.tsx` - ReactLenis root wrapper synced to gsap.ticker + ScrollTrigger.update
- `src/app/components/BlueprintGrid.tsx` - Fixed-position persistent blueprint grid background (24px mobile / 32px sm+ pitch)
- `src/app/components/Panel.tsx` - Corner-bracketed container primitive (bracketsOnHover prop)
- `src/app/components/CoordinateLabel.tsx` - Mono annotation tag (Label typography role, amber text)
- `src/app/components/HairlineRule.tsx` - 1px neutral divider
- `tailwind.config.js` - brand.accent repointed to amber, brand.danger added, brand.pulse removed, fontFamily.mono mapped
- `src/app/globals.css` - body line-height changed to 1.5
- `package.json` / `package-lock.json` - gsap, @gsap/react, lenis added as dependencies

## Decisions Made
- accent-hover derived as ~15% darker amber (#D96816) since UI-SPEC didn't specify an exact hover shade
- Skipped BlueprintGrid's optional major/minor grid line distinction (explicitly implementer's discretion in UI-SPEC)
- Logged a pre-existing, unrelated tsc error (about/page.tsx image import) to deferred-items.md instead of fixing it — confirmed present on the pre-plan baseline commit and out of this plan's file scope

## Deviations from Plan

### Auto-fixed Issues

None - plan executed exactly as written for all in-scope files.

### Out-of-Scope Discovery (logged, not fixed)

**1. Pre-existing tsc error in src/app/about/page.tsx**
- **Found during:** Task 2 verification (`npx tsc --noEmit`)
- **Issue:** `Cannot find module '../../../public/Saba_Ethan_Photo.jpg' or its corresponding type declarations.` Confirmed identical on baseline commit 748bc29 via git stash/pop before any 01-01 changes.
- **Action:** Logged to `.planning/phases/01-design-system-home-page/deferred-items.md`. Not fixed — file is outside this plan's `files_modified` scope per the executor's scope boundary rule.
- **Impact:** All of this plan's own files compile clean; this is the sole remaining `npx tsc --noEmit` error and it predates this plan.

---

**Total deviations:** 0 auto-fixed, 1 out-of-scope item logged for future attention.
**Impact on plan:** No scope creep. Plan executed exactly as specified.

## Issues Encountered
None beyond the pre-existing tsc error documented above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Design tokens, primitives, and motion module are ready for Plan 01-02 (shell wiring: layout.tsx mounts SmoothScrollProvider + BlueprintGrid, navbar/footer restyle) and Plan 01-03 (Home page rebuild using Panel/CoordinateLabel/HairlineRule)
- SmoothScrollProvider.tsx exists but is intentionally not mounted yet — Plan 01-02's job
- Deferred item (about/page.tsx tsc error) does not block Phase 1 execution but should be addressed whenever the About page is next touched

---
*Phase: 01-design-system-home-page*
*Completed: 2026-07-22*

## Self-Check: PASSED

All 9 created/modified files verified present on disk. All 3 task commit hashes (245c966, 1b11776, c4bfe09) verified present in git log.
