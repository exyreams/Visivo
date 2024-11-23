"use client";

import { motion } from "framer-motion";
import {
  HiOutlineEye,
  HiOutlineMicrophone,
  HiOutlineSpeakerWave,
} from "react-icons/hi2";

const features = [
  {
    icon: <HiOutlineEye className="h-8 w-8 text-blue-300" />,
    title: "AI Vision Analysis",
    description:
      "Powered by advanced computer vision to analyze and understand images in detail.",
  },
  {
    icon: <HiOutlineMicrophone className="h-8 w-8 text-purple-300" />,
    title: "Voice Commands",
    description:
      "Natural speech recognition for hands-free operation and accessibility.",
  },
  {
    icon: <HiOutlineSpeakerWave className="h-8 w-8 text-pink-300" />,
    title: "Natural Speech",
    description: "Premium text-to-speech for natural, human-like descriptions.",
  },
];

export default function Features() {
  return (
    <section className="bg-gray-900 py-24 lg:px-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent">
            Experience the future of visual assistance
          </h2>
          <p className="text-xl text-gray-400">
            Combining cutting-edge AI with natural speech interaction
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="rounded-2xl border border-gray-700/50 bg-gray-800/50 p-8 transition-all duration-300 hover:scale-105 hover:border-blue-500/30"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                {feature.icon}
              </div>
              <h3 className="mb-4 text-xl font-bold text-red-300">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
