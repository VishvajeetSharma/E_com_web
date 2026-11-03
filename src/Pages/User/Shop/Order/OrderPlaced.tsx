import { useNavigate } from "react-router-dom";


import Header from "../../../../components/Header/Heading";
import {
  FaShoppingBag,
  FaHome,
  FaUser,
  FaChevronRight,

  FaTruck,
} from "react-icons/fa";

interface OrderSuccessProps {
  deliveryDate?: string;
  orderId?: string;
  phone?: string;
  address?: string;
  userName?: string;
}

// ── Mini confetti canvas ──────────────────────────────




// ── Main Component ────────────────────────────────────
const OrderSuccess = ({
  deliveryDate = "Thu, Apr 30th '26",
  orderId      = "DD2026041200001",
  phone        = "98XXXXXX12",
  address      = "123, Green Park, New Delhi...",
  userName     = "Shruti",
}: OrderSuccessProps) => {
  const navigate = useNavigate();
// const returns = useSelector((state: any) => state.return?.returns);
// const cancels = useSelector((state: any) => state.cancel?.cancellations);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes popIn {
          0%   { transform: scale(0.4); opacity: 0; }
          65%  { transform: scale(1.12); }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ringPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(219,39,119,0.4); }
          50%     { box-shadow: 0 0 0 20px rgba(219,39,119,0);  }
        }
        @keyframes orbit1 {
          0%   { transform: rotate(0deg)   translate(52px) rotate(0deg); }
          100% { transform: rotate(360deg) translate(52px) rotate(-360deg); }
        }
        @keyframes orbit2 {
          0%   { transform: rotate(90deg)  translate(62px) rotate(-90deg); }
          100% { transform: rotate(450deg) translate(62px) rotate(-450deg); }
        }
        @keyframes orbit3 {
          0%   { transform: rotate(200deg) translate(45px) rotate(-200deg); }
          100% { transform: rotate(560deg) translate(45px) rotate(-560deg); }
        }
        @keyframes orbit4 {
          0%   { transform: rotate(300deg) translate(68px) rotate(-300deg); }
          100% { transform: rotate(660deg) translate(68px) rotate(-660deg); }
        }

        .check-icon  { animation: popIn 0.6s cubic-bezier(.34,1.4,.64,1) 0.25s both; }
        .ring-pulse  { animation: ringPulse 2.2s ease 0.8s infinite; }
        .orb1 { animation: orbit1 3.5s linear infinite; }
        .orb2 { animation: orbit2 4.2s linear infinite; }
        .orb3 { animation: orbit3 3.1s linear 0.5s infinite; }
        .orb4 { animation: orbit4 5s   linear 1s   infinite; }

        .f1 { animation: fadeUp 0.5s ease 0.35s both; }
        .f2 { animation: fadeUp 0.5s ease 0.48s both; }
        .f3 { animation: fadeUp 0.5s ease 0.58s both; }
        .f4 { animation: fadeUp 0.5s ease 0.68s both; }
        .f5 { animation: fadeUp 0.5s ease 0.78s both; }
        .f6 { animation: fadeUp 0.5s ease 0.88s both; }
        .f7 { animation: fadeUp 0.5s ease 0.98s both; }

        .os-btn-primary {
          width: 100%; padding: 7px;
          border-radius: 12px; border:1px solid #db2777;
          // background: linear-gradient(135deg, #db2777, #9333ea);
          color: #db2777; font-size: 13px; font-weight: 600;
          letter-spacing: .04em; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: opacity .2s, transform .15s, box-shadow .2s;
          // box-shadow: 0 4px 16px rgba(219,39,119,.28);
        }
        .os-btn-primary:hover { opacity:.92; transform:translateY(-1px); box-shadow:0 8px 24px rgba(219,39,119,.32); }

        .os-btn-outline {
          width: 100%; padding: 7px;
          border-radius: 12px;
          background: #fff; color: #6b3fa0;
          font-size: 13px; font-weight: 500;
          letter-spacing: .03em; cursor: pointer;
          border: 1.5px solid #e9d5ff;
          transition: all .18s; font-family: 'DM Sans', sans-serif;
        }
        .os-btn-outline:hover { border-color: #c084fc; background: #fdf5fb; }

        .os-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 15px; border-radius: 12px;
          border: 1px solid #f5e6f5; background: #fff;
          cursor: pointer; transition: all .18s;
        }
        .os-row:hover { border-color: #f9a8d4; background: #fdf5fb; }

        .os-icon-circle {
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          background: #fdf2f8; border: 1px solid #f9a8d4;
        }
      `}</style>

      <div className="min-h-screen" style={{ background: "#fdf0f7", fontFamily: "'DM Sans',sans-serif" }}>
        <Header />

        <div className="max-w-4xl mx-auto px-4 py-5 grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* ══════════════ LEFT ══════════════ */}
          <div className="lg:col-span-2 space-y-4">

            {/* ── Main success card ── */}
            <div className="bg-white rounded-3xl border border-pink-100 shadow-sm overflow-hidden">

              {/* Top hero — confetti + icon */}
              <div
                className="relative flex flex-col items-center pt-1 pb-8 px-6"
               
              >
            <video
                src="/check.mp4"
                autoPlay
              
                muted
                playsInline
                className="mx-auto"
              ></video>

           

                {/* Text */}
                <span
                  className="f1 inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[.2em] uppercase px-3 py-1 rounded-full mt-5 mb-3"
                  style={{ background: "#fdf2f8", color: "#db2777", border: "1px solid #f9a8d4" }}
                >
                  Order Confirmed
                </span>

                <h1
                  className="f2 text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-1.5"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Congratulations, {userName}!
                </h1>
                <p className="f3 text-sm text-gray-400 text-center" style={{ fontWeight: 300 }}>
                  Order has been placed successfully.
                </p>
                <p className="f3 text-xs text-gray-400 text-center mt-1">
                  Order <span className="text-gray-600 font-medium">#{orderId}</span>
                </p>
              </div>

              {/* Body */}
              <div className="px-6 py-6 space-y-4">

                {/* Delivery banner */}
                <div
                  className="f3 flex items-center justify-between px-4 py-3.5 rounded-xl"
                  style={{ background: "#fdf5fb", border: "1px solid #f5e6f5" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="os-icon-circle">
                      <FaTruck size={13} style={{ color: "#db2777" }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[.15em] uppercase text-gray-400 mb-0.5">
                        Estimated Delivery
                      </p>
                      <p
                        className="text-sm font-semibold text-gray-800"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {deliveryDate}
                      </p>
                    </div>
                  </div>
              
                </div>

              

                {/* SMS note */}
                <p className="f5 text-center text-[11px] text-gray-400">
                  Tracking link sent to{" "}
                  <span className="text-gray-600 font-medium">{phone}</span>
                </p>
              </div>
            </div>

            {/* ── Action rows ── */}
            {/* <div className="f5 bg-white rounded-2xl border border-pink-100 divide-y divide-pink-50 overflow-hidden shadow-sm">
              {[
                
                { icon: FaShareAlt,    label: "Send Order Details",    sub: "Share via SMS or email", path: "/orders" },
              ].map((item) => (
                <div key={item.label} className="os-row" onClick={() => navigate(item.path)}>
                  <div className="flex items-center gap-3">
                    <div className="os-icon-circle">
                      <item.icon size={13} style={{ color: "#db2777" }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                      <p className="text-[11px] text-gray-400">{item.sub}</p>
                    </div>
                  </div>
                  <FaChevronRight size={11} className="text-gray-300" />
                </div>
              ))}
            </div> */}
          </div>

          {/* ══════════════ RIGHT ══════════════ */}
          <div className="space-y-4">

            {/* My orders card */}
            <div className="f6 bg-white rounded-2xl border border-pink-100 p-5 shadow-sm text-center">
              <div
                className="w-12 h-12 rounded-full border border-[#db2777] flex items-center justify-center mx-auto mb-3"
                
              >
                <FaShoppingBag size={18} color="#db2777" />
              </div>
              <p className="text-[10px] font-bold tracking-[.18em] uppercase text-gray-400 mb-1">
                Manage Orders
              </p>
              <p className="text-xs text-gray-400 mb-5 leading-relaxed" style={{ fontWeight: 300 }}>
                Track, return or exchange your items anytime.
              </p>
              <button className="os-btn-primary" onClick={() => navigate("/orders")}>
                Go to My Orders
              </button>
                <button className="os-btn-outline mt-2" onClick={() => navigate("/dashboard")}>
                    Continue Shopping
                  </button>
            </div>

            {/* Delivery details */}
            <div className="f6 bg-white rounded-2xl border border-pink-100 p-5 shadow-sm">
              <p className="text-[10px] font-bold tracking-[.18em] uppercase text-gray-400 mb-4 flex items-center gap-2">
                <span
                  className="w-0.75 h-3.5 rounded-full inline-block"
                  style={{ background: "linear-gradient(180deg,#db2777,#9333ea)" }}
                />
                Delivery Details
              </p>
              <div className="space-y-2">
                {[
                  { icon: FaHome, label: "Home",    value: address                   },
                  { icon: FaUser, label: "Contact", value: `${userName} · ${phone}` },
                ].map((row) => (
                  <div key={row.label} className="os-row">
                    <div className="flex items-center gap-3">
                      <div className="os-icon-circle" style={{ width: 32, height: 32 }}>
                        <row.icon size={11} style={{ color: "#db2777" }} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400">{row.label}</p>
                        <p className="text-xs font-medium text-gray-700 max-w-37.5 truncate">
                          {row.value}
                        </p>
                      </div>
                    </div>
                    <FaChevronRight size={10} className="text-gray-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Loyalty tip */}
            {/* <div
              className="f7 rounded-2xl px-4 py-3.5"
              style={{ background: "linear-gradient(135deg,#fdf2f8,#f5f0ff)", border: "1px solid #f9a8d4" }}
            >
              <p className="text-[11px] leading-relaxed" style={{ color: "#7c3aed" }}>
                <span className="font-bold">💜 Tip:</span> Earn loyalty points on every order and redeem them on your next purchase.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
