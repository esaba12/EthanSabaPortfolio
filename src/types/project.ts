export const PROJECT_CATEGORIES = ['AI', 'Mobile', 'Data', 'Audio', 'Desktop', 'Hardware'] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export interface Callout {
  text: string;
  x?: number;
  y?: number;
  bx?: number;
  by?: number;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  /** Tech-stack badges shown on the card. Filtering uses `category`, not tags. */
  tags: string[];
  category: ProjectCategory;
  year: number;
  /** Shown on the home page. Featured projects keep their array order. */
  featured?: boolean;
  /** Private projects render a "Private" label instead of links. */
  visibility?: 'public' | 'private';
  /** Short award line, e.g. "MHacks 2026 · ElevenLabs prize". */
  award?: string;
  cover?: string;
  video?: string;
  videoPoster?: string;
  /** Set while a demo video is being made; the card shows a work-in-progress panel. */
  videoStatus?: 'in-progress';
  /** Silent 5-8s clip that plays while the figure is on screen. */
  loop?: string;
  /** First frame of `loop`, shown before it plays and under reduced motion. */
  loopPoster?: string;
  /** Length of the full demo video, shown on the Watch demo chip, e.g. "0:20". */
  durationLabel?: string;
  /** Home page row copy (falls back to `summary`). */
  pitch?: string;
  /** The one number the Home row leads with. */
  metric?: { value: string; label: string };
  /**
   * Numbered annotations. `x`/`y` is the point on the figure and `bx`/`by` the
   * balloon, both as percentages of the figure. Without coordinates a callout
   * still appears in the legend, just not on the figure.
   */
  callouts?: Callout[];
  links: {
    demo?: string;
    repo?: string;
  };
  highlights: string[];
}
