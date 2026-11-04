import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/types";

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existing = state.cartItems.find(
        (item) => item.id === newItem.id && item.size === newItem.size,
      );

      if (existing) {
        existing.quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: number; size?: string | null }>) => {
      const { id, size } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => !(item.id === id && item.size === size),
      );
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((line) => line.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
