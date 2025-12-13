import React from "react";
import { motion } from "framer-motion";

const plans = [
  {
    title: "Monthly Subscription",
    price: "₹7,000",
    description: "Access any course for a month with live sessions and recorded content.",
    features: [
      "✔ Access all 6 courses",
      "✔ Live & recorded sessions",
      "✔ Community support",
    ],
  },
  {
    title: "Yearly Subscription",
    price: "₹65,000",
    description:
      "Complete access for a year. Enroll in all courses and get 1 extra free course.",
    features: [
      "✔ All 6 courses + 1 free",
      "✔ Live sessions & recordings",
      "✔ Priority mentorship",
      "✔ Certificate after completion",
    ],
  },
  {
    title: "Free Trial",
    price: "₹0",
    description: "Try 1 course for free and explore our practical lab setup.",
    features: ["✔ 1 course free", "✔ Access to live labs", "✔ Limited community support"],
  },
];

const installments = [
  {
    title: "Two Installments (Most popular)",
    steps: ["₹6,000 – First class", "₹4,000 – After 30 days"],
  },
  {
    title: "Three Installments",
    steps: ["₹4,000 – Joining", "₹3,000 – After 15 days", "₹3,000 – After 30 days"],
  },
  {
    title: "Weekly Payments (For students)",
    steps: ["₹2,500 per week × 4 weeks"],
  },
];

const offers = [
  "Early Bird Offer: First 10 students get free Resume & LinkedIn makeover",
  "Refer & Earn: Refer a friend → ₹500 off",
  "Group Discount: 3+ students join together → flat ₹1,000 off",
];

const Pricing: React.FC = () => {
  return (
    <section className="py-24 bg-[#080b0e] text-white relative">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold text-center mb-16 tracking-widest text-[#b084f5]"
        >
          / / MEMBERSHIP PLANS
        </motion.h2>

        {/* Subscription Plans */}
<div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 cards">
  {plans.map((plan, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.2 }}
      className="w-300 bg-[#0a0f14] border border-[#00ff9d44] rounded-xl p-6 flex flex-col items-center text-center shadow-[0_0_20px_#00ff9d22] hover:shadow-[0_0_25px_#00ff9daa] transition-all duration-300 max-w-sm mx-auto"
    >
      <h3 className="text-2xl font-bold text-[#00ff9d] mb-2">{plan.title}</h3>
      <p className="text-gray-300 mb-4 text-sm">{plan.description}</p>
      <p className="text-3xl font-extrabold text-[#b084f5] mb-4">{plan.price}</p>
      <ul className="text-gray-300 text-sm list-disc list-inside mb-4 space-y-1">
        {plan.features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
      <button className="mt-auto px-6 py-2 rounded-md bg-[#00ff9d] text-black font-bold hover:bg-[#00e6b8] transition-all shadow-[0_0_10px_#00ff9d44]">
        Enroll Now
      </button>
    </motion.div>
  ))}
</div>


        {/* Installment Options */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-[#b084f5] mb-8">/ / Installment Options</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 cards">
            {installments.map((inst, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="w-full bg-[#0a0f14] border-l-4 border-[#00ff9d] rounded-md p-6 text-gray-300 shadow-[0_0_15px_#00ff9d22]"
              >
                <h4 className="text-xl font-bold text-[#00ff9d] mb-3">{inst.title}</h4>
                <ul className="list-disc list-inside space-y-1">
                  {inst.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Special Offers */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-[#b084f5] mb-8">/ / Special Offers</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {offers.map((offer, i) => (
              <li key={i}>{offer}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
