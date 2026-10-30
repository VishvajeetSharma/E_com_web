import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Heading";
import {
 FiCamera,
  FiCheck, FiStar, FiArrowLeft,
} from "react-icons/fi";
import { FaCheck } from "react-icons/fa";

// ── Data ──
const PRODUCT = {
  name: "Floral Wrap Midi Dress",
  brand: "Darling Desire",
  image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop",
  totalReviews: 163,
  avgRating: 4.1,
  ratingBreakdown: [
    { star: 5, count: 84 },
    { star: 4, count: 41 },
    { star: 3, count: 17 },
    { star: 2, count: 7  },
    { star: 1, count: 14 },
  ],
  attributes: [
    { label: "Fit",     value: "True to Size", pct: 100 },
    { label: "Quality", value: "High",         pct: 82  },
    { label: "Comfort", value: "Very Good",    pct: 78  },
    { label: "Value",   value: "Worth It",     pct: 90  },
  ],
};

// const SORT_OPTIONS = ["Most Recent", "Highest Rated", "Lowest Rated"];

const REVIEWS = [
  { id: 1, name: "Harbin Youtube",  date: "7 Oct 2024",  rating: 5, title: "Absolutely loving every bit of it",  body: "I recently purchased this and I'm absolutely loving it! The comfort level is exceptional, and the fabric quality is top-notch.", verified: true,  size: "M",  image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=120&h=120&fit=crop", avatar: "https://i.pravatar.cc/40?img=47" },
  { id: 2, name: "Priya R.",        date: "4 Nov 2024",  rating: 4, title: "Material quality is good",            body: "The colour is exactly as shown. Overall I'm quite satisfied with the purchase.",                                            verified: true,  size: "S",  image: null,                                                                                     avatar: "https://i.pravatar.cc/40?img=32" },
  { id: 3, name: "Safeerah M.",     date: "9 Oct 2024",  rating: 5, title: "Perfect fit, exactly as shown",      body: "Worth every penny. Fabric feels premium and stitching quality is excellent.",                                             verified: true,  size: "L",  image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=120&h=120&fit=crop", avatar: "https://i.pravatar.cc/40?img=12" },
  { id: 4, name: "Sujoy Roy",       date: "6 Feb 2025",  rating: 4, title: "Good quality for the price",         body: "Excellent value for money. The fit is good and material feels soft.",                                                      verified: false, size: "XL", image: null,                                                                                     avatar: "https://i.pravatar.cc/40?img=23" },
  { id: 5, name: "Ankita J.",       date: "31 Jul 2024", rating: 3, title: "Nice fit, value for money",          body: "Decent product. Colour is accurate and shipping was fast.",                                                               verified: true,  size: "M",  image: null,                                                                                     avatar: "https://i.pravatar.cc/40?img=56" },
];

// ── Helpers ──
const starColor = (r: number) => r >= 4 ? "#16a34a" : r === 3 ? "#ca8a04" : "#dc2626";
const starBg    = (r: number) => r >= 4 ? "#f0fdf4" : r === 3 ? "#fefce8" : "#fef2f2";
const barColor  = (s: number) => s >= 4 ? "#22c55e" : s === 3 ? "#eab308" : "#ef4444";

const StarRow = ({ rating, size = 12 }: { rating: number; size?: number }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map((s) => (
      <FiStar key={s} size={size}
        fill={s <= Math.round(rating) ? "#f59e0b" : "none"}
        stroke={s <= Math.round(rating) ? "#f59e0b" : "#d1d5db"}
        strokeWidth={1.5} />
    ))}
  </div>
);

// ── Component ──
const ProductReviewPage = () => {
  const navigate = useNavigate();
  // const [sortOpen,      setSortOpen]      = useState(false);
  // const [sortBy,        setSortBy]        = useState("Most Recent");
  const [filterRating,  setFilterRating]  = useState<number | null>(null);

  const total    = PRODUCT.ratingBreakdown.reduce((s, r) => s + r.count, 0);
  const filtered = REVIEWS.filter((r) => filterRating ? r.rating === filterRating : true);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-in { animation: fadeUp 0.4s ease both; }

        .card {
          background:#fff;
          border:1px solid #f0f0f0;
          border-radius:18px;
          transition:box-shadow 0.2s;
        }
        .card:hover { box-shadow:0 4px 18px rgba(0,0,0,0.06); }

        .bar-row {
          display:flex; align-items:center; gap:8px;
          cursor:pointer; padding:4px 6px; border-radius:8px;
          transition:background 0.15s;
        }
        .bar-row:hover { background:#fafafa; }
        .bar-row.active { background:#f5f3ff; }

        .sort-btn {
          display:flex; align-items:center; gap:6px;
          padding:8px 14px; border-radius:10px;
          font-size:12px; font-weight:500; color:#374151;
          background:#fff; border:1px solid #e5e7eb;
          cursor:pointer; transition:all 0.18s;
          font-family:'DM Sans',sans-serif;
        }
        .sort-btn:hover { border-color:#c4b5fd; color:#7c3aed; }

        .sort-item {
          width:100%; padding:9px 14px; text-align:left;
          font-size:12px; background:none; border:none; cursor:pointer;
          font-family:'DM Sans',sans-serif; transition:background 0.15s;
          color:#374151;
        }
        .sort-item:hover { background:#fafafa; }
        .sort-item.active { background:#f5f3ff; color:#7c3aed; font-weight:600; }

        .scrollbar-hide::-webkit-scrollbar { display:none; }
        .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; }
      `}</style>

      <div className="min-h-screen" style={{ background: "#f6f7f9", fontFamily: "'DM Sans',sans-serif" }}>
        <Header />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Back — mobile only */}
          <button onClick={() => navigate(-1)}
            className="md:hidden flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-5 text-sm font-medium transition-colors">
            <FiArrowLeft size={15} /> Back to Product
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── LEFT ── */}
            <div className="space-y-4">

              {/* Product mini card */}
              <div className="card p-4">
                <div className="flex gap-3">
                  <img src={PRODUCT.image} alt={PRODUCT.name}
                    className="w-16 h-20 rounded-xl object-cover shrink-0 border border-gray-100" />
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1"
                      style={{ color: "#db2777", fontFamily: "'DM Sans',sans-serif" }}>
                      {PRODUCT.brand}
                    </p>
                    <p className="text-sm font-semibold text-gray-800 leading-snug"
                      style={{ fontFamily: "'Cormorant Garamond',serif" }}>
                      {PRODUCT.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating summary */}
              <div className="card p-5">

                {/* Big number */}
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <p className="text-5xl font-black text-gray-900 leading-none"
                      style={{ fontFamily: "'Cormorant Garamond',serif" }}>
                      {PRODUCT.avgRating}
                    </p>
                    <div className="mt-1.5 mb-0.5"><StarRow rating={PRODUCT.avgRating} size={14} /></div>
                    <p className="text-[10px] text-gray-400">{PRODUCT.totalReviews} verified buyers</p>
                  </div>
                  {/* Small donut-ish visual */}
                  <div className="ml-auto flex flex-col items-end gap-1">
                    {[5,4].map((s) => {
                      const r = PRODUCT.ratingBreakdown.find(r => r.star === s)!;
                      return (
                        <div key={s} className="flex items-center gap-1.5">
                          <span className="text-[10px] text-gray-400">{s}★</span>
                          <span className="text-[11px] font-semibold text-gray-600">{r.count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-gray-50 pt-4">
                  {/* Rating bars */}
                  <div className="space-y-1">
                    {PRODUCT.ratingBreakdown.map((r) => {
                      const pct     = Math.round((r.count / total) * 100);
                      const active  = filterRating === r.star;
                      return (
                        <div key={r.star}
                          className={`bar-row ${active ? "active" : ""}`}
                          onClick={() => setFilterRating(active ? null : r.star)}>
                          <span className="text-[11px] font-medium text-gray-500 w-4 text-right shrink-0">{r.star}</span>
                          <FiStar size={9} fill={barColor(r.star)} stroke={barColor(r.star)} className="shrink-0" />
                          <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${pct}%`, background: barColor(r.star) }} />
                          </div>
                          <span className="text-[10px] text-gray-400 w-6 text-right shrink-0">{r.count}</span>
                          {active && <FiCheck size={10} className="text-purple-500 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  {filterRating && (
                    <button onClick={() => setFilterRating(null)}
                      className="w-full mt-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all"
                      style={{ background: "#f5f3ff", color: "#7c3aed", border: "1px solid #ddd6fe" }}>
                      Clear {filterRating}★ Filter ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Buyer attributes */}
              <div className="card p-5">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4 flex items-center gap-2">
                  <span className="w-0.75 h-3.5 rounded-full inline-block"
                    style={{ background: "linear-gradient(180deg,#db2777,#9333ea)" }} />
                  Buyer Attributes
                </p>
                <div className="space-y-4">
                  {PRODUCT.attributes.map((a) => (
                    <div key={a.label}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs text-gray-600">{a.label}</span>
                        <span className="text-[10px] font-semibold text-emerald-600">{a.value} ({a.pct}%)</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${a.pct}%`, background: "linear-gradient(90deg,#a78bfa,#f0abfc)" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div className="lg:col-span-2">

              {/* Header row */}
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-0.5"
                    style={{ fontFamily: "'DM Sans',sans-serif" }}>✦ Reviews</p>
                  <h2 className="text-2xl font-semibold text-gray-900"
                    style={{ fontFamily: "'Cormorant Garamond',serif" }}>
                    Customer Reviews
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {filterRating
                      ? `${filtered.length} reviews with ${filterRating}★`
                      : `${REVIEWS.length} total reviews`}
                  </p>
                </div>

                {/* Sort */}
                {/* <div className="relative">
                  <button className="sort-btn" onClick={() => setSortOpen(!sortOpen)}>
                    <FiFilter size={12} />
                    {sortBy}
                    <FiChevronDown size={12} className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`} />
                  </button>
                  {sortOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20">
                      {SORT_OPTIONS.map((opt) => (
                        <button key={opt} className={`sort-item ${sortBy === opt ? "active" : ""}`}
                          onClick={() => { setSortBy(opt); setSortOpen(false); }}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div> */}
              </div>

              {/* Customer photos */}
              {REVIEWS.filter(r => r.image).length > 0 && (
                <div className="mb-5">
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-3">
                    Customer Photos ({REVIEWS.filter(r => r.image).length})
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {REVIEWS.filter(r => r.image).map((r) => (
                      <img key={r.id} src={r.image!} alt="customer"
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-100 hover:scale-105 transition-transform cursor-pointer" />
                    ))}
                    <div className="w-16 h-16 rounded-xl shrink-0 flex flex-col items-center justify-center cursor-pointer transition-all border border-dashed border-gray-200 hover:border-purple-300 hover:bg-purple-50">
                      <FiCamera size={14} className="text-gray-400" />
                      <span className="text-[10px] text-gray-400 mt-1">+12</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Review list */}
              {filtered.length === 0 ? (
                <div className="card text-center py-14">
                  <FiStar size={32} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-500">No reviews found</p>
                  <p className="text-xs text-gray-400 mt-1">Try clearing the filter</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((rev, idx) => (
                    <div key={rev.id} className="card fade-in p-5"
                      style={{ animationDelay: `${idx * 0.05}s` }}>

                      {/* Top row */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <img src={rev.avatar} alt={rev.name}
                            className="w-9 h-9 rounded-full object-cover border border-gray-100 shrink-0" />
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{rev.name}</p>
                            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                              {rev.verified && (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                  <FaCheck size={7} /> Verified
                                </span>
                              )}
                              <span className="text-[9px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                Size {rev.size}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] text-gray-400 shrink-0">{rev.date}</span>
                      </div>

                      {/* Rating badge + title */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold"
                          style={{ background: starBg(rev.rating), color: starColor(rev.rating) }}>
                          <FiStar size={9} fill={starColor(rev.rating)} stroke={starColor(rev.rating)} />
                          {rev.rating}.0
                        </span>
                        <p className="text-sm font-semibold text-gray-800">{rev.title}</p>
                      </div>

                      {/* Body */}
                      <p className="text-sm text-gray-500 leading-relaxed mb-3" style={{ fontWeight: 300 }}>
                        {rev.body}
                      </p>

                      {/* Review image */}
                      {rev.image && (
                        <img src={rev.image} alt="review"
                          className="w-16 h-16 rounded-xl object-cover border border-gray-100 hover:scale-105 transition-transform cursor-pointer" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* View all */}
              {/* {filtered.length > 0 && (
                <div className="mt-5 text-center">
                  <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-600 transition-all bg-white">
                    View all {PRODUCT.totalReviews} reviews
                  </button>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReviewPage;