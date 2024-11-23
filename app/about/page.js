"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Jane Doe",
    role: "Founder & CEO",
    image:
      "https://images.pexels.com/photos/2834009/pexels-photo-2834009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Visionary leader with 15+ years in tech innovation",
  },
  {
    name: "John Smith",
    role: "CTO",
    image:
      "https://images.pexels.com/photos/19956440/pexels-photo-19956440/free-photo-of-a-man-in-glasses-standing-in-front-of-a-church.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "AI & Machine Learning expert, former Google engineer",
  },
  {
    name: "Alice Johnson",
    role: "Head of Design",
    image:
      "https://images.pexels.com/photos/29491346/pexels-photo-29491346/free-photo-of-portrait-of-confident-woman-in-lavender-shirt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Award-winning UX designer with global brand experience",
  },
  {
    name: "Bob Williams",
    role: "Lead Developer",
    image:
      "https://images.pexels.com/photos/19956442/pexels-photo-19956442/free-photo-of-a-man-with-glasses-and-a-jacket-is-looking-at-the-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Full-stack architect specializing in scalable solutions",
  },
];

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white lg:px-16">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          className="relative mb-20 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl lg:text-7xl">
            Innovating Tomorrow
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Pioneering the future of technology with groundbreaking solutions
            and visionary expertise
          </p>
        </motion.div>

        <motion.section
          className="mb-20 overflow-hidden rounded-3xl border border-gray-700/50 bg-gray-800/30 p-12 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent">
                Our Mission
              </h2>
              <p className="text-xl leading-relaxed text-gray-300">
                We&#39;re on a mission to revolutionize how businesses harness
                technology. Through innovative solutions and cutting-edge
                expertise, we empower organizations to achieve unprecedented
                growth and efficiency in the digital age.
              </p>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 blur-3xl"></div>
              <div className="relative h-full rounded-2xl border border-gray-700/50 bg-gray-800/50 p-8">
                <div className="grid h-full place-items-center">
                  <div className="space-y-4 text-center">
                    <div className="text-5xl font-bold text-purple-400">
                      500+
                    </div>
                    <div className="text-gray-400">Global Clients</div>
                    <div className="text-5xl font-bold text-blue-400">99%</div>
                    <div className="text-gray-400">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="mb-20 overflow-hidden rounded-3xl border border-gray-700/50 bg-gray-800/30 p-12 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent">
            Our Journey
          </h2>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-xl border border-gray-700/50 bg-gray-800/50 p-6">
              <div className="mb-4 text-3xl font-bold text-purple-400">
                2020
              </div>
              <p className="text-gray-300">
                Founded with a vision to transform digital innovation
              </p>
            </div>
            <div className="rounded-xl bg-gray-800/50 p-6">
              <div className="mb-4 text-3xl font-bold text-blue-400">2022</div>
              <p className="text-gray-300">
                Expanded globally with offices in 5 countries
              </p>
            </div>
            <div className="rounded-xl bg-gray-800/50 p-6">
              <div className="mb-4 text-3xl font-bold text-purple-400">
                2024
              </div>
              <p className="text-gray-300">
                Launched revolutionary AI-powered solutions
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="rounded-3xl border border-gray-700/50 bg-gray-800/30 p-12 backdrop-blur-lg"
        >
          <h2 className="mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-center text-4xl font-bold text-transparent">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
              >
                <div className="relative mb-6 aspect-square overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="mb-2 text-purple-400">{member.role}</p>
                  <p className="text-sm text-gray-400">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
