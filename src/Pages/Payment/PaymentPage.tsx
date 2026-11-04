import { useRef, useState } from "react";
import { FaLock, FaRupeeSign, FaWallet, FaCreditCard, FaInfoCircle } from "react-icons/fa";
import { SiGooglepay } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { clearCart } from "@/store/slices/cartSlice";
import { placeOrder } from "@/store/slices/orderSlice";
import StoreShell from "@/components/layout/StoreShell";
import StoreHero from "@/components/layout/StoreHero";
import CheckoutStepper from "@/components/data-display/CheckoutStepper";
import PaymentMethodSelector, { type PayOption } from "@/Pages/Payment/components/PaymentMethodSelector";
import PaymentSummary from "@/components/data-display/PaymentSummary";
import OrderReview from "@/Pages/Checkout/components/OrderReview";
import type { CartLine } from "@/components/data-display/CartItem";
import "@/styles/checkout.css";

const paymentOptions: PayOption[] = [
  { id: "card", title: "Credit / Debit Card", icon: FaCreditCard },
  { id: "upi", title: "UPI / Google Pay", hint: "Google Pay, PhonePe, Paytm", icon: SiGooglepay },
  { id: "cod", title: "Cash on Delivery", icon: FaRupeeSign },
  { id: "wallet", title: "Wallet", icon: FaWallet },
];

const EMPTY_CARD = { cardNumber: "", expiry: "", cvv: "" };

/** Same order object the page has always dispatched (note: paymentStatus is "paid" for every method — simulated). */
function buildOrder(items: CartLine[], amount: number, paymentMethod: string) {
  const now = Date.now();
  return {
    id: String(now),
    orderId: `ORD-${now}`,
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    items: [...items],
    amount,
    paymentMethod,
    paymentStatus: "paid",
    status: "processing",
    date: new Date().toISOString(),
    estimatedDelivery: null,
    trackingId: null,
  };
}

/**
 * Route: /payment.
 * IMPORTANT (unchanged behaviour): payment is simulated on the front end — a 1.5s delay, then the order is
 * recorded as paymentStatus "paid" for every method. No gateway is called and card details go nowhere.
 */
const PaymentSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const submitting = useRef(false); // blocks double-submits that land before the disabled state renders
  const cartItem: CartLine[] = useSelector((state: { cart: { cartItems: CartLine[] } }) => state.cart.cartItems);

  const subtotal = cartItem.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
  const deliveryCharge = subtotal > 999 ? 0 : 99;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryCharge + gst;

  const handlePlaceOrder = async () => {
    if (submitting.current) return;
    if (!paymentMethod) {
      Swal.fire({ title: "Select payment method", icon: "warning" });
      return;
    }
    if (cartItem.length === 0) {
      Swal.fire({ title: "Cart is empty", icon: "error" });
      return;
    }

    submitting.current = true;
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowSuccess(true);

    const newOrder = buildOrder(cartItem, total, paymentMethod);

    dispatch(placeOrder(newOrder));
    dispatch(clearCart());
    setCardDetails(EMPTY_CARD);

    window.scrollTo(0, 0);
    navigate("/orderPlaced");
  };

  const [cardDetails, setCardDetails] = useState(EMPTY_CARD);
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const name = e.target.name;
    if (name === "cardNumber") {
      value = value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
      if (value.length > 19) return;
    }
    if (name === "expiry") {
      value = value.replace(/\//g, "").replace(/(.{2})/, "$1/").trim();
      if (value.length > 5) return;
    }
    if (name === "cvv" && value.length > 3) return;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  return (
    <StoreShell minimal backLabel="Back">
      <StoreHero eyebrow="Checkout" title="Choose how to" accent="pay." subtitle="Select a payment method to place your order." />
      <main className="st-main">
        <div className="dd-container">
          <CheckoutStepper current={2} />

          <p className="ck-demo" role="note">
            <FaInfoCircle size={14} />
            <span><b>Demo checkout.</b> No real payment is taken and no gateway is contacted. Card details stay in this page and are never sent or stored.</span>
          </p>

          <div className="st-cols ck-cols">
            <div className="st-col-main">
              <section className="ck-panel" aria-labelledby="ck-pay-title">
                <header className="ck-panel-head">
                  <span className="ck-num"><FaLock size={11} /></span>
                  <h2 id="ck-pay-title">Payment method</h2>
                </header>
                <PaymentMethodSelector
                  options={paymentOptions}
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                  card={cardDetails}
                  onCardChange={handleCardChange}
                  disabled={isProcessing}
                />
              </section>
              <section className="ck-panel" aria-labelledby="ck-items-title">
                <header className="ck-panel-head">
                  <span className="ck-num">{cartItem.length}</span>
                  <h2 id="ck-items-title">Your items</h2>
                </header>
                {cartItem.length ? <OrderReview items={cartItem} /> : <p className="ck-delivery-note">Your bag is empty. <Link to="/dashboard">Continue shopping</Link></p>}
              </section>
            </div>

            <div className="st-col-side">
              <PaymentSummary
                itemCount={cartItem.length}
                subtotal={subtotal}
                deliveryCharge={deliveryCharge}
                gst={gst}
                total={total}
                note="Simulated payment — no charge is made."
                cta={
                  isProcessing ? (
                    <button type="button" className="dd-btn dd-btn--gold st-block" disabled aria-busy="true"><span className="ck-spin" aria-hidden="true" /> Processing…</button>
                  ) : showSuccess ? (
                    <button type="button" className="dd-btn dd-btn--gold st-block" disabled>Order placed ✓</button>
                  ) : (
                    <button type="button" className="dd-btn dd-btn--gold st-block" disabled={!paymentMethod} onClick={handlePlaceOrder}>
                      {paymentMethod ? `Place order · ₹${total.toLocaleString("en-IN")}` : "Select a payment method"}
                    </button>
                  )
                }
              />
            </div>
          </div>
        </div>
      </main>
    </StoreShell>
  );
};

export default PaymentSection;
