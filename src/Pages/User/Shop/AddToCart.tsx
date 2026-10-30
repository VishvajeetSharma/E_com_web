import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Heading";
import { Footer } from "../../../components/Footer/Footer";
import Swal from "sweetalert2";
import {
  FaTrashAlt,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaCreditCard,
  FaPaypal,
  FaGooglePay,
  FaApplePay,
  FaTag,
  FaGift,
  FaShieldAlt,
  FaHeart,
  FaRegHeart,
  FaBolt,
  FaStar,
  FaCheckCircle,
  FaChevronDown,
} from "react-icons/fa";
const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [expandedFees, setExpandedFees] = useState(false);
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
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart({ id, size }));
        Swal.fire({
          title: "Removed!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };
  const toggleWishlist = (id: number) => {
    setWishlistItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  const subtotal = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const fees = 7;
  const shipping = subtotal > 5000 ? 0 : 299;
  const savings =
    cartItems.reduce(
      (s: number, i: any) =>
        s + ((i.originalPrice || i.price) - i.price) * i.quantity,
      0
    ) + discount;
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
      <>
        <Header />
        <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center py-12">
          <div className="bg-white rounded-sm shadow-sm px-6 sm:px-12 py-12 sm:py-16 text-center max-w-sm w-full mx-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5">
              <video
                src="/Cart.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="mx-auto"
              ></video>
            </div>
            <h2 className="text-base sm:text-lg font-medium text-gray-800 mb-1">
              Your cart is empty!
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mb-5 sm:mb-6">
              Add items to it now.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 sm:px-8 py-2 sm:py-2.5 bg-linear-to-r from-pink-500 to-purple-600 text-white text-xs sm:text-sm font-semibold rounded-sm hover:shadow-md transition"
            >
              Shop Now
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
        .cart-wrap * { font-family: 'DM Sans', sans-serif; }
        .qty-btn { width:28px; height:28px; border-radius:50%; border:1.5px solid #db2777; display:flex; align-items:center; justify-content:center; background:#fff; cursor:pointer; transition:all .15s; color:#db2777; }
        .qty-btn:hover { background:#fdf2f8; }
        .save-badge { background:#388e3c; color:#fff; font-size:9px; font-weight:700; padding:1px 5px; border-radius:2px; }
        .action-btn { display:flex; align-items:center; gap:5px; padding:8px 0; font-size:11px; color:#555; cursor:pointer; border:none; background:none; transition:color .15s; flex:1; justify-content:center; }
        .action-btn:hover { color:#db2777; }
        .place-btn { width:100%; padding:12px; background:linear-gradient(135deg,#db2777,#9333ea); color:#fff; font-size:13px; font-weight:700; letter-spacing:.05em; border:none; cursor:pointer; transition:all .2s; border-radius:2px; }
        .place-btn:hover { opacity:.92; box-shadow:0 4px 16px rgba(219,39,119,.3); }
        .star { color:#ff9f00; font-size:9px; }
      `}</style>
      <div className="cart-wrap min-h-screen bg-[#f1f3f6]">
        <Header />
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-5">
          {/* Page title */}
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex md:hidden items-center gap-1 text-pink-600 hover:text-pink-700 text-xs transition"
            >
              <FaArrowLeft size={10} /> Back
            </button>
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-5 sm:h-7 rounded-full bg-linear-to-b from-pink-500 to-purple-600" />
              <h1 className="text-base sm:text-xl font-bold text-gray-800">
                Shopping Cart
                <span className="text-pink-400 font-normal text-xs sm:text-base ml-1">
                  ({cartItems.length}{" "}
                  {cartItems.length === 1 ? "item" : "items"})
                </span>
              </h1>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 w-full">
            {/* LEFT — Cart Items */}
            <div className="flex-1 min-w-0 w-full lg:w-auto">
              {/* Deliver to strip */}
              {/* <div className="bg-white border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between mb-0.5 w-full ">
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                  <FaTruck className="text-pink-500" size={12} />
                  <span className="text-xs sm:text-sm">
                    Deliver to: <strong>Home Address</strong>
                  </span>
                </div>
                <button className="text-[10px] sm:text-xs font-semibold text-pink-600 border border-pink-300 px-2 sm:px-3 py-0.5 sm:py-1 rounded-sm hover:bg-pink-50 transition">
                  Change
                </button>
              </div> */}
              {/* Items */}
              <div className="bg-white border border-gray-200 w-full ">
                {cartItems.map((item: any, idx: number) => {
                  const discountPct = item.originalPrice
                    ? Math.round(
                        ((item.originalPrice - item.price) /
                          item.originalPrice) *
                          100
                      )
                    : null;
                  const deliveryDate = new Date(
                    Date.now() + 5 * 86400000
                  ).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  });
                  return (
                    <div
                      key={`${item.id}-${item.size}`}
                      className={`px-3 sm:px-4 py-3 sm:py-5 w-full ${
                        idx < cartItems.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      }`}
                    >
                      <div className="flex gap-3 sm:gap-4 w-full">
                        {/* Image */}
                        <div className="relative shrink-0 flex flex-col gap-2 sm:gap-4">
                          <div>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-sm border border-gray-100"
                            />
                            {discountPct && discountPct > 0 && (
                              <div className="absolute top-0.5 left-0.5 save-badge">
                                {discountPct}%
                              </div>
                            )}
                          </div>
                          {/* Qty control */}
                          <div className="flex items-center rounded-lg border border-gray-100 overflow-hidden">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center transition-all hover:bg-white/60 active:scale-90"
                              style={{
                                borderRight: "1px solid rgba(249,168,212,0.4)",
                              }}
                            >
                              <FaMinus size={7} style={{ color: "#db2777" }} />
                            </button>
                            <span className="w-7 sm:w-9 text-center text-xs sm:text-sm font-bold text-pink-600">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center transition-all hover:bg-white/60 active:scale-90"
                              style={{
                                borderLeft: "1px solid rgba(249,168,212,0.4)",
                              }}
                            >
                              <FaPlus size={7} style={{ color: "#db2777" }} />
                            </button>
                          </div>
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 w-full">
                            <div className="flex-1 min-w-0">
                              <p className="text-[9px] sm:text-[11px] text-gray-400 uppercase tracking-wide font-semibold mb-0.5">
                                {item.category || "Fashion"}
                              </p>
                              <h3 className="text-xs sm:text-sm font-medium text-gray-800 leading-snug line-clamp-2 mb-1">
                                {item.name}
                              </h3>
                              {/* Rating */}
                              <div className="flex items-center gap-0.5 mb-1 sm:mb-2">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <FaStar
                                    key={s}
                                    className="star"
                                    style={{
                                      color: s <= 4 ? "#ff9f00" : "#e0e0e0",
                                    }}
                                  />
                                ))}
                                <span className="text-[9px] sm:text-[11px] text-gray-400 ml-0.5">
                                  4.2
                                </span>
                              </div>
                              {/* Variants */}
                              <div className="flex flex-wrap gap-1.5 sm:gap-3 mb-1.5 sm:mb-2">
                                {item.size && (
                                  <span className="text-[9px] sm:text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-sm">
                                    Size: {item.size}
                                  </span>
                                )}
                                {item.color && (
                                  <span className="text-[9px] sm:text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-sm">
                                    Color: {item.color}
                                  </span>
                                )}
                              </div>
                              {/* Price row */}
                              <div className="flex items-baseline flex-wrap gap-1.5 sm:gap-2">
                                <span className="text-sm sm:text-lg font-bold text-gray-900">
                                  ₹{item.price.toLocaleString("en-IN")}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-[10px] sm:text-sm text-gray-400 line-through">
                                    ₹
                                    {item.originalPrice.toLocaleString("en-IN")}
                                  </span>
                                )}
                                {discountPct && discountPct > 0 && (
                                  <span className="text-[9px] sm:text-sm font-semibold text-green-600">
                                    {discountPct}% off
                                  </span>
                                )}
                              </div>
                              {/* Only few left */}
                              <p className="text-[9px] sm:text-xs font-semibold text-red-500 mt-0.5 sm:mt-1">
                                Only few left
                              </p>
                            </div>
                            {/* Wishlist toggle */}
                            <button
                              onClick={() => toggleWishlist(item.id)}
                              className="shrink-0 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-pink-50 transition"
                            >
                              {wishlistItems.includes(item.id) ? (
                                <FaHeart className="text-pink-500" size={12} />
                              ) : (
                                <FaRegHeart
                                  className="text-gray-400"
                                  size={12}
                                />
                              )}
                            </button>
                          </div>
                          {/* Delivery info */}
                          <div className="flex items-center gap-1 mt-1.5 text-[9px] sm:text-xs text-gray-500">
                            <FaCheckCircle
                              className="text-green-500"
                              size={9}
                            />
                            Delivery by <strong>{deliveryDate}</strong>
                            <span className="text-green-600 ml-0.5">FREE</span>
                          </div>
                        </div>
                      </div>
                      {/* Action buttons row */}
                      <div className="flex items-center mt-2  sm:mt-3 pt-1 border-t border-gray-100 w-full">
                        <button
                          className="action-btn"
                          onClick={() => removeItem(item.id, item.size)}
                        >
                          <FaTrashAlt size={11} /> Remove
                        </button>
                        <button className="action-btn" onClick={handleProceed}>
                          <FaBolt size={11} style={{ color: "#ff9f00" }} /> Buy
                          now
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Promo code */}
              <div className="bg-white border border-gray-200 px-3 sm:px-4 py-3 sm:py-4 mt-0.5 flex gap-2 w-full">
                <FaTag className="text-pink-400 mt-2 shrink-0" size={12} />
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                    setPromoApplied(false);
                  }}
                  className="flex-1 text-xs sm:text-sm border-none outline-none text-gray-700 placeholder:text-gray-400"
                />
                <button
                  onClick={applyPromo}
                  className="text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-700 transition px-2 shrink-0"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="bg-green-50 border border-green-200 text-green-700 text-[10px] sm:text-xs px-3 sm:px-4 py-2 flex items-center gap-1 w-full">
                  <FaCheckCircle size={10} /> Code SAVE10 applied — 10%
                  discount!
                </p>
              )}
              {promoError && (
                <p className="bg-red-50 border border-red-200 text-red-600 text-[10px] sm:text-xs px-3 sm:px-4 py-2 w-full">
                  Invalid promo code. Try SAVE10
                </p>
              )}
            </div>
            {/* RIGHT — Price Details */}
            <div className="w-full lg:w-96 shrink-0 lg:sticky lg:top-20">
              <div className="bg-white border border-gray-200 w-full">
                <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100">
                  <p className="text-[9px] sm:text-xs font-bold text-gray-400 uppercase tracking-wide">
                    Price Details ({cartItems.length}{" "}
                    {cartItems.length === 1 ? "item" : "items"})
                  </p>
                </div>
                <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-2 border-b border-gray-100">
                  <div className="flex justify-between text-xs sm:text-sm text-gray-700">
                    <span>MRP</span>
                    <span>
                      ₹
                      {cartItems
                        .reduce(
                          (s: number, i: any) =>
                            s + (i.originalPrice || i.price) * i.quantity,
                          0
                        )
                        .toLocaleString("en-IN")}
                    </span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-700">Discounts</span>
                      <span className="text-green-600 font-medium">
                        −₹{savings.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                  {promoApplied && (
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-700">Coupon (SAVE10)</span>
                      <span className="text-green-600 font-medium">
                        −₹{discount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs sm:text-sm">
                    <button
                      className="flex items-center gap-1 text-gray-700 hover:text-pink-600 transition"
                      onClick={() => setExpandedFees((p) => !p)}
                    >
                      Fees{" "}
                      <FaChevronDown
                        size={8}
                        className={`transition-transform ${
                          expandedFees ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <span className="text-gray-700">₹{fees}</span>
                  </div>
                  {expandedFees && (
                    <div className="text-[10px] sm:text-xs text-gray-400 bg-gray-50 rounded px-2 sm:px-3 py-1.5">
                      Platform fee: ₹{fees} (non-refundable)
                    </div>
                  )}
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-700">Delivery Charges</span>
                    <span>
                      {subtotal >= 5000 ? (
                        <span className="text-green-600 font-medium">FREE</span>
                      ) : (
                        <span className="text-gray-700">₹{shipping}</span>
                      )}
                    </span>
                  </div>
                </div>
                <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100 flex justify-between items-center">
                  <span className="font-bold text-gray-800 text-sm sm:text-base">
                    Total Amount
                  </span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">
                    ₹{(subtotal - discount + fees).toLocaleString("en-IN")}
                  </span>
                </div>
                {savings + discount > 0 && (
                  <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-green-50 flex items-center gap-1.5 sm:gap-2">
                    <FaGift className="text-green-600 shrink-0" size={11} />
                    <p className="text-[9px] sm:text-xs text-green-700 font-semibold">
                      Save ₹{(savings + discount).toLocaleString("en-IN")}!
                    </p>
                  </div>
                )}
                <div className="px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-1.5 sm:gap-2 border-t border-gray-100">
                  <FaShieldAlt className="text-gray-400 shrink-0" size={12} />
                  <p className="text-[9px] sm:text-xs text-gray-500">
                    Secure payments. Easy returns. 100% Authentic.
                  </p>
                </div>
              </div>
              <div className="mt-0.5 bg-white border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 w-full">
                <div className="flex items-baseline gap-2 mb-2 sm:mb-3">
                  <span className="text-gray-400 line-through text-[10px] sm:text-sm">
                    ₹
                    {cartItems
                      .reduce(
                        (s: number, i: any) =>
                          s + (i.originalPrice || i.price) * i.quantity,
                        0
                      )
                      .toLocaleString("en-IN")}
                  </span>
                  <span className="text-base sm:text-xl font-bold text-gray-900">
                    ₹{(subtotal - discount + fees).toLocaleString("en-IN")}
                  </span>
                </div>
                <button className="place-btn" onClick={handleProceed}>
                  Place Order
                </button>
              </div>
              <div className="bg-white border border-gray-200 mt-0.5 px-3 sm:px-4 py-2 sm:py-3 w-full">
                <p className="text-[8px] sm:text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1.5 sm:mb-2 text-center">
                  Secure payments via
                </p>
                <div className="flex justify-center gap-3 sm:gap-4 text-gray-300">
                  <FaCreditCard size={16} />
                  <FaPaypal size={16} />
                  <FaGooglePay size={16} />
                  <FaApplePay size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default CartPage;
