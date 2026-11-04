import { useRef, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import { Footer } from "@/components/layout/Footer";
import HomeNav from "@/components/layout/Navbar";
import { useHomeAnimations } from "@/hooks/useRevealAnimations";
import "@/styles/storefront.css";
import "@/styles/store.css";

interface Props {
  children: ReactNode;
  /** Distraction-free header for checkout pages (Buy Now, Payment). */
  minimal?: boolean;
  backLabel?: string;
  className?: string;
}

const CheckoutHeader = ({ backLabel }: { backLabel: string }) => {
  const navigate = useNavigate();
  return (
    <header className="st-cohead">
      <div className="dd-container st-cohead-in">
        <button type="button" className="st-cohead-back" onClick={() => { navigate(-1); window.scrollTo(0, 0); }}>
          <FaArrowLeft size={12} /> <span>{backLabel}</span>
        </button>
        <Link to="/dashboard" className="dd-wordmark" aria-label="Darling Desire — home">Darling <span>Desire</span></Link>
        <p className="st-cohead-lock"><FaLock size={11} /> <span>Checkout</span></p>
      </div>
    </header>
  );
};

/** Shared page frame for the account / bag / checkout pages. Reuses the homepage nav + footer styling. */
const StoreShell = ({ children, minimal = false, backLabel = "Back", className = "" }: Props) => {
  const root = useRef<HTMLDivElement>(null);
  useHomeAnimations(root);
  return (
    <div ref={root} className={`dd-home st ${className}`}>
      {minimal ? <CheckoutHeader backLabel={backLabel} /> : <HomeNav />}
      {children}
      {minimal ? (
        <footer className="st-slimfoot"><div className="dd-container"><span>© {new Date().getFullYear()} Darling Desire</span><Link to="/faq">Help</Link><Link to="/contact">Contact</Link></div></footer>
      ) : (
        <div className="dd-home-footer"><Footer /></div>
      )}
    </div>
  );
};

export default StoreShell;
