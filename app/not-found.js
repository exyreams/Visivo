"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-900 via-blue-950 to-gray-900 p-4">
      {/* Main Content Wrapper */}
      <div className="relative z-10 p-12 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl font-extrabold tracking-tight sm:text-8xl">
            404
          </h1>
          <motion.p
            className="mt-4 text-xl font-medium sm:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Oops! We couldn&#39;t find the page you&#39;re looking for.
          </motion.p>
          <motion.p
            className="mt-2 text-lg text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            It might have been moved or deleted. Try going back to the home
            page.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8"
        >
          <Link
            href="/"
            className="inline-block rounded-full bg-blue-600 px-8 py-3 text-lg font-semibold transition-colors duration-300 hover:bg-blue-700"
          >
            Go Back Home
          </Link>
        </motion.div>

        {/* Twinkle effect animation */}
        <motion.div
          className="pointer-events-none absolute inset-0 -m-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-40"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 2}px`,
                height: `${Math.random() * 3 + 2}px`,
                animation: `twinkle ${Math.random() * 5 + 3}s infinite`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Twinkle effect keyframes */}
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
