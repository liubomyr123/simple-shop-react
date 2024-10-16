/** Assets */
import CoffeeMug from "./assets/webp/CoffeeMug-JetBlack-Front.webp";
import professional_notebook from "./assets/webp/professional_notebook.webp";
import t_shirt from "./assets/webp/t-shirt.webp";
export const webp = {
  CoffeeMug,
  professional_notebook,
  t_shirt,
};

/** Hooks */
export { useTypedNavigate } from "./hooks/useTypedNavigate";
export { useTypedTranslation } from "./hooks/useTypedTranslation";

/** Types */
export type { User } from "./types/User";
export type { Colors, Category, Sizes } from "./types/Product";
export type { Product } from "./types/Product";
export type { CartProduct } from "./types/CartProduct";
export type { FavoriteProduct } from "./types/FavoriteProduct";
export type { HistoryProduct } from "./types/OrderItem";
export type { OrderItem } from "./types/OrderItem";

/** UI */
export { default as Preloader } from "./UI/Preloader";

/** Data */
export { colors, sizes, categories } from "./types/Product";

/** Helpers */
export { prepareFilters } from "./helpers/prepareFilters";
export { classNames } from "./helpers/classNames";
export { logger } from "./helpers/logger";

/** Services */
export { IndexedDBService } from "./services/IndexedDBService";
