import type { RouteObject } from "react-router-dom";
import { page } from "./lazyPage";
import { ROUTES } from "./routePaths";

const sellerDashboard = () => import("@/pages/Seller/seller-dashboard");

/** Seller landing, onboarding and the seller dashboard. The dashboard page renders the section that matches the URL. */
export const sellerRoutes: RouteObject[] = [
  { path: ROUTES.sellerLanding, element: page(() => import("@/pages/Seller/Home")) },
  { path: ROUTES.sellerSignup, element: page(() => import("@/pages/Seller/SignupScreen")) },
  { path: ROUTES.sellerShipping, element: page(() => import("@/pages/Seller/shippingandcommision")) },
  { path: ROUTES.sellerGrow, element: page(() => import("@/pages/Seller/GrowBusiness")) },
  { path: ROUTES.sellerLogin, element: page(() => import("@/pages/Seller/Loginpage")) },
  { path: ROUTES.listProducts, element: page(() => import("@/pages/Seller/dashboard/ListProduct")) },

  ...[
    ROUTES.sellerDashboard,
    ROUTES.sellerOrders,
    ROUTES.sellerReturns,
    ROUTES.sellerProducts,
    ROUTES.sellerCatalog,
    ROUTES.sellerInventory,
    ROUTES.sellerPayment,
    ROUTES.sellerSetting,
    ROUTES.sellerMembers,
  ].map((path): RouteObject => ({ path, element: page(sellerDashboard) })),
];
