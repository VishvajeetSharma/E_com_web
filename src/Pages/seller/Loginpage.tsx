import { useState } from "react";
import {
  FaChartLine,
  FaTruck,
  FaHeadset,
  FaWallet,
  FaHeart,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaStore,
} from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SellerPartnerPortal = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();

    navigate("/seller/dashboard");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#FAF7F2] via-[#FAF7F2] to-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-[#812D3A] to-[#812D3A] bg-clip-text text-transparent mb-2">
            Darling Desire
          </h1>
          <p className="text-gray-600 font-medium">SELLER PARTNER PORTAL</p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Brand Message */}
          <div className="space-y-8">
            <div className="bg-linear-to-br from-[#812D3A] to-[#812D3A] rounded-3xl p-8 text-white shadow-2xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-6">
                <FaHeart className="text-[#E8D9C9]" />
                <span className="text-sm font-semibold">
                  Premium Partner Program
                </span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                Sell what makes women feel beautiful
              </h2>

              <p className="text-lg opacity-95 mb-6 leading-relaxed">
                India ka premium destination for fashion & beauty. Apna brand
                lakhon customers tak pahunchao.
              </p>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <FaChartLine className="text-2xl text-yellow-300" />
                  <div>
                    <p className="font-semibold text-sm">Real-time Dashboard</p>
                    <p className="text-xs opacity-80">
                      Sales & inventory insights
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <FaTruck className="text-2xl text-yellow-300" />
                  <div>
                    <p className="font-semibold text-sm">Pan-India Delivery</p>
                    <p className="text-xs opacity-80">Nationwide network</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <FaHeadset className="text-2xl text-yellow-300" />
                  <div>
                    <p className="font-semibold text-sm">24/7 Support</p>
                    <p className="text-xs opacity-80">
                      Dedicated seller support
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <FaWallet className="text-2xl text-yellow-300" />
                  <div>
                    <p className="font-semibold text-sm">Weekly Payouts</p>
                    <p className="text-xs opacity-80">Fast settlements</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-md">
                <div className="text-2xl font-bold text-[#812D3A]">50L+</div>
                <div className="text-xs text-gray-600">Monthly Customers</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-md">
                <div className="text-2xl font-bold text-[#812D3A]">10K+</div>
                <div className="text-xs text-gray-600">Active Sellers</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-md">
                <div className="text-2xl font-bold text-[#812D3A]">500+</div>
                <div className="text-xs text-gray-600">Categories</div>
              </div>
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-[#812D3A] to-[#812D3A] rounded-2xl mb-4">
                <FaStore className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">SELLER LOGIN</h3>
              <p className="text-gray-600 mt-1">
                Welcome back,{" "}
                <span className="font-semibold text-[#812D3A]">Darling</span>
              </p>
              <p className="text-sm text-gray-500">
                Apne store mein sign in karein
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  EMAIL / BUSINESS ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdEmail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="Seller@darlingdesire.in"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#812D3A] focus:outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PASSWORD
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-[#812D3A] focus:outline-none transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#812D3A] rounded border-gray-300 focus:ring-[#812D3A]"
                  />
                </label>
                <button
                  type="button"
                  onClick={() =>
                    alert("Password reset link sent to your email")
                  }
                  className="text-sm text-[#812D3A] hover:text-[#4A101C] font-medium"
                >
                  Forget Password ?
                </button>
              </div>

              {/* Login Button */}
              <button
                onClick={() => {
                  localStorage.setItem(
                    "currentSeller",
                    email?.split("@")[0] || email || "default_seller",
                  );
                  navigate("/seller/dashboard");
                }}
                className="w-full bg-linear-to-r from-[#812D3A] to-[#812D3A] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Log In
                <FaArrowRight />
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                New seller ?{" "}
                <button
                  onClick={() => alert("Redirecting to registration page...")}
                  className="text-[#812D3A] font-semibold hover:text-[#4A101C] transition"
                >
                  register
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © 2025 Darling Desire. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-3 text-xs text-gray-400">
              <a href="#" className="hover:text-[#812D3A] transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#812D3A] transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#812D3A] transition">
                Shipping Policy
              </a>
              <a href="#" className="hover:text-[#812D3A] transition">
                Return Policy
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SellerPartnerPortal;
