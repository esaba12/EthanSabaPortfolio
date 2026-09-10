# ethansaba.com

My personal site — engineering projects, writing, and a creative section for photography
and music.

**[www.ethansaba.com](https://www.ethansaba.com)**

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion, deployed on
Vercel.

The design is a blueprint/technical-drawing motif: a plotted grid, coordinate labels,
hairline rules, and hand-drawn wave underlines, with motion used for entrance staggering
and scroll rather than decoration.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
```

## Structure

| Path | What's there |
|---|---|
| `src/app/` | App Router pages — home, about, projects, creative, contact |
| `src/app/components/` | Layout and motif components (`BlueprintGrid`, `CoordinateLabel`, `WaveUnderline`, `PhotoCarousel`) |
| `src/app/lib/motion-utils.ts` | Shared Framer Motion variants, so timing stays consistent across pages |
| `src/content/` | Page content as JSON, kept out of the components |
| `public/creative/` | Photography |
