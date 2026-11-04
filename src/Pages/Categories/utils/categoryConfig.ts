export type CatKey = "women" | "men" | "kids";

export interface CategoryConfig {
  key: CatKey;
  /** Used for the route + the giant ghost word in the hero. */
  title: string;
  eyebrow: string;
  heading: string[];
  description: string;
  /** Preferred product ids for hero imagery (falls back to any product with an image). */
  heroPicks: number[];
  featuredTitle: [string, string];
  featuredText: string;
  highlightsTitle: [string, string];
}

export const CATEGORY_CONFIG: Record<CatKey, CategoryConfig> = {
  women: {
    key: "women",
    title: "Women",
    eyebrow: "The Women’s Edit",
    heading: ["Women"],
    description:
      "From evening dresses to fine jewellery — an editorial edit of pieces chosen to be worn, kept and loved.",
    heroPicks: [5, 603, 701],
    featuredTitle: ["The pieces", "everyone wants."],
    featuredText: "Our most-loved women’s pieces right now.",
    highlightsTitle: ["Shop by", "category."],
  },
  men: {
    key: "men",
    title: "Men",
    eyebrow: "The Men’s Edit",
    heading: ["Men"],
    description:
      "Structured essentials and sharp finishing touches — considered menswear with a confident, understated edge.",
    heroPicks: [403, 1, 402],
    featuredTitle: ["Built to", "stand out."],
    featuredText: "The men’s pieces getting the most attention.",
    highlightsTitle: ["Shop by", "category."],
  },
  kids: {
    key: "kids",
    title: "Kids",
    eyebrow: "The Little Ones’ Edit",
    heading: ["Kids"],
    description:
      "Soft, bright and made for play — comfortable pieces and joyful finds for little ones.",
    heroPicks: [802, 804, 305],
    featuredTitle: ["Small things,", "big smiles."],
    featuredText: "Favourites from the kids’ collection.",
    highlightsTitle: ["Shop by", "category."],
  },
};

/** Unknown gender params keep the old behaviour (an empty "Collection"), themed like Women. */
export function getCategoryConfig(gender?: string): { cfg: CategoryConfig; known: boolean } {
  const known = gender === "women" || gender === "men" || gender === "kids";
  if (known) return { cfg: CATEGORY_CONFIG[gender as CatKey], known };
  return {
    cfg: { ...CATEGORY_CONFIG.women, title: "Collection", eyebrow: "The Edit", heading: ["Collection"], heroPicks: [] },
    known,
  };
}
