import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiPackage, FiTruck, FiDollarSign, FiStar } from "react-icons/fi";

const STATS = [
  { num: "2Cr+", label: "Customers" },
  { num: "₹0", label: "Commission" },
  { num: "48h", label: "Fast Payout" },
  { num: "19000+", label: "Pincodes" },
];

const STEPS = [
  { icon: FiPackage, title: "List your products", desc: "Upload products in minutes with our easy seller dashboard." },
  { icon: FiTruck, title: "We handle delivery", desc: "Pan-India logistics handled by our trusted delivery partners." },
  { icon: FiDollarSign, title: "Get paid fast", desc: "Receive payments directly to your bank within 48 hours." },
  { icon: FiStar, title: "Grow your brand", desc: "Access tools, analytics and promotions to scale faster." },
];

const ListProduct = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fdf6fb] font-google">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* bg blob */}
        <div className="absolute right-0 top-0 w-[55%] h-full bg-pink-100/60 rounded-bl-[80px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Left */}
            <div>
              <span className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                Now open for all sellers
              </span>

              <h1 className="text-4xl md:text-5xl font-black text-zinc-900 leading-tight mb-4">
                Sell Online to Crores<br /> of Customers at{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-500">
                  0% Commission
                </span>
              </h1>

              <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-3 max-w-md">
                Become a <span className="font-semibold text-zinc-600">Darling Desire</span> seller and grow your business across India with zero fees and fast payouts.
              </p>

              <p className="text-xs text-zinc-400 mb-8 flex items-center gap-2">
                <span className="bg-pink-500 text-white text-[9px] font-black px-2 py-0.5 rounded">NEW</span>
                Don't have a GSTIN? You can still sell.{" "}
                <span className="text-pink-500 font-semibold cursor-pointer hover:underline">Know more</span>
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/seller/register")}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Start Selling <FiArrowRight size={15} />
                </button>
                <button className="px-6 py-3 border border-pink-200 text-pink-500 text-sm font-semibold rounded-xl hover:bg-pink-50 transition">
                  Learn more
                </button>
              </div>
            </div>

            {/* Right — illustration + chart */}
            <div className="relative flex justify-center items-end">
              {/* chart bars */}
              <div className="absolute bottom-6 left-6 flex items-end gap-2 z-0">
                {[40, 60, 45, 75, 55, 90, 100].map((h, i) => (
                  <div
                    key={i}
                    className="w-5 rounded-t-md bg-gradient-to-t from-pink-300 to-purple-300 opacity-50"
                    style={{ height: `${h}px` }}
                  />
                ))}
                {/* growth line */}
                <svg className="absolute bottom-0 left-0 w-full" height="110" viewBox="0 0 160 110" fill="none">
                  <polyline
                    points="10,95 33,70 56,80 79,45 102,60 125,20 148,5"
                    stroke="#ec4899"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <circle cx="148" cy="5" r="3" fill="#ec4899" />
                </svg>
              </div>

              {/* seller image */}
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80"
                alt="Seller"
                className="relative z-10 w-64 md:w-80 rounded-3xl shadow-xl object-cover"
              />

              {/* floating badge */}
              <div className="absolute top-4 right-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-pink-50 z-20">
                <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center">
                  <FiDollarSign size={14} className="text-green-600" />
                </div>
                <div>
                  <p className="text-[9px] text-zinc-400 font-medium">This month</p>
                  <p className="text-sm font-black text-zinc-800">₹1,28,400</p>
                </div>
              </div>

              <div className="absolute bottom-2 left-2 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-pink-50 z-20">
                <div className="w-8 h-8 rounded-xl bg-pink-100 flex items-center justify-center">
                  <FiPackage size={14} className="text-pink-500" />
                </div>
                <div>
                  <p className="text-[9px] text-zinc-400 font-medium">Orders today</p>
                  <p className="text-sm font-black text-zinc-800">248 orders</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-white border-y border-zinc-100">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-100">
          {STATS.map((s) => (
            <div key={s.label} className="text-center px-6 py-2">
              <p className="text-2xl md:text-3xl font-black text-zinc-900">{s.num}</p>
              <p className="text-xs text-zinc-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-20">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-purple-50 text-purple-400 border border-purple-100 mb-4">
            How it works
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900">
            Start selling in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
              3 simple steps
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <span className="absolute top-4 right-4 text-[11px] font-black text-zinc-200 group-hover:text-pink-200 transition-colors">
                0{i + 1}
              </span>
              <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-pink-50 text-pink-400 mb-4 group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-500 group-hover:text-white transition-all">
                <s.icon size={18} />
              </div>
              <h4 className="font-bold text-sm text-zinc-800 mb-1.5">{s.title}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-500 p-10 md:p-14 text-center text-white shadow-xl">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />
          <h2 className="text-3xl md:text-4xl font-black mb-3 relative z-10">
            Ready to start selling?
          </h2>
          <p className="text-white/75 text-sm mb-8 max-w-md mx-auto relative z-10">
            Join 4,800+ sellers already growing with Darling Desire. Zero commission, fast payouts.
          </p>
          <button
            onClick={() => navigate("/seller/register")}
            className="relative z-10 inline-flex items-center gap-2 px-8 py-3.5 bg-white text-pink-600 font-bold text-sm rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Start Selling Free <FiArrowRight size={15} />
          </button>
        </div>
      </section>

    </div>
  );
};

export default ListProduct;