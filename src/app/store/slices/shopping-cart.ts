import { myDatabaseService } from "@/app";
import { type PayloadAction, current } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { CartProduct, Colors, Product, Sizes } from "@src/shared";

interface ShoppingCartState {
  cartItems: CartProduct[];
}

const initialState: ShoppingCartState = {
  cartItems: [],
};

interface AddProductToCartAction {
  product: Product;
  quantity?: number;
  selectedColor?: Colors | null;
  selectedSize?: Sizes | null;
}

interface RemoveProductFromCartAction {
  productId: Product["id"];
  product: CartProduct;
}

interface UpdateQuantityAction {
  productId: Product["id"];
  quantity: number;
  product: CartProduct;
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
      const { product, quantity = 1, selectedSize, selectedColor } = action.payload;

      const existingItem = state.cartItems.find(
        (item) => {
          if (item.id === product.id) {
            if (
              item?.selectedColor &&
              item.selectedColor === selectedColor &&
              item?.selectedSize &&
              item.selectedSize === selectedSize
            ) {
              return true;
            }
            if (
              item?.selectedColor &&
              item.selectedColor === selectedColor &&
              !item?.selectedSize
            ) {
              return true;
            }
            if (
              item?.selectedSize &&
              item.selectedSize === selectedSize &&
              !item?.selectedColor
            ) {
              return true;
            }
          }
          return false;
        },
      );
      if (existingItem) {
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === product.id) {
            if ((
              item?.selectedColor && item.selectedColor === selectedColor &&
              item?.selectedSize && item.selectedSize === selectedSize
            ) || (
              item?.selectedColor && item.selectedColor === selectedColor && !item?.selectedSize
            ) || (
              item?.selectedSize && item.selectedSize === selectedSize && !item?.selectedColor
            )) {
              return {
                ...product,
                quantity: item.quantity + quantity,
                selectedSize: selectedSize ?? product.sizes?.[0],
                selectedColor: selectedColor ?? product.colors?.[0],
              };
            }
          }
          return item;
        });
      } else {
        state.cartItems.push({
          ...product,
          quantity,
          selectedSize: selectedSize ?? product.sizes?.[0],
          selectedColor: selectedColor ?? product.colors?.[0],
        });
      }
      const items = current(state).cartItems;
      void myDatabaseService.addItem("shopping_cart", items);
    },
    removeProductFromCart (
      state,
      action: PayloadAction<RemoveProductFromCartAction>,
    ) {
      const { productId, product } = action.payload;

      const existingItem = state.cartItems.find(
        (item) => {
          if (item.id === product.id) {
            if (
              item?.selectedColor &&
              item.selectedColor === product.selectedColor &&
              item?.selectedSize &&
              item.selectedSize === product.selectedSize
            ) {
              return true;
            }
            if (
              item?.selectedColor &&
              item.selectedColor === product.selectedColor &&
              !item?.selectedSize
            ) {
              return true;
            }
            if (
              item?.selectedSize &&
              item.selectedSize === product.selectedSize &&
              !item?.selectedColor
            ) {
              return true;
            }
          }
          return false;
        },
      );
      if (!existingItem) {
        // skip
      } else {
        const newCartItems: CartProduct[] = [];
        for (const item of state.cartItems) {
          if (item.id === productId) {
            if (
              item?.selectedColor &&
              item.selectedColor !== existingItem.selectedColor ||
              item?.selectedSize &&
              item.selectedSize !== existingItem.selectedSize
            ) {
              newCartItems.push(item);
            }
          } else {
            newCartItems.push(item);
          }
        }
        state.cartItems = newCartItems;
      }
      const items = current(state).cartItems;
      void myDatabaseService.addItem("shopping_cart", items);
    },
    updateQuantity (state, action: PayloadAction<UpdateQuantityAction>) {
      const { productId, quantity, product } = action.payload;

      const existingItem = state.cartItems.find(
        (item) => {
          if (item.id === product.id) {
            if (
              item?.selectedColor &&
              item.selectedColor === product.selectedColor &&
              item?.selectedSize &&
              item.selectedSize === product.selectedSize
            ) {
              return true;
            }
            if (
              item?.selectedColor &&
              item.selectedColor === product.selectedColor &&
              !item?.selectedSize
            ) {
              return true;
            }
            if (
              item?.selectedSize &&
              item.selectedSize === product.selectedSize &&
              !item?.selectedColor
            ) {
              return true;
            }
          }
          return false;
        },
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
            if ((
              item?.selectedColor && item.selectedColor === product.selectedColor &&
              item?.selectedSize && item.selectedSize === product.selectedSize
            ) || (
              item?.selectedColor && item.selectedColor === product.selectedColor && !item?.selectedSize
            ) || (
              item?.selectedSize && item.selectedSize === product.selectedSize && !item?.selectedColor
            )) {
              return {
                ...item,
                quantity: item.quantity + quantity,
              };
            }
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
