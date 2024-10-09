export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  imageUrl: string;
  category: Category;
  /** Quantity of the product in stock */
  stock: number;
  colors?: Colors[];
  sizes?: Sizes[];
}

// export type Colors = "white" | "grey" | "brown" | "navy" | "black" | "blue" | "silver" | "red" | "green" | "yellow" | "pink";
export const colors = [
  "white", //
  "grey",
  "brown",
  "navy",
  "black",
  "blue",
  "silver",
  "red",
  "green",
  "yellow",
  "pink",
] as const;
export type Colors = (typeof colors)[number];
// export type Sizes = "S" | "M" | "L" | "XL" | "XXL" | "XXXL" | "A4" | "A5";
export const sizes = [
  "S", //
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
  "A4",
  "A5",
] as const;
export type Sizes = (typeof sizes)[number];
// export type Category = "notebook" | "t-shirt" | "mug";
export const categories = [
  "notebook", //
  "t-shirt",
  "mug",
] as const;
export type Category = (typeof categories)[number];
