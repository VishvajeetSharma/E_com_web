import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WishlistItem } from "@/types";

export interface WishlistState {
  wishlistItems: WishlistItem[];
}

const initialState: WishlistState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const product = action.payload;
      const exists = state.wishlistItems.find((item) => item.id === product.id);
      if (!exists) {
        state.wishlistItems.push(product);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.wishlistItems = state.wishlistItems.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
