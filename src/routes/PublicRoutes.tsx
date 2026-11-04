import type { RouteObject } from "react-router-dom";
import { page } from "./lazyPage";
import { ROUTES } from "./routePaths";

/** Auth, storefront, cart/checkout and customer-account routes. */
export const publicRoutes: RouteObject[] = [
  // Auth
  { path: ROUTES.welcome, element: page(() => import("@/pages/Authentication/WelcomePage")) },
  { path: ROUTES.login, element: page(() => import("@/pages/Authentication/LoginPage")) },
  { path: ROUTES.otp, element: page(() => import("@/pages/Authentication/OtpVerificationPage")) },

  // Storefront
  { path: ROUTES.dashboard, element: page(() => import("@/pages/Home/HomePage")) },
  { path: ROUTES.category, element: page(() => import("@/pages/Categories/CategoriesPage")) },
  { path: ROUTES.beauty, element: page(() => import("@/pages/Beauty/BeautyPage")) },
  { path: ROUTES.studio, element: page(() => import("@/pages/Studio/StudioPage")) },
  { path: ROUTES.product, element: page(() => import("@/pages/Products/ProductDetailsPage")) },
  { path: ROUTES.faq, element: page(() => import("@/pages/Support/FaqPage")) },
  { path: ROUTES.contact, element: page(() => import("@/pages/Support/ContactPage")) },

  // Cart & checkout
  { path: ROUTES.cart, element: page(() => import("@/pages/Cart/CartPage")) },
  { path: ROUTES.wishlist, element: page(() => import("@/pages/Wishlist/WishlistPage")) },
  { path: ROUTES.checkout, element: page(() => import("@/pages/Checkout/CheckoutPage")) },
  { path: ROUTES.payment, element: page(() => import("@/pages/Payment/PaymentPage")) },
  { path: ROUTES.orderPlaced, element: page(() => import("@/pages/Orders/OrderPlacedPage")) },

  // Account & orders
  { path: ROUTES.profile, element: page(() => import("@/pages/Profile/ProfilePage")) },
  { path: ROUTES.orders, element: page(() => import("@/pages/Orders/OrdersPage")) },
  { path: ROUTES.orderDetail, element: page(() => import("@/pages/Orders/OrderDetailPage")) },
  { path: ROUTES.returnItem, element: page(() => import("@/pages/Orders/ReturnPage")) },
  { path: ROUTES.refundMethod, element: page(() => import("@/pages/Orders/RefundMethodPage")) },
  { path: ROUTES.exchange, element: page(() => import("@/pages/Orders/ExchangePage")) },
  { path: ROUTES.cancel, element: page(() => import("@/pages/Orders/CancelOrderPage")) },
  { path: ROUTES.productReview, element: page(() => import("@/pages/Reviews/ProductReviewPage")) },

  // Everything else
  { path: "*", element: page(() => import("@/pages/NotFound/NotFoundPage")) },
];
