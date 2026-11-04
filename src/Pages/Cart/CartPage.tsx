import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AnimatePresence } from "framer-motion";
import { FaArrowRight, FaCheckCircle, FaShoppingBag, FaTag } from "react-icons/fa";
import StoreShell from "@/components/layout/StoreShell";
import StoreHero from "@/components/layout/StoreHero";
import CartItem, { type CartLine } from "@/components/data-display/CartItem";
import CartSummary, { FeesToggle, type SummaryRow } from "@/components/data-display/CartSummary";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Route: /cart — all state, pricing and Redux actions are unchanged; only the presentation is new. */
const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems: CartLine[] = useSelector((state: { cart: { cartItems: CartLine[] } }) => state.cart.cartItems);
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  // Same estimate as before (today + 5 days), computed once per visit.
  const [deliveryDate] = useState(() =>
    new Date(Date.now() + 5 * 86400000).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
  );

  const handleProceed = () => {
    window.scrollTo(0, 0);
    navigate("/buynow");
  };

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const removeItem = (id: number, size?: string) => {
    Swal.fire({
      title: "Remove item?",
      text: "This item will be removed from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      cancelButtonText: "No, keep",
      confirmButtonColor: "#4A101C",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart({ id, size }));
        Swal.fire({ title: "Removed!", icon: "success", timer: 1500, showConfirmButton: false });
      }
    });
  };

  const toggleWishlist = (id: number) => {
    setWishlistItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  // ---- pricing: identical to the previous implementation ----
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const fees = 7;
  const shipping = subtotal > 5000 ? 0 : 299;
  const savings = cartItems.reduce((s, i) => s + ((i.originalPrice || i.price) - i.price) * i.quantity, 0) + discount;
  const mrp = cartItems.reduce((s, i) => s + (i.originalPrice || i.price) * i.quantity, 0);
  const total = subtotal - discount + fees;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setTimeout(() => setPromoError(false), 2500);
    }
  };

  if (cartItems.length === 0) {
    return (
      <StoreShell>
        <StoreHero eyebrow="Your Bag" title="Nothing here" accent="yet." subtitle="Your bag is empty." />
        <main className="st-main">
          <div className="dd-container">
            <div className="st-empty" role="status">
              <span className="st-empty-mark" aria-hidden="true"><FaShoppingBag size={26} /></span>
              <h2>Your bag is empty</h2>
              <p>Looks like you haven’t added anything yet.</p>
              <Link to="/dashboard" className="dd-btn dd-btn--dark" onClick={() => window.scrollTo(0, 0)}>Continue shopping <FaArrowRight size={11} /></Link>
            </div>
          </div>
        </main>
      </StoreShell>
    );
  }

  const rows: SummaryRow[] = [
    { label: "MRP", value: inr(mrp) },
    ...(savings > 0 ? [{ label: "Discounts", value: `−${inr(savings)}`, tone: "good" as const }] : []),
    ...(promoApplied ? [{ label: "Coupon (SAVE10)", value: `−${inr(discount)}`, tone: "good" as const }] : []),
    { label: <FeesToggle fee={fees} />, value: inr(fees) },
    { label: "Delivery charges", value: subtotal >= 5000 ? "FREE" : inr(shipping), tone: subtotal >= 5000 ? ("good" as const) : undefined },
  ];

  return (
    <StoreShell>
      <StoreHero
        eyebrow="Your Bag"
        title="Review your"
        accent="selection."
        subtitle={`${cartItems.length} ${cartItems.length === 1 ? "item" : "items"} ready for checkout`}
      />

      <main className="st-main st-main--cart">
        <div className="dd-container st-cols">
          <section className="st-col-main" aria-label="Items in your bag">
            <ul className="st-lines">
              <AnimatePresence initial={false}>
                {cartItems.map((item) => (
                  <CartItem
                    key={`${item.id}-${item.size}`}
                    item={item}
                    deliveryDate={deliveryDate}
                    wished={wishlistItems.includes(item.id)}
                    onQty={handleUpdateQuantity}
                    onRemove={removeItem}
                    onToggleWish={toggleWishlist}
                    onBuy={handleProceed}
                  />
                ))}
              </AnimatePresence>
            </ul>

            <div className="st-promo">
              <label htmlFor="st-promo-input"><FaTag size={12} /> Promo code</label>
              <div className="st-promo-row">
                <input
                  id="st-promo-input"
                  type="text"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => { setPromoCode(e.target.value); setPromoApplied(false); }}
                  onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                />
                <button type="button" onClick={applyPromo}>Apply</button>
              </div>
              {promoApplied && <p className="st-msg st-msg--ok" role="status"><FaCheckCircle size={11} /> Code SAVE10 applied — 10% discount</p>}
              {promoError && <p className="st-msg st-msg--err" role="alert">Invalid promo code.</p>}
            </div>

            <Link to="/dashboard" className="st-continue" onClick={() => window.scrollTo(0, 0)}>← Continue shopping</Link>
          </section>

          <div className="st-col-side">
            <CartSummary
              title={`Order summary (${cartItems.length} ${cartItems.length === 1 ? "item" : "items"})`}
              rows={rows}
              totalLabel="Total amount"
              total={total}
              strike={mrp}
              savings={savings}
              cta={<button type="button" className="dd-btn dd-btn--gold st-block" onClick={handleProceed}>Proceed to checkout</button>}
            />
          </div>
        </div>
      </main>

      <div className="st-sticky" role="region" aria-label="Checkout">
        <div><small>Total</small><b>{inr(total)}</b></div>
        <button type="button" className="dd-btn dd-btn--gold" onClick={handleProceed}>Checkout</button>
      </div>
    </StoreShell>
  );
};

export default CartPage;
