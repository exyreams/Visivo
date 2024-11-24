"use client";

import { motion } from "framer-motion";
import { HiOutlineBolt } from "react-icons/hi2";
import InteractiveMesh from "./InteractiveMesh";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 pb-16 pt-24">
      <InteractiveMesh />
      <div className="container relative z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500 bg-blue-500/30 px-4 py-2 text-blue-200">
              <HiOutlineBolt className="h-4 w-4" />
              Powered by Advanced AI
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-5xl font-bold text-transparent md:text-7xl"
          >
            See the World Through AI Vision
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12 text-xl text-gray-400"
          >
            Transform your visual world into rich, spoken descriptions. Perfect
            for accessibility and learning on the go.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Link href="/search">
              <button className="rounded-lg border border-blue-500/20 bg-blue-600/20 px-8 py-3 text-blue-300 transition-all duration-300 hover:scale-105 hover:bg-blue-600/30">
                Try Demo
              </button>
            </Link>
            <button className="rounded-lg border border-purple-500/40 bg-purple-600/40 px-8 py-3 text-purple-300 transition-all hover:scale-105 hover:bg-purple-600/50">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
