import type { Product } from "./product";

/** A line in the cart. Lines are unique per `id` + `size`. */
export interface CartItem extends Partial<Product> {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string | null;
}

/** Wishlist entries are products; some call sites also keep the quantity/size the shopper had picked. */
export interface WishlistItem extends Product {
  quantity?: number;
  size?: string | null;
}
