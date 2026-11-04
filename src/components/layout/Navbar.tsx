import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaRegHeart, FaShoppingBag, FaTimes, FaUser } from "react-icons/fa";
import { NAV_CATEGORIES } from "@/utils/storefront";
import { useAppSelector } from "@/store/hooks";
import { selectCartCount } from "@/store/selectors/cartSelectors";
import { selectWishlistCount } from "@/store/selectors/wishlistSelectors";

const HomeNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const cartCount = useAppSelector(selectCartCount);
  const wishCount = useAppSelector(selectWishlistCount);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 40));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <header className={`dd-nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="dd-container dd-nav-inner">
        <div className="dd-nav-left">
          <button
            type="button"
            className="dd-icon-btn dd-burger"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <FaBars size={18} />
          </button>
          <nav className="dd-nav-links" aria-label="Primary">
            {NAV_CATEGORIES.map((c) => (
              <Link
                key={c.id}
                to={c.path}
                className={`dd-nav-link${pathname === c.path ? " is-active" : ""}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                {c.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link to="/dashboard" className="dd-wordmark" aria-label="Darling Desire — home">
          Darling <span>Desire</span>
        </Link>

        <div className="dd-nav-actions">
          <button type="button" className="dd-icon-btn dd-hide-sm" aria-label="My account" onClick={() => go("/userprofile")}>
            <FaUser size={16} />
          </button>
          <button type="button" className="dd-icon-btn" aria-label={`Wishlist, ${wishCount} items`} onClick={() => go("/wishlist")}>
            <FaRegHeart size={17} />
            {wishCount > 0 && <span className="dd-count">{wishCount > 99 ? "99+" : wishCount}</span>}
          </button>
          <button type="button" className="dd-icon-btn" aria-label={`Cart, ${cartCount} items`} onClick={() => go("/cart")}>
            <FaShoppingBag size={16} />
            {cartCount > 0 && <span className="dd-count" data-testid="home-cart-count">{cartCount > 99 ? "99+" : cartCount}</span>}
          </button>
          <button type="button" className="dd-nav-login" onClick={() => go("/login")}>
            Login
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="dd-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="dd-drawer-top">
              <span className="dd-wordmark">Darling <span>Desire</span></span>
              <button type="button" className="dd-icon-btn" aria-label="Close menu" onClick={() => setOpen(false)}>
                <FaTimes size={20} />
              </button>
            </div>
            <nav className="dd-drawer-links" aria-label="Mobile">
              {NAV_CATEGORIES.map((c, idx) => (
                <motion.button
                  type="button"
                  key={c.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + idx * 0.06, duration: 0.5 }}
                  onClick={() => go(c.path)}
                >
                  <small>0{idx + 1}</small>
                  {c.label}
                </motion.button>
              ))}
            </nav>
            <div className="dd-drawer-foot">
              <button type="button" onClick={() => go("/wishlist")}>Wishlist{wishCount > 0 ? ` (${wishCount})` : ""}</button>
              <button type="button" onClick={() => go("/cart")}>Cart{cartCount > 0 ? ` (${cartCount})` : ""}</button>
              <button type="button" onClick={() => go("/userprofile")}>Account</button>
              <button type="button" onClick={() => go("/login")}>Login</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default HomeNav;
