import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaHeart } from "react-icons/fa";
import Header from "@/components/layout/Header";
import img from "@/assets/images/logo.png";

const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const mobileNumber = "9876543210"; // This would come from previous page

  useEffect(() => {
    if (timer > 0 && !canResend) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, canResend]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, "");
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    setTimer(30);
    setCanResend(false);
    // API call to resend OTP
    console.log("Resend OTP");
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <>
      <Header />
      <div className="min-h-[82vh] bg-linear-to-br from-[#FAF7F2] via-[#FAF7F2] to-[#FAF7F2] flex items-flex-start justify-center px-4 py-2">
        <div className="w-full max-w-md md:mt-5 mt-15">
          {/* Main Card */}
          <div className="bg-white border border-[#d5d9d9] rounded-2xl shadow-xl p-6 md:p-8">
            {/* Brand */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-[#E8D9C9] to-[#E8D9C9] rounded-full mb-4 shadow-md">
                <img
                  src={img}
                  alt="Logo"
                  className="h-8 w-auto"
                  onClick={() => navigate("/dashboard")}
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 font-garamond">
                DARLING{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#812D3A] to-[#812D3A]">
                  DESIRE
                </span>
              </h1>
              <div className="w-12 h-px bg-linear-to-r from-[#812D3A] to-[#812D3A] mx-auto mt-3"></div>
            </div>

            {/* Description */}
            <div className="text-center mb-6">
              <p className="text-gray-500 text-sm font-google mb-1">
                Enter verification code
              </p>
              <p className="text-gray-400 text-xs">
                We've sent a 4-digit code to{" "}
                <span className="text-[#812D3A] font-medium">
                  {mobileNumber}
                </span>
              </p>
            </div>

            {/* OTP Input Fields */}
            <div className="flex justify-center gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-14 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all ${
                    digit
                      ? "border-[#812D3A] bg-[#FAF7F2] text-[#812D3A]"
                      : "border-gray-200 text-gray-800"
                  } focus:border-[#812D3A] focus:ring-2 focus:ring-[#E8D9C9]`}
                  maxLength={1}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {/* Resend Timer */}
            <div className="text-center mb-6">
              {!canResend ? (
                <p className="text-xs text-gray-400">
                  Resend code in{" "}
                  <span className="text-[#812D3A] font-medium">{timer}</span>{" "}
                  seconds
                </p>
              ) : (
                <button
                  onClick={handleResendOtp}
                  className="text-xs text-[#812D3A] font-medium hover:text-[#4A101C] transition"
                >
                  Resend Code
                </button>
              )}
            </div>   

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={!isOtpComplete || isLoading}
              className={`w-full h-12 rounded text-sm font-bold tracking-widest transition-colors ${
                isOtpComplete && !isLoading
                  ? "bg-[#812D3A] text-white hover:bg-[#812D3A] cursor-pointer"
                  : "bg-[#93959e] text-white cursor-not-allowed"
              }`}
            >
              {isLoading ? "VERIFYING..." : "VERIFY & CONTINUE"}
            </button>

            {/* Wrong Number */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              Wrong number?{" "}
              <button
                onClick={() => navigate(-1)}
                className="text-[#812D3A] font-medium hover:underline"
              >
                Edit Number
              </button>
            </p>
            {/* Back Button
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-500 hover:text-[#812D3A] transition mb-4"
            >
              <FaArrowLeft size={14} />
              <span className="text-sm">Back</span>
            </button> */}
            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-100">
              <FaShieldAlt className="text-[#812D3A] text-xs" />
              <span className="text-gray-400 text-[10px] tracking-wide">
                100% SECURE
              </span>
              <FaHeart className="text-[#812D3A] text-xs ml-2" />
              <span className="text-gray-400 text-[10px] tracking-wide">
                TRUSTED
              </span>
            </div>
          </div>

          {/* Help Text */}
          <p className="text-center text-gray-400 text-[10px] mt-6">
            Didn't receive the code? Check your SMS or contact support
          </p>
        </div>
      </div>
    </>
  );
};

export default OtpVerificationPage;
