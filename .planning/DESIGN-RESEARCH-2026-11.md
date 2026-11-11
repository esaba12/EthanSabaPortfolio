# Design Research: Why the Site Feels Plain, and What to Do About It

2026-11-10. Research only, no edits. Based on the live site at 1440px and 390px (Home,
About, Projects, Creative), the source, and outside references (listed at the bottom).

---

## 1. Diagnosis: what makes it read as "plain"

The tokens (charcoal, amber, Chakra Petch, mono labels) are fine. The plainness comes from
**how they're used**: the same few moves repeat on every page, and the "blueprint" idea is
named but barely drawn.

1. **One section template, everywhere.** Every section on every page is: an orange mono
   label `[ X ]`, then a heading, then a vertical stack of identical grey bordered boxes. About
   is 5 of these in a row (Skills, Experience, Leadership, Education, Coursework). Nothing
   changes in rhythm, density, or scale after the hero, so the page reads as a list.
2. **Amber is used for everything, so it highlights nothing.** Labels, job titles, dates,
   corner brackets, links, filter chips, nav state, and the submit button are all `#FF7A1A`.
   With no hierarchy in the accent, the eye has nowhere to land.
3. **The blueprint motif is only two devices.** It's a 4%-white grid (uniform wallpaper that
   never responds to anything) and corner brackets on boxes. Real drawings get their
   character from **dimension lines, leader callouts, numbered balloons, section markers
   (A–A), title blocks, revision tables, scale bars, crosshair registration marks and hatching**.
   None of these appear. That's why it looks like "dark mode with brackets", not "a
   drawing".
4. **Scale contrast collapses after the hero.** The hero headline is 120px, but every section
   heading after it is the same ~40px, and body text is 14–16px grey. There are no big
   numbers, pull quotes, or oversized moments to break up the page.
5. **Surfaces are flat grey on flat black.** `#1a1a1a` boxes on `#0a0a0a` with no texture,
   light, or depth. The 2026 references treat near-black as a *material* (grain, warm glow)
   rather than an empty void.
6. **Motion is only "fade up on scroll".** It's the same 0.5s fade+rise on every section.
   The one great moment (the hero line wipe + wave underline) is never echoed.
7. **The content itself is underused as visuals.** The site has strong visual material it
   doesn't show: 7 demo videos (only as small posters), real metrics (40%+ test runtime cut,
   1000+ attendees, 80 of 2,000+, 795 tests, 20 RLS tables), film photos, and album art.
   Instead it shows tag badges.
8. **Specific weak spots:**
   - Home Skills: two large panels holding 10 small badges, mostly empty space.
   - About: the headshot's bright studio-blue background is the only cool color on the
     site and clashes with the amber palette.
   - Contact: a three-card "What I'm looking for" grid (the generic SaaS pattern).
   - Footer: generic "logo + icons + links" that doesn't use the system at all.

---

## 2. What the references point to

- **Portfolios that get noticed treat the site itself as proof of skill** (Bruno Simon is
  the extreme case), but hiring-focused guidance says depth beats spectacle: case studies
  with *your contribution, the tradeoffs, and measurable results* outperform feature lists.
  ([Elementor](https://elementor.com/blog/best-web-developer-portfolio-examples/),
  [DevPlaybook](https://devplaybook.cc/blog/best-developer-portfolio-examples-2025),
  [case-study redesign](https://jabawack.github.io/blog/donation-mentoring-case-study))
- **Engineering + craft is one thing, not two.** The Codrops profile of Edoardo Lunardi
  argues that the technical and the aesthetic are a single concern. That is the exact pitch
  of this site, so the craft has to be *visible*.
  ([Codrops](https://tympanus.net/codrops/2026/04/02/where-engineering-meets-craft-edoardo-lunardis-obsession-with-the-details/))
- **Blueprint systems done well commit fully:** hairline cells, zero radius, dimension
  lines, mono data tables, crosshairs, lines that draw in, and grids that subtly parallax,
  with *one* warm accent reserved for highlights.
  ([Tech Blueprint kit](https://cdn.jsdelivr.net/npm/@wrongstack/core@0.295.1/design-kits/tech-blueprint/KIT.md),
  [Meridian Blueprint](https://kombai.com/gallery/inspirations/meridian-blueprint/),
  [Cobalt Blueprint](https://kombai.com/gallery/inspirations/cobalt-blueprint/))
- **Texture over void:** a 3–5% grain overlay plus large soft warm glows is the recurring
  2026 treatment for dark sites. Typography is used as a graphic element at viewport scale.
  Bento grids are only interesting when tiles *do* something (play, open, expand).
  ([2026 trends](https://spoko-space.pages.dev/blog/modern-website-design-trends/),
  [SuperDesign library](https://superdesign.dev/library/swapnils-bold-portfolio))

---

## 3. Three directions (pick one before building)

### A. "Commit to the drawing" (recommended)
Keep the current palette and fonts, and make the blueprint *real*. Each page becomes a
**sheet** in a drawing set.
- **Title block** in the bottom-right of each page (or as the footer): `SHEET 02 / 05 ·
  PROJECTS · DRAWN E. SABA · REV 2026.11 · SCALE 1:1`. This replaces the generic footer.
- **Dimension lines** as section dividers (`|←—— 2024 → 2028 ——→|` on Education; on
  Experience, a timeline drawn as a dimensioned axis).
- **Leader callouts with numbered balloons** on the project video posters and the headshot.
  For example, ① points at the Recruiting OS inbox: "Gmail scan → drafts reply". This
  shows real detail instead of tag badges.
- **Lines that draw in** (SVG stroke) on scroll for dividers, brackets and callouts, echoing
  the hero's wave underline, so the motion vocabulary has one signature.
- **A grid that responds:** a cursor crosshair with live X/Y coordinates in the corner, and
  the grid parallaxing slightly.
- **Accent discipline:** amber only for *active / live / interactive* (links, live
  indicators, the one key number per section). Labels and dates move to a cool
  "blueprint cyan" or neutral grey, which adds a second, quieter color family.

*Why:* it's the most distinctive, it reuses everything already built, it fits "engineer"
better than any template look, and every element doubles as information.
*Risk:* overdoing the annotation clutter. Rule: at most one callout cluster per screen.

### B. "Showroom": content-led bento
Rebuild Home and Projects as an asymmetric bento where tiles **are** the work: autoplaying
muted video loops of each demo, a big-number metric tile ("40%+ faster test suite"), a
now-playing album tile from Creative, and a live "currently building" tile.
*Why:* the fastest way to make it feel full and alive, using assets that already exist.
*Risk:* bento is common in 2026 and could read as a template if it isn't paired with A's
detailing.

### C. "Material and light"
Keep the layouts, change the surfaces: global grain (about 3.5%), a warm radial glow that
follows scroll position, real depth (inner highlights, hairline gradients on borders), a
duotone treatment for the headshot and photos, and a larger type scale for section
heads.
*Why:* the cheapest change, and it removes the "flat grey boxes" feel immediately.
*Risk:* on its own it's polish, not identity, so it works best as a layer on A or B.

**Recommendation: A as the identity, plus C's texture and light as the finish, plus B's
video tiles on Home only.** That fixes "plain" structurally (A) and visually (C) and shows the
work (B) without turning the site into a template.

---

## 4. Concrete ideas, per page (under the recommended combination)

**Global**
- Grain overlay (SVG noise, about 3.5%) and one soft warm glow per page.
- Title-block footer, with a sheet number per route.
- Cursor crosshair plus a coordinate readout (desktop only, off under reduced motion).
- Accent rule: amber means interactive or live. Cool grey or blueprint cyan for labels and
  dates.
- Section dividers become drawn dimension lines that animate in.

**Home**
- Keep the hero, and make the ghost "00" a drafted outline (stroke-only) that draws in.
- Replace the Skills panels with a **spec table** (mono, ruled rows: `LANGUAGES · TS / PY /
  C++ …`, `INFRA · SUPABASE / VERCEL / AWS`), compact and denser, which reads like a parts
  list.
- **Featured work as large rows, not a 3-card grid:** each project gets a wide row with
  an autoplaying muted video loop, the title at display scale, one big metric, and 2–3 leader
  callouts. Alternate left and right alignment.
- A "Now" strip: currently building (SpeakEasy), listening (from creative.json), and term
  (F26 · EECS 484).

**Projects**
- The grid stays as the index. Clicking a card opens a **case-study sheet**
  (`/projects/[slug]`): problem, my role, architecture diagram (each repo README already has
  a mermaid diagram to redraw in the blueprint style), key tradeoffs, results, and video.
  This is the biggest substance upgrade for recruiters, and it's good for SEO.

**About**
- Experience and Leadership as a **dimensioned timeline** (one horizontal axis, 2021 → 2026,
  roles as labeled spans) instead of 6 stacked boxes.
- Big-number callouts pulled from the copy: `40%+`, `1000+`, `80 / 2,000+`, `3.90`.
- Headshot: duotone or warm-graded to match the palette, with a leader callout.
- Coursework as a drafting "parts list" table.

**Creative**
- Photos already have specimen metadata. Lean in with a **contact-sheet strip** (film
  frame numbers, sprocket edge) under the carousel, still in the blueprint language.
- Music: one large "now playing" with album art, and the rest as a ruled tracklist instead
  of 8 tall cards. That also fixes the very long mobile scroll.

**Contact**
- Replace the three-card grid with a single **"work order" form** styled as a drafting
  form (ruled fields, field numbers, a stamped "SENT" state). This pairs with the Phase 6
  form-states work.

---

## 5. Suggested next step

Mock it up before building. I'd sketch **2 throwaway HTML mockups of the Home page**: one
in the recommended combination and one as a pure bento (B) for contrast. You pick from
real visuals, then the plan gets a "Phase 3.5: visual identity pass" ahead of Phase 4.

---

## Sources
- [Elementor: best web developer portfolio examples](https://elementor.com/blog/best-web-developer-portfolio-examples/)
- [DevPlaybook: best developer portfolio examples](https://devplaybook.cc/blog/best-developer-portfolio-examples-2025)
- [Codrops: Edoardo Lunardi, where engineering meets craft](https://tympanus.net/codrops/2026/04/02/where-engineering-meets-craft-edoardo-lunardis-obsession-with-the-details/)
- [Awwwards: developer inspiration](https://www.awwwards.com/inspiration_search/developer/)
- [Tech Blueprint design kit](https://cdn.jsdelivr.net/npm/@wrongstack/core@0.295.1/design-kits/tech-blueprint/KIT.md)
- [Kombai: Meridian Blueprint](https://kombai.com/gallery/inspirations/meridian-blueprint/)
- [Kombai: Cobalt Blueprint](https://kombai.com/gallery/inspirations/cobalt-blueprint/)
- [Kittl: blueprint graphic design trend](https://www.kittl.com/blogs/blueprint-graphic-design-trend-stl/)
- [Modern website design 2026 trends](https://spoko-space.pages.dev/blog/modern-website-design-trends/)
- [SuperDesign: Swapnil's bold portfolio](https://superdesign.dev/library/swapnils-bold-portfolio)
- [Case study redesign example](https://jabawack.github.io/blog/donation-mentoring-case-study)
