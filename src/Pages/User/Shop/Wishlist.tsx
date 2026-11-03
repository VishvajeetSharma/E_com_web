import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StoreShell from "../../../components/Store/StoreShell";
import StoreHero from "../../../components/Store/StoreHero";
import WishlistProductCard from "../../../components/Cart/WishlistProductCard";
import type { HomeProduct } from "../../../components/Home/homeData";

/** Route: /wishlist — reads the existing Redux wishlist slice. */
const Wishlist = () => {
  const wishlistItems: HomeProduct[] = useSelector((state: { wishlist: { wishlistItems: HomeProduct[] } }) => state.wishlist.wishlistItems);
  const count = wishlistItems.length;

  return (
    <StoreShell>
      <StoreHero
        eyebrow="Your Wishlist"
        title="Saved with"
        accent="intent."
        subtitle={count ? "Pieces you love, kept until you decide." : "Nothing saved yet."}
      >
        <p className="st-count" aria-live="polite"><FaHeart size={13} /> <b>{count}</b> {count === 1 ? "piece" : "pieces"}</p>
      </StoreHero>

      <main className="st-main">
        <div className="dd-container">
          {count === 0 ? (
            <div className="st-empty" role="status">
              <span className="st-empty-mark" aria-hidden="true"><FaHeart size={26} /></span>
              <h2>Your wishlist is empty</h2>
              <p>Tap the heart on any piece to save it here.</p>
              <Link to="/dashboard" className="dd-btn dd-btn--dark" onClick={() => window.scrollTo(0, 0)}>Discover the collection <FaArrowRight size={11} /></Link>
            </div>
          ) : (
            <ul className="dd-grid st-wgrid">
              <AnimatePresence initial={false}>
                {wishlistItems.map((p) => (
                  <motion.li
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <WishlistProductCard item={p} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </main>
    </StoreShell>
  );
};

export default Wishlist;
