import type { RootState } from "../index";

export const selectOrders = (state: RootState) => state.order.orders;
export const selectLatestOrder = (state: RootState) => state.order.orders[0];
export const selectOrderById = (id: string) => (state: RootState) => state.order.orders.find((o) => o.id === id);
