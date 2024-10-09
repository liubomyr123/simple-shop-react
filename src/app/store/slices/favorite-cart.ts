import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { FavoriteProduct, Product } from "@src/shared";

interface FavoriteCartState {
  favoriteItems: FavoriteProduct[];
}

const initialState: FavoriteCartState = {
  favoriteItems: [],
};

interface AddProductToFavoriteAction {
  product: Product;
  addedAt?: number;
}

interface RemoveProductFromFavoriteAction {
  productId: Product["id"];
}

const favoriteCartSlice = createSlice({
  name: "favoriteCart",
  initialState,
  reducers: {
    addProductToFavorite (state, action: PayloadAction<AddProductToFavoriteAction>) {
      const { product, addedAt = Date.now() } = action.payload;

      const existingItem = state.favoriteItems.find(
        (item) => item.id === product.id,
      );
      if (existingItem) {
        // skip
      } else {
        state.favoriteItems.push({ ...product, addedAt });
      }
    },
    removeProductFromFavorite (
      state,
      action: PayloadAction<RemoveProductFromFavoriteAction>,
    ) {
      const { productId } = action.payload;

      const existingItem = state.favoriteItems.find(
        (item) => item.id === productId,
      );
      if (!existingItem) {
        // skip
      } else {
        state.favoriteItems = state.favoriteItems.filter(
          (item) => item.id !== productId,
        );
      }
    },
    clearFavorite (state) {
      state.favoriteItems = [];
    },
  },
});

export const { addProductToFavorite, clearFavorite, removeProductFromFavorite } = favoriteCartSlice.actions;
export default favoriteCartSlice.reducer;
