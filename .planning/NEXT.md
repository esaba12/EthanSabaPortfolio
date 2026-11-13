# Portfolio execution plan

Updated 2026-11-13. Follow the approved visual identity plan for detailed layout and copy.

## Projects (V2): implemented, browser review pending

- [x] Create `feat/v2-projects-sheet` from local main; preserve existing demo-recorder work.
- [x] Reuse SheetHero, SectionHead and Figure for Sheet 02.
- [x] Compute filter counts from content; preserve figure numbers when filtering.
- [x] Replace filled cards with ruled figure cells and plain stack labels.
- [x] Keep explicit Live / Code / Watch links and private-code status.
- [x] Load silent loops only on desktop hover; retain posters on touch and reduced motion.
- [x] Correct stale date/demo claims and add Projects metadata.
- [x] Production build, type/lint checks via build, copy check, whitespace check.
- [ ] Browser review: 1440, 1024 and 390px; filter each category; open/close demos;
      keyboard order; reduced motion; no horizontal overflow. Browser runtime currently
      reports no available browsers, so these checks remain unverified.
- [ ] Push preview, review and merge after browser verification.

## About (V3): implemented, browser review pending

- [x] Move biography, roles, metrics, education and coursework to `src/content/about.json`.
- [x] Apply approved dates and copy; remove high-school entries.
- [x] Build Sheet 01 with portrait figure, results, record, education, coursework and toolkit.
- [x] Add a linked desktop timeline and vertical phone timeline, covering retained roles
      in 2025–2026. Current roles extend through the explicit November 2026 snapshot.
- [x] Share toolkit data with Home; render page content on the server.
- [x] Add About metadata; production build and copy checks pass.
- [ ] Warm portrait treatment: original portrait retained for now.
- [ ] Desktop/phone/reduced-motion visual and keyboard review. Browser discovery still
      returns no available browsers on November 12.

V2 and V3 are tracked on `feat/v2-projects-sheet`.
Neither page has been merged; deployment and browser review remain unverified.

## Creative (V4): implemented, browser review pending

- [x] Apply Sheet 03 hero and lettered sections with approved plain copy.
- [x] Frame photos with metadata leaders, sprocket-edge thumbnails and frame numbers.
- [x] Provide previous/next, thumbnail selection, arrow-key navigation and selection announcements.
- [x] Keep photos stationary until selected; remove autoplay and slide animations.
- [x] Preserve all five photo records and formatShotDate; add an image-load error state.
- [x] Replace music cards with a featured album figure and seven compact track rows.
- [x] Preserve all eight Spotify destinations and music records; check every image exists.
- [x] Build, copy, whitespace and generated-HTML checks pass.
- [ ] Browser review: narrow/wide layouts, photo controls, focus, reduced motion and Spotify links.
      Browser discovery still returns no available browsers.

V4 joins V2/V3 in the current working branch. No deployment yet.
The featured music section is labeled On repeat, with no simulated playback indicator.

## Contact (V5): implemented, browser review pending

- [x] Sheet 04 hero with internship focus, ruled channel rows and numbered form fields.
- [x] Copy-email control with accessible success and manual-copy failure feedback.
- [x] Retain Formspree endpoint and contact links; location is plain text.
- [x] Inline idle/sending/sent/error states; prevent duplicate submits and preserve drafts
      on failure. Abort requests after 20 seconds and handle rate limiting.
- [x] Add Contact metadata; keep resume link absent until the PDF is available.
- [x] Build, copy, whitespace and generated-HTML checks pass.
- [x] `node scripts/check-contact.mjs`: seven mocked cases pass (success, validation
      rejection, server failure, rate limit, network failure, timeout, blank input).
- [ ] Browser checks: mobile layout, keyboard focus, clipboard success/denial, duplicate
      submission, draft preservation and inline feedback. No browser is available.
- [ ] Real form delivery is unverified; tests made no external submissions.

## Next implementation passes

1. **V6 sweep:** drawing-style 404, cross-page mobile/keyboard/reduced-motion checks,
   contrast and performance checks. Audit the existing video modal focus handling.
2. **Release cleanup:** resume PDF/link once supplied, share image and per-page metadata,
   metadataBase/crawling, tooling and README cleanup. The build currently warns about
   metadataBase and an old Browserslist database; resolve in this pass.

Each page gets a build and copy check, followed by browser review before preview/merge.
Do not treat unavailable browser checks as passing.

## Separate media task

Finish the real SpeakEasy demo recording, then add its portfolio cut, silent loop and
poster. Existing uncommitted tools/speakeasy-demo and .gitignore edits belong to this
work; keep them out of the Projects change. Do not claim its video exists yet.

## Inputs still needed

- Final resume PDF before enabling the resume link.
- A successful real SpeakEasy recording before replacing its demo-in-production figure.
