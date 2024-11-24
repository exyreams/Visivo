"use client";

import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { FaDiscord, FaGithub, FaSearch } from "react-icons/fa";
import { toast } from "sonner";
import Link from "next/link";
import { MdImageSearch, MdKeyboardVoice } from "react-icons/md";
import { RiAiGenerate } from "react-icons/ri";
import { IoMdChatbubbles } from "react-icons/io";

export default function SignInPage() {
  // Session and routing management
  const { data: session, status } = useSession();

  // Feature data for the left side with unique IDs
  const features = [
    {
      id: "1",
      icon: <MdImageSearch className="text-blue-400" />,
      title: "AI Image Analysis",
      color: "purple-300",
      description:
        "Advanced visual intelligence that transforms images into insights",
    },
    {
      id: "2",
      icon: <RiAiGenerate className="text-purple-400" />,
      title: "Intelligent Insights",
      color: "blue-300",
      description:
        "Cutting-edge AI that extracts meaningful context from visuals",
    },
    {
      id: "3",
      icon: <MdKeyboardVoice className="text-green-400" />,
      title: "Natural Language Processing",
      color: "blue-300",
      description: "Seamless text-to-speech with human-like articulation",
    },
  ];

  // Framer Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Handle sign-in process with toast notifications
  const handleSignIn = (provider) => {
    toast.promise(signIn(provider, { callbackUrl: "/signin" }), {
      loading: `Signing in with ${provider}...`,
      success: `Signed in with ${provider} successfully!`,
      error: `Failed to sign in with ${provider}`,
    });
  };

  // Prevent rendering during loading state
  if (status === "loading") {
    return null;
  }

  // Render authenticated welcome page
  if (status === "authenticated") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-screen bg-gray-900 lg:px-16"
      >
        {/* Left Side - Feature Showcase */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative hidden overflow-hidden lg:block lg:w-1/2"
        >
          {/* Animated Particle Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 opacity-30 blur-3xl"
          />

          {/* Feature Showcase Container */}
          <div className="relative z-10 flex h-full flex-col justify-center p-12">
            <motion.h2
              variants={itemVariants}
              className="mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-center text-4xl font-bold text-transparent"
            >
              Features
            </motion.h2>
            <motion.div className="space-y-8">
              {features.map((feature) => (
                <motion.div
                  key={feature.id}
                  variants={itemVariants}
                  className="flex items-center space-x-6 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/30"
                >
                  <div className="text-4xl">{feature.icon}</div>
                  <div>
                    <h3
                      className={`text-${feature.color} text-xl font-semibold`}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Welcome Section */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="flex w-full items-center justify-center p-8 lg:w-1/2"
        >
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-lg">
            {/* Greeting Text */}
            <div className="mb-8 text-center">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent"
              >
                Welcome, {session.user.name}
              </motion.h2>
              <p className="text-gray-400">
                Explore Visivo&#39;s powerful AI capabilities
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-x-4">
              <Link href="/search">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex w-full items-center justify-center rounded-lg border border-blue-500/20 bg-blue-600/20 px-4 py-3 text-blue-300 backdrop-blur-md transition-all hover:brightness-125"
                >
                  <FaSearch className="text-xl mr-4" />
                  Analyze Images
                </motion.button>
              </Link>
              <Link href="/chat">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex w-full items-center justify-center rounded-lg border border-purple-500/20 bg-purple-600/20 px-4 py-3 text-purple-300 backdrop-blur-md transition-all hover:brightness-125"
                >
                  <IoMdChatbubbles className="text-xl mr-4" />
                  Chat with files
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // sign-in page
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen bg-gray-900 lg:px-16"
    >
      {/* Left Side - Feature Showcase */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative hidden overflow-hidden lg:block lg:w-1/2"
      >
        {/* Animated Particle Background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 opacity-30 blur-3xl"
        />

        {/* Feature Showcase Container */}
        <div className="relative z-10 flex h-full flex-col justify-center p-12">
          <motion.h2
            variants={itemVariants}
            className="mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-center text-4xl font-bold text-transparent"
          >
            Visivo Capabilities
          </motion.h2>
          <motion.div className="space-y-8">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className="flex items-center space-x-6 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/30"
              >
                <div className="text-4xl">{feature.icon}</div>
                <div>
                  <h3 className={`text-${feature.color} text-xl font-semibold`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Sign In Form */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="flex w-full items-center justify-center p-8 lg:w-1/2"
      >
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-lg">
          {/* Sign In Header */}
          <div className="mb-8 text-center">
            <h2 className="mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
              Welcome to Visivo
            </h2>
            <p className="text-gray-400">
              Secure authentication with trusted providers
            </p>
          </div>

          {/* Authentication Options */}
          <div className="space-y-4">
            {/* GitHub Sign In */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSignIn("github")}
              className="flex w-full items-center justify-center rounded-lg border
              border-blue-500/50 bg-blue-500/30 px-4 py-3 text-white backdrop-blur-md
              transition-all hover:border-blue-500/60 hover:bg-blue-500/40"
            >
              <FaGithub className="mr-3" size={24} />
              Continue with GitHub
            </motion.button>

            {/* Discord Sign In */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSignIn("discord")}
              className="flex w-full items-center justify-center rounded-lg border
              border-purple-500/60 bg-purple-500/30 px-4 py-3 text-white backdrop-blur-md
              transition-all hover:border-purple-500/50 hover:bg-purple-500/20"
            >
              <FaDiscord className="mr-3" size={24} />
              Continue with Discord
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
