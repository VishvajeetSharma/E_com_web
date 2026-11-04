import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaTrash,
} from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";

interface ProductCardProps {
  item: any;
  className?: string;
  isWishlistPage?: boolean;
}

// ── Badge colors ──
const getBadgeGradient = (badge: string) => {
  switch (badge) {
    case "TRENDING":
      return "linear-gradient(135deg, #812d3a, #f97316)";
    case "NEW":
      return "linear-gradient(135deg, #10b981, #0d9488)";
    case "SALE":
      return "linear-gradient(135deg, #f59e0b, #ef4444)";
    case "EXCLUSIVE":
      return "linear-gradient(135deg, #8f6f36, #812d3a)";
    default:
      return "linear-gradient(135deg, #6b7280, #3d2e12)";
  }
};

// ── Size options ──
// const sizeOptions = [
//   { label: "S", value: "S", inStock: true },
//   { label: "M", value: "M", inStock: true },
//   { label: "L", value: "L", inStock: true },
//   { label: "XL", value: "XL", inStock: false },
//   { label: "XXL", value: "XXL", inStock: true },
// ];

// ── Toast helper ──
const showToast = (title: string, html?: string) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title,
    html,
    showConfirmButton: false,
    timer: 1600,
    customClass: { popup: "dd-toast" },
  });
};

// ── Component ──
const ProductCard: React.FC<ProductCardProps> = ({
  item,
  className,
  isWishlistPage = false,
}) => {
  const products = useSelector((state: any) => state.products.products);
  const currentProduct = products.find((p: any) => p.id == item.id);
  const hasSize = ["Topwear", "Bottomwear"].includes(item.mainCategory);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cartItems = useSelector((state: any) => state?.cart?.cartItems);
  const isInCart = cartItems.some((cartItem: any) => {
    if (hasSize) {
      return cartItem.id == item?.id && cartItem.size == selectedSize;
    }
    return cartItem.id == item?.id;
  });
  const isWishlisted = useSelector((state: any) =>
    state.wishlist.wishlistItems.some((w: any) => w.id === item.id)
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsSizeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const handleCardClick = () => {
    navigate(`/product/${item.id}`);
    window.scrollTo(0, 0);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      dispatch(removeFromWishlist(item.id));
      showToast("Removed from Wishlist");
    } else {
      dispatch(
        addToWishlist({
          id: item.id,
          name: item.name,
          price: item.price,
          originalPrice: item.originalPrice,
          image: item.image,
          category: item.category,
        })
      );
      showToast("Added to Wishlist");
    }
  };

  const handleSizeSelect = (size: string, inStock: boolean) => {
    if (!inStock) return;
    setIsAdding(true);
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        quantity: 1,
        size,
        sellerId: item.sellerId,
        returnAvailable: item.returnAvailable,
        exchangeAvailable: item.exchangeAvailable,
      })
    );
    setSelectedSize(size);
    setIsSizeOpen(false);
    setTimeout(() => setIsAdding(false), 500);
    showToast(
      "Added to Cart",
      `<span style="font-size:12px;color:#6b7280">${item.name} · Size ${size}</span>`
    );
  };

  // Calculate 3D transform values
  const rotateX = (mousePosition.y - 0.5) * 20;
  const rotateY = (mousePosition.x - 0.5) * 20;
  const shadowX = (mousePosition.x - 0.5) * 20;
  const shadowY = (mousePosition.y - 0.5) * 20;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        .dd-toast {
          border-radius: 16px !important;
          border: 1px solid #f3ede4 !important;
          box-shadow: 0 8px 32px rgba(129, 45, 58,0.1) !important;
          padding: 1.2rem !important;
        }
        .dd-toast .swal2-title {
          font-size: 0.95rem !important;
          color: #151522 !important;
          font-family: 'DM Sans', sans-serif !important;
        }
        .dd-toast .swal2-icon { border-color: #812d3a !important; }
        .dd-toast .swal2-icon-content { color: #812d3a !important; }
        .swal2-timer-progress-bar {
          background: linear-gradient(90deg, #812d3a, #8f6f36) !important;
        }
          
        .card-img-wrap {
          overflow: hidden;
          position: relative;
          background: linear-gradient(145deg, #faf7f2, #e8d9c9);
          transform-style: preserve-3d;
        }
        
        .card-img-3d {
          transition: transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94);
          transform-origin: center;
          will-change: transform;
        }
        
        .card-root:hover .card-img-3d {
          transform: scale(1.05);
        }

        /* 3D container */
        .card-3d-container {
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
        }
        
        .card-3d-container:hover {
          transform: rotateX(var(--rotateX)) rotateY(var(--rotateY));
        }
        
        /* Shadow overlay for 3D depth */
        .card-shadow-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at var(--shadowX, 50%) var(--shadowY, 50%), 
            rgba(0,0,0,0.1) 0%, 
            rgba(0,0,0,0) 80%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 2;
          border-radius: 12px;
        }
        
        .card-3d-container:hover .card-shadow-overlay {
          opacity: 1;
        }
        
        /* Reflection effect */
        .card-reflection {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 60%;
          background: linear-gradient(135deg, 
            rgba(255,255,255,0.15) 0%, 
            rgba(255,255,255,0) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 1;
          border-radius: 12px 12px 0 0;
        }
        
        .card-3d-container:hover .card-reflection {
          opacity: 1;
        }

        .glint {
          position: absolute; top: 0; left: -70%;
          width: 45%; height: 100%;
          background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%);
          transform: skewX(-15deg);
          pointer-events: none;
          transition: left 0s;
          z-index: 3;
        }
        .card-root:hover .glint {
          left: 130%;
          transition: left 0.6s ease;
        }

        .card-root {
          transition: transform 0.3s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.3s ease;
        }
        .card-root:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(129, 45, 58,0.1), 0 4px 12px rgba(0,0,0,0.06);
        }
      `}</style>

      <div
        onClick={handleCardClick}
        className={`card-root group relative bg-white overflow-hidden cursor-pointer ${className}`}
        // style={{boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)"}}
      >
        {/* ── 3D Image Section ── */}
        <div
          ref={imageRef}
          className="card-img-wrap relative bg-linear-to-br from-gray-50 to-gray-100 aspect-square"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setMousePosition({ x: 0.5, y: 0.5 });
          }}
        >
          <div
            className="card-3d-container w-full h-full"
            style={{
              transform: isHovering
                ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
                : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
              transition: "transform 0.1s ease-out",
              transformStyle: "preserve-3d",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="card-img-3d w-full h-full object-cover"
              loading="lazy"
              style={{
                transform: "translateZ(20px)",
              }}
            />

            {/* Shadow overlay for depth */}
            <div
              className="card-shadow-overlay"
              style={
                {
                  "--shadowX": `${50 + shadowX}%`,
                  "--shadowY": `${50 + shadowY}%`,
                } as React.CSSProperties
              }
            />

            {/* Reflection effect */}
            <div className="card-reflection" />
          </div>

          <div className="glint" />

          {/* Discount badge — top left */}
          {item.discount && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <span
                className="text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-1 rounded-full text-white shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #812d3a, #8f6f36)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {item.discount}
              </span>
            </div>
          )}

          {/* Product badge — top right */}
          {item.badge && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <span
                className="text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full text-white shadow-lg"
                style={{
                  background: getBadgeGradient(item.badge),
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {item.badge}
              </span>
            </div>
          )}

          <button
            onClick={handleWishlist}
            className="absolute bottom-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md"
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(8px)",
              border: isWishlisted
                ? "1.5px solid #d29aa3"
                : "1.5px solid rgba(200,200,200,0.6)",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            {isWishlistPage ? (
              <FaTrash size={12} style={{ color: "#ef4444" }} />
            ) : isWishlisted ? (
              <FaHeart size={13} style={{ color: "#812d3a" }} />
            ) : (
              <FaRegHeart size={13} className="text-gray-500" />
            )}
          </button>
        </div>

        {/* ── Product Info ── */}
        <div className="p-3">
          <h3
            className="text-gray-800 text-sm font-medium line-clamp-1 mb-1.5"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {item.name}
          </h3>

          <div className="flex items-center gap-1 mb-2">
            <FaStar size={10} style={{ color: "#f59e0b" }} />
            <span
              className="text-xs font-medium text-gray-700"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {item.rating?.toFixed(1) ?? "4.5"}
            </span>
            <span
              className="text-[10px] text-gray-400"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              ({item.ratingCount ?? 120})
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 mb-3">
            <span
              className="text-base font-bold"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: "linear-gradient(135deg, #812d3a, #8f6f36)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ₹{item.price.toLocaleString()}
            </span>
            {item.originalPrice && (
              <span
                className="text-[10px] text-gray-400 line-through"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                ₹{item.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart */}
          {hasSize ? (
            <div
              className="relative"
              ref={dropdownRef}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsSizeOpen((p) => !p)}
                disabled={isAdding}
                className="w-full py-2  text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.05em",
                     background: selectedSize
                  ? "linear-gradient(135deg, #812d3a, #8f6f36)"
                  : "linear-gradient(135deg, #faf3f4, #f5ecd9)",
                  color: selectedSize ? "#fff" : "#812d3a",
                  border: selectedSize ? "none" : ".3px solid #d29aa3",
                }}
              >
                {isAdding ? (
                  <>
                    <div
                      className="w-3 h-3 border-2 border-t-transparent rounded-full animate-spin"
                      style={{
                        borderColor: selectedSize ? "#fff" : "#812d3a",
                        borderTopColor: "transparent",
                      }}
                    />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {isInCart ? (
                        <>
                          {" "}
                          <span className="flex items-center justify-center gap-2">
                            Added
                            <SiTicktick size={15} />
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="flex items-center justify-center gap-2">
                            Add to Cart
                            <IoBagHandleOutline size={15} />
                          </span>
                        </>
                      )}
                    </span>
                  </>
                )}
              </button>

              {isSizeOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl border border-[#E8D9C9] shadow-lg z-30 overflow-hidden">
                  <div className="p-2.5">
                    <p
                      className="text-[9px] font-bold tracking-[0.18em] uppercase text-gray-400 px-1 mb-2"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Select Size
                    </p>
                    <div className="grid grid-cols-5 gap-1">
                      {currentProduct?.sizeAvailability?.map((opt: any) => (
                        <button
                          key={opt.size}
                          onClick={() =>
                            handleSizeSelect(opt.size, opt.stock > 0)
                          }
                          disabled={opt.stock === 0}
                          className="py-1.5 text-[11px] font-medium rounded-lg transition-all duration-150"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            background:
                              selectedSize === opt.size
                                ? "linear-gradient(135deg, #812d3a, #8f6f36)"
                                : opt.stock === 0
                                ? "#faf7f2"
                                : "#fff",

                            color:
                              selectedSize === opt.size
                                ? "#fff"
                                : opt.stock === 0
                                ? "#cbbfb1"
                                : "#3d2e12",

                            border:
                              selectedSize === opt.size
                                ? "none"
                                : ".3px solid #f3ede4",

                            cursor: opt.stock === 0 ? "not-allowed" : "pointer",

                            textDecoration:
                              opt.stock === 0 ? "line-through" : "none",
                          }}
                        >
                          {opt.size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              disabled={isAdding}
              onClick={(e) => {
                e.stopPropagation();

                setIsAdding(true);

                dispatch(
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    originalPrice: item.originalPrice,
                    image: item.image,
                    quantity: 1,
                  })
                );

                showToast("Added to Cart");

                setTimeout(() => {
                  setIsAdding(false);
                }, 600);
              }}
              className="w-full py-2  text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.05em",
                background: selectedSize
                  ? "linear-gradient(135deg, #812d3a, #8f6f36)"
                  : "linear-gradient(135deg, #faf3f4, #f5ecd9)",
                color: selectedSize ? "#fff" : "#812d3a",
                border: selectedSize ? "none" : "1px solid #d29aa3",
              }}
            >
              {isAdding ? (
                <>
                  <div
                    className="w-3 h-3 border-2 border-t-transparent rounded-full animate-spin"
                    style={{
                      borderColor: selectedSize ? "#fff" : "#812d3a",
                      borderTopColor: "transparent",
                    }}
                  />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  {isInCart ? (
                   <>
                          {" "}
                          <span className="flex items-center justify-center gap-2">
                            Added
                            <SiTicktick size={15} />
                          </span>
                        </>
                  ) : (
                    <>
                      <>
                        <span className="flex items-center justify-center gap-2">
                          Add to Cart
                          <IoBagHandleOutline size={15} />
                        </span>{" "}
                      </>
                    </>
                  )}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
