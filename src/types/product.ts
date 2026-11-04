export interface SizeAvailability {
  size: string;
  stock: number;
}

/** A catalogue product as defined in `data/products.js` (and extended by sellers through the product slice). */
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  gender?: string;
  mainCategory?: string;
  category?: string;
  rating?: number;
  ratingCount?: number;
  badge?: string;
  discount?: string;
  sellerId?: string;
  exchangeAvailable?: boolean;
  returnAvailable?: boolean;
  sizeAvailability?: SizeAvailability[];
  description?: string;
  status?: string;
  b2bPrice?: number;
  stock?: number;
  isB2B?: boolean;
  subCategory?: string;
  colourAvailable?: string;
  expiryDate?: string;
  images?: string[];
}
