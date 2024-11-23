"use client";

import { motion } from "framer-motion";
import { HiCheck } from "react-icons/hi2";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Basic",
    price: "$9",
    description: "Perfect for individual users",
    features: [
      "1,000 image descriptions per month",
      "Basic voice commands",
      "Standard response time",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    description: "Ideal for professionals",
    features: [
      "10,000 image descriptions per month",
      "Advanced voice commands",
      "Priority response time",
      "24/7 priority support",
      "Custom voice options",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited image descriptions",
      "Custom AI model training",
      "Dedicated support team",
      "SLA guarantees",
      "Custom integration support",
      "Advanced analytics",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="bg-gray-900 py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-300">
            Choose the plan that&apos;s right for you
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="rounded-2xl border border-gray-700 bg-gray-800 p-8 shadow-lg transition-all duration-300 hover:border-blue-500 hover:shadow-blue-500/20"
            >
              <h3 className="mb-2 text-2xl font-bold text-red-300">
                {plan.name}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-blue-400">
                  {plan.price}
                </span>
                {plan.price !== "Custom" && (
                  <span className="text-gray-400">/month</span>
                )}
              </div>
              <p className="mb-6 text-gray-300">{plan.description}</p>
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <HiCheck className="h-5 w-5 shrink-0 text-green-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/signin">
                <button className="w-full rounded-lg border border-blue-500/20 bg-blue-600/20 px-6 py-3 font-semibold text-blue-300 transition-all hover:scale-105 hover:bg-blue-600/30">
                  Get Started
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
