import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "@src/shared";

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

interface LoadProductsAction {
  products: Product[];
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadProducts (state, action: PayloadAction<LoadProductsAction>) {
      const { products } = action.payload;
      state.products = products;
    },
  },
});

export const { loadProducts } = productSlice.actions;
export default productSlice.reducer;
