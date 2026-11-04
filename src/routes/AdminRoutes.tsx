import type { RouteObject } from "react-router-dom";
import { page } from "./lazyPage";
import { RequireAdmin } from "./ProtectedRoutes";
import AdminLayout from "@/components/layout/admin/AdminLayout";

/**
 * Admin portal. Paths are relative to `/admin`.
 * Guarded pages (dashboard, sellers, seller products) redirect when the admin flag is missing, exactly as before;
 * the payments pages were never guarded and still aren't.
 */
export const adminRoutes: RouteObject = {
  path: "/admin",
  children: [
    { index: true, element: page(() => import("@/Pages/Admin/AdminLogin")) },
    {
      path: "payments/:year/:month",
      element: page(() => import("@/Pages/Admin/Payments/MonthDetailPage").then((m) => ({ default: m.MonthDetailPage }))),
    },
    {
      element: <AdminLayout />,
      children: [
        {
          element: <RequireAdmin />,
          children: [
            { path: "dashboard", element: page(() => import("@/Pages/Admin/AdminDashboard")) },
            { path: "pending-sellers", element: page(() => import("@/Pages/Admin/PendingSellers")) },
            { path: "verified-sellers", element: page(() => import("@/Pages/Admin/VerifiedSellers")) },
            { path: "seller-products/:sellerId", element: page(() => import("@/Pages/Admin/SellerProductsDetail")) },
          ],
        },
        { path: "payments/*", element: page(() => import("@/Pages/Admin/SellerPaymentManagement")) },
      ],
    },
  ],
};
