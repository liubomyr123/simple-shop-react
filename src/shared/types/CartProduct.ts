import type { Colors, Product, Sizes } from "./Product";

export interface CartProduct extends Product {
  quantity: number;
  selectedSize?: Sizes[number];
  selectedColor?: Colors[number];
}
