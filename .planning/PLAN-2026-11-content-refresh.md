# Plan: Portfolio Content Refresh (v1.1)

> **Update 2026-11-10 (later):** Phases 4 and 6 are superseded by
> `PLAN-2026-11-visual-identity.md` (the "drawing" identity pass), which absorbs their content
> work. Phase 4.3 (résumé), 5 (SEO) and 7 (hygiene) still apply and run after it.

Source audit: `.planning/AUDIT-2026-11-10.md`. This file turns that audit into ordered,
concrete work. Nothing here has been implemented yet.

**Ground rules**
- One commit per task group (the `1.x`, `2.x` sections below). Push to get a Vercel preview,
  check it, then merge. No phase depends on an unmerged later phase.
- After each phase, run the same **verify loop**: `npx tsc --noEmit`, `npm run build`, then
  Playwright screenshots at 1440×900 and 390×844 of every page touched, scrolling through so
  the GSAP reveals fire. The browser console must be clean.
- Correction to the audit: Real Estate News was removed on purpose in `d104f68`, so it
  stays off.

---

## Phase 0: Decisions needed before starting (5 min)

Each item has a default. Work proceeds on the default unless you say otherwise.

| # | Question | Default |
|---|---|---|
| D1 | Is Axonius still ongoing? | It ended. Show "June 2026 - August 2026". |
| D2 | Which Course Signal demo is canonical: `course-signal-demo` or `uiuc-course-demand-tool`? | `course-signal-demo.vercel.app`, because the repo's own homepage and README use it. Update the profile README to match. |
| D3 | Which email is public? | `essaba@umich.edu` on the site, in both Contact and the footer. |
| D4 | Featured order on Home | SpeakEasy, Recruiting OS, Shishi. All three are live with links. |
| D5 | Add Community Directory as a private card? | No. Outpost already covers "private work". Revisit later. |
| D6 | Résumé | You export a PDF. It goes at `public/Ethan-Saba-Resume.pdf`. **Remove your phone number and home address first**, because the file is public. |

---

## Phase 1: Correctness fixes (about 1 hr). Do first: these are things that are wrong today.

### 1.1 Fix project links (`src/content/projects.json`)
- Recruiting OS `repo`: change to `https://github.com/esaba12/recruiting-tool`.
- Course Signal `repo`: change to `https://github.com/esaba12/course-signal`. Set `demo` to
  the D2 choice.
- Shishi: `links: { demo: "https://shishi-app.vercel.app/", repo: "https://github.com/esaba12/Shishi" }`.
- kitCreator: add `demo: "https://kitcreator-app.vercel.app/"`.
- Verify: `curl -sIL` each URL returns 200 **with no redirect**. Check that
  `url_effective` equals the input.

### 1.2 Fix photo dates and the hydration error (`src/app/components/PhotoCarousel.tsx:174`)
- Cause: `new Date('2023-06-24')` is parsed as UTC midnight, so in US time zones it shows
  6/23. `toLocaleDateString()` also differs between the server and the browser, which
  triggers React #418.
- Fix: add a pure formatter that never builds a `Date`:
  ```ts
  const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  function formatShotDate(iso: string) {
    const [y, m, d] = iso.split('-');
    return `${d} ${MONTHS[Number(m) - 1]} ${y}`;   // "24 JUN 2023": matches the mono annotation style
  }
  ```
  Put it in `src/app/lib/format.ts` so it can be reused.
- Verify: `/creative` shows "24 JUN 2023" for photo 2, and the console has no #418.

### 1.3 Ship the uncommitted photo work
- The working tree already has the recompressed `photo-1..5.webp` (about 1.8 MB down to
  about 300 KB) and the `PhotoCarousel` preload refactor. Review the diff, run the verify
  loop on `/creative` (autoplay, spinner, thumbnails), and commit it together with 1.2.

### 1.4 Use one email (D3)
- `src/app/components/footer.tsx:29`: change the `mailto:` to the D3 address.
  `contact/page.tsx:13` already uses it.

### 1.5 `.gitignore`
- Add `.playwright-mcp/`.

**Phase 1 exit check:** every project link resolves without a redirect, dates are correct,
the console is clean on all 5 pages, and photos are about 300 KB.

---

## Phase 2: Project data model and card UX (about 2-3 hr)

This comes before the new content because Phase 3 uses the new fields.

### 2.1 Extend the project schema (`projects.json`, plus a shared type)
- Move the `Project` interface out of `ProjectsGrid.tsx` into `src/types/project.ts`.
- New fields:
  ```ts
  featured?: boolean;                 // replaces "first 3 in array order"
  visibility?: 'public' | 'private';  // private: no links, shows a PRIVATE label
  category: 'AI' | 'Mobile' | 'Data' | 'Audio' | 'Desktop' | 'Hardware';
  award?: string;                     // e.g. "MHacks 2026 · Best Use of ElevenLabs"
  year: number;                       // used to sort /projects newest first
  links: { demo?: string; repo?: string };
  ```
- `tags` stays, and is used only as the tech-stack badges on each card.

### 2.2 Rework `ProjectsGrid.tsx`
- **Props:** replace `limit` with `featuredOnly?: boolean` and `showFilter?: boolean`.
  Home uses `<ProjectsGrid featuredOnly showFilter={false} />`, and `/projects` uses
  `<ProjectsGrid showFilter />`.
- **Filter:** filter on `category` (about 6 chips) instead of 15 mixed tags. This also fixes
  the bug where the filter was applied before the limit.
- **Remove the whole-card `role="button"`.** The card becomes a plain `<article>`. Inside it:
  - The title is an `<a>` to the primary link (`demo ?? repo`), or plain text if the project
    is private.
  - A footer row of explicit mono links: `LIVE ↗` and `CODE ↗` (each only if it exists),
    or a `PRIVATE · ASK ME` label. This replaces "Click to view project".
  - This removes the nested-interactive a11y problem (a `<button>` inside a
    `role=button`).
- **Play button:** move it from the center of the poster to the bottom-left corner as a mono
  chip (`▶ WATCH`), using the same corner-bracket style as `Panel`. The poster titles
  ("Recruiting OS", "Outpost") stay readable. Clicking the poster area still opens
  `VideoModal`.
- **Award ribbon:** if `award` is set, show a small accent `CoordinateLabel` across the top
  edge of the card.
- Swap `text-gray-300` and `bg-gray-800` for `text-brand-text-secondary` and
  `bg-brand-surface`.
- **Sort:** featured first, then by `year`, newest first.

### 2.3 Update existing entries with the new fields
- Shishi (Mobile, 2026), Outpost (Mobile, private, 2026), Recruiting OS (AI, 2026), Course
  Signal (Data, 2026), kitCreator (Audio, 2026).

**Exit check:** Home shows exactly the featured cards with no filter row. `/projects`
filters by category. Tab order is title link, LIVE, CODE, WATCH, and Enter works on each.
Nothing overlaps the poster titles at either screen width.

---

## Phase 3: New projects and copy refresh (about 3-4 hr, mostly video)

> **Update 2026-11-10:** Lecture Lock dropped (user decision). SpeakEasy ships with a
> "work in progress" media panel (`videoStatus: "in-progress"`) until the user supplies a
> recording. OpenRestore video made with /brag from the real app on mock drivers.

### 3.1 Demo videos and posters for the new projects
- Use the same approach as the existing ones (`d104f68` used "brag" videos). Run `/brag` in
  each repo, export `public/videos/<slug>.mp4` at 2 MB or less, and grab a poster with
  `ffmpeg -ss 1 -i <slug>.mp4 -frames:v 1 -q:v 3 <slug>-poster.jpg`.
  - **SpeakEasy** (`conversaton-practice`): show the setup, the live call and the recap.
    The repo has no `docs/media` yet, so also commit a GIF there for its README.
  - **OpenRestore:** build the video around `tools/sunrise-visualizer.html` scrubbing a
    curve, plus the web UI.
  - **Lecture Lock:** a screen recording of LOCK IN, Cmd-Tab bouncing back, the timer and
    the emergency phrase. `/brag` reads code, so this one may need a real screen capture
    (QuickTime) instead.

### 3.2 Add the entries to `projects.json` (no em dashes)
- **SpeakEasy:** featured, category AI, `award: "MHacks 2026 · ElevenLabs + .Tech prizes"`,
  demo `https://speakeasyapp.tech`, repo link. Tags: Next.js, Tavus, ElevenLabs,
  Supabase, Playwright. Highlights: a live talking-video counterpart that can be
  interrupted; private notes kept out of the model's context by an allowlist; about 795
  unit tests plus Playwright, with CI checking that no secrets reach the client bundle.
- **OpenRestore:** category Hardware. Lead with the hook: "Replaces a $170 Hatch Restore +
  $60/yr subscription for about $65 in parts." Highlights: LAN-only REST/WS/MQTT; defined
  behavior for DST changes, restarts and an unreachable bulb; mock drivers so the whole
  system runs and is tested without hardware; `mypy --strict`.
- **Lecture Lock:** category Desktop, links to the repo plus the latest release
  (`/releases/latest`). Tags: Swift, AppleScript, macOS. Highlights: tab-level browser
  pinning, multiple unlock conditions (timer, video end, course completion), an emergency
  phrase that can't be pasted.

### 3.3 Rewrite the stale entries (source: each repo's README)
- **Shishi:** "Three-sided platform that funds and organizes Shabbat dinners in Tel Aviv:
  sponsors underwrite, hosts open their homes, attendees find a seat." Highlights: Stripe
  through Edge Functions with webhook-only payment confirmation; 20 Postgres tables, RLS on
  every one; one Expo codebase for iOS, Android and web, with a no-account `/demo`. Tags:
  Expo, TypeScript, Supabase, Stripe.
- **Recruiting OS:** multi-tenant and Supabase-backed with bring-your-own-key AI. Highlights:
  a Gmail scan that keeps contacts and applications current; reply drafts that offer real
  open times from your calendar; a job-board aggregator with AI fit analysis. Tags: React,
  Supabase, Claude, Gmail API. Drop `Notion API`.
- **Outpost:** match the profile README (React Native + Expo, 31-table Postgres with RLS,
  CI). Set `visibility: private`.
- **Course Signal:** add "Built for OpenAI build week". Highlight the config-only adapter.

### 3.4 Clean up the other repos (GitHub, not this repo)
- Add a description and topics to `lecture-lock` and `conversaton-practice`. Consider
  renaming the latter to `speakeasy`, since GitHub keeps redirects. If you rename it,
  update the link in 3.2.
- Profile README (`esaba12/esaba12`): add SpeakEasy and Lecture Lock, and fix the Course
  Signal link to the D2 choice.

**Exit check:** 8 cards on `/projects` and 3 featured on Home. Every video plays in the
modal at both widths. `grep -c '—' src/content/projects.json` returns 0.

---

## Phase 4: Home, About and Contact content (about 2 hr)

### 4.1 One shared skills source
- Create `src/content/skills.json`, which both Home (`page.tsx:166-194`) and About
  (`about/page.tsx:13-18, 88-93`) currently duplicate. Suggested groups:
  - **Languages:** TypeScript, Python, C++, Java, Swift, SQL
  - **Frameworks:** React, Next.js, React Native/Expo, FastAPI, Node.js, Tailwind
  - **Data & Infra:** Postgres, Supabase, AWS, Vercel, MongoDB
  - **AI:** Claude/Anthropic API, LangGraph, MCP, PyTorch
  - **Testing:** Vitest, Playwright, pytest
- Home shows the first two groups in the existing two offset panels, or all groups if the
  panels hold up visually. About shows all groups plus spoken languages and design tools.
  Remove the mislabeled "Tools & Hardware" panel.

### 4.2 About page
- Move `experiences`, `leadership` and `education` into `src/content/about.json`, so content
  lives in JSON as the README says it does.
- Change the Axonius dates per D1. Confirm the Birthright Excel dates.
- Add a **Recognition** section (new `[ RECOGNITION ]` block) between Experience and
  Leadership: MHacks 2026 (ElevenLabs prize, .Tech prize) and Birthright Excel (80 chosen
  from 2,000+). Ask whether there are others.
- Move Milken Student Government to the bottom of Leadership, or drop it.
- Coursework: mark EECS 484 as `IN PROGRESS · F26` with a muted label.
- Remove the 2 em dashes from the bio (`about/page.tsx:127,151`).

### 4.3 Résumé (D6)
- Add `public/Ethan-Saba-Resume.pdf`.
- Link to it in three places: a nav item (`RÉSUMÉ ↗`, styled as an outline accent so it
  stands apart from the page links, opens in a new tab), a button in the About hero, and a
  card in Contact's "Get in Touch" list.
- Verify: the file returns 200 and its size is under 300 KB.

### 4.4 Home hero and Contact copy
- Hero subline (`page.tsx:151`): tighten it to something like "Junior in CS at Michigan.
  I build tools that hold up when the input is messy." Keep real estate out of the headline
  framing. Final wording is yours to approve.
- Contact "Looking for" A: "Summer 2027 software engineering and forward deployed
  engineering internships".
- Contact "Location": render it as a `<div>`, not `<a href="#">`.

**Exit check:** the skill lists match on both pages and come from one file. The résumé
opens from the nav on mobile too (check the Disclosure menu).

---

## Phase 5: SEO and sharing (about 1.5 hr)

### 5.1 Logo and favicon
- Pull the embedded 1024px PNG out of `public/logo.svg` (base64 decode), then use `sips` to
  produce `public/logo.png` (96px, for 2× of the 48px display). Add the file-convention
  icons `src/app/icon.png` (512) and `src/app/apple-icon.png` (180).
- Remove the `icons` block from `layout.tsx`. Point the nav and footer `<img>` at
  `/logo.png`, or `next/image` with explicit width and height.
- If you have the original vector logo, use a real SVG instead.
- Verify: the logo is under 15 KB, and the favicon shows in the browser tab.

### 5.2 Open Graph image
- Add `src/app/opengraph-image.tsx` (`next/og` `ImageResponse`, 1200×630): a charcoal
  background, the blueprint grid, "Ethan Saba" in Chakra Petch Bold, a mono line "CS @
  MICHIGAN · SWE / FDE", and an amber hairline. Commit the font file to
  `src/app/fonts/ChakraPetch-Bold.ttf` and read it with `fs` (no network at build time).
- Copy it to `twitter-image.tsx`, or re-export it from there.
- Remove the `/logo.svg` `images` entries from `openGraph` and `twitter` in `layout.tsx`.
- Verify: `/opengraph-image` renders a PNG. Paste the preview URL into LinkedIn Post
  Inspector and opengraph.xyz.

### 5.3 Per-page titles and metadata
- Root `layout.tsx`: set `metadataBase: new URL('https://www.ethansaba.com')` and
  `title: { default: 'Ethan Saba', template: '%s · Ethan Saba' }`. Rewrite the description
  without the real-estate lead. Add `alternates: { canonical: './' }`.
- `projects/page.tsx` and `creative/page.tsx` are server components, so `export const
  metadata` goes directly in them.
- `about` and `contact` are `'use client'`, so add `about/layout.tsx` and
  `contact/layout.tsx` that export only `metadata` and pass `children` through.

### 5.4 Crawling and analytics
- Add `src/app/robots.ts` (allow all, with the sitemap URL) and `src/app/sitemap.ts`
  (5 routes).
- `npm i @vercel/analytics @vercel/speed-insights`, then add `<Analytics />` and
  `<SpeedInsights />` to the root layout. Enable them in the Vercel project dashboard.

**Exit check:** each route has its own `<title>`. `/robots.txt` and `/sitemap.xml` return
200. A link preview with an image shows in iMessage or Slack.

---

## Phase 6: UX polish (about 1.5 hr)

### 6.1 Contact form (`contact/page.tsx`)
- Replace `alert()` with `status: 'idle' | 'sending' | 'sent' | 'error'`. Disable the button
  and show `SENDING…` while sending. Show an inline result in an `aria-live="polite"` region,
  using a mono `[ SENT ]` / `[ ERROR ]` label in the blueprint style. Keep the Formspree
  endpoint unchanged.

### 6.2 Footer alignment (`footer.tsx:44-45`)
- Replace `container mx-auto … max-w-6xl` with the page gutters
  `px-6 sm:px-12 lg:px-20 xl:px-28`, so the logo and links line up with the content above.
  Change the footer links to `font-mono uppercase`, matching the nav.

### 6.3 Optional: reveal fallback
- The GSAP `from({opacity:0})` reveals hide content from full-page screenshots and
  JS-disabled visitors. If you want this fixed: add `<html class="no-js">`, have an inline
  script swap it to `js`, and only run the reveals under `.js`. This is low priority now
  that the Open Graph image comes from 5.2 rather than a page screenshot. Skip it unless
  it's cheap.

**Exit check:** submitting the form shows inline states, and a double click sends only one
message. The footer's left edge lines up with the section headings at 1440px.

---

## Phase 7: Repo hygiene and docs (about 45 min)

### 7.1 Delete unused files (grep each one first to confirm nothing references it)
- `src/app/test-tailwind.tsx`, `public/project1.jpg`, `project2.jpg`, `project3.jpg`,
  `public/next.svg`, `vercel.svg`, `globe.svg`, `window.svg`, `file.svg`,
  `public/patterns/`, `src/app/decor/stripes.svg`, and `public/logo.svg` and `favicon.svg`
  once 5.1 is done.
- Check whether `src/types/creative.ts` (the unused `Mix`, `Design` and `Writing` types)
  should be trimmed down to `PhotoItem`.

### 7.2 Tooling
- Align `eslint-config-next` with the installed `next` version. Replace `"lint": "next
  lint"` with `"lint": "eslint ."`, because `next lint` is deprecated. (A Next 16 upgrade
  is a separate, optional task. Don't bundle it in here.)
- Optional: add `scripts/check-links.mjs`, which reads `projects.json`, checks that every
  link returns 200 with no redirect, and fails otherwise. Run it before deploys so links
  can't quietly rot again.

### 7.3 Docs
- `README.md`: remove "writing". Add GSAP/ScrollTrigger and Lenis to the stack. Add
  `public/videos/`, `VideoModal` and the `src/content/*.json` files to the structure table,
  and add a short section on how to add a project (fields, video, poster).
- `.planning/`: mark milestone v1.0 (the visual overhaul) complete in `ROADMAP.md`, with all
  5 phases done. Reset `STATE.md` to this v1.1 plan. In `PROJECT.md`, remove Nest, move
  "content rewrites" out of Out of Scope, and mark the Key Decisions as approved. Close the
  resolved `.jpg` tsc item in `deferred-items.md`.

**Exit check:** `npm run lint`, `tsc` and `build` are all clean, and `git status` is clean.

---

## Order at a glance

| Order | Phase | Effort | Why this position |
|---|---|---|---|
| 0 | Decisions | 5 min | Unblocks the data in phases 1, 3 and 4 |
| 1 | Correctness fixes | about 1 hr | Things that are wrong on the live site today |
| 2 | Data model and card UX | 2-3 hr | Phase 3 needs the new fields and the link layout |
| 3 | New projects and copy | 3-4 hr | The biggest gap compared with GitHub. Videos take the longest |
| 4 | Home, About, Contact | about 2 hr | Résumé, skills, recognition |
| 5 | SEO and sharing | about 1.5 hr | Wait until the content is final so previews and descriptions are accurate |
| 6 | UX polish | about 1.5 hr | Not blocking anything |
| 7 | Hygiene and docs | about 45 min | Last, so the docs describe the finished state |

Total: about 12-14 hours. Phases 1 and 5.1/5.2 can ship on their own if you want quick
wins first. Phase 4.3 (résumé) can move forward as soon as the PDF exists.
