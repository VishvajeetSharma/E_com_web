import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "@/types";

export interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

/** Terminal or in-transit states from which a customer can no longer cancel. */
const NOT_CANCELLABLE = ["shipped", "out_for_delivery", "delivered", "returned", "exchanged", "cancelled"];

type PlaceOrderPayload = Partial<Order> & Record<string, unknown>;
interface OrderReason {
  orderId: string;
  reason?: string;
}

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<PlaceOrderPayload>) => {
      const p = action.payload;
      const order: Order = {
        id: p.id || Date.now().toString(),
        orderId: p.orderId || `ORD-${Date.now()}`,
        customerName: p.customerName || "Unknown",
        customerEmail: p.customerEmail || "",
        customerPhone: p.customerPhone || "",
        amount: p.amount ?? 0,
        status: p.status || "ordered",
        paymentStatus: p.paymentStatus || "pending",
        items: p.items || [],
        date: p.date || new Date().toISOString(),
        estimatedDelivery: p.estimatedDelivery || null,
        trackingId: p.trackingId || `TRK-${Date.now()}`,
        trackingHistory: [
          {
            status: "ordered",
            date: new Date().toISOString(),
            note: "Order placed successfully",
          },
        ],
      };
      state.orders.unshift(order);
    },
    updateOrderStatus: (state, action: PayloadAction<{ orderId: string; status: string; note?: string }>) => {
      const { orderId, status, note } = action.payload;
      const order = state.orders.find((o) => o.orderId === orderId);
      if (order) {
        order.status = status;
        order.trackingHistory.push({
          status,
          date: new Date().toISOString(),
          note: note || `Status updated to ${status}`,
        });
      }
    },
    cancelOrder: (state, action: PayloadAction<OrderReason>) => {
      const { orderId, reason } = action.payload;
      const order = state.orders.find((o) => o.orderId === orderId);
      if (order && !NOT_CANCELLABLE.includes(order.status)) {
        order.status = "cancelled";
        order.trackingHistory.push({
          status: "cancelled",
          date: new Date().toISOString(),
          note: `Order cancelled: ${reason || "User requested cancellation"}`,
        });
      }
    },
    returnOrder: (state, action: PayloadAction<OrderReason>) => {
      const { orderId, reason } = action.payload;
      const order = state.orders.find((o) => o.orderId === orderId);
      if (order && order.status === "delivered") {
        order.status = "returned";
        order.trackingHistory.push({
          status: "returned",
          date: new Date().toISOString(),
          note: `Return initiated: ${reason || "User requested return"}`,
        });
      }
    },
    exchangeOrder: (state, action: PayloadAction<OrderReason>) => {
      const { orderId, reason } = action.payload;
      const order = state.orders.find((o) => o.orderId === orderId);
      if (order && order.status === "delivered") {
        order.status = "exchanged";
        order.trackingHistory.push({
          status: "exchanged",
          date: new Date().toISOString(),
          note: `Exchange initiated: ${reason || "User requested exchange"}`,
        });
      }
    },
  },
});

export const { placeOrder, updateOrderStatus, cancelOrder, returnOrder, exchangeOrder } = orderSlice.actions;
export default orderSlice.reducer;
