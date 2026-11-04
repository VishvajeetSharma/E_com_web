// Sample (placeholder) account data carried over unchanged from the original page.
// None of this is real customer data: the app has no user/auth slice or profile API yet.

export interface SavedAddress { id: number; type: string; address: string; city: string; state: string; pincode: string; isDefault: boolean }
export interface Coupon { code: string; discount: string; expiry: string; used: boolean; min: string }
export interface Review { id: number; product: string; rating: number; comment: string; date: string; image: string }
export interface Transaction { id: number; label: string; amount: number; date: string; type: "credit" | "debit" }

export const SAMPLE_USER = {
  name: "Riya Sharma", email: "riya.sharma@darlingdesire.com", phone: "+91 98765 43210",
  dob: "June 15, 1995", gender: "Female", username: "riya_sharma",
};

export const SAMPLE_WALLET = {
  balance: 1250,
  transactions: [
    { id: 1, label: "Refund (Order #123)", amount: 800, date: "20 Apr 2025", type: "credit" },
    { id: 2, label: "Cashback Reward", amount: 100, date: "15 Apr 2025", type: "credit" },
    { id: 3, label: "Payment for Order", amount: -300, date: "10 Apr 2025", type: "debit" },
    { id: 4, label: "Refund (Order #118)", amount: 650, date: "2 Apr 2025", type: "credit" },
  ] as Transaction[],
};

export const SAMPLE_ADDRESSES: SavedAddress[] = [
  { id: 1, type: "Home", address: "42, Linking Road, Bandra West", city: "Mumbai", state: "Maharashtra", pincode: "400050", isDefault: true },
  { id: 2, type: "Work", address: "WeWork, Andheri East", city: "Mumbai", state: "Maharashtra", pincode: "400093", isDefault: false },
];

export const SAMPLE_COUPONS: Coupon[] = [
  { code: "RIYA20", discount: "20% OFF", expiry: "31 May 2025", used: false, min: "₹999" },
  { code: "FIRST50", discount: "₹50 OFF", expiry: "15 Jun 2025", used: false, min: "₹500" },
  { code: "SUMMER10", discount: "10% OFF", expiry: "30 Apr 2025", used: true, min: "₹1499" },
];

export const SAMPLE_REVIEWS: Review[] = [
  { id: 1, product: "Silver Necklace", rating: 5, comment: "Absolutely love it! Great quality.", date: "12 Apr 2025", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=80&h=80&fit=crop" },
  { id: 2, product: "Skincare Set", rating: 4, comment: "Good product, packaging could be better.", date: "3 Mar 2025", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=80&h=80&fit=crop" },
];

export const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "wallet", label: "Wallet" },
  { id: "addresses", label: "Addresses" },
  { id: "coupons", label: "Coupons" },
  { id: "reviews", label: "Reviews" },
  { id: "settings", label: "Settings" },
] as const;
