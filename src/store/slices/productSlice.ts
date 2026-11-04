import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { products as initialProducts } from "@/data/products";
import type { Product } from "@/types";

export interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: initialProducts.map((p: Product) => ({ ...p })),
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.unshift({ ...action.payload });
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    toggleStatus: (state, action: PayloadAction<number>) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.status = product.status === "active" ? "inactive" : "active";
      }
    },
    updateStock: (state, action: PayloadAction<{ id: number; size: string; stock: number | string }>) => {
      const { id, size, stock } = action.payload;
      const product = state.products.find((p) => p.id === id);
      if (product && product.sizeAvailability) {
        product.sizeAvailability = product.sizeAvailability.map((s) =>
          s.size === size ? { ...s, stock: Number(stock) } : s,
        );
      }
    },
    updateExchangeReturn: (
      state,
      action: PayloadAction<{ id: number; exchangeAvailable?: boolean; returnAvailable?: boolean }>,
    ) => {
      const { id, exchangeAvailable, returnAvailable } = action.payload;
      const product = state.products.find((p) => p.id === id);
      if (product) {
        if (exchangeAvailable !== undefined) product.exchangeAvailable = exchangeAvailable;
        if (returnAvailable !== undefined) product.returnAvailable = returnAvailable;
      }
    },
  },
});

export const { addProduct, deleteProduct, toggleStatus, updateStock, updateExchangeReturn } = productSlice.actions;
export default productSlice.reducer;
