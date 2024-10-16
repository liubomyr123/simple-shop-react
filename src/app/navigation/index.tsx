import { Routes, Route, useLocation } from "react-router";
import { Navigate } from "react-router-dom";

import {
  Main,
  Favorite,
  // Checkout,
  Profile,
  ShoppingCart,
  ProductDetails,
} from "@pages";
import {
  Layout,
} from "@layouts";
import { useEffect } from "react";
import { myDatabaseService } from "..";
import { useAppDispatch } from "../store";
import { loadProducts } from "../store/slices/product";
import { products_mock } from "../store/products";
import { loadShoppingProducts } from "../store/slices/shopping-cart";
import { loadFavoritesProducts } from "../store/slices/favorite-cart";

export const Routing = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    void (async function () {
      await myDatabaseService.isReady;

      const cachedProducts = await myDatabaseService.getAllItems("products");
      const cachedShoppingProducts = await myDatabaseService.getAllItems("shopping_cart");
      const cachedFavoritesProducts = await myDatabaseService.getAllItems("favorites");
      if (cachedProducts.length) {
        dispatch(loadProducts({ products: cachedProducts }));
      }
      if (cachedShoppingProducts.length) {
        dispatch(loadShoppingProducts({ cartItems: cachedShoppingProducts }));
      }
      if (cachedFavoritesProducts.length) {
        dispatch(loadFavoritesProducts({ favoriteProducts: cachedFavoritesProducts }));
      } else {
        timeoutId = setTimeout(() => {
          dispatch(loadProducts({ products: products_mock }));
          void myDatabaseService.addItem("products", products_mock);
        }, 2_000);
      }
    })();
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="product">
            <Route index element={<Navigate to="/" />} />
            <Route path=":productId" element={<ProductDetails />} />
          </Route>
          <Route path="cart" element={<ShoppingCart />} />
          <Route path="favorite" element={<Favorite />} />
          {/* <Route path="checkout" element={<Checkout />} /> */}
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
