# Deferred Items — Phase 01

Items discovered during execution that are out of scope for the current plan (pre-existing,
unrelated to files this plan touches) and were NOT auto-fixed per the executor's scope
boundary rule.

## 01-01: Pre-existing tsc error in src/app/about/page.tsx

- **Found during:** Task 2 verification (`npx tsc --noEmit`)
- **Error:** `src/app/about/page.tsx(4,30): error TS2307: Cannot find module
  '../../../public/Saba_Ethan_Photo.jpg' or its corresponding type declarations.`
- **Confirmed pre-existing:** Reproduced identically on the pre-plan baseline commit
  (748bc29, before any 01-01 changes) via `git stash` / `npx tsc --noEmit` / `git stash pop`.
  The image file exists at `public/Saba_Ethan_Photo.jpg`; the issue is a missing/incorrect
  TypeScript module declaration for `.jpg` imports (likely a `next-env.d.ts` or
  `*.d.ts` image-module ambient declaration gap), unrelated to `src/app/about/page.tsx`
  itself.
- **Scope:** `src/app/about/page.tsx` is not in this plan's `files_modified` list. Out of
  scope per the deviation-rules scope boundary — not fixed.
- **Status:** Deferred. Does not block Phase 01 Plan 01-01 tasks — `npx tsc --noEmit` shows
  zero errors introduced by this plan's changes (tailwind.config.js, globals.css,
  package.json, and the four new components + motion-utils/SmoothScrollProvider all compile
  clean; the sole remaining error is the pre-existing one above).
