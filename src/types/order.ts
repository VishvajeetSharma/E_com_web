import type { CartItem } from "./cart";

export type OrderStatus =
  | "ordered"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "returned"
  | "exchanged"
  | "cancelled";

export interface TrackingEvent {
  status: string;
  date: string;
  note: string;
}

export interface Order {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  status: OrderStatus | string;
  paymentStatus: string;
  items: CartItem[];
  date: string;
  estimatedDelivery: string | null;
  trackingId: string | null;
  trackingHistory: TrackingEvent[];
}

export interface ReturnRequest {
  id: string | number;
  status: string;
  [key: string]: unknown;
}
