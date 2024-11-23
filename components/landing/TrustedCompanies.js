"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaHandsHelping } from "react-icons/fa";
import company1 from "@/assets/company1.png";
import company2 from "@/assets/company2.png";
import company3 from "@/assets/company3.png";
import company4 from "@/assets/company4.png";
import company5 from "@/assets/company5.png";
import company6 from "@/assets/company6.png";

const companies = [
  { name: "HavenCore", logo: company1 },
  { name: "TrueBond", logo: company2 },
  { name: "AnchorPoint", logo: company3 },
  { name: "AegisLink", logo: company4 },
  { name: "SentinelNet", logo: company5 },
  { name: "FortiSure", logo: company6 },
];

const TrustedCompanies = () => {
  return (
    <section className="overflow-hidden bg-gray-900 py-12 lg:px-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500 bg-blue-500/30 px-4 py-2 text-xs font-medium uppercase tracking-wider text-blue-200">
            <FaHandsHelping className="text-lg" /> Our Partners
          </span>
          <h3 className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-2xl font-medium text-transparent">
            Trusted by Industry Leaders
          </h3>
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 z-10 h-full w-40 bg-gradient-to-r from-gray-900 to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-40 bg-gradient-to-l from-gray-900 to-transparent" />

          {/* Scrolling Container */}
          <motion.div
            className="flex w-max space-x-4"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Double the items for seamless loop */}
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="group flex h-40 w-40 flex-col items-center justify-center"
              >
                <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-xl border border-gray-700/50 bg-gray-800/50 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={100}
                    height={100}
                    className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="text-sm font-medium text-blue-300 transition-colors duration-300 group-hover:text-purple-300">
                  {company.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
