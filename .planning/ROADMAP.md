# Roadmap: Ethan Saba Portfolio — Visual Overhaul

## Overview

Rebuild the existing 5-page portfolio site under one uniform "Engineering Blueprint" design system with Lando-Norris-caliber cinematic scroll motion. Phase 1 establishes the shared design tokens, motion primitives, and shell (nav/footer/fonts/colors), and applies them to the Home page as an approved proof of concept. Phases 2–5 roll the same locked system out to the remaining pages, each reusing Phase 1's primitives rather than inventing new visual language.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [ ] **Phase 1: Design System & Home Page** - Blueprint design tokens, motion primitives (framer-motion + GSAP/ScrollTrigger + Lenis), shared shell (nav/footer/fonts), Home page rebuilt as proof of concept
- [ ] **Phase 2: About Page** - Apply the locked system to About (hero, skills, experience, leadership, education, coursework)
- [ ] **Phase 3: Projects Page** - Apply the locked system to Projects grid/detail treatment
- [ ] **Phase 4: Creative Page** - Apply the locked system to Photography (specimen framing w/ EXIF-style metadata) and Music sections
- [ ] **Phase 5: Contact Page** - Apply the locked system to Contact form and contact-method cards

## Phase Details

### Phase 1: Design System & Home Page
**Goal**: A uniform "Engineering Blueprint" design system exists (Tailwind tokens, fonts, motion primitives) and the Home page is fully rebuilt on it, approved live by the user as the reference implementation for all other pages.
**Depends on**: Nothing (first phase)
**Requirements**: Design system (Active #1), Motion system (Active #2), Home page rebuild (Active #3)
**Success Criteria** (what must be TRUE):
  1. Home page loads with the charcoal/blueprint-grid canvas, technical display + monospace type, single amber accent — no gradient text, no generic rounded-card-everywhere look remains
  2. Scrolling the Home page triggers GSAP ScrollTrigger choreography (line-draw reveals and/or pinned section) plus Lenis smooth inertia scroll
  3. Shared shell (navbar, footer) reflects the new system and is reused (not page-specific)
  4. framer-motion still drives hover/tap micro-interactions
  5. User has viewed the running Home page in a browser and approved it as the direction to roll out
**Plans**: 3 plans across 3 waves (sequential — foundation → shell wiring → Home page rebuild)

Plans:
- [ ] 01-01-PLAN.md — Design tokens (amber accent, mono font mapping), 4 structural primitives (BlueprintGrid/Panel/CoordinateLabel/HairlineRule), GSAP+Lenis motion module and smooth-scroll provider
- [ ] 01-02-PLAN.md — Wire root layout (Chakra Petch font, BlueprintGrid mount, SmoothScrollProvider), restyle navbar/footer off glassmorphism
- [ ] 01-03-PLAN.md — Rebuild Home page (layout/typography/Badge), GSAP hero choreography + ScrollTrigger reveals, restyle ProjectsGrid, live browser approval checkpoint

### Phase 2: About Page
**Goal**: About page (hero, skills, experience, leadership, education, coursework sections) rebuilt using Phase 1's design tokens and motion primitives, no new visual language introduced.
**Depends on**: Phase 1
**Requirements**: Design system rollout
**Success Criteria** (what must be TRUE):
  1. About page uses the same canvas/type/accent/motif system as Home — no visual drift
  2. Section reveals use the shared motion primitives from Phase 1 (not bespoke one-off animations)
  3. All existing About content (skills, experience, leadership, education, coursework) is preserved
**Plans**: TBD

Plans:
- [ ] 02-01: TBD

### Phase 3: Projects Page
**Goal**: Projects page and ProjectsGrid component rebuilt using the locked system.
**Depends on**: Phase 1
**Requirements**: Design system rollout
**Success Criteria** (what must be TRUE):
  1. Projects page/grid uses the shared canvas/type/accent/motif system
  2. Project cards reuse Phase 1's card/panel primitive (corner brackets, coordinate labels) rather than a new style
  3. Existing project data (`projects.json`) renders unchanged in content
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

### Phase 4: Creative Page
**Goal**: Creative page (Photography + Music) rebuilt using the locked system, with photography framed as technical specimens using existing metadata.
**Depends on**: Phase 1
**Requirements**: Design system rollout, specimen framing for photography
**Success Criteria** (what must be TRUE):
  1. PhotoCarousel presents each photo with camera/film-stock/location/date rendered as annotation callouts in the shared technical style
  2. MusicCard/music grid uses the shared canvas/type/accent/motif system
  3. No separate "darkroom" or contact-sheet visual theme is introduced — same system as every other page
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

### Phase 5: Contact Page
**Goal**: Contact page (contact methods + form) rebuilt using the locked system.
**Depends on**: Phase 1
**Requirements**: Design system rollout
**Success Criteria** (what must be TRUE):
  1. Contact page uses the same canvas/type/accent/motif system as the rest of the site
  2. Form and contact-method cards reuse Phase 1's shared primitives
  3. Formspree submission behavior is unchanged
**Plans**: TBD

Plans:
- [ ] 05-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design System & Home Page | 0/1 | Not started | - |
| 2. About Page | 0/1 | Not started | - |
| 3. Projects Page | 0/1 | Not started | - |
| 4. Creative Page | 0/1 | Not started | - |
| 5. Contact Page | 0/1 | Not started | - |
