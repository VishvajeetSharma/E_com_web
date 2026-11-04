/**
 * Every URL in the app, in one place. Route definitions use these constants and the
 * builders below, so a path is spelled exactly once. URLs are unchanged from before the refactor.
 */
export const ROUTES = {
  // Auth
  welcome: "/",
  login: "/login",
  otp: "/otp",

  // Storefront
  dashboard: "/dashboard",
  category: "/category/:gender",
  beauty: "/beauty",
  studio: "/studio",
  product: "/product/:id",
  faq: "/faq",
  contact: "/contact",

  // Cart & checkout
  cart: "/cart",
  wishlist: "/wishlist",
  checkout: "/buynow",
  payment: "/payment",
  orderPlaced: "/orderPlaced",

  // Account & orders
  profile: "/userprofile",
  orders: "/orders",
  orderDetail: "/orderDetail/:id/:itemId",
  returnItem: "/return/:id/:itemId/:sellerId",
  refundMethod: "/return/refund/:id/:itemId",
  exchange: "/exchange/:id",
  cancel: "/cancel/:id/:itemId",
  productReview: "/productReview",

  // Seller
  sellerLanding: "/seller",
  sellerSignup: "/sellersignup",
  sellerLogin: "/seller/login",
  sellerShipping: "/seller/shippingandcommission",
  sellerGrow: "/seller/growbusiness",
  sellerDashboard: "/seller/dashboard",
  sellerOrders: "/seller/orders",
  sellerReturns: "/seller/returns",
  sellerProducts: "/seller/products",
  sellerCatalog: "/seller/catalog",
  sellerInventory: "/seller/inventory",
  sellerPayment: "/seller/payment",
  sellerSetting: "/seller/setting",
  sellerMembers: "/seller/members",
  listProducts: "/listProducts",

  // Admin
  admin: "/admin",
  adminLogin: "/admin/login",
  adminDashboard: "/admin/dashboard",
  adminPendingSellers: "/admin/pending-sellers",
  adminVerifiedSellers: "/admin/verified-sellers",
  adminSellerProducts: "/admin/seller-products/:sellerId",
  adminPayments: "/admin/payments",
  adminPaymentMonth: "/admin/payments/:year/:month",
} as const;

/** Builders for parameterised paths. */
export const paths = {
  category: (gender: string) => `/category/${gender}`,
  product: (id: number | string) => `/product/${id}`,
  orderDetail: (id: string, itemId: string | number) => `/orderDetail/${id}/${itemId}`,
  adminSellerProducts: (sellerId: string) => `/admin/seller-products/${sellerId}`,
};
