// noinspection DuplicatedCode

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import {
  FaArrowRight,
  FaBriefcase,
  FaMapMarkerAlt,
  FaSearch,
} from "react-icons/fa";

// Job positions data
const positions = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $180k",
    description:
      "We're looking for an experienced Full Stack Developer to join our engineering team and help build the next generation of our platform.",
    requirements: [
      "8+ years of experience with modern JavaScript frameworks",
      "Strong experience with React, Node.js, and TypeScript",
      "Experience with cloud platforms (AWS/GCP/Azure)",
      "Track record of leading technical projects",
    ],
  },
  {
    id: 2,
    title: "UX/UI Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$90k - $140k",
    description:
      "Join our design team to create beautiful, intuitive interfaces that delight our users.",
    requirements: [
      "5+ years of product design experience",
      "Strong portfolio demonstrating UI/UX skills",
      "Experience with Figma and modern design tools",
      "Understanding of design systems",
    ],
  },
  {
    id: 3,
    title: "Product Manager",
    department: "Product",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110k - $160k",
    description:
      "Drive product strategy and execution in collaboration with our cross-functional teams.",
    requirements: [
      "5+ years of product management experience",
      "Strong analytical and strategic thinking skills",
      "Experience with agile methodologies",
      "Excellent communication skills",
    ],
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $150k",
    description:
      "Help us build and maintain our cloud infrastructure and deployment pipelines.",
    requirements: [
      "5+ years of DevOps experience",
      "Strong knowledge of AWS services",
      "Experience with Docker and Kubernetes",
      "Infrastructure as Code experience",
    ],
  },
];

// Benefits data
const benefits = [
  {
    title: "Health & Wellness",
    description:
      "Comprehensive medical, dental, and vision coverage for you and your family",
    icon: "🏥",
  },
  {
    title: "Flexible Work",
    description: "Remote-first culture with flexible hours and unlimited PTO",
    icon: "🏠",
  },
  {
    title: "Growth & Development",
    description: "Learning stipend and career development opportunities",
    icon: "📚",
  },
  {
    title: "Equity",
    description: "Competitive equity package to share in the company's success",
    icon: "📈",
  },
  {
    title: "Wellness Benefits",
    description: "Monthly wellness stipend for gym, mental health, and more",
    icon: "🧘‍♀️",
  },
  {
    title: "Team Events",
    description: "Regular virtual and in-person team building events",
    icon: "🎉",
  },
];

export default function Careers() {
  // State management for job selection, search, and filtering
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  // Generate unique department list
  const departments = [
    "All",
    ...new Set(positions.map((pos) => pos.department)),
  ];

  // Filter positions based on search term and department
  const filteredPositions = positions.filter((position) => {
    const matchesSearch =
      position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All" ||
      position.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  // Handle job application submission
  const handleApply = (jobId) => {
    console.log("Applying for job:", jobId);
    toast.success(
      "Application submitted successfully! We'll be in touch soon.",
    );
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white lg:px-16">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          className="relative mb-20 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl lg:text-7xl">
            We&#39;re Hiring!
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Build the future with us. We&#39;re looking for passionate
            individuals who want to make a difference.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          className="mb-12 flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Search Input */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 h-5 w-5 text-purple-300" />
            <input
              type="text"
              placeholder="Search positions..."
              className="w-full rounded-md border border-gray-700 bg-gray-800 py-2 pl-10 pr-3 text-purple-400 placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Department Filters */}
          <div className="flex gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`rounded-md px-4 py-2 transition-colors duration-300 ${
                  selectedDepartment === dept
                    ? "bg-purple-600/40 text-purple-300"
                    : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Job Listings */}
        <motion.section
          className="mb-20 grid gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredPositions.map((position, index) => (
            <motion.div
              key={position.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group cursor-pointer rounded-xl border border-gray-700/50 bg-gray-800/30 p-6 backdrop-blur-sm"
              onClick={() =>
                setSelectedJob(selectedJob === position.id ? null : position.id)
              }
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-xl font-semibold text-transparent">
                    {position.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-3">
                    <span className="flex items-center gap-1 text-gray-400">
                      <FaBriefcase className="h-4 w-4 text-blue-400" />
                      {position.department}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <FaMapMarkerAlt className="h-4 w-4 text-yellow-400" />
                      {position.location}
                    </span>
                    <span className="text-blue-400">{position.salary}</span>
                  </div>
                </div>
                {/* Apply Button */}
                <button
                  className="group flex items-center rounded-md border border-purple-500/40 bg-purple-600/40 px-4 py-2 text-purple-300 transition-colors hover:bg-purple-600/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApply(position.id);
                  }}
                >
                  Apply Now
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Expanded Job Details */}
              {selectedJob === position.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 border-t border-gray-700/50 pt-6"
                >
                  <p className="mb-4 text-gray-300">{position.description}</p>
                  <h4 className="mb-2 text-lg font-semibold text-red-300">
                    Requirements:
                  </h4>
                  <ul className="list-inside list-disc space-y-2 text-purple-300">
                    {position.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.section>

        {/* Benefits Section */}
        <motion.section
          className="rounded-3xl border border-gray-700/50 bg-gray-800/30 p-12 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent">
            Benefits & Perks
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className="flex items-start gap-4 rounded-xl border border-gray-700/50 bg-gray-800/50 p-6"
              >
                <span className="text-3xl">{benefit.icon}</span>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-blue-400">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call-to-Action Section */}
        <motion.section
          className="mt-20 rounded-3xl border border-gray-700/50 bg-gray-800/30 p-12 text-center backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
            Don&#39;t See the Right Role?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-300">
            We&#39;re always looking for talented individuals to join our team.
            Send us your resume and we&#39;ll keep you in mind for future
            opportunities.
          </p>
          <button className="rounded-md border border-purple-500/40 bg-purple-600/40 px-6 py-3 text-white transition-all hover:scale-105 hover:bg-purple-600/50">
            Submit Your Resume
          </button>
        </motion.section>
      </div>
    </div>
  );
}
