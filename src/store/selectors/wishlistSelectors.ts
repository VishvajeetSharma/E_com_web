import type { RootState } from "../index";

export const selectWishlistItems = (state: RootState) => state.wishlist.wishlistItems;
export const selectWishlistCount = (state: RootState) => state.wishlist.wishlistItems.length;
export const selectIsWishlisted = (id: number) => (state: RootState) =>
  state.wishlist.wishlistItems.some((item) => item.id === id);
