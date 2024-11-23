"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoCheckmarkCircle, IoSend } from "react-icons/io5";
import Link from "next/link";

export default function CustomerSupport() {
  // State for component mounting, form data, submission status, and errors
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Effect to set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return null if not mounted (for SSR compatibility)
  if (!mounted) return null;

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      // Reset submission status after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.h1
          className="mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-center text-4xl font-bold text-transparent sm:text-5xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Customer Support
        </motion.h1>
        <motion.p
          className="mb-12 text-center text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          We&#39;re here to help! Check out our{" "}
          <Link
            href="/faq"
            className="font-semibold text-blue-300 hover:underline"
          >
            FAQs
          </Link>{" "}
          or contact us directly.
        </motion.p>

        {/* Contact Us Form Section */}
        <motion.div
          className="mx-auto mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-2xl font-semibold text-transparent">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="mb-2 block text-red-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg bg-blue-600/20 p-2 placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="mb-2 block text-purple-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="support@visivo.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg bg-blue-600/20 p-2 placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Message Textarea */}
            <div>
              <label htmlFor="message" className="mb-2 block text-pink-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full rounded-lg bg-blue-600/20 p-2 placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                aria-invalid={errors.message ? "true" : "false"}
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-lg border border-blue-500/20 bg-blue-600/20 px-4 py-2 text-blue-300 transition-colors duration-200 hover:bg-blue-600/30"
            >
              <IoSend size={20} className="mr-2" />
              Send Message
            </button>
          </form>

          {/* Submission Status Message */}
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 flex items-center rounded-lg border border-green-500/20 bg-green-600/20 p-4"
            >
              <IoCheckmarkCircle size={24} className="mr-2 text-green-400" />
              <span>
                Thank you for your message. We&#39;ll get back to you soon!
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
