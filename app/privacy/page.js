"use client";

import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import Link from "next/link";

const sections = [
  {
    title: "Information We Collect",
    content: `We collect information that you provide directly to us, information we obtain automatically when you use our services, and information from third-party sources. This includes:
    • Personal identification information
    • Contact information
    • Usage data and analytics
    • Device and browser information`,
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect to:
    • Provide and maintain our services
    • Improve and personalize your experience
    • Communicate with you about updates and promotions
    • Ensure the security of our platform`,
  },
  {
    title: "Data Security",
    content: `We implement appropriate technical and organizational measures to maintain the security of your personal information, including encryption, access controls, and regular security assessments.`,
  },
  {
    title: "Your Rights",
    content: `You have the right to:
    • Access your personal information
    • Correct inaccurate data
    • Request deletion of your data
    • Object to data processing
    • Data portability`,
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-900 text-white lg:px-16">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          className="relative mb-20 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-6 bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl lg:text-7xl">
            Privacy Policy
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            We are committed to protecting your privacy and ensuring the
            security of your personal information.
          </p>
        </motion.div>

        {/* Privacy Sections Grid */}
        <motion.div
          className="grid gap-8 lg:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {sections.map((section, index) => (
            <motion.section
              key={index}
              className="group relative rounded-3xl border border-gray-700/50 bg-gray-800/30 p-8 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:bg-gray-800/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              <h2 className="mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-2xl font-bold text-transparent">
                {section.title}
              </h2>
              <p className="whitespace-pre-line text-gray-300">
                {section.content}
              </p>
            </motion.section>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.section
          className="mt-20 rounded-3xl border border-gray-700/50 bg-gray-800/30 p-12 text-center backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex flex-col items-center">
            <FaEnvelope className="mb-6 text-5xl text-blue-400" />
            <h2 className="mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-3xl font-bold text-transparent">
              Questions About Our Privacy Policy?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-300">
              If you have any questions or concerns about our privacy practices,
              please don&#39;t hesitate to contact our privacy team.
            </p>
            <Link href="/support">
              <button className="flex items-center gap-2 rounded-xl border border-purple-500/40 bg-purple-600/40 px-8 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-purple-600/50">
                <FaEnvelope />
                Contact Privacy Team
              </button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
