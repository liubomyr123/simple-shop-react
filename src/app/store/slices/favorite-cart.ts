import { myDatabaseService } from "@/app";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, current } from "@reduxjs/toolkit";
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

interface LoadFavoriteProductsAction {
  favoriteProducts: FavoriteProduct[];
}

const favoriteCartSlice = createSlice({
  name: "favoriteCart",
  initialState,
  reducers: {
    loadFavoritesProducts (state, action: PayloadAction<LoadFavoriteProductsAction>) {
      const { favoriteProducts } = action.payload;
      state.favoriteItems = favoriteProducts;
    },
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
      const items = current(state).favoriteItems;
      void myDatabaseService.addItem("favorites", items);
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
      const items = current(state).favoriteItems;
      void myDatabaseService.addItem("favorites", items);
    },
    clearFavorite (state) {
      state.favoriteItems = [];
      const items = current(state).favoriteItems;
      void myDatabaseService.addItem("favorites", items);
    },
  },
});

export const { addProductToFavorite, clearFavorite, removeProductFromFavorite, loadFavoritesProducts } = favoriteCartSlice.actions;
export default favoriteCartSlice.reducer;
