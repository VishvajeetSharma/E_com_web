import type { HomeProduct } from "../Home/homeData";

export type SortBy = "popularity" | "low" | "high";

export interface FilterState {
  /** Same semantics as the original page: matches mainCategory OR category, or "all". */
  activeFilter: string;
  price: string | null;
  size: string | null;
  minDiscount: number;
}

export const EMPTY_FILTERS: FilterState = { activeFilter: "all", price: null, size: null, minDiscount: 0 };

export const PRICE_BUCKETS = [
  { id: "u1", label: "Under ₹1,000", min: 0, max: 999 },
  { id: "1-2.5", label: "₹1,000 – ₹2,499", min: 1000, max: 2499 },
  { id: "2.5-5", label: "₹2,500 – ₹4,999", min: 2500, max: 4999 },
  { id: "5p", label: "₹5,000 & above", min: 5000, max: Infinity },
];

export const parseDiscount = (d?: string) => (d ? parseInt(d.replace(/\D/g, ""), 10) || 0 : 0);

export const inStockSizes = (p: HomeProduct) =>
  (p.sizeAvailability ?? []).filter((s) => s.stock > 0).map((s) => s.size);

export function applyFilters(items: HomeProduct[], f: FilterState, sortBy: SortBy): HomeProduct[] {
  const af = f.activeFilter.toLowerCase();
  const bucket = PRICE_BUCKETS.find((b) => b.id === f.price);
  const out = items.filter((item) => {
    if (f.activeFilter !== "all" && item.mainCategory.toLowerCase() !== af && item.category.toLowerCase() !== af) return false;
    if (bucket && (item.price < bucket.min || item.price > bucket.max)) return false;
    if (f.size && !inStockSizes(item).includes(f.size)) return false;
    if (f.minDiscount && parseDiscount(item.discount) < f.minDiscount) return false;
    return true;
  });
  // Identical to the original: "popularity" keeps data order.
  return out.sort((a, b) => (sortBy === "low" ? a.price - b.price : sortBy === "high" ? b.price - a.price : 0));
}

export interface Facets {
  groups: { name: string; subs: string[]; count: number; sample?: HomeProduct }[];
  priceBuckets: typeof PRICE_BUCKETS;
  sizes: string[];
  discounts: number[];
  maxDiscount: number;
}

export function buildFacets(items: HomeProduct[]): Facets {
  const map = new Map<string, { subs: Set<string>; count: number; sample?: HomeProduct }>();
  for (const p of items) {
    const g = map.get(p.mainCategory) ?? { subs: new Set<string>(), count: 0, sample: undefined };
    g.subs.add(p.category);
    g.count += 1;
    g.sample ??= p;
    map.set(p.mainCategory, g);
  }
  const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];
  const sizes = Array.from(new Set(items.flatMap(inStockSizes))).sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b));
  const maxDiscount = Math.max(0, ...items.map((p) => parseDiscount(p.discount)));
  return {
    groups: Array.from(map, ([name, g]) => ({ name, subs: [...g.subs], count: g.count, sample: g.sample })),
    priceBuckets: PRICE_BUCKETS.filter((b) => items.some((p) => p.price >= b.min && p.price <= b.max)),
    sizes,
    discounts: [20, 30, 40].filter((t) => items.some((p) => parseDiscount(p.discount) >= t)),
    maxDiscount,
  };
}

export const activeCount = (f: FilterState) =>
  (f.activeFilter !== "all" ? 1 : 0) + (f.price ? 1 : 0) + (f.size ? 1 : 0) + (f.minDiscount ? 1 : 0);
