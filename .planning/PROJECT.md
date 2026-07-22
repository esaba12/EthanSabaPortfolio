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

### Validated

- ✓ Design system: "Engineering Blueprint" — charcoal/near-black canvas with persistent faint blueprint grid, bold technical display type + monospace annotations, single signal-amber accent, corner-bracket/coordinate-label motifs — applied uniformly across all 5 pages
- ✓ Motion system: framer-motion (micro-interactions) + GSAP/ScrollTrigger (hero line-wipe, pinned Skills reveal, scroll parallax) + Lenis (smooth inertia scroll)
- ✓ Home page rebuilt (v2, escalated layout — full-viewport hero, asymmetric Skills panels), approved live
- ✓ About, Projects, Creative, Contact pages rebuilt on the same system
- ✓ Creative page photography displayed as "technical specimens" — camera/film stock/location/date rendered as mono annotation callouts on the photo carousel

### Active

- [ ] About page's Experience/Leadership content is stale relative to the user's current resume (still shows the Marcus and Millichap real estate internship, no Axonius/Alias Intelligence/TAMID/Birthright/Beverly Hills entries, no Shishi/Outpost/Nest projects) — visual restyle is done but content refresh not yet done, needs explicit user go-ahead before rewriting someone's work history
- [ ] Projects page/data (`projects.json`) doesn't yet include the resume's newer projects (Shishi, Outpost, Nest) — same content-refresh question as About

### Out of Scope

- Content/copy rewrites — existing text stays, this is visual/motion only
- New pages or IA changes — same 5 routes
- CMS/backend changes — content stays in the existing JSON files
- Backend/contact-form logic changes (Formspree integration stays as-is)

## Context

- Personal brand blends two identities: **builder** (CS/CAD/engineering, real estate analyst internship, blockchain club, Shopify/web dev internships) and **artist** (35mm film photography on a Canon AE-1, curated house/melodic-techno music taste). The "Engineering Blueprint" direction keeps the builder identity as the dominant visual language, with the artist content expressed through that same technical frame rather than switching styles per page — this was an explicit user requirement (uniformity over per-page theme switching).
- Current site's visual weaknesses being replaced: generic cyan-blue-violet gradient headline text, uniform `rounded-lg` cards everywhere, no scroll choreography, Inter-adjacent default type stack.
- Reference/inspiration: Lando Norris official F1 driver site (built by OFF+BRAND) — Awwwards Site of Day/Month — GSAP-driven cinematic scroll choreography, mask-reveal transitions, one bold committed accent color, 3D/Rive motion woven throughout. Research also surfaced: motion is processed before color/copy in first impressions (~50ms), so one well-timed early "wow" moment (aperture/shutter-style reveal) matters more than animating everything.
- **Phase 1 v1 checkpoint feedback (2026-07-22):** user reviewed the first Home page build live and called it "barely changed" — the token/motif system (colors, fonts, brackets, one hero line-wipe) was applied correctly, but the underlying layout was left untouched (same narrow centered container, same plain bordered Skills box, same 3-card grid), so the result read as a re-skin rather than a redesign. User explicitly asked to push further: hero should fill the viewport at a much larger type scale, Skills section needs real structural redesign (not a plain bordered box), scroll choreography needs more than fade+rise (pinning/parallax/staggered reveals), and the page needs to break out of the narrow `container mx-auto` blog-width column for full-bleed/asymmetric moments. This escalation applies to the whole site, not just Home — every future phase (2-5) should target this same higher bar from the start, not repeat the same-layout mistake.
- **Home page v2 shipped and approved (2026-07-22):** full-viewport hero (headline up to 140px desktop, left-aligned, giant faint "00" ghost numeral for asymmetry/scale, scroll-scrubbed parallax between headline and numeral layers), Skills restructured into two offset bracketed panels with a pinned scroll-scrub slide-in, full-bleed edge padding replacing the old `container mx-auto` everywhere. This is now the reference implementation — About/Projects/Creative/Contact should match this bar (full-bleed/asymmetric, not a single centered stacked column) and reuse the same primitives (`Panel`, `CoordinateLabel`, `HairlineRule`, `BlueprintGrid`, `motion-utils`, `SmoothScrollProvider`) rather than inventing new ones.
- **User's current resume is at `~/Downloads/Ethan Saba Resume Technical.md`.** It is significantly more current than the site's existing About-page content (About still lists a Real Estate Analyst internship at Marcus and Millichap, freshman-year framing, old skills list; the resume shows current internships at Axonius and Alias Intelligence, TAMID at Michigan, City of Beverly Hills Mayor's Innovation Circle, projects Shishi/Outpost/Nest, and a technical-only skills list — no real estate). Home page's Skills section was already updated from this resume. About page's content is likely stale and should be flagged to the user before or while rebuilding it visually — do not silently leave outdated real-estate-era content in place if a quick content refresh from the resume is in scope.
- **Process note:** the GSD ui-phase/plan-phase/execute-phase multi-agent pipeline was used for Home v1 and found too slow for this kind of fast-iteration visual work. From Home v2 onward, work is direct (Read/Edit/Write + Playwright screenshot checks), no subagent orchestration, no checkpoints beyond showing the user real screenshots/dev-server links.

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
| Escalate layout ambition beyond a same-structure re-skin: full-viewport hero, restructured Skills section, richer scroll choreography (pinning/parallax/stagger), full-bleed/asymmetric layout breaking the narrow centered column | User's live review of Phase 1 v1 called it "barely changed" — token/motif system alone isn't enough, the DOM layout itself must change to feel like a redesign, not just a recolor | ✓ Good — v2 shipped 2026-07-22, approved |
| Dropped the GSD ui-phase/plan-phase/execute-phase ceremony (ui-researcher → checker → planner → plan-checker → executor) in favor of direct implementation | User: "no more gsd it takes far too long" — the multi-agent checkpoint pipeline was too slow for iterative visual design work where the user wants to react to real screenshots quickly | ✓ Good |
| Home Skills section: dropped Real Estate entirely, split into "Languages" / "Tools & Frameworks" using the user's current resume (`~/Downloads/Ethan Saba Resume Technical.md`) instead of the old placeholder badge list | User is now further along (Axonius/Alias Intelligence/TAMID internships, not real estate); old content was stale | ✓ Good |

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
