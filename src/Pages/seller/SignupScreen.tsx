import { useState } from "react";
import {
  FaStore,
  FaArrowRight,
  FaShieldAlt,
  FaHeadset,
  FaRocket,
} from "react-icons/fa";
import { MdVerified, MdSecurity } from "react-icons/md";

const SignupPage = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateMobile = (number: any) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(number);
  };

  const handleSendOtp = async () => {
    setError("");

    if (!validateMobile(mobile)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
      console.log(`OTP sent to ${mobile}`);
    }, 1000);
  };

  const handleLogin = async () => {
    setError("");

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      alert("Login Successful 🚀 Welcome to Seller Dashboard!");
      setLoading(false);
      setMobile("");
      setOtp("");
      setOtpSent(false);
    }, 1000);
  };

  const handleMobileChange = (e: any) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(value);
    setError("");
  };

  const handleOtpChange = (e: any) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
    setError("");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (otpSent) {
      handleLogin();
    } else {
      handleSendOtp();
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* LEFT SECTION */}
      <div className="lg:w-1/2 bg-gradient-to-br from-[#812D3A] via-[#C6A46A] to-[#8f6f36] text-white p-6 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-8">
            <FaRocket className="text-sm" />
            <span className="text-sm font-medium">Trusted by 1M+ Sellers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Start Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-[#C6A46A]">
              Selling Journey
            </span>
          </h1>

          <p className="mb-8 text-base sm:text-lg opacity-95 leading-relaxed max-w-md">
            Join India's fastest growing e-commerce platform and reach millions
            of customers nationwide.
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold">10L+</div>
              <div className="text-xs opacity-80">Sellers</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold">20K+</div>
              <div className="text-xs opacity-80">Pincodes</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold">500+</div>
              <div className="text-xs opacity-80">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-xl font-bold">0%</div>
              <div className="text-xs opacity-80">Commission</div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <div className="text-xl text-yellow-400">
                <FaStore />
              </div>
              <div>
                <div className="font-semibold text-sm">Zero Commission</div>
                <div className="text-xs opacity-80">
                  Keep 100% of your earnings
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <div className="text-xl text-yellow-400">
                <MdVerified />
              </div>
              <div>
                <div className="font-semibold text-sm">Quick Setup</div>
                <div className="text-xs opacity-80">
                  Start selling in 5 minutes
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <div className="text-xl text-yellow-400">
                <FaShieldAlt />
              </div>
              <div>
                <div className="font-semibold text-sm">Secure Payments</div>
                <div className="text-xs opacity-80">Weekly settlements</div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer">
              <div className="text-xl text-yellow-400">
                <FaHeadset />
              </div>
              <div>
                <div className="font-semibold text-sm">24/7 Support</div>
                <div className="text-xs opacity-80">
                  Dedicated seller support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#812D3A] to-[#C6A46A] rounded-2xl shadow-lg mb-4">
              <FaStore className="text-white text-2xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Seller Login
            </h2>
            <p className="text-gray-600">
              {otpSent
                ? "Enter verification code"
                : "Get started with your mobile number"}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl">
            <form onSubmit={handleSubmit}>
              {/* Mobile Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">+91</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#812D3A] focus:ring-2 focus:ring-[#812D3A]/20 outline-none transition-all duration-200"
                    value={mobile}
                    onChange={handleMobileChange}
                    disabled={otpSent}
                  />
                </div>
              </div>

              {/* OTP Input */}
              {otpSent && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    One Time Password (OTP)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#812D3A] focus:ring-2 focus:ring-[#812D3A]/20 outline-none transition-all duration-200 text-center text-lg tracking-widest"
                    value={otp}
                    onChange={handleOtpChange}
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="mt-2 text-sm text-[#812D3A] hover:text-[#C6A46A] transition-colors"
                  >
                    Resend OTP
                  </button>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#812D3A] to-[#C6A46A] hover:from-[#C6A46A] hover:to-[#812D3A] text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    {otpSent ? "Verify & Login" : "Send OTP"}
                    <FaArrowRight className="text-sm" />
                  </>
                )}
              </button>

              {/* Terms */}
              <p className="text-xs text-gray-400 mt-6 text-center">
                By continuing, you agree to our{" "}
                <a href="#" className="text-[#812D3A] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#812D3A] hover:underline">
                  Privacy Policy
                </a>
              </p>
            </form>

            {/* Alternative Login */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-500 mb-4">
                Want to sell as a business?
              </p>
              <button className="w-full border-2 border-gray-200 hover:border-[#812D3A] text-gray-700 py-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                <MdSecurity className="text-[#812D3A]" />
                Register as Business Seller
              </button>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
            <MdVerified className="text-green-500" />
            <span>SSL Secure</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <MdVerified className="text-green-500" />
            <span>100% Safe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
