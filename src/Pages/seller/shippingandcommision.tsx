"use client";

import React, { useState } from "react";

type TabType =
  | "Shipping & Delivery Charges"
  | "How Shipping Works"
  | "Shipping Timeline"
  | "Return Policy"
  | "Cancellation Policy";

const tabs: TabType[] = [
  "Shipping & Delivery Charges",
  "How Shipping Works",
  "Shipping Timeline",
  "Return Policy",
  "Cancellation Policy",
];

const ShippingPolicy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(tabs[0]);

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* HERO */}
        <section className="bg-linear-to-r from-[#FAF7F2] to-[#E8D9C9] py-16">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
                Darling Desire Shipping, Delivery & Returns Policy
              </h1>

              <p className="mt-4 text-gray-600 text-lg">
                Deliver your products across India with fast, reliable shipping.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Enter Mobile Number"
                  className="border rounded-lg px-4 py-2 w-full outline-none"
                />

                <button className="bg-linear-to-r from-[#812D3A] to-[#812D3A] text-white px-6 py-2 rounded-lg font-semibold">
                  Start Selling
                </button>
              </div>
            </div>

            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
              className="rounded-3xl shadow-xl max-w-md w-full"
              alt="shipping"
            />
          </div>
        </section>

        {/* MAIN SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
          {/* SIDEBAR */}
          <div className="bg-white rounded-2xl shadow p-5 h-fit">
            <h3 className="font-bold mb-4">Policies</h3>

            {tabs.map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer px-3 py-2 rounded-lg mb-2 text-sm transition ${
                  activeTab === tab
                    ? "bg-linear-to-r from-[#812D3A] to-[#812D3A] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* CONTENT */}
          <div className="md:col-span-3 bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-bold mb-4">{activeTab}</h2>

            {/* SHIPPING CHARGES */}
            {activeTab === "Shipping & Delivery Charges" && (
              <>
                <p className="text-gray-600 mb-6">
                  Cost-effective shipping with trusted courier partners across
                  India.
                </p>

                <div className="bg-gray-100 p-6 rounded-2xl">
                  <h3 className="font-semibold mb-4">
                    Ship Your Orders in 3 Steps
                  </h3>

                  <ul className="space-y-2 text-gray-600">
                    <li>• Manage orders from dashboard</li>
                    <li>• Pack products securely</li>
                    <li>• Hand over to courier partner</li>
                  </ul>
                </div>
              </>
            )}

            {/* HOW SHIPPING WORKS */}
            {activeTab === "How Shipping Works" && (
              <p className="text-gray-600">
                Orders are received in your dashboard. Pack them and hand over
                to courier partner for delivery.
              </p>
            )}

            {/* SHIPPING TIMELINE */}
            {activeTab === "Shipping Timeline" && (
              <div className="text-gray-600 space-y-4">
                <p>
                  Orders must be shipped within <b>2–3 days</b> of receiving
                  them.
                </p>
                <p>
                  Delivery usually takes <b>3–7 business days</b> depending on
                  location.
                </p>
              </div>
            )}

            {/* RETURN POLICY */}
            {activeTab === "Return Policy" && (
              <div className="space-y-6 text-gray-600">
                <p>
                  Customers can return products within <b>7 days</b> of
                  delivery.
                </p>

                <h3 className="font-semibold text-lg text-black">
                  Return Shipping Fee
                </h3>

                <ul className="space-y-2">
                  <li>
                    • Seller pays return shipping fee if product is returned
                  </li>
                  <li>• No fee if order is not delivered (RTO)</li>
                  <li>• Track all returns via dashboard</li>
                  <li>• Exceptional cases may waive return fee</li>
                </ul>
              </div>
            )}

            {/* CANCELLATION POLICY */}
            {activeTab === "Cancellation Policy" && (
              <div className="space-y-4 text-gray-600">
                <h3 className="font-semibold text-lg text-black">
                  No Cancellation Penalty
                </h3>

                <p>
                  Orders can be cancelled before dispatch without any charges.
                </p>

                <p>
                  Ensure products are in stock to avoid late cancellations and
                  maintain good customer experience.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-linear-to-r from-[#812D3A] to-[#812D3A] text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Start Selling on Darling Desire 🚀
          </h2>

          <button className="bg-white text-[#812D3A] px-6 py-3 rounded-lg font-semibold">
            Create Account
          </button>
        </section>
      </div>
    </>
  );
};

export default ShippingPolicy;
