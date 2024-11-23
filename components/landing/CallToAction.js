"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="bg-gray-900 py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <h2 className="mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-4xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-gray-400">
            Join thousands of users who are already experiencing the future of
            visual assistance
          </p>
          <Link href="/signin">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg border border-blue-500/20 bg-blue-600/20 px-8 py-3 transition-all hover:scale-105 hover:bg-blue-600/30"
            >
              Start Free Trial
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
