import { useState } from "react";
import {
  FaTruck,
  FaCreditCard,
  FaShieldAlt,
  FaRupeeSign,
  FaLock,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";
import { SiGooglepay } from "react-icons/si";
import { ConfettiButton } from "../../../components/acertunity/confettiButtonVariants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../../redux/cartSlice";
import Header from "../../../components/Header/Heading";
import { placeOrder } from "../../../redux/OrderSlice";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Footer } from "../../../components/Footer/Footer";

const PaymentSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const cartItem = useSelector((state: any) => state.cart.cartItems);
  const subtotal = cartItem.reduce(
    (sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 0),
    0,
  );
  const deliveryCharge = subtotal > 999 ? 0 : 99;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryCharge + gst;

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      Swal.fire({ title: "Select payment method", icon: "warning" });
      return;
    }
    if (cartItem.length === 0) {
      Swal.fire({ title: "Cart is empty", icon: "error" });
      return;
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowSuccess(true);

  
    const newOrder = {
      id: String(Date.now()),
      orderId: `ORD-${Date.now()}`,
      customerName: "", 
      customerEmail: "",
      customerPhone: "",
      items: [...cartItem],
      amount: total, 
      paymentMethod,
      paymentStatus: "paid", 
      status: "processing",
      date: new Date().toISOString(),
      estimatedDelivery: null,
      trackingId: null,
    };

    dispatch(placeOrder(newOrder));
    dispatch(clearCart());

 
    window.scrollTo(0, 0);
    navigate("/orderPlaced");
  };

  const paymentOptions = [
    {
      id: "card",
      title: "Credit / Debit Card",
      icon: FaCreditCard,
      iconColor: "text-purple-500",
    },
    {
      id: "upi",
      title: "UPI / Google Pay",
      icon: SiGooglepay,
      iconColor: "text-blue-500",
    },
    {
      id: "cod",
      title: "Cash on Delivery",
      icon: FaRupeeSign,
      iconColor: "text-green-500",
    },
    {
      id: "wallet",
      title: "Wallet",
      icon: FaWallet,
      iconColor: "text-orange-500",
    },
  ];

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const name = e.target.name;
    if (name === "cardNumber") {
      value = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
      if (value.length > 19) return;
    }
    if (name === "expiry") {
      value = value
        .replace(/\//g, "")
        .replace(/(.{2})/, "$1/")
        .trim();
      if (value.length > 5) return;
    }
    if (name === "cvv" && value.length > 3) return;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-pink-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <button
              onClick={() => window.history.back()}
              className="md:hidden flex items-center gap-1 text-gray-400 hover:text-gray-600 text-sm mb-4 transition"
            >
              ← Back to cart
            </button>
            <div className="mb-8">
              <div className="flex items-start gap-3">
                <div className="w-1 h-12 bg-linear-to-b from-pink-500 to-pink-300 rounded-full"></div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 font-google tracking-tight">
                    Secure Checkout
                  </h1>
                  <p className="text-gray-500 text-sm mt-1 font-google">
                    Complete your purchase safely and securely
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                      <FaLock size={10} className="text-green-500" />
                      <span className="text-xs text-gray-500">
                        SSL Encrypted
                      </span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                    <div className="flex items-center gap-1.5">
                      <FaShieldAlt size={10} className="text-green-500" />
                      <span className="text-xs text-gray-500">
                        Buyer Protection
                      </span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                    <div className="flex items-center gap-1.5">
                      <FaCheckCircle size={10} className="text-green-500" />
                      <span className="text-xs text-gray-500">
                        Instant Refund
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* LEFT — PAYMENT METHODS */}
            <div className="lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm border border-[#d5d9d9] overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-gray-800 font-medium text-lg flex items-center gap-2">
                    <FaLock size={16} className="text-gray-400" />
                    Select Payment Method
                  </h2>
                </div>
                <div className="p-5 space-y-3">
                  {paymentOptions.map((option, idx) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`border rounded-lg transition-all duration-200 cursor-pointer ${
                        paymentMethod === option.id
                          ? "border-pink-300 bg-pink-50/30"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setPaymentMethod(option.id)}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center ${paymentMethod === option.id ? "scale-105" : ""}`}
                            >
                              <option.icon
                                size={20}
                                className={option.iconColor}
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  checked={paymentMethod === option.id}
                                  onChange={() => setPaymentMethod(option.id)}
                                  className="w-4 h-4 accent-pink-500 cursor-pointer"
                                />
                                <span className="font-medium text-gray-800 font-google">
                                  {option.title}
                                </span>
                              </div>
                              {option.id === "upi" && (
                                <p className="text-xs text-gray-400 mt-0.5 font-google">
                                  Google Pay, PhonePe, Paytm
                                </p>
                              )}
                            </div>
                          </div>
                          {paymentMethod === option.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center"
                            >
                              <FaCheckCircle size={12} className="text-white" />
                            </motion.div>
                          )}
                        </div>
                        {option.id === "card" && paymentMethod === "card" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 space-y-3 pl-7 font-google border-l-2 border-pink-200"
                          >
                            <input
                              type="text"
                              name="cardNumber"
                              placeholder="Card Number"
                              value={cardDetails.cardNumber}
                              onChange={handleCardChange}
                              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-200 transition-all"
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                name="expiry"
                                placeholder="MM/YY"
                                value={cardDetails.expiry}
                                onChange={handleCardChange}
                                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-200 transition-all"
                              />
                              <input
                                type="password"
                                name="cvv"
                                placeholder="CVV"
                                value={cardDetails.cvv}
                                onChange={handleCardChange}
                                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-200 transition-all"
                              />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/349/349221.png"
                                alt="visa"
                                className="h-3"
                              />
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/349/349228.png"
                                alt="mastercard"
                                className="h-3"
                              />
                              <span className="ml-auto font-google">
                                Secure & encrypted
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-gray-50/50 px-6 py-3 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-5">
                    <div className="flex items-center gap-1.5">
                      <FaLock size={10} className="text-green-500" />
                      <span className="text-xs text-gray-500 font-google">
                        SSL Secure
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaShieldAlt size={10} className="text-green-500" />
                      <span className="text-xs text-gray-500 font-google">
                        Protection
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaCheckCircle size={10} className="text-green-500" />
                      <span className="text-xs text-gray-500 font-google">
                        Refund
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT — ORDER SUMMARY */}
            <div className="lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-[#d5d9d9] sticky top-20 overflow-hidden"
              >
                <div className="px-5 py-4 border-b border-gray-100">
                  <h2 className="text-gray-800 font-medium text-lg flex items-center justify-between font-google">
                    <span>Order Summary</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600 font-google">
                      {cartItem.length}{" "}
                      {cartItem.length === 1 ? "Item" : "Items"}
                    </span>
                  </h2>
                </div>
                <div className="p-5">
                  <div className="space-y-2 pt-3 border-t border-gray-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-google">
                        Subtotal
                      </span>
                      <span className="text-gray-700 font-google">
                        ₹{subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-google">
                        Delivery
                      </span>
                      <span
                        className={
                          deliveryCharge === 0
                            ? "text-green-600"
                            : "text-gray-700"
                        }
                      >
                        {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-google">
                        GST (5%)
                      </span>
                      <span className="text-gray-700 font-google">₹{gst}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg mt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800 font-google">
                          Total
                        </span>
                        <span className="text-lg font-bold text-pink-600">
                          ₹{total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    onClick={handlePlaceOrder}
                    disabled={!paymentMethod || isProcessing}
                    whileHover={paymentMethod ? { scale: 1.01 } : {}}
                    whileTap={paymentMethod ? { scale: 0.99 } : {}}
                    className={`w-full py-3 mt-5 rounded-lg font-medium transition-all ${
                      paymentMethod && !isProcessing
                        ? "bg-pink-500 text-white hover:bg-pink-600 shadow-sm"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : showSuccess ? (
                      <div className="flex items-center justify-center gap-2">
                        <FaCheckCircle size={14} />
                        Order Placed
                      </div>
                    ) : (
                      <ConfettiButton
                        icon={<Sparkles className="h-4 w-4" />}
                        confettiOptions={{ particleCount: 100, spread: 70 }}
                      >
                        {`Place Order • ₹${total.toLocaleString()}`}
                      </ConfettiButton>
                    )}
                  </motion.button>

                  <div className="mt-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FaTruck size={12} className="text-gray-400" />
                      <span>Free delivery above ₹999</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FaShieldAlt size={12} className="text-gray-400" />
                      <span>Secure payment guaranteed</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FaCreditCard size={12} className="text-gray-400" />
                      <span>Easy returns within 7 days</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 text-center border-t border-gray-100">
                    <p className="text-[10px] text-gray-400">
                      By placing order, you agree to our Terms & Conditions
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PaymentSection;
