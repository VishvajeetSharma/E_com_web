import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { addToCart } from "../../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../redux/wishlistSlice";
import { formatPrice, type HomeProduct, type HomeRootState } from "./homeData";
import { homeToast } from "./toast";

const SIZED = ["Topwear", "Bottomwear"];

/**
 * Homepage-only product card. Dispatches the exact same cart / wishlist
 * payloads as the shared <ProductCard/> so downstream pages are unaffected.
 */
const HomeProductCard = ({ item }: { item: HomeProduct }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wished = useSelector((s: HomeRootState) =>
    s.wishlist.wishlistItems.some((w) => w.id === item.id),
  );
  const [sizesOpen, setSizesOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const sized = SIZED.includes(item.mainCategory) && !!item.sizeAvailability?.length;
  const soldOut = sized && item.sizeAvailability!.every((s) => s.stock === 0);

  const open = () => {
    navigate(`/product/${item.id}`);
    window.scrollTo(0, 0);
  };

  const flash = () => {
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const toggleWish = () => {
    if (wished) {
      dispatch(removeFromWishlist(item.id));
      homeToast("Removed from wishlist");
    } else {
      dispatch(
        addToWishlist({
          id: item.id,
          name: item.name,
          price: item.price,
          originalPrice: item.originalPrice,
          image: item.image,
          category: item.category,
        }),
      );
      homeToast("Saved to wishlist", item.name);
    }
  };

  const addSized = (size: string) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        quantity: 1,
        size,
        sellerId: item.sellerId,
        returnAvailable: item.returnAvailable,
        exchangeAvailable: item.exchangeAvailable,
      }),
    );
    setSizesOpen(false);
    flash();
    homeToast("Added to bag", `${item.name} · Size ${size}`);
  };

  const addPlain = () => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        quantity: 1,
      }),
    );
    flash();
    homeToast("Added to bag", item.name);
  };

  return (
    <article className="dd-card">
      <motion.div className="dd-card-media" initial="rest" whileHover="hover" animate="rest">
        <button type="button" className="dd-card-hit" onClick={open} aria-label={`View ${item.name}`}>
          <motion.img
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
            variants={{ rest: { scale: 1 }, hover: { scale: 1.07 } }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </button>
        {item.badge && <span className="dd-card-badge">{item.badge}</span>}
        <motion.button
          type="button"
          className={`dd-card-wish${wished ? " is-on" : ""}`}
          aria-pressed={wished}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={toggleWish}
          whileTap={{ scale: 0.86 }}
          whileHover={{ scale: 1.08 }}
        >
          {wished ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
        </motion.button>
        <motion.span
          className="dd-card-frame"
          aria-hidden="true"
          variants={{ rest: { opacity: 0, scale: 1.04 }, hover: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      <div className="dd-card-body">
        <p className="dd-card-cat">{item.category}</p>
        <h3 className="dd-card-name">
          <button type="button" onClick={open}>{item.name}</button>
        </h3>
        <div className="dd-card-meta">
          <p className="dd-card-price">
            <strong>{formatPrice(item.price)}</strong>
            {item.originalPrice ? <s>{formatPrice(item.originalPrice)}</s> : null}
            {item.discount ? <em>{item.discount.replace("-", "")} off</em> : null}
          </p>
          {item.rating ? (
            <p className="dd-card-rating" aria-label={`Rated ${item.rating} out of 5`}>
              <FaStar size={10} /> {item.rating}
            </p>
          ) : null}
        </div>

        {sizesOpen ? (
          <div className="dd-sizes" role="group" aria-label="Choose a size">
            {item.sizeAvailability!.map((s) => (
              <button
                type="button"
                key={s.size}
                disabled={s.stock === 0}
                onClick={() => addSized(s.size)}
                aria-label={s.stock === 0 ? `Size ${s.size} sold out` : `Size ${s.size}`}
              >
                {s.size}
              </button>
            ))}
            <button type="button" className="dd-sizes-x" aria-label="Cancel" onClick={() => setSizesOpen(false)}>×</button>
          </div>
        ) : (
          <motion.button
            type="button"
            className={`dd-add${justAdded ? " is-done" : ""}`}
            disabled={soldOut}
            whileTap={{ scale: 0.98 }}
            onClick={sized ? () => setSizesOpen(true) : addPlain}
          >
            {soldOut ? "Sold out" : justAdded ? "Added ✓" : sized ? "Select size" : "Add to bag"}
          </motion.button>
        )}
      </div>
    </article>
  );
};

export default memo(HomeProductCard);
