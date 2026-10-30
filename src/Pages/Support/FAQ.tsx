import React, { useState } from "react";
import {
  FaShoppingBag, FaCreditCard, FaTruck, FaUndo,
  FaUserCircle, FaBoxOpen, FaHeadset, FaChevronDown, FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import Header from "../../components/Header/Heading";

// ── Types ──
interface FAQ { id: string; question: string; answer: string; }
interface Tab  { id: string; label: string; icon: React.ElementType; }

// ── Data ──
const tabs: Tab[] = [
  { id: "orders",   label: "Orders",   icon: FaShoppingBag },
  { id: "payments", label: "Payments", icon: FaCreditCard  },
  { id: "shipping", label: "Shipping", icon: FaTruck       },
  { id: "returns",  label: "Returns",  icon: FaUndo        },
  { id: "account",  label: "Account",  icon: FaUserCircle  },
  { id: "products", label: "Products", icon: FaBoxOpen     },
];

const faqData: Record<string, FAQ[]> = {
  orders: [
    { id: "o1", question: "How can I place an order?",            answer: "Browse products, select size & quantity, click 'Add to Cart', proceed to checkout, fill your details, choose a payment method, and confirm." },
    { id: "o2", question: "How do I track my order?",             answer: "You'll receive a tracking link via email/SMS. You can also track in 'My Orders' after logging in." },
    { id: "o3", question: "Can I cancel my order?",               answer: "Yes, within 1 hour of placing. Go to 'My Orders' and click 'Cancel Order'." },
    { id: "o4", question: "What if my order is delayed?",         answer: "Contact customer support if your order is delayed beyond the estimated delivery date." },
    { id: "o5", question: "How will I know my order is confirmed?", answer: "You'll receive a confirmation email/SMS immediately after successful order placement." },
  ],
  payments: [
    { id: "p1", question: "What payment methods do you accept?",  answer: "Credit/Debit Cards (Visa, MasterCard, RuPay), UPI (Google Pay, PhonePe, Paytm), Net Banking, Wallets, and COD." },
    { id: "p2", question: "Is Cash on Delivery available?",       answer: "Yes, for orders under ₹10,000. A ₹50 fee may apply. Available in select pin codes." },
    { id: "p3", question: "Is online payment secure?",            answer: "Yes. We use SSL encryption and PCI-compliant gateways. Your payment info is never stored." },
    { id: "p4", question: "Why did my payment fail?",             answer: "Possible reasons: insufficient funds, incorrect details, bank issues, or timeout. Try again or use a different method." },
    { id: "p5", question: "When will my refund be processed?",    answer: "Refunds are processed within 5–7 business days after return approval." },
  ],
  shipping: [
    { id: "s1", question: "What are the delivery charges?",       answer: "FREE shipping on orders above ₹2,999. Flat ₹99 for orders below ₹2,999." },
    { id: "s2", question: "How long does delivery take?",         answer: "3–7 business days. Metro cities: 3–4 days; other locations: 5–7 days." },
    { id: "s3", question: "Do you deliver to my location?",       answer: "We deliver across India. Enter your pin code at checkout to confirm availability." },
    { id: "s4", question: "Can I change the delivery address?",   answer: "Yes, within 1 hour of placing the order. After that, the address cannot be modified." },
    { id: "s5", question: "What if I miss the delivery?",         answer: "The delivery partner makes 3 attempts. After that, the order returns and a refund is processed." },
  ],
  returns: [
    { id: "r1", question: "How do I return a product?",           answer: "Initiate within 15 days from 'My Orders'. Select a reason and schedule a pickup." },
    { id: "r2", question: "What is the return policy?",           answer: "15-day easy returns. Items must be unused with original tags. Some categories are non-returnable." },
    { id: "r3", question: "How long does a refund take?",         answer: "5–7 business days after quality check. Refund goes to original payment method." },
    { id: "r4", question: "Can I exchange an item?",              answer: "Yes, for size or colour within 15 days, subject to stock availability." },
    { id: "r5", question: "What if I receive a damaged product?", answer: "Contact us within 48 hours. We'll arrange a pickup and send a replacement immediately." },
  ],
  account: [
    { id: "a1", question: "How do I create an account?",          answer: "Click the login icon, then 'Create New Account'. Fill your details and set a password." },
    { id: "a2", question: "I forgot my password — what do I do?", answer: "Click 'Forgot Password' on the login page and enter your email to receive a reset link." },
    { id: "a3", question: "How do I update my profile?",          answer: "Go to 'My Profile' and click 'Edit' to update your information." },
    { id: "a4", question: "How do I delete my account?",          answer: "Contact customer support to request deletion. Verification takes 7 business days." },
  ],
  products: [
    { id: "pr1", question: "Are products authentic?",             answer: "Yes — 100% authentic, sourced directly from brands or authorised distributors." },
    { id: "pr2", question: "What if a product is out of stock?",  answer: "Click 'Notify Me' to receive an email/SMS alert when it's back." },
    { id: "pr3", question: "How do I check size or details?",     answer: "Each product page has a size chart and detailed specs. Customer reviews are also helpful." },
    { id: "pr4", question: "Will the product come back?",         answer: "Popular items are regularly restocked. Use 'Notify Me' for instant alerts." },
  ],
};

// ── Accordion item ──
const AccordionItem = ({ q, idx }: { q: FAQ; idx: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-200"
      style={{ background: open ? "linear-gradient(135deg,#fdf2f8,#f3e8ff)" : "#fff" }}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 group"
      >
        <div className="flex items-center gap-3">
          {/* Number */}
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all duration-200"
            style={{
              background: open
                ? "linear-gradient(135deg,#db2777,#9333ea)"
                : "linear-gradient(135deg,#fdf2f8,#f3e8ff)",
              color: open ? "#fff" : "#db2777",
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            {idx + 1}
          </span>
          <span
            className="text-sm font-medium text-gray-800"
            style={{ fontFamily: "'DM Sans',sans-serif" }}
          >
            {q.question}
          </span>
        </div>
        <FaChevronDown
          size={12}
          className="flex-shrink-0 transition-transform duration-300 text-pink-400"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "200px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p
          className="text-gray-500 text-sm leading-relaxed px-5 pb-5 ml-9 border-l-2 border-pink-200 pl-3"
          style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}
        >
          {q.answer}
        </p>
      </div>
    </div>
  );
};

// ── Main component ──
const FAQPage = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const currentTab = tabs.find((t) => t.id === activeTab)!;
  const ActiveIcon = currentTab.icon;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .faq-item { animation: fadeUp 0.35s ease both; }

        .tab-pill {
          display:flex; align-items:center; gap:6px;
          padding:8px 14px; border-radius:99px;
          font-size:11px; font-weight:600;
          letter-spacing:0.06em; white-space:nowrap;
          transition:all 0.2s; cursor:pointer; border:none;
          font-family:'DM Sans',sans-serif;
        }
        .tab-pill-active {
          background:linear-gradient(135deg,#db2777,#9333ea);
          color:#fff;
        }
        .tab-pill-inactive {
          background:#f5f5f5; color:#6b7280;
        }
        .tab-pill-inactive:hover { background:#fdf2f8; color:#db2777; }

        .sidebar-btn {
          width:100%; display:flex; align-items:center;
          justify-content:space-between;
          padding:11px 14px; border-radius:14px;
          font-size:12.5px; font-weight:500;
          transition:all 0.2s; cursor:pointer;
          border:none; text-align:left;
          font-family:'DM Sans',sans-serif;
        }
        .sidebar-btn-active {
          background:linear-gradient(135deg,#fdf2f8,#f3e8ff);
          color:#db2777; border:1px solid #f9a8d4;
        }
        .sidebar-btn-inactive {
          background:transparent; color:#6b7280;
        }
        .sidebar-btn-inactive:hover { background:#fafafa; color:#374151; }
      `}</style>

      <div className="min-h-screen" style={{ background: "#fafafa" }}>
        <Header />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* ── Page header ── */}
          <div className="text-center mb-10">
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-pink-500 mb-3"
              style={{ fontFamily: "'DM Sans',sans-serif" }}>
              ✦ Help Center ✦
            </p>
            <h1
              className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3"
              style={{ fontFamily: "'Cormorant Garamond',serif" }}
            >
              Frequently Asked{" "}
              <em
                className="not-italic"
                style={{
                  background: "linear-gradient(135deg,#db2777,#9333ea)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Questions
              </em>
            </h1>
            <p className="text-sm text-gray-400 max-w-sm mx-auto"
              style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>
              Find answers about orders, payments, shipping, returns and more.
            </p>
          </div>

          {/* ── MOBILE: horizontal tab pills ── */}
          <div className="lg:hidden overflow-x-auto pb-2 mb-6 -mx-4 px-4"
            style={{ scrollbarWidth: "none" }}>
            <div className="flex gap-2 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-pill ${activeTab === tab.id ? "tab-pill-active" : "tab-pill-inactive"}`}
                >
                  <tab.icon size={11} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── MOBILE: active section label ── */}
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <div className="w-[3px] h-5 rounded-full flex-shrink-0"
              style={{ background: "linear-gradient(180deg,#db2777,#9333ea)" }} />
            <div className="flex items-center gap-2">
              <ActiveIcon size={13} style={{ color: "#db2777" }} />
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-400"
                style={{ fontFamily: "'DM Sans',sans-serif" }}>
                {currentTab.label}
              </p>
            </div>
          </div>

          {/* ── Layout ── */}
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── Sidebar (desktop only) ── */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="sticky top-24">

                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4 flex items-center gap-2"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}>
                  <span className="w-[3px] h-3.5 rounded-full inline-block"
                    style={{ background: "linear-gradient(180deg,#db2777,#9333ea)" }} />
                  Categories
                </p>

                <div className="space-y-1 mb-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`sidebar-btn ${activeTab === tab.id ? "sidebar-btn-active" : "sidebar-btn-inactive"}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <tab.icon size={13} style={{ color: activeTab === tab.id ? "#db2777" : "#9ca3af" }} />
                        {tab.label}
                      </div>
                      <FaArrowRight size={10}
                        style={{ color: activeTab === tab.id ? "#db2777" : "#d1d5db" }} />
                    </button>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-[10px] text-gray-400 mb-3"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}>
                    Still need help?
                  </p>
                  <Link to="/contact">
                    <button
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-semibold transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        background: "linear-gradient(135deg,#db2777,#9333ea)",
                        color: "#fff",
                        letterSpacing: "0.05em",
                      }}
                    >
                      <FaHeadset size={12} />
                      Contact Support
                    </button>
                  </Link>
                </div>
              </div>
            </aside>

            {/* ── FAQ list ── */}
            <div className="flex-1 min-w-0">
              <div className="space-y-2.5">
                {faqData[activeTab].map((q, idx) => (
                  <div
                    key={q.id}
                    className="faq-item"
                    style={{ animationDelay: `${idx * 0.04}s` }}
                  >
                    <AccordionItem q={q} idx={idx} />
                  </div>
                ))}
              </div>

              {/* Mobile contact support */}
              <div className="lg:hidden mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-400 mb-3"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}>
                  Still need help?
                </p>
                <Link to="/contact">
                  <button
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[12px] font-semibold text-white"
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      background: "linear-gradient(135deg,#db2777,#9333ea)",
                    }}
                  >
                    <FaHeadset size={12} />
                    Contact Support
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;