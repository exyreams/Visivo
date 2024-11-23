"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FiSend } from "react-icons/fi";

import logo from "@/assets/logo.png";

export default function Footer() {
  const [email, setEmail] = useState("");

  // Handle the form submission (for newsletter signup)
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter signup logic
    console.log("Newsletter signup:", email);
    setEmail(""); // Clear the email field after submission
  };

  return (
    <footer className="relative z-10 bg-gradient-to-r from-gray-900 via-blue-950 to-gray-900 text-white backdrop-blur-md lg:px-16">
      {/* Intro Section */}
      <div className="container mx-auto border-t border-gray-700 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6 md:flex-row md:items-start md:space-x-8 md:space-y-0">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="mb-4 h-10 w-10" aria-label="Logo placeholder">
              <Image src={logo} alt="logo" />
            </div>
            {/* Brand Name with Gradient Text */}
            <h2 className="mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
              Visivo
            </h2>
          </div>
          {/* About Text */}
          <p className="mb-4 text-gray-400">
            Leveraging advanced AI technologies to enable seamless visual search
            and auditory description, enhancing accessibility and learning
            through intelligent image recognition and speech synthesis.
          </p>
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Company Section */}
          <div>
            <h3 className="mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-xl font-semibold text-transparent">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="group relative text-blue-300 transition-colors duration-200 hover:text-purple-400"
                >
                  <span>About</span>
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="group relative text-blue-300 transition-colors duration-200 hover:text-purple-400"
                >
                  <span>We are Hiring!</span>
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="group relative text-blue-300 transition-colors duration-200 hover:text-purple-400"
                >
                  <span>Terms</span>
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="group relative text-blue-300 transition-colors duration-200 hover:text-purple-400"
                >
                  <span>Privacy Policy</span>
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-xl font-semibold text-transparent">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/support"
                  className="group relative text-blue-300 transition-colors duration-200 hover:text-purple-400"
                >
                  <span>Contact</span>
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="group relative text-blue-300 transition-colors duration-200 hover:text-purple-400"
                >
                  <span>FAQs</span>
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-xl font-semibold text-transparent">
              Stay Updated
            </h3>
            <p className="mb-4 text-gray-300">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md bg-blue-900/70 px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                required
              />
              <button
                type="submit"
                className="flex items-center justify-center rounded-md border border-blue-500/20 bg-blue-600/20 px-4 py-2 font-medium text-blue-300 transition-all hover:bg-blue-600/30"
              >
                Subscribe
                <FiSend className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Visivo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
