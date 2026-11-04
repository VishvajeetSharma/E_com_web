import type { RootState } from "../index";

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartCount = (state: RootState) =>
  state.cart.cartItems.reduce((sum, line) => sum + line.quantity, 0);
export const selectCartSubtotal = (state: RootState) =>
  state.cart.cartItems.reduce((sum, line) => sum + line.price * line.quantity, 0);
