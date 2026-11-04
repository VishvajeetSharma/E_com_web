"use client";

import React, { useState } from "react";
import {
  FaBullhorn,
  FaCheckCircle,
  FaArrowRight,
  FaRupeeSign,
  FaMousePointer,
  FaChartLine,
  FaShoppingCart,
  FaUsers,
  FaEye,
  FaRocket,
  FaGem,
  FaWallet,
  FaTrophy,
  FaStar,
  FaFire,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactElement;
}

interface Benefit {
  icon: React.ReactElement;
  title: string;
  description: string;
  color: string;
  stat: string;
  statLabel: string;
}

interface Step {
  step: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const AdvertiseProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [mobile, setMobile] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(value);
  };

  const handleSubmit = (): void => {
    if (mobile.length === 10) {
      alert(
        "🎉 Awesome! Our team will contact you within 24 hours to start your ad campaign!",
      );
      setMobile("");
      setShowForm(false);
    } else {
      alert("Please enter a valid 10-digit mobile number");
    }
  };

  const tabs: Tab[] = [
    { id: "overview", label: "Overview", icon: <FaEye className="text-sm" /> },
    { id: "benefits", label: "Benefits", icon: <FaGem className="text-sm" /> },
    {
      id: "how-it-works",
      label: "How It Works",
      icon: <FaRocket className="text-sm" />,
    },
    {
      id: "pricing",
      label: "Pricing",
      icon: <FaRupeeSign className="text-sm" />,
    },
  ];

  const benefits: Benefit[] = [
    {
      icon: <FaEye className="text-2xl" />,
      title: "More Visibility",
      description: "Your products appear at the top of search results",
      color: "from-[#812D3A] to-cyan-500",
      stat: "500%",
      statLabel: "More Views",
    },
    {
      icon: <FaShoppingCart className="text-2xl" />,
      title: "Increased Sales",
      description: "More visibility leads to more clicks and orders",
      color: "from-green-500 to-emerald-500",
      stat: "3x",
      statLabel: "More Sales",
    },
    {
      icon: <FaMousePointer className="text-2xl" />,
      title: "Pay Per Click",
      description: "Only pay when a customer clicks on your ad",
      color: "from-[#812D3A] to-[#812D3A]",
      stat: "₹0.50",
      statLabel: "Starting CPC",
    },
    {
      icon: <FaChartLine className="text-2xl" />,
      title: "Track Results",
      description: "See how many clicks and sales your ads generate",
      color: "from-orange-500 to-red-500",
      stat: "Real-time",
      statLabel: "Analytics",
    },
    {
      icon: <FaRupeeSign className="text-2xl" />,
      title: "Control Budget",
      description: "Set daily limits and never exceed your budget",
      color: "from-teal-500 to-green-500",
      stat: "100%",
      statLabel: "Budget Control",
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Target Customers",
      description: "Reach customers looking for products like yours",
      color: "from-[#812D3A] to-[#812D3A]",
      stat: "5Cr+",
      statLabel: "Monthly Shoppers",
    },
  ];

  const steps: Step[] = [
    {
      step: "01",
      title: "Select Products",
      description:
        "Choose which products you want to advertise from your catalog",
      icon: "📦",
      color: "from-[#812D3A] to-cyan-500",
    },
    {
      step: "02",
      title: "Set Budget & Bid",
      description:
        "Set your daily budget and how much you want to pay per click",
      icon: "💰",
      color: "from-[#812D3A] to-[#812D3A]",
    },
    {
      step: "03",
      title: "Launch Campaign",
      description: "Start your campaign and watch your sales grow",
      icon: "🚀",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <>
      <div className="bg-linear-to-br from-slate-50 via-white to-slate-50 min-h-screen">
        {/* Hero Section - Premium Design */}
        <div className="relative overflow-hidden bg-linear-to-r from-[#812D3A] via-[#4A101C] to-[#4A101C] text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative max-w-6xl mx-auto px-4 py-20 lg:py-28">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-5 py-2 mb-6">
                <FaFire className="text-yellow-400" />
                <span className="text-sm font-semibold">
                  Trusted by 1,000+ Sellers
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Get More Customers,
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-yellow-300 via-[#C6A46A] to-orange-300">
                  Increase Your Sales 🚀
                </span>
              </h1>

              <p className="text-xl lg:text-2xl mb-10 opacity-95 leading-relaxed max-w-3xl mx-auto">
                Run ads for your products and appear at the top of search
                results. Pay only when customers click on your ad. Start
                reaching millions of customers today!
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => setShowForm(true)}
                  className="group bg-white text-[#4A101C] px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3"
                >
                  Start Advertising Now
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#4A101C] transition-all duration-300">
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold">5Cr+</div>
                  <div className="text-sm opacity-90 mt-1">
                    Monthly Shoppers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold">3x</div>
                  <div className="text-sm opacity-90 mt-1">
                    Avg Sales Growth
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold">₹0.50</div>
                  <div className="text-sm opacity-90 mt-1">Starting CPC</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation - Sticky */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex gap-2 md:gap-6 overflow-x-auto py-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-linear-to-r from-[#812D3A] to-[#812D3A] text-white shadow-lg transform scale-105"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl transform transition-all">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-linear-to-br from-[#812D3A] to-[#812D3A] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaRocket className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Start Advertising!
                </h3>
                <p className="text-gray-600 mt-2">
                  Get 500 free ad credits on first campaign
                </p>
              </div>
              <input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#812D3A] focus:outline-none transition mb-4 text-lg"
                value={mobile}
                onChange={handleMobileChange}
                maxLength={10}
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-linear-to-r from-[#812D3A] to-[#812D3A] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105"
                >
                  Get Started
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center mt-4">
                No spam. Our team will contact you within 24 hours
              </p>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div>
              {/* Main Overview */}
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#E8D9C9] text-[#4A101C] px-4 py-2 rounded-full mb-4">
                    <FaBullhorn />
                    <span className="text-sm font-semibold">
                      What is Product Advertising?
                    </span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Get Your Products at the Top
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-4">
                    Product advertising helps you promote your products by
                    placing them at the top of search results and category
                    pages. Your products will be visible to millions of
                    customers shopping on our platform.
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    When customers search for products like yours, your
                    advertised products will appear at the top with an{" "}
                    <span className="font-semibold text-[#812D3A]">
                      "Ad" tag
                    </span>
                    , making them more likely to be seen and clicked.
                  </p>
                  <div className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-3 rounded-lg">
                    <FaCheckCircle className="text-xl" />
                    <span className="font-semibold">
                      Pay only when customers click on your ad
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-linear-to-br from-[#812D3A] via-[#FAF7F2] to-[#FAF7F2] rounded-2xl p-8 shadow-xl">
                    <div className="text-center mb-6">
                      <div className="text-6xl mb-2">📈</div>
                      <div className="text-4xl font-bold text-[#812D3A] mb-2">
                        3x
                      </div>
                      <p className="text-gray-600 font-medium">
                        Average sales increase for advertisers
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Without Ads</span>
                        <span className="font-semibold">100 views/day</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">With Ads</span>
                        <span className="font-semibold text-green-600">
                          500+ views/day
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-gray-600">Increase</span>
                        <span className="font-bold text-[#812D3A] text-lg">
                          5x More Views
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-32 h-32 bg-linear-to-br from-[#C6A46A] to-[#C6A46A] rounded-full blur-2xl opacity-30"></div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-14 h-14 bg-[#812D3A] rounded-xl flex items-center justify-center mb-4">
                    <FaShieldAlt className="text-[#812D3A] text-2xl" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Safe & Secure</h3>
                  <p className="text-gray-600">
                    Your ads are safe and you have complete control
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <FaWallet className="text-green-600 text-2xl" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Budget Control</h3>
                  <p className="text-gray-600">
                    Set daily limits and never exceed your budget
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-14 h-14 bg-[#E8D9C9] rounded-xl flex items-center justify-center mb-4">
                    <FaHeadset className="text-[#812D3A] text-2xl" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                  <p className="text-gray-600">
                    Dedicated support team to help you succeed
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Benefits Tab */}
          {activeTab === "benefits" && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Why Advertise With Us?
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Get amazing benefits that help you grow your business faster
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden cursor-pointer"
                  >
                    <div
                      className={`absolute inset-0 bg-linear-to-r ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    ></div>
                    <div
                      className={`w-14 h-14 bg-linear-to-r ${benefit.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300`}
                    >
                      <div className="text-white">{benefit.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {benefit.description}
                    </p>
                    <div className="border-t border-gray-100 pt-4 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">
                          {benefit.stat}
                        </span>
                        <span className="text-sm text-gray-500">
                          {benefit.statLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badge */}
              <div className="mt-12 bg-linear-to-r from-yellow-50 to-orange-50 rounded-xl p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaTrophy className="text-yellow-600 text-2xl" />
                  <span className="font-bold text-gray-900">
                    Trusted by Top Sellers
                  </span>
                </div>
                <p className="text-gray-600">
                  Join 10,000+ successful sellers who are already growing with
                  us
                </p>
              </div>
            </div>
          )}

          {/* How It Works Tab */}
          {activeTab === "how-it-works" && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Start Advertising in 3 Simple Steps
                </h2>
                <p className="text-gray-600 text-lg">
                  Get started quickly and easily
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {steps.map((item, index) => (
                  <div key={index} className="relative group">
                    <div className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                        <div
                          className={`w-12 h-12 bg-linear-to-r ${item.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                        >
                          {index + 1}
                        </div>
                      </div>
                      <div className="mt-6 mb-4">
                        <div className="text-5xl mb-3">{item.icon}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    {index < 2 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                        <FaArrowRight className="text-gray-300 text-2xl" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Real Example */}
              <div className="bg-linear-to-r from-gray-900 to-[#2A0910] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  📊 Real Example
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="flex justify-between pb-2 border-b border-white/20">
                      <span>Product Price</span>
                      <span className="font-bold">₹599</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/20">
                      <span>Cost Per Click (CPC)</span>
                      <span className="font-bold">₹5</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/20">
                      <span>Daily Budget</span>
                      <span className="font-bold">₹500</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span>Estimated Daily Clicks</span>
                      <span className="font-bold text-green-400">
                        100 clicks
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-sm leading-relaxed">
                      💡 With a budget of ₹500/day at ₹5 per click, you get 100
                      potential customers visiting your product page every
                      single day. If just 5% of them buy, that's 5 extra sales
                      daily!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === "pricing" && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Simple & Affordable Pricing
                </h2>
                <p className="text-gray-600 text-lg">
                  No hidden fees. Pay only for results.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Starter Plan */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-2 border-[#E8D9C9]">
                  <div className="bg-linear-to-r from-[#812D3A] to-[#812D3A] p-6 text-white text-center">
                    <h3 className="text-2xl font-bold">Pay Per Click</h3>
                    <div className="text-4xl font-bold mt-2">₹5 - ₹20</div>
                    <p className="text-sm opacity-90">per click</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-500" />
                        <span>No monthly fees</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-500" />
                        <span>Set your own budget</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-500" />
                        <span>Pause anytime</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-500" />
                        <span>No hidden charges</span>
                      </li>
                    </ul>
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full bg-linear-to-r from-[#812D3A] to-[#812D3A] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition"
                    >
                      Get Started
                    </button>
                  </div>
                </div>

                {/* Pro Plan */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-2 border-gray-200">
                  <div className="bg-linear-to-r from-gray-800 to-gray-900 p-6 text-white text-center">
                    <h3 className="text-2xl font-bold">Daily Budget</h3>
                    <div className="text-4xl font-bold mt-2">₹200+</div>
                    <p className="text-sm opacity-90">minimum daily budget</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-500" />
                        <span>Complete budget control</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-500" />
                        <span>Priority support</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-500" />
                        <span>Advanced analytics</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-500" />
                        <span>Flexible campaign duration</span>
                      </li>
                    </ul>
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="bg-linear-to-r from-yellow-400 to-orange-400 rounded-xl p-6 text-center text-white">
                <FaStar className="inline-block text-2xl mb-2" />
                <p className="text-lg font-semibold">
                  💡 Pro Tip: Start with a small budget of ₹200-₹500 per day and
                  increase based on results
                </p>
              </div>
            </div>
          )}

          {/* Final CTA */}
          <div className="mt-16 relative overflow-hidden bg-linear-to-r from-[#812D3A] via-[#812D3A] to-orange-600 rounded-2xl p-10 text-center text-white">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative">
              <h3 className="text-3xl lg:text-4xl font-bold mb-3">
                Ready to Grow Your Business? 🚀
              </h3>
              <p className="text-lg lg:text-xl mb-6 opacity-95">
                Join thousands of successful sellers who are already growing
                with us
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-white text-[#4A101C] px-8 py-3 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
              >
                Start Your First Campaign
                <FaArrowRight />
              </button>
              <p className="text-sm opacity-80 mt-4">
                *Get 500 free ad credits on your first campaign
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertiseProducts;
