import { type ReactNode } from "react";
import { Provider } from "react-redux";

import { store } from "@store";

export const withStore = (component: () => ReactNode) => () =>
  <Provider store={store}>
    {component()}
  </Provider>;
