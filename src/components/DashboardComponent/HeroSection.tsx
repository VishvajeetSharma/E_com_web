
import { useState, useEffect, } from "react";
import { FaArrowRight, FaCompass ,FaTruck,FaShieldAlt,FaUndo,FaHeadset} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// ── Data ──
const heroImages = [
  { url: "https://plus.unsplash.com/premium_photo-1734498806719-d1bec656a72a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  { url: "https://plus.unsplash.com/premium_photo-1727529726690-5e076b308cf8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Evening Gown" },
  { url: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=837&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Pastel Dress" },
  { url: "https://plus.unsplash.com/premium_photo-1707816501425-85cbd7fb2673?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Rose Outfit" },
  { url: "https://plus.unsplash.com/premium_photo-1726880461399-2a21c4240531?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Lavender" },
  { url: "https://images.unsplash.com/3/www.madebyvadim.com.jpg?q=80&w=882&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Party Gown" },
];

const stats = [
  { num: "500+", label: "Premium Products" },
  { num: "50K+", label: "Happy Customers" },
  { num: "4.8★", label: "Customer Rating" },
];
 const trustBadges = [
    {
      icon: FaTruck,
      label: "Free Shipping",
      sub: "On orders above ₹2,999",
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: FaShieldAlt,
      label: "100% Authentic",
      sub: "Verified products only",
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: FaUndo,
      label: "Easy Returns",
      sub: "15-day return policy",
      color: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      icon: FaHeadset,
      label: "24/7 Support",
      sub: "We're here to help",
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

const HeroSection = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5s
  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % heroImages.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        /* Staggered fade-up */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .h1 { animation: fadeUp 0.7s ease 0.1s both; }
        .h2 { animation: fadeUp 0.7s ease 0.22s both; }
        .h3 { animation: fadeUp 0.7s ease 0.34s both; }
        .h4 { animation: fadeUp 0.7s ease 0.46s both; }
        .h5 { animation: fadeUp 0.7s ease 0.58s both; }
        .h6 { animation: fadeUp 0.7s ease 0.70s both; }

        /* Animated gradient heading */
        @keyframes gradShift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        .grad-text {
          background: linear-gradient(110deg, #f9a8d4, #c084fc, #f472b6, #a78bfa);
          background-size: 250%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradShift 5s ease infinite;
        }

        /* Scroll dot */
        @keyframes scrollDot {
          0%,100% { transform: translateY(0); opacity: 1; }
          60%      { transform: translateY(12px); opacity: 0; }
        }
        .scroll-dot { animation: scrollDot 1.8s ease infinite; }

        /* Slide counter line */
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .counter-line {
          transform-origin: left;
          animation: lineGrow 5s linear infinite;
        }

        /* Ping dot */
        @keyframes ping {
          75%,100% { transform: scale(2); opacity: 0; }
        }
        .ping { animation: ping 1.2s cubic-bezier(0,0,0.2,1) infinite; }

        /* Primary button shimmer */
        .primary-btn { position: relative; overflow: hidden; }
        .primary-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #be185d, #7e22ce);
          opacity: 0; transition: opacity 0.3s;
        }
        .primary-btn:hover::after { opacity: 1; }
        .primary-btn:hover { transform: translateY(-1px); }
        .primary-btn > * { position: relative; z-index: 1; }
      `}</style>

      <section className="relative h-[75vh] md:h-[88vh] overflow-hidden bg-black">

        {/* ── Background images with crossfade ── */}
        {heroImages.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: current === i ? 1 : 0 }}
          >
            <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
          </div>
        ))}

        {/* Overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/10" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        {/* ── Content ── */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
            <div className="max-w-xl">

              {/* Eyebrow badge */}
              <div className="h1 inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-500" />
                </span>
                <span
                  className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white cursor-pointer"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  onClick={() => navigate("/products")}
                >
                  New Collection 2026
                </span>
              </div>

              {/* Heading */}
              <h1
                className="h2 font-light text-white leading-none mb-1"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(3.2rem, 8vw, 5.5rem)",
                }}
              >
                Define Your
              </h1>
              <h1
                className="h3 italic font-semibold grad-text leading-none mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(3.2rem, 8vw, 5.5rem)",
                }}
              >
                Style Story.
              </h1>

              {/* Description */}
              <p
                className="h4 text-gray-300 text-[0.5rem] md:text-base leading-relaxed max-w-md mb-8"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                Discover the latest trends in luxury fashion. Elevate your wardrobe
                with our curated collection of premium designs.
              </p>

              {/* CTA Buttons */}
              <div className="h5 flex flex-wrap gap-3 mb-10">
                <button
                  onClick={() => navigate("/category/men")}
                  className="primary-btn flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium text-white transition-all duration-200"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "linear-gradient(135deg, #db2777, #9333ea)",
                    letterSpacing: "0.04em",
                  }}
                >
                  Shop Now
                  <FaArrowRight size={11} />
                </button>

                <button
                  onClick={() => navigate("/category/women")}
                  className="flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium text-white/80 border border-white/25 hover:bg-white/10 hover:border-white/40 hover:text-white transition-all duration-200 backdrop-blur-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em" }}
                >
                  <FaCompass size={12} />
                  Explore
                </button>
              </div>

              {/* Stats */}
              <div className="h6 flex gap-8 pt-5 border-t border-white/15">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p
                      className="text-xl md:text-2xl font-semibold text-white leading-none mb-1"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {s.num}
                    </p>
                    <p
                      className="text-[10px] text-gray-400 tracking-[0.12em] uppercase"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Slide counter — bottom right ── */}
     

        {/* ── Dot indicators — bottom center ── */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: current === i ? "24px" : "6px",
                height: "6px",
                background: current === i
                  ? "linear-gradient(90deg, #db2777, #9333ea)"
                  : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>

   
      </section>

{/* badges  */}
<div className="bg-white border border-gray-200 md:border-gray-200 md:px-40">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-200 md:divide-gray-200">
      {trustBadges.map((badge, idx) => (
        <div
          key={idx}
          className="group flex flex-col items-center text-center gap-3 px-6 py-8 cursor-pointer hover:bg-pink-50/30 transition-all duration-300 relative"
        >
          {/* Top accent on hover */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-linear-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Icon circle — theme colored by default */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #fdf2f8, #f3e8ff)",
              border: "1px solid #f9a8d4",
            }}
          >
            {/* SVG gradient for icon color */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#db2777" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
              </defs>
            </svg>
            <badge.icon
              size={19}
              style={{ fill: "url(#iconGrad)", color: "#db2777" }}
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Text */}
          <div>
            <h4
              className="text-[11px] font-bold tracking-[0.14em] uppercase text-gray-700 group-hover:text-pink-600 transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {badge.label}
            </h4>
            <p
              className="text-[10px] text-gray-400 mt-1 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {badge.sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
    </>
  );
};

export default HeroSection;