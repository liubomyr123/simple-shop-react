import type { Product } from "./Product";

export interface FavoriteProduct extends Product {
  addedAt: number;
}
