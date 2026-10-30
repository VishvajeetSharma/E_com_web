import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Heading";
import {
  FaShoppingBag, FaUndo, FaCreditCard, FaUserCircle,
  FaHeadset, FaEnvelope, FaPhone, FaArrowRight,
  FaClock, FaChevronRight,
} from "react-icons/fa";

// ── Data ──
const orderQueries = [
  { icon: FaShoppingBag, label: "Track My Order",     desc: "Check real-time status of your order",     path: "/orders" },
  { icon: FaShoppingBag, label: "Cancel an Order",    desc: "Cancel within 1 hour of placing",           path: "/orders" },
  { icon: FaShoppingBag, label: "Order Not Received", desc: "Report a missing or delayed delivery",      path: "/orders" },
  { icon: FaCreditCard,  label: "Payment Issue",      desc: "Failed payment or refund not received",     path: "/orders" },
];

const nonOrderQueries = [
  { icon: FaUndo,        label: "Returns & Exchange", desc: "Initiate a return or size exchange",        path: "/orders" },
  { icon: FaUserCircle,  label: "My Account",         desc: "Update profile, password or address",       path: "/userprofile" },
  { icon: FaCreditCard,  label: "Refund Status",      desc: "Check status of your pending refund",       path: "/orders" },
];

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .f1 { animation: fadeUp 0.5s ease 0.05s both; }
        .f2 { animation: fadeUp 0.5s ease 0.15s both; }
        .f3 { animation: fadeUp 0.5s ease 0.25s both; }
        .f4 { animation: fadeUp 0.5s ease 0.35s both; }

        .query-row {
          display:flex; align-items:center; justify-content:space-between;
          padding:14px 16px; border-radius:14px;
          border:1px solid #f3f4f6; background:#fff;
          cursor:pointer; transition:all 0.2s;
          font-family:'DM Sans',sans-serif;
        }
        .query-row:hover {
          border-color:#f9a8d4;
          background:linear-gradient(135deg,#fdf2f8,#f3e8ff);
          transform:translateX(3px);
        }
        .query-row:hover .row-arrow { color:#db2777; }

        .channel-btn {
          position:relative; overflow:hidden;
          display:flex; align-items:center; justify-content:center; gap:7px;
          width:100%; padding:10px; border-radius:14px;
          font-size:12px; font-weight:600;
          letter-spacing:0.05em; color:#fff;
          border:none; cursor:pointer;
          transition:transform 0.2s, box-shadow 0.2s;
          font-family:'DM Sans',sans-serif;
        }
        .channel-btn:hover { transform:translateY(-1px); box-shadow:0 6px 18px rgba(0,0,0,0.15); }
        .channel-btn::after {
          content:''; position:absolute; inset:0;
          background:rgba(0,0,0,0.1); opacity:0; transition:opacity 0.2s;
        }
        .channel-btn:hover::after { opacity:1; }
      `}</style>

      <div className="min-h-screen" style={{ background: "#fafafa" }}>
        <Header />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

          {/* ── Page header ── */}
          <div className="f1 text-center mb-8">
            <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-pink-500 mb-2"
              style={{ fontFamily: "'DM Sans',sans-serif" }}>
              ✦ Support Center ✦
            </p>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2"
              style={{ fontFamily: "'Cormorant Garamond',serif" }}>
              How can we{" "}
              <em className="not-italic" style={{
                background: "linear-gradient(135deg,#db2777,#9333ea)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                help you?
              </em>
            </h1>
            <p className="text-sm text-gray-400"
              style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>
              Select a topic below or reach us directly
            </p>
          </div>

          {/* ── Order-related queries ── */}
          <div className="f2 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-[3px] h-5 rounded-full"
                  style={{ background: "linear-gradient(180deg,#db2777,#9333ea)" }} />
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-400"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}>
                  Order Related
                </p>
              </div>
              <button
                onClick={() => navigate("/orders")}
                className="flex items-center gap-1 text-[11px] font-medium text-pink-500 hover:text-purple-600 transition-colors"
                style={{ fontFamily: "'DM Sans',sans-serif" }}
              >
                My Orders <FaArrowRight size={8} />
              </button>
            </div>

            <div className="space-y-2">
              {orderQueries.map((q) => (
                <div
                  key={q.label}
                  className="query-row"
                  onClick={() => navigate(q.path)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg,#fdf2f8,#f3e8ff)" }}>
                      <q.icon size={14} style={{ color: "#db2777" }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800"
                        style={{ fontFamily: "'DM Sans',sans-serif" }}>
                        {q.label}
                      </p>
                      <p className="text-[11px] text-gray-400"
                        style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>
                        {q.desc}
                      </p>
                    </div>
                  </div>
                  <FaChevronRight size={11} className="row-arrow text-gray-300 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* ── Non order-related queries ── */}
          <div className="f3 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-[3px] h-5 rounded-full"
                  style={{ background: "linear-gradient(180deg,#db2777,#9333ea)" }} />
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-400"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}>
                  Non Order Related
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {nonOrderQueries.map((q) => (
                <div
                  key={q.label}
                  className="query-row"
                  onClick={() => navigate(q.path)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "linear-gradient(135deg,#fdf2f8,#f3e8ff)" }}>
                      <q.icon size={14} style={{ color: "#db2777" }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800"
                        style={{ fontFamily: "'DM Sans',sans-serif" }}>
                        {q.label}
                      </p>
                      <p className="text-[11px] text-gray-400"
                        style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>
                        {q.desc}
                      </p>
                    </div>
                  </div>
                  <FaChevronRight size={11} className="row-arrow text-gray-300 transition-colors" />
                </div>
              ))}

              {/* FAQ row */}
              <div
                className="query-row"
                onClick={() => navigate("/faq")}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#fdf2f8,#f3e8ff)" }}>
                    <FaHeadset size={14} style={{ color: "#db2777" }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800"
                      style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      Browse FAQs
                    </p>
                    <p className="text-[11px] text-gray-400"
                      style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>
                      Find answers to common questions
                    </p>
                  </div>
                </div>
                <FaChevronRight size={11} className="row-arrow text-gray-300 transition-colors" />
              </div>
            </div>
          </div>

          {/* ── Reach us directly ── */}
          <div className="f4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-[3px] h-5 rounded-full"
                style={{ background: "linear-gradient(180deg,#db2777,#9333ea)" }} />
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-400"
                style={{ fontFamily: "'DM Sans',sans-serif" }}>
                Reach Us Directly
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <a href="mailto:support@darlingdesire.com">
                <button className="channel-btn"
                  style={{ background: "linear-gradient(135deg,#db2777,#9333ea)" }}>
                  <FaEnvelope size={13} />
                  Email Us
                </button>
              </a>
              <a href="tel:+919999999999">
                <button className="channel-btn"
                  style={{ background: "linear-gradient(135deg,#f59e0b,#ef4444)" }}>
                  <FaPhone size={13} />
                  Call Us
                </button>
              </a>
            </div>

            {/* Hours strip */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{ background: "linear-gradient(135deg,#fdf2f8,#f3e8ff)", border: "1px solid #f9a8d4" }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#db2777,#9333ea)" }}>
                <FaClock size={12} color="#fff" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800"
                  style={{ fontFamily: "'DM Sans',sans-serif" }}>
                  Support Hours
                </p>
                <p className="text-[11px] text-gray-500"
                  style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>
                  Mon – Sat &nbsp;·&nbsp; 9:00 AM – 7:00 PM IST
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;