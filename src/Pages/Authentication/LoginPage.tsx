import { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaHeart,
  FaLock,
  FaMobileAlt,
  FaArrowRight,
  FaGem,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import img from "@/assets/images/logo.png";
import type { GlobeMarker } from "@/Pages/Authentication/components/3d-globe";
import ErrorBoundary from "@/components/common/ErrorBoundary";

// Heavy three.js scene: loaded on demand, and contained so a failed texture can never take the login page down.
const Globe3D = lazy(() => import("@/Pages/Authentication/components/3d-globe").then((m) => ({ default: m.Globe3D })));

const GlobeFallback = () => (
  <div className="w-full h-full grid place-items-center rounded-full border border-[#C6A46A]/30 text-[#E8D9C9]/70 text-xs tracking-[0.3em] uppercase">
    Darling Desire
  </div>
);

const sampleMarkers: GlobeMarker[] = [
  {
    lat: 40.7128,
    lng: -74.006,
    src: "https://assets.aceternity.com/avatars/1.webp",
    label: "New York",
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    src: "https://assets.aceternity.com/avatars/2.webp",
    label: "London",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    src: "https://assets.aceternity.com/avatars/3.webp",
    label: "Tokyo",
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    src: "https://assets.aceternity.com/avatars/4.webp",
    label: "Sydney",
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    src: "https://assets.aceternity.com/avatars/5.webp",
    label: "Paris",
  },
  {
    lat: 28.6139,
    lng: 77.209,
    src: "https://assets.aceternity.com/avatars/6.webp",
    label: "New Delhi",
  },
  {
    lat: 55.7558,
    lng: 37.6173,
    src: "https://assets.aceternity.com/avatars/7.webp",
    label: "Moscow",
  },
  {
    lat: -22.9068,
    lng: -43.1729,
    src: "https://assets.aceternity.com/avatars/8.webp",
    label: "Rio de Janeiro",
  },
  {
    lat: 31.2304,
    lng: 121.4737,
    src: "https://assets.aceternity.com/avatars/9.webp",
    label: "Shanghai",
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    src: "https://assets.aceternity.com/avatars/10.webp",
    label: "Dubai",
  },
  {
    lat: -34.6037,
    lng: -58.3816,
    src: "https://assets.aceternity.com/avatars/11.webp",
    label: "Buenos Aires",
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    src: "https://assets.aceternity.com/avatars/12.webp",
    label: "Singapore",
  },
  {
    lat: 37.5665,
    lng: 126.978,
    src: "https://assets.aceternity.com/avatars/13.webp",
    label: "Seoul",
  },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const canContinue = mobile.length === 10 && agreed;

  const handleContinue = () => {
    if (!canContinue) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/otp");
    }, 1500);
  };

  return (
    <>
      <Header />

      <div className="min-h-[calc(100vh-64px)] relative overflow-y-auto overflow-x-hidden">
        {/* Premium Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1920&h=1080&fit=crop')`,
            filter: "brightness(0.25) saturate(1.2)",
          }}
        />

        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-[#2A0910]/80 via-[#2A0910]/60 to-rose-900/80"></div>

        {/* Animated Gradient Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#812D3A]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#812D3A]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#C6A46A]/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Hearts Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#C6A46A]/15"
              initial={{
                y: "100%",
                x: `${Math.random() * 100}%`,
                opacity: 0,
              }}
              animate={{
                y: "-20%",
                opacity: [0, 0.3, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: Math.random() * 12 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            >
              <FaHeart size={Math.random() * 40 + 25} />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto h-full px-4 mt-0 md:mt-0">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center h-full py-6">
            {/* Globe Section */}
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full lg:w-1/2"
            >
              <Globe3DDemo />
            </motion.div>

            {/* Login Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
              className="w-full lg:w-1/2 max-w-md"
            >
              {/* Card Inner */}
              <div className="relative bg-white rounded-2xl p-6">
                {/* Brand Logo */}
                <div className="text-center mb-5">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-[#E8D9C9] to-[#E8D9C9] rounded-full mb-4 shadow-md cursor-pointer"
                    onClick={() => navigate("/dashboard")}
                  >
                    <img src={img} alt="Logo" className="h-8 w-auto" />
                  </motion.div>

                  <h1 className="text-2xl font-bold text-gray-800">
                    DARLING{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-[#812D3A] to-[#812D3A]">
                      DESIRE
                    </span>
                  </h1>
                  <div className="w-12 h-0.5 bg-linear-to-r from-[#812D3A] to-[#812D3A] mx-auto mt-2 rounded-full"></div>
                  <p className="text-gray-500 text-xs mt-3 flex items-center justify-center gap-1">
                    <FaHeart size={8} className="text-[#C6A46A]" />
                    Welcome back
                    <FaHeart size={8} className="text-[#C6A46A]" />
                  </p>
                </div>

                {/* Mobile Input */}
                <div className="mb-5">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Mobile Number
                  </label>
                  <div
                    className={`flex items-center border-2 rounded-xl transition-all ${
                      mobile.length === 10
                        ? "border-green-400 bg-green-50/50"
                        : "border-gray-200 focus-within:border-[#C6A46A]"
                    } focus-within:ring-2 focus-within:ring-[#E8D9C9] focus-within:bg-[#FAF7F2]/30 bg-white`}
                  >
                    <span className="px-3 h-11 flex items-center text-sm font-medium text-gray-700 border-r border-gray-200 shrink-0">
                      +91
                    </span>
                    <FaMobileAlt className="ml-2 text-gray-400" size={14} />
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) =>
                        setMobile(
                          e.target.value.replace(/[^0-9]/g, "").slice(0, 10),
                        )
                      }
                      className="flex-1 h-11 outline-none text-sm text-gray-800 px-2 placeholder:text-gray-400 bg-transparent"
                      placeholder="9876543210"
                      maxLength={10}
                    />
                    {mobile.length === 10 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mr-3 text-green-500 text-sm font-bold"
                      >
                        ✓
                      </motion.div>
                    )}
                  </div>
                  {mobile.length > 0 && mobile.length !== 10 && (
                    <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                      <span>⚠️</span> Enter valid 10-digit number
                    </p>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-2.5 mb-5">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#812D3A] focus:ring-[#812D3A] focus:ring-offset-0 cursor-pointer"
                  />
                  <label
                    htmlFor="terms"
                    className="text-[10px] text-gray-500 leading-relaxed cursor-pointer"
                  >
                    By continuing, I agree to the{" "}
                    <a
                      href="#"
                      className="text-[#812D3A] font-semibold hover:underline"
                    >
                      Terms of Use
                    </a>{" "}
                    &{" "}
                    <a
                      href="#"
                      className="text-[#812D3A] font-semibold hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Continue Button */}
                <motion.button
                  onClick={handleContinue}
                  disabled={!canContinue || isLoading}
                  whileHover={canContinue && !isLoading ? { scale: 1.02 } : {}}
                  whileTap={canContinue && !isLoading ? { scale: 0.98 } : {}}
                  className={`w-full h-11 rounded-xl text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2 relative overflow-hidden ${
                    canContinue && !isLoading
                      ? "bg-linear-to-r from-[#812D3A] via-[#812D3A] to-[#812D3A] text-white shadow-lg hover:shadow-xl cursor-pointer"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs">PROCESSING...</span>
                    </div>
                  ) : (
                    <>
                      <span className="text-xs">CONTINUE</span>
                      <FaArrowRight size={10} />
                    </>
                  )}
                </motion.button>

                {/* Help Link */}
                <p className="text-center text-[10px] text-gray-500 mt-3">
                  Trouble logging in?{" "}
                  <a
                    href="#"
                    className="text-[#812D3A] font-semibold hover:underline"
                  >
                    Get help
                  </a>
                </p>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 mt-5 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 group/badge">
                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-[#E8D9C9] to-[#E8D9C9] flex items-center justify-center group-hover/badge:scale-110 transition">
                      <FaShieldAlt className="text-[#812D3A] text-[10px]" />
                    </div>
                    <span className="text-gray-500 text-[9px] font-medium">
                      SECURE
                    </span>
                  </div>
                  <div className="w-px h-4 bg-gray-200"></div>
                  <div className="flex items-center gap-1.5 group/badge">
                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-[#E8D9C9] to-[#E8D9C9] flex items-center justify-center group-hover/badge:scale-110 transition">
                      <FaLock className="text-[#812D3A] text-[10px]" />
                    </div>
                    <span className="text-gray-500 text-[9px] font-medium">
                      ENCRYPTED
                    </span>
                  </div>
                  <div className="w-px h-4 bg-gray-200"></div>
                  <div className="flex items-center gap-1.5 group/badge">
                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-[#E8D9C9] to-[#E8D9C9] flex items-center justify-center group-hover/badge:scale-110 transition">
                      <FaHeart className="text-[#812D3A] text-[9px]" />
                    </div>
                    <span className="text-gray-500 text-[9px] font-medium">
                      TRUSTED
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

export function Globe3DDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center"
    >
      {/* Premium Heading */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-3">
          <FaGem size={10} className="text-[#C6A46A]" />
          <span className="text-[10px] text-[#E8D9C9] font-medium tracking-wider">
            GLOBAL PRESENCE
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg tracking-tight">
          Global Network of{" "}
          <span className="bg-linear-to-r from-[#C6A46A] via-[#E8D9C9] to-[#C6A46A] bg-clip-text text-transparent">
            Happy Clients
          </span>
        </h2>
        <p className="text-[#E8D9C9] text-xs mt-2 opacity-80">
          Trusted by customers worldwide
        </p>
        <div className="w-16 h-0.5 bg-linear-to-r from-[#C6A46A] to-[#C6A46A] mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Globe Container - Only Globe, no stars */}
      <div className="w-full h-70 md:h-80 relative">
        <ErrorBoundary fallback={<GlobeFallback />}>
        <Suspense fallback={<GlobeFallback />}>
        <Globe3D
          className="w-full h-full relative z-10"
          markers={sampleMarkers}
          config={{
            atmosphereColor: "#DC586D",
            atmosphereIntensity: 25,
            bumpScale: 5,
            autoRotateSpeed: 0.5,
          }}
          onMarkerClick={(marker) => {
            console.log("Clicked marker:", marker.label);
          }}
          onMarkerHover={(marker) => {
            if (marker) {
              console.log("Hovering:", marker.label);
            }
          }}
        />
        </Suspense>
        </ErrorBoundary>
      </div>

      {/* Stats */}
      <div className="flex gap-8  bg-white/10 backdrop-blur-md rounded-full px-6 py-2.5 border border-white/20">
        <div className="text-center">
          <p className="text-lg font-bold text-transparent bg-clip-text bg-linear-to-r from-[#C6A46A] to-[#E8D9C9]">
            50+
          </p>
          <p className="text-[10px] text-[#E8D9C9] font-medium">Countries</p>
        </div>
        <div className="w-px h-8 bg-white/20"></div>
        <div className="text-center">
          <p className="text-lg font-bold text-transparent bg-clip-text bg-linear-to-r from-[#C6A46A] to-[#E8D9C9]">
            10k+
          </p>
          <p className="text-[10px] text-[#E8D9C9] font-medium">Happy Clients</p>
        </div>
        <div className="w-px h-8 bg-white/20"></div>
        <div className="text-center">
          <p className="text-lg font-bold text-transparent bg-clip-text bg-linear-to-r from-[#C6A46A] to-[#E8D9C9]">
            24/7
          </p>
          <p className="text-[10px] text-[#E8D9C9] font-medium">Support</p>
        </div>
      </div>
    </motion.div>
  );
}
