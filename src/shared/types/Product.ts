export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  imageUrl: string;
  category: "notebook" | "t-shirt" | "mug";
  /** Quantity of the product in stock */
  stock: number;
  colors?: string[];
  sizes?: string[];
}
