import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./authRoutes.jsx";
import { userRoutes } from "./userRoutes.jsx";
import { sellerRoutes } from "./SellerRoutes.tsx";
import { adminRoutes } from "./AdminRoutes.tsx";

const appRouter = createBrowserRouter([
  ...authRoutes,
  ...userRoutes,
  ...sellerRoutes,
  adminRoutes,
]);

export default appRouter;
