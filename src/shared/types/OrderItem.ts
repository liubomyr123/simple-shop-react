import type { Product } from "./Product";

export interface HistoryProduct extends Product {
  quantity: number;
}

export interface OrderItem {
  orderId: string;
  historyItems: HistoryProduct[];
  orderDate: Date;
  status: "In Process" | "Delivered" | "Cancelled";
}
