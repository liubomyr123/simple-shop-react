import { myDatabaseService } from "@/app";
import { type PayloadAction, current } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { CartProduct, Product } from "@src/shared";

interface ShoppingCartState {
  cartItems: CartProduct[];
}

const initialState: ShoppingCartState = {
  cartItems: [],
};

interface AddProductToCartAction {
  product: Product;
  quantity?: number;
}

interface RemoveProductFromCartAction {
  productId: Product["id"];
}

interface UpdateQuantityAction {
  productId: Product["id"];
  quantity: number;
}

interface LoadShoppingProductsAction {
  cartItems: CartProduct[];
}

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    loadShoppingProducts (state, action: PayloadAction<LoadShoppingProductsAction>) {
      const { cartItems } = action.payload;
      state.cartItems = cartItems;
    },
    addProductToCart (state, action: PayloadAction<AddProductToCartAction>) {
      const { product, quantity = 1 } = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.id === product.id,
      );
      if (existingItem) {
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === product.id) {
            return {
              ...product,
              quantity: item.quantity + quantity,
              selectedSize: product.sizes?.[0],
              selectedColor: product.colors?.[0],
            };
          }
          return item;
        });
      } else {
        state.cartItems.push({
          ...product,
          quantity,
          selectedSize: product.sizes?.[0],
          selectedColor: product.colors?.[0],
        });
      }
      const items = current(state).cartItems;
      void myDatabaseService.addItem("shopping_cart", items);
    },
    removeProductFromCart (
      state,
      action: PayloadAction<RemoveProductFromCartAction>,
    ) {
      const { productId } = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.id === productId,
      );
      if (!existingItem) {
        // skip
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== productId,
        );
      }
      const items = current(state).cartItems;
      void myDatabaseService.addItem("shopping_cart", items);
    },
    updateQuantity (state, action: PayloadAction<UpdateQuantityAction>) {
      const { productId, quantity } = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.id === productId,
      );
      if (!existingItem) {
        // skip
      } else {
        if ([-1, 0].includes(existingItem.quantity + quantity)) {
          return;
        }
        if ((existingItem.quantity + quantity - 1) === existingItem.stock) {
          return;
        }
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === productId) {
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });
      }
      const items = current(state).cartItems;
      void myDatabaseService.addItem("shopping_cart", items);
    },
    clearCart (state) {
      state.cartItems = [];
      const items = current(state).cartItems;
      void myDatabaseService.addItem("shopping_cart", items);
    },
  },
});

export const {
  addProductToCart,
  clearCart,
  removeProductFromCart,
  updateQuantity,
  loadShoppingProducts,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
