"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";

import logo from "@/assets/logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Search", href: "/search" },
    { name: "About", href: "/about" },
    { name: "FAQs", href: "/faq" },
    { name: "Contact", href: "/support" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <header className="border-b border-gray-700 bg-gradient-to-r from-gray-900 via-blue-950 to-gray-900 text-white shadow-lg backdrop-blur-md lg:px-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <div className="h-12 w-12" aria-label="Logo placeholder">
              <Image src={logo} alt="logo" />
            </div>
            <Link href="/" className="group flex items-center space-x-2">
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent  transition-all duration-300">
                Visivo
              </span>
            </Link>
          </div>
          <nav className="hidden flex-1 justify-center md:flex">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-md text-blue-300 group relative font-medium transition-colors duration-200 hover:text-purple-400"
                  >
                    <span>{item.name}</span>
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden items-center space-x-4 md:flex">
            {session ? (
              <>
                <span className="text-sm text-gray-300">
                  Welcome, {session.user.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="rounded-lg border border-blue-500/20 bg-blue-600/20 px-4 py-2 text-white transition-all hover:scale-105 hover:bg-red-500/80"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/signin">
                <button className="rounded-lg border border-blue-500/20 bg-blue-600/20 px-4 py-2 text-blue-300 transition-all hover:scale-105 hover:bg-blue-600/30">
                  Signin
                </button>
              </Link>
            )}
          </div>
          <button
            className="text-white hover:text-purple-200 focus:outline-none md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <IoClose className="h-6 w-6" />
            ) : (
              <IoMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <nav className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-white transition-colors duration-200 hover:bg-purple-800 hover:text-purple-200"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {!session && (
              <Link href="/signin">
                <button className="rounded-lg border border-blue-500/20 bg-blue-600/20 px-4 py-3 text-blue-300 transition-all hover:scale-105 hover:bg-blue-600/30">
                  Signin
                </button>
              </Link>
            )}
            {session && (
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-white transition-colors duration-200 hover:bg-purple-800 hover:text-purple-200"
              >
                Sign Out
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
