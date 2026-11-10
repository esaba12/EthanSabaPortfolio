export const PROJECT_CATEGORIES = ['AI', 'Mobile', 'Data', 'Audio', 'Desktop', 'Hardware'] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

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
  links: {
    demo?: string;
    repo?: string;
  };
  highlights: string[];
}
