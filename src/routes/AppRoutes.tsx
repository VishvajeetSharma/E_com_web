import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { publicRoutes } from "./PublicRoutes";
import { sellerRoutes } from "./SellerRoutes";
import { adminRoutes } from "./AdminRoutes";
import RouteError from "./RouteError";

// A pathless root route gives every page one shared error boundary (render errors and failed lazy chunks).
const router = createBrowserRouter([
  {
    errorElement: <RouteError />,
    children: [...publicRoutes, ...sellerRoutes, adminRoutes],
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
