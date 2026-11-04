import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "@/components/layout/Header";
const statusConfig: Record<
  string,
  { label: string; color: string; bg: string; dot: string }
> = {
  pending: {
    label: "Pending",
    color: "#b45309",
    bg: "#fef3c7",
    dot: "#f59e0b",
  },
  confirmed: {
    label: "Confirmed",
    color: "#1d4ed8",
    bg: "#e8d9c9",
    dot: "#3b82f6",
  },
  processing: {
    label: "Processing",
    color: "#8f6f36",
    bg: "#f3ede4",
    dot: "#d2b277",
  },
  shipped: {
    label: "Shipped",
    color: "#0369a1",
    bg: "#f3ede4",
    dot: "#0ea5e9",
  },
  delivered: {
    label: "Delivered",
    color: "#15803d",
    bg: "#dcfce7",
    dot: "#22c55e",
  },
  cancelled: {
    label: "Cancelled",
    color: "#b91c1c",
    bg: "#fee2e2",
    dot: "#ef4444",
  },
};

const getStatus = (s: string) =>
  statusConfig[s?.toLowerCase()] ?? {
    label: s,
    color: "#6b7280",
    bg: "#f3ede4",
    dot: "#9ca3af",
  };

const OrdersPage = () => {
  const navigate = useNavigate();
  const orders = useSelector((state: any) => state.order.orders);
  console.log("orders", orders);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .op-wrap {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #faf7f2;
          padding: 32px 20px 48px;
        }

        /* ── Header ── */
        .op-header {
          max-width: 900px;
          margin: 0 auto 28px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
        }
        .op-header-left { display: flex; align-items: center; gap: 12px; }
        .op-accent { width: 3px; height: 44px; background: linear-gradient(180deg,#812d3a,#8f6f36); border-radius: 3px; flex-shrink: 0; }
        .op-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 600; color: #151522; line-height: 1.1;
        }
        .op-title span { font-weight: 300; }
        .op-sub { font-size: 10px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: #9a8f84; margin-top: 3px; }
        .op-count-chip {
          background: linear-gradient(135deg,#812d3a,#8f6f36);
          color: #fff; font-size: 11px; font-weight: 700;
          padding: 4px 12px; border-radius: 20px;
          letter-spacing: .04em;
        }

        /* ── Empty ── */
        .op-empty {
          max-width: 400px; margin: 80px auto 0;
          text-align: center;
        }
        .op-empty-icon {
          width: 72px; height: 72px; border-radius: 50%;
          background: #fff; border: 1px solid #e8d9c9;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
          box-shadow: 0 4px 20px rgba(21, 21, 34,.06);
        }
        .op-empty h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600; color: #151522; margin-bottom: 8px;
        }
        .op-empty p { font-size: 13px; color: #9a8f84; line-height: 1.6; }
        .op-shop-btn {
          margin-top: 20px; display: inline-flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg,#812d3a,#8f6f36);
          color: #fff; font-size: 12px; font-weight: 700; letter-spacing: .1em;
          text-transform: uppercase; padding: 11px 24px; border-radius: 8px;
          border: none; cursor: pointer;
          transition: opacity .2s, transform .2s;
        }
        .op-shop-btn:hover { opacity: .9; transform: translateY(-1px); }

        /* ── Order card ── */
        .op-list { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }

        .op-card {
          background: #fff;
          border-radius: 14px;
          border: 1px solid #e8d9c9;
          box-shadow: 0 2px 16px rgba(21, 21, 34,.05);
          overflow: hidden;
          transition: box-shadow .25s, transform .25s;
        }
        .op-card:hover {
          box-shadow: 0 8px 32px rgba(21, 21, 34,.1);
          transform: translateY(-2px);
        }

        /* top strip */
        .op-card-top {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 18px;
          background: #fbf9f5;
          border-bottom: 1px solid #f3ede4;
          flex-wrap: wrap; gap: 8px;
        }
        .op-id { font-size: 11px; font-weight: 700; color: #2a2733; letter-spacing: .08em; text-transform: uppercase; }
        .op-id span { color: #9a8f84; font-weight: 500; }
        .op-top-right { display: flex; align-items: center; gap: 10px; }
        .op-date { font-size: 10px; color: #9a8f84; font-weight: 500; }

        .op-status {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 20px;
        }
        .op-status-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

        /* items area */
        .op-items { padding: 14px 18px; display: flex; flex-direction: column; gap: 12px; }

        .op-item {
          display: flex; align-items: center; gap: 14px;
        }
        .op-item-img {
          width: 60px; height: 60px; border-radius: 8px;
          object-fit: cover; flex-shrink: 0;
          border: 1px solid #f3ede4;
          background: #faf7f2;
        }
        .op-item-img-placeholder {
          width: 60px; height: 60px; border-radius: 8px; flex-shrink: 0;
          background: linear-gradient(135deg,#f3ede4,#e8d9c9);
          border: 1px solid #f3ede4;
          display: flex; align-items: center; justify-content: center;
        }
        .op-item-info { flex: 1; min-width: 0; }
        .op-item-name {
          font-size: 13px; font-weight: 600; color: #151522;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          margin-bottom: 3px;
        }
        .op-item-cat {
          font-size: 10px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
          color: #812d3a; background: #faf3f4; border: 1px solid #e8c9ce;
          padding: 2px 8px; border-radius: 4px; display: inline-block;
        }
        .op-item-size {
          font-size: 10px; color: #9a8f84; font-weight: 500; margin-top: 3px;
        }
        .op-item-prices { text-align: right; flex-shrink: 0; }
        .op-item-price { font-size: 15px; font-weight: 700; color: #151522; display: block; }
        .op-item-orig { font-size: 10px; color: #cbbfb1; text-decoration: line-through; display: block; }
        .op-item-qty { font-size: 10px; color: #9a8f84; margin-top: 2px; }

        /* divider inside items */
        .op-item-divider { height: 1px; background: #f3ede4; }

        /* card footer */
        .op-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 18px;
          background: #fbf9f5;
          border-top: 1px solid #f3ede4;
          flex-wrap: wrap; gap: 8px;
        }
        .op-footer-meta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .op-meta-item { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #9a8f84; }
        .op-meta-item svg { opacity: .5; }
        .op-total-row { display: flex; align-items: baseline; gap: 6px; }
        .op-total-label { font-size: 10px; color: #9a8f84; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
        .op-total {
          font-size: 18px; font-weight: 700; color: transparent;
          background: linear-gradient(135deg,#812d3a,#8f6f36);
          -webkit-background-clip: text; background-clip: text;
        }

        /* Track btn */
        .op-track-btn {
          font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
          color: #2a2733; background: #fff;
          border: 1.5px solid #2a2733; padding: 4px 10px; border-radius: 7px;
          cursor: pointer; display: flex; align-items: center; gap: 1px;
          transition: all .2s;
        }
        .op-track-btn:hover { background: #2a2733; color: #fff; }

        /* responsive */
        @media (max-width: 600px) {
          .op-header { flex-direction: column; align-items: flex-start; }
          .op-card-top { flex-direction: column; align-items: flex-start; }
          .op-card-footer { flex-direction: column; align-items: flex-start; }
          .op-item-img, .op-item-img-placeholder { width: 50px; height: 50px; }
        }
      `}</style>
      <Header />
      <div className="op-wrap">
        {/* Header */}
        <div className="op-header">
          <div className="op-header-left">
            <div className="op-accent" />
            <div>
              <h1 className="op-title">
                <span>My </span>Orders
              </h1>
              <p className="op-sub">Order history &amp; tracking</p>
            </div>
          </div>
          {orders.length > 0 && (
            <span className="op-count-chip">
              {orders.length} order{orders.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Empty state */}
        {orders.length === 0 ? (
          <div className="op-empty">
            <div className="op-empty-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
                  stroke="#cbbfb1"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6h18M16 10a4 4 0 01-8 0"
                  stroke="#cbbfb1"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3>No orders yet</h3>
            <p>
              Your order history will appear here once you make your first
              purchase.
            </p>
            <button
              className="op-shop-btn"
              onClick={() => navigate("/DashBoard")}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path
                  d="M5 3l4 4-4 4"
                  stroke="#fff"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="op-list">
            {orders.map((order: any) => {
              const st = getStatus(order.status);
              const items: any[] = order.items ?? [];
              const itemCount = items.reduce(
                (s: number, i: any) => s + (i.quantity ?? 1),
                0
              );

              return (
                <div className="op-card" key={order.id}>
                  {/* Top strip */}
                  <div className="op-card-top">
                    <div className="op-id">
                      Order <span>#</span>
                      {String(order.id).padStart(6, "0")}
                    </div>
                    <div className="op-top-right">
                      {order.date && (
                        <span className="op-date">
                          {new Date(order.date).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      )}

                      <span
                        className="op-status"
                        style={{ color: st.color, background: st.bg }}
                      >
                        <span
                          className="op-status-dot"
                          style={{ background: st.dot }}
                        />
                        {st.label}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="op-items">
                    {items.length > 0 ? (
                      items.map((item: any, idx: number) => (
                        <div key={item.id ?? idx}>
                          <div className="op-item">
                            {item.image ? (
                              <img
                                className="op-item-img"
                                src={item.image}
                                alt={item.name}
                              />
                            ) : (
                              <div className="op-item-img-placeholder">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <rect
                                    x="3"
                                    y="3"
                                    width="18"
                                    height="18"
                                    rx="3"
                                    stroke="#cbbfb1"
                                    strokeWidth="1.5"
                                  />
                                  <circle
                                    cx="8.5"
                                    cy="8.5"
                                    r="1.5"
                                    stroke="#cbbfb1"
                                    strokeWidth="1.3"
                                  />
                                  <path
                                    d="M21 15l-5-5L5 21"
                                    stroke="#cbbfb1"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </div>
                            )}
                            <div className="op-item-info">
                              <div className="op-item-name">
                                {item.name ?? "Product"}
                              </div>
                              {item.status && (
                                <span className="op-item-cat">
                                  {item.status}
                                </span>
                              )}
                              {item.category && (
                                <span className="op-item-cat">
                                  {item.category}
                                </span>
                              )}

                              {item.size && (
                                <div className="op-item-size">
                                  Size: {item.size}
                                </div>
                              )}
                              {item.quantity && item.quantity > 1 && (
                                <div className="op-item-qty">
                                  Qty: {item.quantity}
                                </div>
                              )}
                            </div>
                            <button
                              className="op-track-btn"
                              onClick={() =>
                                navigate(`/orderDetail/${order.id}/${item.id}`)
                              }
                            >
                              Track
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  d="M5 3l4 4-4 4"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                            <div className="op-item-prices">
                              <span className="op-item-price">
                                ₹{Number(item.price).toLocaleString("en-IN")}
                              </span>
                              {item.originalPrice &&
                                item.originalPrice !== item.price && (
                                  <span className="op-item-orig">
                                    ₹
                                    {Number(item.originalPrice).toLocaleString(
                                      "en-IN"
                                    )}
                                  </span>
                                )}
                            </div>
                          </div>
                          {idx < items.length - 1 && (
                            <div className="op-item-divider" />
                          )}
                        </div>
                      ))
                    ) : (
                      /* fallback if no items array */
                      <div className="op-item">
                        <div className="op-item-img-placeholder">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <rect
                              x="3"
                              y="3"
                              width="18"
                              height="18"
                              rx="3"
                              stroke="#cbbfb1"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </div>
                        <div className="op-item-info">
                          <div className="op-item-name">
                            Order #{String(order.id).padStart(6, "0")}
                          </div>
                        </div>
                        <div className="op-item-prices">
                          <span className="op-item-price">
                            ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="op-card-footer">
                    <div className="op-footer-meta">
                      {itemCount > 0 && (
                        <div className="op-meta-item">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M1 1h1.5l1 5h5.5l1-3.5H4"
                              stroke="#2a2733"
                              strokeWidth="1.1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle cx="5.5" cy="10" r="1" fill="#2a2733" />
                            <circle cx="9" cy="10" r="1" fill="#2a2733" />
                          </svg>
                          {itemCount} item{itemCount !== 1 ? "s" : ""}
                        </div>
                      )}
                      {order.paymentMethod && (
                        <div className="op-meta-item">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <rect
                              x="1"
                              y="2.5"
                              width="10"
                              height="7"
                              rx="1.5"
                              stroke="#2a2733"
                              strokeWidth="1.1"
                            />
                            <path
                              d="M1 5h10"
                              stroke="#2a2733"
                              strokeWidth="1.1"
                            />
                          </svg>
                          {order.paymentMethod}
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                      }}
                    >
                      <div className="op-total-row">
                        <span className="op-total-label">Total</span>
                        <span className="op-total">
                          ₹{Number(order.amount).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default OrdersPage;
