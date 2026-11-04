import type { RootState } from "../index";

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductById = (id: number) => (state: RootState) =>
  state.products.products.find((p) => p.id === id);
