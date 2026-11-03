import { hiRes, pickProducts, type HomeProduct } from "../Home/homeData";

/** Real store products that belong to the beauty world (by their own `category`). */
const BEAUTY_CATEGORIES = ["Skincare", "Makeup", "Hair"];
const LABELS: Record<string, string> = { Skincare: "Skincare", Makeup: "Makeup", Hair: "Haircare" };
const TAGS: Record<string, string> = { Skincare: "Glow, daily", Makeup: "Colour & finish", Hair: "Finishing touches" };

export const isBeauty = (p: HomeProduct) => p.mainCategory === "Beauty" || BEAUTY_CATEGORIES.includes(p.category);
export const parsePct = (d?: string) => (d ? parseInt(d.replace(/\D/g, ""), 10) || 0 : 0);

export interface BeautyGroup { key: string; label: string; tag: string; count: number; image?: string }

export function buildBeauty(all: HomeProduct[]) {
  const items = all.filter(isBeauty);
  const groups: BeautyGroup[] = BEAUTY_CATEGORIES.map((key) => {
    const list = items.filter((p) => p.category === key);
    return { key, label: LABELS[key], tag: TAGS[key], count: list.length, image: list[0]?.image };
  }).filter((g) => g.count > 0);
  const featured = items.filter((p) => p.badge === "Bestseller" || p.badge === "EXCLUSIVE");
  const trending = items.filter((p) => p.badge === "TRENDING");
  const maxDiscount = Math.max(0, ...items.map((p) => parsePct(p.discount)));
  const heroPicks = pickProducts(items, [506, 501, 504], 3);
  return { items, groups, featured, trending, maxDiscount, heroPicks };
}

export { hiRes };
