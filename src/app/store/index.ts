import { configureStore } from "@reduxjs/toolkit";
import type { AnyAction, Dispatch, Middleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { createLogger } from "redux-logger";

import { isDevEnv } from "@config";
import rootReducer from "./rootReducer";

type MiddlewarePointType = Middleware<Record<string, unknown>, unknown, Dispatch<AnyAction>>;
type GetDefaultMiddlewareType = Array<Middleware<Record<string, unknown>, unknown, Dispatch<AnyAction>>>;

const middleware: MiddlewarePointType[] = [];
if (isDevEnv) {
  const logger = createLogger({
    collapsed: true,
    diff: true,
  });
  middleware.push(logger);
}

export const setupStore = (): ReturnType<typeof configureStore> => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => (getDefaultMiddleware() as GetDefaultMiddlewareType).concat(...middleware),
    devTools: isDevEnv,
    preloadedState: {},
  });
};

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = setupStore();

setupListeners(store.dispatch);
