# Plan: Visual Identity Pass ("The Drawing")

2026-11-10. Approved direction: **A · The drawing** as the identity, **C · material and light**
as the finish, and **B's playing video tiles** for the work on Home and Projects. Reference
mockup: https://claude.ai/artifact/THsyHz4wf2wrZCEJn3yTBE (view A). Research:
`.planning/DESIGN-RESEARCH-2026-11.md`.

This plan **replaces old Phases 4 and 6** of `PLAN-2026-11-content-refresh.md` and absorbs
their content work (skills, About refresh, contact form states). Old Phase 4.3 (résumé),
Phase 5 (SEO) and Phase 7 (hygiene) still run after it; see "Order" at the end.

Implementation status is tracked in the Status section below.

## Status (updated 2026-11-11)

| Phase | State | Where |
|---|---|---|
| V0 Foundations | Built, verified, **awaiting your review** | branch `feat/v0-v1-drawing` (commit 2750d02) |
| V1 Home | Built, verified, **awaiting your review** | same branch (commit da07ffc) |
| V2 Projects to V6 sweep | Not started | |

**Next action for you:** open the Vercel preview for `feat/v0-v1-drawing`, look at Home at
desktop and phone width, then say "merge" or list changes. V0 restyles the shell on every
page, so About / Projects / Creative / Contact keep their old insides until V2 to V5.

**Notes from the build:**
- Résumé link is wired but hidden: set `RESUME_URL` in `src/app/components/navbar.tsx` once the PDF is in `/public`.
- Loop clips live in `public/videos/loops/`. Cut them away from scene fades (check frame brightness at both ends) or they flash dark on every repeat.
- Callout coordinates are percentages in `projects.json`; keep balloons clear of the bottom-left "Watch demo" button.
- `npm run lint:copy` blocks em dashes and warns on stock phrases.

---

## 0. The rules every page follows

These are the contract. Each phase below ends with a check against this list.

### 0.1 The metaphor
The site is a **drawing set**. Every route is a numbered **sheet**:

| Sheet | Route | Title |
|---|---|---|
| 00 | `/` | Home |
| 01 | `/about` | About |
| 02 | `/projects` | Projects |
| 03 | `/creative` | Creative |
| 04 | `/contact` | Contact |
| ×× | 404 | Sheet not found |

Every sheet has the same four fixed parts:
1. **Header bar:** wordmark, numbered links (`00 Home … 04 Contact`), and a Résumé link.
2. **Sheet hero:** sheet label, H1, one dimension line, and a lede.
3. **Lettered sections:** `A`, `B`, `C`, each with a section marker (circled letter), a
   mono tag, an H2 and an optional note. Letters encode real order on that sheet.
4. **Title-block footer:** project, sheet number, drawn, rev, links.

### 0.2 Color roles (accent discipline)
| Token | Value | Use it for | Never for |
|---|---|---|---|
| `ink-0` | `#0b0a09` | page ("paper") | |
| `ink-1` | `#14120f` | figure and table backgrounds | |
| `ink-2` | `#1c1915` | hover and raised states | |
| `line` | `#2b2622` | hairlines, table rules | |
| `line-2` | `#3d3630` | figure borders, sheet edges | |
| `text` | `#ece6dd` | headings, primary copy | |
| `text-2` | `#a59d92` | body copy | |
| `text-3` | `#8f877c` | metadata, captions | body copy |
| `annot` (blueprint cyan) | `#8fb4c6` | labels, sheet and fig numbers, dimension lines, callouts, coordinates, grid | links, buttons |
| `amber` | `#ff7a1a` | **interactive or live only**: links, active nav, buttons, live dots, focus ring, award line | labels, dates, decoration |

All text pairs pass WCAG AA on `ink-0` and `ink-1` (verify in V6). Grey is warm-biased, not pure grey.

### 0.3 Type
No new fonts. Keep the three already loaded:
- **Chakra Petch** (display): H1, H2, project titles, big numbers.
- **Geist** (body): running text, kept near 65 characters wide.
- **Geist Mono** (annotation): every label, tag, fig number and dimension text,
  uppercase with 0.08em tracking.

Scale (desktop / phone):

| Role | Desktop | Phone |
|---|---|---|
| H1 | 118 | 44 |
| H2 | 56 | 32 |
| Project title | 60 | 36 |
| Big number | 44 | 36 |
| Lede | 20 | 17 |
| Body | 16 | 16 |
| Mono label | 12 | 12 |

Headings get `text-wrap: balance`. One outlined word per H1 at most (stroke-only, like
"proud" in the mockup).

### 0.4 Shapes
- **Corners:** zero radius on figures, tables and inputs. The old `rounded-sm` gray panels and
  corner brackets are retired.
- **Surfaces:** no filled gray "cards". Content sits on hairline-ruled rows or inside
  `Figure` frames.
- **Registration marks:** a `+` at the bottom corners of figures replaces corner brackets.

### 0.5 Motion vocabulary
- **Signature move: the stroke draw.** It runs on SVG lines (dimension lines, the outlined
  ghost numeral, callout leaders) as they enter the viewport, at 0.6–1.4s ease-in-out.
- **Keep:** the hero headline line-wipe.
- **Retire:** generic fade+rise on whole sections. Content must be **visible at rest**. Only
  decorative strokes start hidden, never text.
- **Ambient:** live dots pulse, and video loops play while on screen.
- **Desktop only:** the cursor crosshair with coordinates.
- **`prefers-reduced-motion`:** strokes render fully drawn, loops show their poster, there is
  no crosshair, and no pulse.

### 0.6 Texture and light
- **Grid:** drafting paper with a 32px minor grid and a 160px major grid, both tinted `annot`
  at low alpha. This replaces the current flat white 4% grid.
- **Ruler ticks:** down both sheet margins, every 32px (desktop).
- **Grain:** a pre-rendered 160px noise PNG tile at about 4% (a PNG, not a live SVG
  filter, for mobile performance).
- **Glow:** one warm radial glow per sheet. Its position varies per sheet so pages don't
  look stamped.

### 0.7 Copy rules
- **No em dashes anywhere**: copy, JSON or comments. A check script enforces it (V0).
- First person, plain words, sentence case for headings, specific numbers over adjectives.
- **Banned words and patterns:** "passionate", "leverage", "cutting-edge", "seamless",
  "innovative", "journey", and the "not X, but Y" framing.
- **Every claim must trace to a repo README, the résumé or `about` data.** Unconfirmed facts
  are marked `[CONFIRM]` in this plan and must be resolved before that page ships.
- Mono labels are nouns, not sentences ("Fig. 2 · Recruiting OS", not "Here's my project").

---

## Phase V0: Foundations (shared system, about 4 hr)

Nothing visible changes page layouts yet. This phase builds the parts every page uses.

**V0.1 Tokens** (`tailwind.config.js`, `globals.css`)
- Replace the `brand.*` values with the table in 0.2. Keep the `brand-` prefix so existing
  classes keep compiling during the migration.
- Add `annot`, `annot-dim`, `ink-2`, `line-2` and `text-3`.
- Add utilities: `.label` (mono label style), `.hairline`, and the `.reg-marks` corner
  pseudo-elements.

**V0.2 Global layers** (`layout.tsx`)
- `BlueprintGrid`: minor + major grid in `annot`. It stays `position: fixed`, so it shows on
  every sheet.
- `Grain`: a fixed noise layer, `pointer-events: none`.
- `SheetFrame`: margin borders and ruler ticks on desktop, hidden under 760px.
- `Crosshair`: a client component, only under `(hover:hover) and (pointer:fine)` and
  without reduced motion. It shows coordinates in grid units (`X 042 · Y 117`).

**V0.3 Primitives** (`src/app/components/drawing/`)

| Component | Purpose |
|---|---|
| `SheetHero` | sheet label, H1 (optional outlined word), `DimensionLine`, lede |
| `SectionHead` | circled letter, mono tag, H2, optional right-aligned note |
| `DimensionLine` | SVG with end ticks, arrowheads, a centered mono label; draws in on enter |
| `Figure` | frame with `Fig. N · Title` and `Scale 1:1` labels, registration marks, optional `CalloutLayer`, holds an image, a `LoopVideo` or a WIP panel |
| `CalloutLayer` | numbered balloons and leader lines from data (`{n, x, y, bx, by}` in %); leaders draw in |
| `Legend` | numbered list matching the callouts |
| `BigNumber` | ruled row with the display number and a label |
| `SpecTable` | the BOM table (Item / Category / Parts / Qty); scrolls horizontally inside its own wrapper on phones |
| `RuledList` | label/value rows, the replacement for stacked gray panels |
| `LiveDot` | amber pulse |
| `TitleBlock` | footer, takes `sheet` and `title` props |
| `LoopVideo` | muted, `playsInline`, `loop`, `preload="none"`; plays only while in view (IntersectionObserver), pauses off-screen, shows the poster under reduced motion |

Retire, once their last use is gone: `Panel`, `Badge` (tags become `·`-separated mono text),
`CoordinateLabel` (folded into `.label`), `HairlineRule` (replaced by `DimensionLine` or
`.hairline`), and `WaveUnderline` (replaced by the hero dimension line).

**V0.4 Header and footer**
- **Header:** replace the chamfered floating pill with a full-width hairline bar fixed to
  the top (painted under the safe-area inset).
  - Left: the `ES` wordmark and `Sheet 0N` in `annot`.
  - Right: `00 Home` through `04 Contact` in mono, with a 2px amber underline on the active
    sheet, then `Résumé ↗` styled as an outlined amber button. Until the PDF exists it links
    to the Contact sheet.
  - Phones keep the Disclosure menu, restyled as a ruled list.
- **Footer:** `TitleBlock`. Copy is in section 7.

**V0.5 Copy check**
- Add `scripts/check-copy.mjs`, run as `npm run lint:copy`. It fails on `—` in `src/**` and
  `README.md`, and warns on the banned-words list. Wire it into `npm run lint`.
- Clean the existing em dashes in comments in `navbar.tsx`, `PhotoCarousel.tsx`,
  `motion-utils.ts` and `page.tsx`, so the check passes.

**V0.6 Loop clips** (`public/videos/loops/`)
- Use `ffmpeg` to cut a 6–8s silent clip from each demo video, at 960px wide, H.264 + WebM,
  aiming for 400 KB or less each. The full videos with sound stay for the "Watch demo" modal.
- For each clip, pick the most "working app" stretch: Recruiting OS inbox, Shishi discover
  map, kitCreator pads, OpenRestore sunrise, Outpost feed, Course Signal chart.

**Exit:** every primitive renders in a scratch route (deleted before merge), `lint:copy`
passes, and the build is clean.

---

## Phase V1: Home, Sheet 00 (about 4 hr)

Layout follows mockup A, with live video in the figures.

| Order | Block | Content |
|---|---|---|
| hero | `SheetHero` | ghost outlined `00` (stroke draw), H1, dimension line, lede |
| strip | `NowStrip` | Building / Listening / Term, from `src/content/now.json` |
| A | Featured work | 3 alternating rows: `Figure` with `LoopVideo` (or WIP) + callouts, then the info column with meta, title, summary, `BigNumber`, `Legend`, links |
| B | What I build with | `SpecTable` from `src/content/skills.json` |
| foot | `TitleBlock` | sheet 00 |

**Data changes** in `projects.json`, typed in `types/project.ts`:
- `metric: { value: string, label: string }`
- `callouts: [{ n, x, y, bx, by, text }]`
- `loop: "/videos/loops/<slug>.mp4"`
- `durationLabel: "0:20"` for the Watch-demo chip

Home reads `featured` projects in array order, so SpeakEasy, Recruiting OS and Shishi.

Interaction:
- Clicking the figure or **Watch demo** opens the existing `VideoModal` with sound.
- SpeakEasy shows the WIP panel until its video exists. The panel already exists as
  `videoStatus`; restyle it to the hatched drawing look.
- Below the rows, a `See all 7 projects →` link (amber).

Copy is in section 7 (Home).

**Exit:**
- Matches mockup A at 1440 and 390.
- Loops play only while visible, verified with DevTools network and CPU.
- Under reduced motion: posters only, and strokes drawn.

---

## Phase V2: Projects, Sheet 02 (about 3 hr)

- `SheetHero` with no ghost numeral; the dimension line reads `2025 → 2026 · 7 projects`.
- **Filter:** mono tabs with counts, `All 7 · AI 2 · Mobile 2 · Data 1 · Audio 1 ·
  Hardware 1`, with an amber underline on the active tab and `aria-pressed`. Counts are
  computed from the data.
- **Index:** a 3-column grid of `Figure` cells on hairline rules. There are no filled cards.
  - Each cell: `Fig. N` and the category · year label, the poster, title, one-line summary,
    stack as `·`-separated mono text, and Live / Code / Private links.
  - **Hover (desktop):** the poster crossfades into its `LoopVideo`.
  - **Phone:** a single column with posters only; tapping opens the modal.
- No callouts on the index; those stay on Home and future case studies.

**Exit:** the filter and counts are correct, the keyboard order is title → Live → Code →
Watch, and phone layout has no horizontal scroll.

---

## Phase V3: About, Sheet 01 (about 4 hr, includes old Phase 4.1–4.2)

**Data:** move `experiences`, `leadership`, `education` and `coursework` out of
`about/page.tsx` into `src/content/about.json`. Skills come from the shared
`skills.json`.

| Order | Block | Content |
|---|---|---|
| hero | `SheetHero` + `Figure` | H1, lede, and the headshot as `Fig. 1 · E. Saba`, **color-graded warm** (pre-processed with ffmpeg, not a CSS filter) so the studio blue no longer clashes; one callout: `1 · Ann Arbor ↔ Los Angeles` |
| A | Numbers | 4 `BigNumber` cells: 40%+, 1,000+, 80 / 2,000+, 2 |
| B | Record | a **dimensioned timeline**: one horizontal axis from 2021 to 2026 with roles as labeled spans (work in amber-outlined spans, leadership in `annot`); below it, a `RuledList` with each role's details. Phones get a vertical axis. |
| C | Education | ruled rows plus a dimension line `Aug 2024 → May 2028` |
| D | Coursework | `SpecTable` with full course names |
| E | Toolkit | the full `SpecTable` (adds Spoken languages and Design rows) |
| foot | `TitleBlock` | sheet 01 |

Copy is in section 7 (About). All `[CONFIRM]` items are answered (see
Decisions), so nothing blocks this phase.

---

## Phase V4: Creative, Sheet 03 (about 3 hr)

| Order | Block | Content |
|---|---|---|
| hero | `SheetHero` | H1, lede, dimension line `2023 → 2024 · 35 mm` |
| A | Photographs | the carousel becomes a **specimen figure**: the photo with exposure data as leader callouts (Cam, Stock, Loc, Date) pointing in from the frame edge, then a **contact-sheet strip** of thumbnails with sprocket edges and frame numbers (`01A`, `02A`…); the active frame is outlined in amber |
| B | On repeat | one large **now playing** row (album art as `Figure`, eq bars `LiveDot`-style, title, artist, a `Spotify ↗` link), then a ruled **tracklist** table (No. / Track / Artist / Genre / Time) for the other 7. This replaces the 8 tall cards and cuts phone scroll length by about 70%. |
| foot | `TitleBlock` | sheet 03 |

`formatShotDate` stays as is. Copy is in section 7 (Creative).

---

## Phase V5: Contact, Sheet 04 (about 3 hr, includes old Phase 6.1)

| Order | Block | Content |
|---|---|---|
| hero | `SheetHero` | H1 and a lede saying what you're looking for (this replaces the three-card grid) |
| A | Channels | a `RuledList`: Email (shown as text with a **Copy** button, mailto as a convenience), LinkedIn ↗, GitHub ↗, Résumé ↗, and "Based in" as plain text, not a link |
| B | Work order | the form as a drafting form: numbered fields `01 Name`, `02 Email`, `03 Subject`, `04 Message`, square inputs on hairlines, amber focus |
| foot | `TitleBlock` | sheet 04 |

**Form states:** `idle | sending | sent | error`.
- The button is disabled while sending.
- The result appears inline in an `aria-live="polite"` region, as a mono stamp:
  `[ SENT · 14:32 ]` or `[ NOT SENT ]` plus the fix.
- No `alert()`. The Formspree endpoint is unchanged.

---

## Phase V6: Consistency sweep (about 3 hr)

- **404, `not-found.tsx`, "Sheet not found":** `SheetHero` with ghost `××`, the line "This
  sheet isn't in the set.", and links to all five sheets.
- **Cross-page checklist** (run on every sheet at 1440, 1024 and 390, and once with reduced
  motion):
  - [ ] Header shows the right sheet number and the active link has the amber underline
  - [ ] Hero has the sheet label, H1, one dimension line and a lede
  - [ ] Sections are lettered in order, and every section uses `SectionHead`
  - [ ] Amber appears only on links, buttons, active nav, live dots, awards and focus
  - [ ] No filled gray cards, no corner brackets, no `rounded-*` on content
  - [ ] Text is visible with JS disabled; only strokes animate in
  - [ ] Title block shows the right sheet
  - [ ] No horizontal scroll at 390px
  - [ ] `npm run lint:copy` passes (no em dashes, no banned words)
  - [ ] Contrast passes (axe or Lighthouse), keyboard order is sane, focus is visible
- **Performance:** run Lighthouse on Home and Projects. Targets are LCP under 2.5s, CLS
  under 0.05, and no loop video downloading before it's near the viewport.

---

## 7. Copy deck (final wording, no em dashes)

`[CONFIRM]` marks facts to verify before shipping.

### Global
- **Header:** `ES` · `Sheet 0N` · `00 Home` `01 About` `02 Projects` `03 Creative` `04 Contact` · `Résumé ↗`
- **Title block:** `Project` Ethan Saba · Portfolio | `Sheet` 0N / 04 · {Title} | `Drawn` E. Saba | `Rev` 2026.11 | `Links` GitHub ↗ · LinkedIn ↗ · Email ↗
- **Under the title block, small:** `© 2026 Ethan Saba. Built with Next.js and Tailwind.`

### Home (Sheet 00)
- **Label:** `Sheet 00 · Home`
- **H1:** Hi. I'm Ethan. This is the work I'm *proud* of.
- **Dimension line:** `CS · University of Michigan · Class of 2028`
- **Lede:** I build tools that hold up when the input is messy: AI pipelines over real inboxes, payments that only trust the webhook, and an alarm clock that refuses to guess.
- **Now strip:**
  - Building: `SpeakEasy · demo video in production`
  - Listening: `New Sky · Rüfüs Du Sol`
  - Term: `Fall 2026 · EECS 484`
- **Section A:** tag `Selected work`, H2 `Featured work`, note `3 of 7 projects. Numbered callouts point at the parts worth asking about.`
- **SpeakEasy**
  - Meta: `AI · 2026` · `MHacks 2026 · 2 prizes`
  - Summary: Rehearse a conversation you've been putting off, on a live video call with a counterpart that reacts, pushes back, and can be interrupted. Built solo at MHacks 2026.
  - Metric: **795** · unit tests, plus Playwright on a real sign-in path
  - Callout 1: Live talking-video counterpart (Tavus over Daily), voiced by ElevenLabs
  - Callout 2: Private notes never reach the model. Its context is built from an allowlist.
- **Recruiting OS**
  - Meta: `AI · 2026`
  - Summary: A recruiting CRM and application tracker that reads my Gmail, keeps every contact and application current, and drafts replies with real open times from my calendar.
  - Metric: **0** · emails sent on your behalf. It only drafts.
  - Callout 1: A Gmail scan classifies recruiting mail and moves applications forward
  - Callout 2: Multi-tenant on Supabase. Every user brings their own AI key.
- **Shishi**
  - Meta: `Mobile · 2026`
  - Summary: A three-sided platform that funds and organizes Shabbat dinners in Tel Aviv: sponsors underwrite, hosts open their homes, attendees find a seat.
  - Metric: **20** · Postgres tables, with row-level security on every one
  - Callout 1: Stripe runs through Edge Functions. Only the webhook can mark a donation paid.
  - Callout 2: One Expo codebase ships to iOS, Android, and web
- **Below the rows:** `See all 7 projects →`
- **Section B:** tag `Bill of materials`, H2 `What I build with`, note `Pulled from shipped projects.`

| Item | Category | Parts |
|---|---|---|
| 01 | Languages | TypeScript · Python · C++ · Java · SQL |
| 02 | Frameworks | React · Next.js · React Native / Expo · FastAPI · Node.js · Tailwind |
| 03 | Data and infra | Postgres · Supabase · Vercel · AWS · SQLite · MQTT |
| 04 | AI | Claude API · LangGraph · MCP · PyTorch · ElevenLabs · Demucs |
| 05 | Quality | Vitest · Playwright · pytest · mypy · CI on every PR |

Check: each part appears in at least one repo or the résumé. (Swift dropped: its only project is off the site.)

### Projects (Sheet 02)
- **Label:** `Sheet 02 · Projects`
- **H1:** Projects
- **Dimension line:** `2025 → 2026 · 7 projects`
- **Lede:** Seven projects from the last two years. Every one has a demo, and all but one have public code.
- **Cell summaries:** reuse the `summary` field from `projects.json`, which was already
  rewritten in Phase 3.

### About (Sheet 01)
- **Label:** `Sheet 01 · About`
- **H1:** About
- **Dimension line:** `Ann Arbor, MI ↔ Los Angeles, CA`
- **Lede:** I'm a junior studying computer science at the University of Michigan, with a minor in real estate. Most of what I build starts as something that annoyed me: a job search I couldn't keep track of, a $170 alarm clock I didn't want to buy, a song I wanted to play as an instrument.
- **Body:** At work I've built internal tools: developer tooling with MCP and LangGraph at Axonius, and report scoring and coverage mapping at Alias Intelligence. Outside of work I consult with startups through TAMID and help run events with the Beverly Hills Mayor's Innovation Circle.
- **Figure:** `Fig. 1 · E. Saba`. Callout 1: `Ann Arbor ↔ Los Angeles`.
- **Section A: Numbers**

| Number | Label |
|---|---|
| 40%+ | faster front-end test suite after the migration I joined at Axonius |
| 1,000+ | people at Beverly Blends, the meetup I helped create |
| 80 / 2,000+ | selected for Birthright Israel Excel |
| 2 | prizes at MHacks 2026 for SpeakEasy |

- **Section B: Record** (tag `Record`, H2 `Experience and leadership`)

  Work:
  - **Software Engineering Intern · Axonius** · Jun 2026 to Aug 2026. Built internal developer tooling with MCP, Claude Skills, and LangGraph that turns low-priority Jira tickets into bug fixes. Helped migrate the front-end test suite, cutting its runtime by more than 40%, and shipped accessible shared front-end components.
  - **Software Engineer · Alias Intelligence** · Oct 2025 to May 2026. Built internal tools for a due-diligence platform: an automated scorer that compares draft and final reports to flag missed findings and errors, and a coverage map that shows gaps in investigative data.

  Leadership:
  - **Consulting Analyst and Associate Project Manager · TAMID at Michigan** · Sep 2025 to present. Advising EIT Hub Israel on European startup benchmarking, pricing, and VC partnerships, and Tailor Brands on reaching college-age founders.
  - **Member · City of Beverly Hills, Mayor's Innovation Circle** · May 2025 to present. Planned citywide events for LA Tech Week and helped create Beverly Blends, a music and coffee meetup that brought 1,000+ young professionals, artists, and founders together with local firms.
  - **Fellow · Birthright Israel Excel** · Summer 2026, alumni since. One of 80 selected from 2,000+ applicants for a summer fellowship whose network includes 15+ unicorn founders. I still go to the community's events.
  - Milken (student government) is removed. No high school anywhere on the site.

- **Section C: Education**
  - **B.S.E. Computer Science · University of Michigan College of Engineering** · Aug 2024 to May 2028 · Real Estate minor · GPA 3.90
- **Section D: Coursework**

| Course | Name |
|---|---|
| EECS 484 | Database Management Systems (in progress, Fall 2026) |
| EECS 445 | Introduction to Machine Learning |
| EECS 376 | Foundations of Computer Science |
| EECS 370 | Introduction to Computer Organization |
| EECS 281 | Data Structures and Algorithms |
| EECS 280 | Programming and Introductory Data Structures |
| EECS 203 | Discrete Mathematics |
| ROB 101 | Computational Linear Algebra |

- **Section E: Toolkit:** the Home BOM plus these rows:
  - 06 Design: Figma · Photoshop · CAD
  - 07 Spoken: English · Farsi · Hebrew

### Creative (Sheet 03)
- **Label:** `Sheet 03 · Creative`
- **H1:** Creative
- **Dimension line:** `35 mm · Canon AE-1`
- **Lede:** Film photos from my Canon AE-1, and the songs I've had on repeat.
- **Section A** (tag `Specimens`, H2 `Photographs`, note `Canon AE-1, mostly Portra 400.`)
  - Callout labels: `Cam` `Stock` `Loc` `Date`
- **Section B** (tag `Now playing`, H2 `On repeat`, note `Mostly melodic house. Each track opens in Spotify.`)
  - Table headers: `No.` `Track` `Artist` `Genre` `Time`
  - Link text: `Spotify ↗`

### Contact (Sheet 04)
- **Label:** `Sheet 04 · Contact`
- **H1:** Contact
- **Dimension line:** `Summer 2027 · SWE and FDE internships`
- **Lede:** I'm looking for a Summer 2027 internship in software engineering or forward deployed engineering. I'm also happy to talk with anyone building in AI, developer tools, or anything involving sound.
- **Section A: Channels** (Email, LinkedIn, GitHub, Résumé, Based in)
  - Email row: `essaba@umich.edu` · `Copy` → `Copied`
- **Section B: Work order** (H2 `Send a message`)
  - Fields: `01 Name`, `02 Email`, `03 Subject`, `04 Message`
  - Placeholders: `Your name`, `you@example.com`, `What's this about?`, `A few lines is plenty.`
  - Button: `Send` → `Sending…`
  - Stamps: `[ SENT · hh:mm ]` with "Thanks. I'll reply from essaba@umich.edu.", or `[ NOT SENT ]` with "Something went wrong on the way out. Try again, or email me directly."

### 404
- **Label:** `Sheet ××`
- **H1:** Sheet not found
- **Lede:** This sheet isn't in the set. Here are the ones that are:
- Then the five sheet links.

---

## 8. Order and branches

| # | Phase | Branch | Effort | Depends on |
|---|---|---|---|---|
| 1 | V0 Foundations | `feat/v0-drawing-system` | ~4 hr | nothing |
| 2 | V1 Home | `feat/v1-home-sheet` | ~4 hr | V0 |
| 3 | V2 Projects | `feat/v2-projects-sheet` | ~3 hr | V0, V1 (`LoopVideo`, project fields) |
| 4 | V3 About | `feat/v3-about-sheet` | ~4 hr | V0 |
| 5 | V4 Creative | `feat/v4-creative-sheet` | ~3 hr | V0 |
| 6 | V5 Contact | `feat/v5-contact-sheet` | ~3 hr | V0 |
| 7 | V6 Consistency sweep + 404 | `feat/v6-sweep` | ~3 hr | V1–V5 |
| 8 | Old 4.3 Résumé | `feat/resume` | ~30 min | your PDF |
| 9 | Old 5 SEO (OG image in the drawing style, per-sheet titles like `About · Sheet 01 · Ethan Saba`) | `feat/seo` | ~1.5 hr | V6 |
| 10 | Old 7 Hygiene and docs | `chore/hygiene` | ~45 min | all |
| opt | V7 Case-study sheets `/projects/[slug]` (problem, my role, architecture redrawn from each README's mermaid diagram, tradeoffs, results) | `feat/case-studies` | ~2 hr each | V2 |

About 25 hours through step 10.

**Each phase:** branch → build → verify (screenshots at 1440 and 390, reduced motion,
`lint:copy`, build) → push for a preview → you review → merge.

**Ship order:** V0 changes the header, footer and tokens on every page at once. So V0 and
V1 ship **together**, and V2–V5 each ship as they're done. Between those merges, pages not
yet redone still look coherent, because V0 restyles the shared shell and tokens.

### Decisions (answered 2026-11-10)
1. Axonius: ended August 2026.
2. Birthright Excel: summer 2026 fellowship, lifelong alumni community; still attends events.
3. No high school anywhere (Milken leadership row and education row removed).
4. Swift dropped from the toolkit.
5. Contact dimension line: `Summer 2027 · SWE and FDE internships` (no reply-time promise).
6. Creative copy rewritten plainer (see section 7). Voice reference for all copy: the
   `esaba12` GitHub profile README (short, specific, a little dry).
