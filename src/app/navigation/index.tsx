import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";

import {
  Main,
  Favorite,
  Checkout,
  Profile,
  ShoppingCart,
  Product,
} from "@pages";
import {
  Layout,
} from "@layouts";

export const Routing = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="product">
          <Route index element={<Navigate to="/" />} />
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="cart" element={<ShoppingCart />} />
        <Route path="favorite" element={<Favorite />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="profile" element={<Profile />} />
        {/* <Route path="shopping-cart" element={<PrivateLayout />}>
          <Route index element={<ShoppingCart />} />
        </Route> */}
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
