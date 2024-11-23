"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing and using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.`,
  },
  {
    title: "2. Use License",
    content: `Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
    • Modify or copy the materials
    • Use the materials for any commercial purpose or for any public display
    • Attempt to decompile or reverse engineer any software contained on our website
    • Remove any copyright or other proprietary notations from the materials
    • Transfer the materials to another person or "mirror" the materials on any other server
    This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time.`,
  },
  {
    title: "3. User Obligations",
    content: `Users must:
    • Provide accurate and complete information when creating an account
    • Maintain the security of their account and promptly notify us of any unauthorized use
    • Comply with all applicable laws and regulations while using our services
    • Respect the intellectual property rights of our company and other users
    • Refrain from uploading or sharing any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable
    • Not use our services to transmit any unsolicited or unauthorized advertising, promotional materials, junk mail, spam, or any other form of solicitation`,
  },
  {
    title: "4. Service Modifications",
    content: `We reserve the right to:
    • Modify or discontinue, temporarily or permanently, any part of our service with or without notice
    • Update prices for our services, with notice provided for any price increases
    • Change the terms and conditions of this agreement, with notification to users of any material changes
    • Limit certain features or restrict access to parts or all of the services without notice or liability`,
  },
  {
    title: "5. Intellectual Property",
    content: `The content, organization, graphics, design, compilation, magnetic translation, digital conversion, and other matters related to our website and services are protected under applicable copyrights, trademarks, and other proprietary rights. Copying, redistribution, use, or publication by you of any such parts of this site is strictly prohibited without our express written permission.`,
  },
  {
    title: "6. Disclaimer of Warranties",
    content: `Our services are provided "as is" without any warranties, expressed or implied. We do not warrant that the functions contained in the materials will be uninterrupted or error-free, that defects will be corrected, or that this site or the server that makes it available are free of viruses or other harmful components.`,
  },
  {
    title: "7. Limitation of Liability",
    content: `In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our services, even if we have been notified orally or in writing of the possibility of such damage.`,
  },
  {
    title: "8. User-Generated Content",
    content: `Users may post content as part of the services, provided that such content does not violate these terms or any applicable laws. By posting content, you grant us a non-exclusive, worldwide, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such content in any and all media or distribution methods.`,
  },
  {
    title: "9. Termination",
    content: `We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms. Upon termination, your right to use the service will immediately cease.`,
  },
  {
    title: "10. Governing Law",
    content: `These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.`,
  },
];

export default function Terms() {
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
            Terms of Service
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Please read these terms carefully before using our services. By
            using our services, you agree to be bound by these terms.
          </p>
        </motion.div>

        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {sections.map((section, index) => (
            <motion.section
              key={index}
              className="rounded-3xl border border-gray-700/50 bg-gray-800/30 p-8 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <h2 className="mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent">
                {section.title}
              </h2>
              <p className="whitespace-pre-line text-gray-300">
                {section.content}
              </p>
            </motion.section>
          ))}
        </motion.div>

        <motion.section
          className="mt-20 rounded-3xl border border-gray-700/50 bg-gray-800/30 p-12 text-center backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
            Need Clarification?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-300">
            If you have any questions about our Terms of Service or need further
            clarification on any point, please don&#39;t hesitate to contact our
            legal team.
          </p>
          <Link href="/support">
            <button className="rounded-xl border border-blue-500/20 bg-blue-600/20 px-8 py-3 font-semibold text-blue-300 transition-all hover:scale-105 hover:bg-blue-600/30">
              Contact Legal Team
            </button>
          </Link>
        </motion.section>
      </div>
    </div>
  );
}
