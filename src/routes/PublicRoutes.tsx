import type { RouteObject } from "react-router-dom";
import { page } from "./lazyPage";
import { ROUTES } from "./routePaths";

/** Auth, storefront, cart/checkout and customer-account routes. */
export const publicRoutes: RouteObject[] = [
  // Auth
  { path: ROUTES.welcome, element: page(() => import("@/Pages/Authentication/WelcomePage")) },
  { path: ROUTES.login, element: page(() => import("@/Pages/Authentication/LoginPage")) },
  { path: ROUTES.otp, element: page(() => import("@/Pages/Authentication/OtpVerificationPage")) },

  // Storefront
  { path: ROUTES.dashboard, element: page(() => import("@/Pages/Home/HomePage")) },
  { path: ROUTES.category, element: page(() => import("@/Pages/Categories/CategoriesPage")) },
  { path: ROUTES.beauty, element: page(() => import("@/Pages/Beauty/BeautyPage")) },
  { path: ROUTES.studio, element: page(() => import("@/Pages/Studio/StudioPage")) },
  { path: ROUTES.product, element: page(() => import("@/Pages/Products/ProductDetailsPage")) },
  { path: ROUTES.faq, element: page(() => import("@/Pages/Support/FaqPage")) },
  { path: ROUTES.contact, element: page(() => import("@/Pages/Support/ContactPage")) },

  // Cart & checkout
  { path: ROUTES.cart, element: page(() => import("@/Pages/Cart/CartPage")) },
  { path: ROUTES.wishlist, element: page(() => import("@/Pages/Wishlist/WishlistPage")) },
  { path: ROUTES.checkout, element: page(() => import("@/Pages/Checkout/CheckoutPage")) },
  { path: ROUTES.payment, element: page(() => import("@/Pages/Payment/PaymentPage")) },
  { path: ROUTES.orderPlaced, element: page(() => import("@/Pages/Orders/OrderPlacedPage")) },

  // Account & orders
  { path: ROUTES.profile, element: page(() => import("@/Pages/Profile/ProfilePage")) },
  { path: ROUTES.orders, element: page(() => import("@/Pages/Orders/OrdersPage")) },
  { path: ROUTES.orderDetail, element: page(() => import("@/Pages/Orders/OrderDetailPage")) },
  { path: ROUTES.returnItem, element: page(() => import("@/Pages/Orders/ReturnPage")) },
  { path: ROUTES.refundMethod, element: page(() => import("@/Pages/Orders/RefundMethodPage")) },
  { path: ROUTES.exchange, element: page(() => import("@/Pages/Orders/ExchangePage")) },
  { path: ROUTES.cancel, element: page(() => import("@/Pages/Orders/CancelOrderPage")) },
  { path: ROUTES.productReview, element: page(() => import("@/Pages/Reviews/ProductReviewPage")) },

  // Everything else
  { path: "*", element: page(() => import("@/Pages/NotFound/NotFoundPage")) },
];
