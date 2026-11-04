import { memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { removeFromWishlist } from "@/store/slices/wishlistSlice";
import HomeProductCard from "@/components/data-display/ProductCard";
import { selectProducts, type HomeProduct, type HomeRootState } from "@/utils/storefront";
import { homeToast } from "@/utils/toast";

/**
 * A wishlist entry. Wishlist items only store a few fields, so the live product
 * (same id) fills in sizes/stock — add-to-cart then uses the exact same payloads as everywhere else.
 */
const WishlistProductCard = ({ item }: { item: HomeProduct }) => {
  const dispatch = useDispatch();
  const products = useSelector((s: HomeRootState) => selectProducts(s));
  const merged = useMemo(() => ({ ...(products.find((p) => p.id === item.id) ?? {}), ...item }) as HomeProduct, [products, item]);

  return (
    <div className="st-wcard">
      <HomeProductCard item={merged} />
      <button
        type="button"
        className="st-wremove"
        onClick={() => { dispatch(removeFromWishlist(item.id)); homeToast("Removed from wishlist"); }}
      >
        <FaTrashAlt size={11} /> Remove
      </button>
    </div>
  );
};

export default memo(WishlistProductCard);
