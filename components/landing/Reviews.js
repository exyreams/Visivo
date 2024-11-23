"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Sarah Johnson",
    role: "UX Designer at Design Co",
    image:
      "https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    stars: 5,
    quote:
      "The AI-powered descriptions are incredibly accurate and have revolutionized our design process.",
  },
  {
    name: "Michael Chen",
    role: "Product Manager at Tech Solutions",
    image:
      "https://images.pexels.com/photos/1687675/pexels-photo-1687675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    stars: 5,
    quote:
      "The voice command feature is a game-changer. It's made our product testing so much more efficient.",
  },
  {
    name: "Emily Rodriguez",
    role: "Accessibility Specialist at Access Plus",
    image:
      "https://images.pexels.com/photos/634021/pexels-photo-634021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    stars: 5,
    quote:
      "Finally, a tool that truly understands the needs of visually impaired users. Remarkable!",
  },
  {
    name: "Liam Thompson",
    role: "Software Engineer at Innovatech",
    image:
      "https://images.pexels.com/photos/432059/pexels-photo-432059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    stars: 4,
    quote:
      "The integration process was smooth, and the results exceeded our expectations. Highly recommend!",
  },
  {
    name: "Aisha Patel",
    role: "Marketing Lead at BrightSpark",
    image:
      "https://images.pexels.com/photos/2773977/pexels-photo-2773977.jpeg?auto=compress&cs=tinysrgb&w=600",
    stars: 5,
    quote:
      "The insights provided by this AI assistant have completely transformed our campaign strategies.",
  },
  {
    name: "Daniel Lee",
    role: "Founder of StartUp Simplified",
    image:
      "https://images.pexels.com/photos/2589650/pexels-photo-2589650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    stars: 5,
    quote:
      "An absolute must-have for startups looking to scale efficiently. Exceptional technology!",
  },
];

export default function Reviews() {
  return (
    <section className="bg-gray-900 py-12 lg:px-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent">
            User Testimonials
          </h2>
          <p className="text-xl text-gray-400">
            Join thousands of satisfied users who trust our platform
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="rounded-2xl border border-gray-700/50 bg-gray-800/50 p-8 transition-all duration-300 hover:border-blue-500/30"
            >
              <div className="mb-4 flex gap-1">
                {[...Array(review.stars)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              <FaQuoteLeft className="mb-4 text-3xl text-gray-600" />
              <p className="mb-6 text-gray-300">{review.quote}</p>
              <div className="flex items-center gap-4">
                <Image
                  src={review.image}
                  alt={review.name}
                  height={20}
                  width={20}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-sm text-gray-400">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
