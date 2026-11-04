import { combineReducers } from "redux";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import orderReducer from "./slices/orderSlice";
import productReducer from "./slices/productSlice";
import returnReducer from "./slices/returnSlice";
import sellerManagementReducer from "./slices/sellerManagementSlice";

/**
 * State keys are part of the persisted `persist:root` contract — do not rename them
 * without a migration (see redux-persist `version` / `migrate`).
 */
const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  order: orderReducer,
  products: productReducer,
  return: returnReducer,
  sellerManagement: sellerManagementReducer,
});

export default rootReducer;
