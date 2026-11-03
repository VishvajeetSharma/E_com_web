// Shared types + helpers for the redesigned homepage (isolated from other pages).

export interface HomeProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  gender: string;
  mainCategory: string;
  category: string;
  rating?: number;
  ratingCount?: number;
  badge?: string;
  discount?: string;
  sellerId?: string;
  exchangeAvailable?: boolean;
  returnAvailable?: boolean;
  sizeAvailability?: { size: string; stock: number }[];
}

/** Minimal shape of the Redux root state the homepage reads. */
export interface HomeRootState {
  products: { products: HomeProduct[] };
  cart: { cartItems: { quantity: number }[] };
  wishlist: { wishlistItems: { id: number }[] };
}

export const selectProducts = (s: HomeRootState) => s.products.products;
export const selectCartCount = (s: HomeRootState) =>
  s.cart.cartItems.reduce((t, i) => t + i.quantity, 0);
export const selectWishlistCount = (s: HomeRootState) =>
  s.wishlist.wishlistItems.length;

/** Existing image URLs are 500px Unsplash crops; request a larger one for editorial use. */
export const hiRes = (url: string, w: number) =>
  /[?&]w=\d+/.test(url) ? url.replace(/([?&])w=\d+/, `$1w=${w}`) : url;

/** Pick products by preferred ids (in order), then fill from the rest. */
export function pickProducts(
  all: HomeProduct[],
  preferred: number[],
  count: number,
): HomeProduct[] {
  const out: HomeProduct[] = [];
  for (const id of preferred) {
    const p = all.find((x) => x.id === id && x.image);
    if (p && !out.includes(p)) out.push(p);
  }
  for (const p of all) {
    if (out.length >= count) break;
    if (p.image && !out.includes(p)) out.push(p);
  }
  return out.slice(0, count);
}

export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Same promotional copy the existing TopHeader marquee shows. */
export const ANNOUNCEMENTS = [
  "Free Shipping on Orders Above ₹2,999",
  "Get 20% Off on Your First Order — Code FIRST20",
  "Easy Returns Within 30 Days",
  "Join the Loyalty Program & Earn Points",
];

/** Same destinations as the existing shared Header. */
export const NAV_CATEGORIES = [
  { id: "men", label: "Men", path: "/category/men" },
  { id: "women", label: "Women", path: "/category/women" },
  { id: "kids", label: "Kids", path: "/category/kids" },
  { id: "beauty", label: "Beauty", path: "/beauty" },
  { id: "studio", label: "Studio", path: "/studio" },
] as const;

export const COLLECTIONS = [
  { id: "women", label: "Women", path: "/category/women", tag: "Evening to everyday", pick: [5, 603, 701] },
  { id: "men", label: "Men", path: "/category/men", tag: "Quiet, tailored", pick: [403, 1, 402] },
  { id: "kids", label: "Kids", path: "/category/kids", tag: "Small joys", pick: [802, 804, 305] },
  { id: "beauty", label: "Beauty", path: "/beauty", tag: "Ritual & glow", pick: [506, 504, 501] },
  { id: "studio", label: "Studio", path: "/studio", tag: "The creative edit", pick: [902, 901, 604] },
] as const;
