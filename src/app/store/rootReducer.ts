import { combineReducers } from "@reduxjs/toolkit";
import {
  baseApi,
} from "@api";

import { productSlice, shoppingCartSlice, userReducer, favoriteCartSlice } from "./slices";

const rootReducer = combineReducers({
  user: userReducer,
  shoppingCart: shoppingCartSlice,
  favoriteCart: favoriteCartSlice,
  products: productSlice,
  [baseApi.reducerPath]: baseApi.reducer,
});

export default rootReducer;
