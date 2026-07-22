---
phase: 01-design-system-home-page
plan: 02
subsystem: ui
tags: [nextjs, tailwind, gsap, lenis, chakra-petch, react]

# Dependency graph
requires:
  - phase: 01-design-system-home-page (plan 01-01)
    provides: BlueprintGrid/Panel/CoordinateLabel/HairlineRule primitives, motion-utils (gsap/ScrollTrigger), SmoothScrollProvider, amber blueprint Tailwind tokens
provides:
  - Root layout that mounts BlueprintGrid and SmoothScrollProvider once, sitewide, for every route
  - Chakra Petch loaded into --font-display (Space Grotesk fully removed)
  - Hairline-bordered navbar shell (glassmorphism glow/blur removed)
  - Footer social-icon buttons within the 4px corner-radius cap
affects: [01-03 (Home page rebuild — inherits the shared shell built here)]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Persistent background/scroll providers mounted once in root layout.tsx rather than per-page, so every route inherits them automatically"]

key-files:
  created: []
  modified:
    - src/app/layout.tsx
    - src/app/components/navbar.tsx
    - src/app/components/footer.tsx

key-decisions:
  - "Kept navbar's pill shape (rounded-full/rounded-2xl) — UI-SPEC's radius cap is scoped to cards/panels, not nav chrome, so this remained a discretionary choice per the plan's own reasoning"
  - "Used single-quoted import strings for the two new layout.tsx imports (BlueprintGrid, SmoothScrollProvider) to match the plan's literal automated verification pattern, while leaving pre-existing double-quoted imports in the file untouched"

patterns-established:
  - "Pattern 1: Sitewide persistent UI (background grid, smooth scroll) belongs in root layout.tsx, wrapping only {children}, keeping Navbar/Footer as direct siblings outside the scroll provider"

requirements-completed: ["Design system (Active #1)", "Motion system (Active #2)"]

coverage:
  - id: D1
    description: "Root layout mounts BlueprintGrid once and wraps {children} in SmoothScrollProvider, sitewide"
    requirement: "Motion system (Active #2)"
    verification:
      - kind: unit
        ref: "grep -q \"import BlueprintGrid from './components/BlueprintGrid'\" src/app/layout.tsx && grep -q SmoothScrollProvider src/app/layout.tsx"
        status: pass
    human_judgment: false
  - id: D2
    description: "Chakra Petch replaces Space Grotesk in the --font-display slot, weights 300-700"
    requirement: "Design system (Active #1)"
    verification:
      - kind: unit
        ref: "grep -q Chakra_Petch src/app/layout.tsx && ! grep -q Space_Grotesk src/app/layout.tsx"
        status: pass
    human_judgment: false
  - id: D3
    description: "Navbar glassmorphism glow/blur removed, replaced with hairline border-brand-border"
    requirement: "Design system (Active #1)"
    verification:
      - kind: unit
        ref: "! grep -q backdrop-blur-md src/app/components/navbar.tsx && ! grep -q 'border-white/20' src/app/components/navbar.tsx && ! grep -q 'boxShadow:' src/app/components/navbar.tsx && grep -q border-brand-border src/app/components/navbar.tsx"
        status: pass
    human_judgment: false
  - id: D4
    description: "Footer social-icon buttons use rounded-sm (within 4px cap), accessibility attributes preserved"
    requirement: "Design system (Active #1)"
    verification:
      - kind: unit
        ref: "grep -q rounded-sm src/app/components/footer.tsx && grep -q 'aria-label={social.ariaLabel}' src/app/components/footer.tsx"
        status: pass
    human_judgment: false
  - id: D5
    description: "Full end-to-end visual verification (grid renders, no glow/blur, less-rounded footer icons) in a running browser"
    verification: []
    human_judgment: true
    rationale: "Plan explicitly defers browser verification to the Plan 01-03 checkpoint after the Home page is also rebuilt, to avoid checkpoint fatigue on a partially-visible shell — visual confirmation was not performed in this plan by design"

# Metrics
duration: 5min
completed: 2026-07-22
status: complete
---

# Phase 01 Plan 02: Wire Shared Shell (Layout, Navbar, Footer) Summary

**Root layout now mounts BlueprintGrid and Lenis SmoothScrollProvider sitewide, loads Chakra Petch into --font-display, and the shared navbar/footer are restyled off glassmorphism onto the hairline blueprint aesthetic.**

## Performance

- **Duration:** 5 min
- **Started:** 2026-07-22T17:38:29Z
- **Completed:** 2026-07-22T17:43:41Z
- **Tasks:** 2 completed
- **Files modified:** 3

## Accomplishments
- `src/app/layout.tsx` mounts `BlueprintGrid` once and wraps `{children}` in `SmoothScrollProvider`, so every route (not just Home) inherits the persistent grid and Lenis smooth scroll
- Replaced the unused `Space_Grotesk` font with `Chakra_Petch` (weights 300-700) in the same `--font-display` CSS variable slot
- `navbar.tsx` nav shell no longer has the `backdrop-blur-md`/`border-white/20`/`shadow-2xl`/inline glow `boxShadow`/`opacity-95` glassmorphism treatment — replaced with a single `border-brand-border` hairline
- `footer.tsx` social-icon buttons changed from `rounded-lg` to `rounded-sm`, bringing corner radius within the UI-SPEC's 4px cap
- All existing accessibility attributes (`aria-label={social.ariaLabel}`, hamburger `sr-only` label) preserved unchanged

## Task Commits

Each task was committed atomically:

1. **Task 1: Wire the root layout — font swap, blueprint grid, smooth scroll** - `acc7c1c` (feat)
2. **Task 2: Restyle navbar and footer off glassmorphism onto the hairline blueprint shell** - `f6eb89f` (feat)

**Plan metadata:** (final docs commit follows this SUMMARY)

## Files Created/Modified
- `src/app/layout.tsx` - Swapped Space Grotesk for Chakra Petch on `--font-display`; mounted `BlueprintGrid` once; wrapped `{children}` in `SmoothScrollProvider`, keeping `Navbar`/`Footer` as direct siblings
- `src/app/components/navbar.tsx` - Removed glassmorphism glow/blur from the nav shell; replaced `border-white/20` with the `border-brand-border` hairline token
- `src/app/components/footer.tsx` - Social-icon buttons changed `rounded-lg` to `rounded-sm`

## Decisions Made
- Kept the navbar's pill shape (`rounded-full`/`data-[open]:rounded-2xl`) rather than reducing it to the 4px cap — the UI-SPEC's radius-cap discussion is scoped to cards/panels and is explicitly silent on nav chrome, per the plan's own stated reasoning
- Used single-quoted import strings for the two new `layout.tsx` imports to match the plan's literal automated verification `grep` pattern; left the file's other (pre-existing, double-quoted) imports untouched rather than reformatting the whole file

## Deviations from Plan

### Auto-fixed Issues

None — no code deviations. One verification-scope note below (not a code fix).

**Note on verification scope:** The plan's Task 1 `<verify>` block runs `npx tsc --noEmit` untouched, which surfaces a pre-existing, unrelated error in `src/app/about/page.tsx` (`Cannot find module '../../../public/Saba_Ethan_Photo.jpg'`). This error was already documented in `.planning/phases/01-design-system-home-page/deferred-items.md` during Plan 01-01, and reconfirmed here via `git stash`/`tsc`/`git stash pop` against the current baseline — it exists independently of this plan's changes and `about/page.tsx` is not in this plan's `files_modified` list. Per the deviation-rules scope boundary ("Only auto-fix issues DIRECTLY caused by the current task's changes"), this was left alone and excluded when evaluating pass/fail; `tsc --noEmit` reports zero errors on all files this plan touches.

---

**Total deviations:** 0 auto-fixed
**Impact on plan:** None — plan executed exactly as written. The single verification-scope note above concerns a pre-existing, out-of-scope error already tracked in deferred-items.md, not a change made by this plan.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- The shared shell (layout, navbar, footer) now fully reflects the blueprint design system and mounts the grid/smooth-scroll sitewide — Plan 01-03 (Home page rebuild) can proceed and its end-of-plan checkpoint will show the complete, correctly-shelled page for the first full visual verification
- Pre-existing `about/page.tsx` image-import TS error remains deferred (tracked in `deferred-items.md`); does not block Phase 01 plans 02 or 03

---
*Phase: 01-design-system-home-page*
*Completed: 2026-07-22*

## Self-Check: PASSED

- FOUND: src/app/layout.tsx
- FOUND: src/app/components/navbar.tsx
- FOUND: src/app/components/footer.tsx
- FOUND: acc7c1c (Task 1 commit)
- FOUND: f6eb89f (Task 2 commit)
