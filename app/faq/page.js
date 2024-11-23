"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Expanded list of FAQs
const faqs = [
  {
    id: 1,
    question: "What is Visivo?",
    answer:
      "Visivo is a cutting-edge AI-powered platform for visual intelligence, transforming how you interact with and understand visual data. It combines advanced image recognition, natural language processing, and machine learning to provide insights from visual content.",
  },
  {
    id: 2,
    question: "How do I get started?",
    answer:
      "Getting started with Visivo is easy! Simply sign up for a free account on our website, verify your email, and you'll have immediate access to our intuitive features. No technical expertise is required to begin exploring the power of visual AI.",
  },
  {
    id: 3,
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a comprehensive 14-day free trial that gives you full access to our AI-powered visual search capabilities. This allows you to explore all of Visivo's features and determine how it can benefit your specific needs before committing to a paid plan.",
  },
  {
    id: 4,
    question: "What types of images can Visivo analyze?",
    answer:
      "Visivo can analyze a wide range of image types including JPEG, PNG, WebP, HEIC, and HEIF formats. Our AI is trained on diverse datasets and can recognize objects, scenes, text, faces, and more in various types of images, from photographs to diagrams and screenshots.",
  },
  {
    id: 5,
    question: "How accurate is Visivo's image analysis?",
    answer:
      "Visivo's image analysis is highly accurate, thanks to our advanced AI models. However, accuracy can vary depending on image quality and complexity. We continuously improve our models and typically achieve over 95% accuracy in standard object and scene recognition tasks.",
  },
  {
    id: 6,
    question: "Can I integrate Visivo with my existing systems?",
    answer:
      "Visivo offers robust APIs that allow for seamless integration with a variety of systems and workflows. Whether you're using content management systems, e-commerce platforms, or custom applications, our team can assist you in integrating Visivo's capabilities.",
  },
  {
    id: 7,
    question: "What makes Visivo different from other image analysis tools?",
    answer:
      "Visivo stands out due to its combination of advanced AI technology, user-friendly interface, and versatile applications. We offer not just image recognition, but also intelligent visual search, automated tagging, and custom AI model training, all within a single platform designed for both technical and non-technical users.",
  },
];

export default function FAQPage() {
  // State to track which FAQs are open
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <div className="min-h-screen bg-gray-900 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-center text-5xl font-bold text-transparent">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              className="overflow-hidden rounded-xl border border-blue-500/20 bg-blue-600/20 text-blue-300 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                className="flex w-full items-center justify-between p-4 text-left"
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
              >
                <span className="text-xl font-semibold">{faq.question}</span>
                {openFaq === faq.id ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <AnimatePresence>
                {openFaq === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="p-4 text-white">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
