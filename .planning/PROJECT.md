# Ethan Saba Portfolio — Visual Overhaul

## What This Is

A personal portfolio site (Next.js 15 App Router, React 19, Tailwind, framer-motion) for Ethan Saba — CS student at the University of Michigan (Real Estate minor). Existing pages: Home, About, Projects, Creative (photography + music), Contact. This milestone is a full visual and motion overhaul of the existing site — not a rewrite of content, IA, or routes.

## Core Value

The site must feel unmistakably distinctive and impressive on first load — motion-led, not decorated — while staying legible as a *tech* portfolio first (the artistic/photography/music content is expressed through the same technical visual language, not a competing style).

## Requirements

### Validated

- ✓ Next.js App Router site with 5 routes (Home, About, Projects, Creative, Contact) — existing
- ✓ Content data-driven via `src/content/projects.json` and `src/content/creative.json` — existing
- ✓ framer-motion, Tailwind, headlessui/heroicons, lucide-react already installed — existing

### Active

- [ ] Design system: "Engineering Blueprint" — charcoal/near-black canvas with persistent faint blueprint grid, bold technical display type + monospace annotations, single signal-amber accent, corner-bracket/coordinate-label motifs — applied uniformly across every page (not per-page themes)
- [ ] Motion system: framer-motion (micro-interactions, hover/tap) + GSAP/ScrollTrigger (line-draw reveals, pinned sections, scroll-scrubbed choreography) + Lenis (smooth inertia scroll) — Lando Norris (OFF+BRAND) caliber cinematic scroll, one big scroll-stopping moment early, restraint elsewhere
- [ ] Home page rebuilt with the new system as proof of concept, approved live before rollout
- [ ] About, Projects, Creative, Contact pages rebuilt with the same locked system
- [ ] Creative page photography displayed as "technical specimens" using existing EXIF-like metadata (camera, film stock, location, date) as annotation callouts — not a separate darkroom/contact-sheet theme

### Out of Scope

- Content/copy rewrites — existing text stays, this is visual/motion only
- New pages or IA changes — same 5 routes
- CMS/backend changes — content stays in the existing JSON files
- Backend/contact-form logic changes (Formspree integration stays as-is)

## Context

- Personal brand blends two identities: **builder** (CS/CAD/engineering, real estate analyst internship, blockchain club, Shopify/web dev internships) and **artist** (35mm film photography on a Canon AE-1, curated house/melodic-techno music taste). The "Engineering Blueprint" direction keeps the builder identity as the dominant visual language, with the artist content expressed through that same technical frame rather than switching styles per page — this was an explicit user requirement (uniformity over per-page theme switching).
- Current site's visual weaknesses being replaced: generic cyan-blue-violet gradient headline text, uniform `rounded-lg` cards everywhere, no scroll choreography, Inter-adjacent default type stack.
- Reference/inspiration: Lando Norris official F1 driver site (built by OFF+BRAND) — Awwwards Site of Day/Month — GSAP-driven cinematic scroll choreography, mask-reveal transitions, one bold committed accent color, 3D/Rive motion woven throughout. Research also surfaced: motion is processed before color/copy in first impressions (~50ms), so one well-timed early "wow" moment (aperture/shutter-style reveal) matters more than animating everything.

## Constraints

- **Tech stack**: Must build on existing Next.js 15 / React 19 / Tailwind 3 / framer-motion stack — no framework swap
- **New deps**: GSAP + ScrollTrigger + Lenis to be added for scroll choreography (approved by user)
- **Scope discipline**: Visual/motion overhaul only — do not touch data files' schema, routes, or copy without explicit approval
- **Sequencing**: Home page ships first as an approved proof of concept before About/Projects/Creative/Contact are touched

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| "Engineering Blueprint" design system, uniform across all pages | User explicitly rejected per-page theme switching; wanted tech identity central with artistic content expressed through the same frame | — Pending |
| Signal amber/orange as the single accent color | Reads as engineering/blueprint annotation markup, high contrast on charcoal | — Pending |
| Animation stack: framer-motion + GSAP/ScrollTrigger + Lenis | Framer-motion alone can't match Lando-Norris-caliber pinned/scrubbed/line-draw choreography; GSAP is the real stack behind that tier of site | — Pending |
| Home page first as proof of concept, not whole site in one pass | User chose to validate the direction live before committing to all 5 pages | — Pending |
| Photography shown as "technical specimens" using existing camera/film-stock/location/date metadata | Keeps the Creative page inside the same technical visual language instead of switching to a darkroom theme; the data already exists in creative.json | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-07-22 after initialization*
