"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Error in chat:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 text-center">
        <h1 className="text-2xl font-bold">Visivo Chat</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-[80%] items-start rounded-lg p-3 ${
                  message.role === "user" ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                {message.role === "user" ? (
                  <FaUser className="mr-2 mt-1 h-5 w-5" />
                ) : (
                  <FaRobot className="mr-2 mt-1 h-5 w-5" />
                )}
                <p className="text-sm">{message.content}</p>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex max-w-[80%] items-center rounded-lg bg-gray-700 p-3">
                <FaRobot className="mr-2 h-5 w-5" />
                <p className="text-sm">Thinking...</p>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <footer className="bg-gray-800 p-4">
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
          <div className="flex items-center rounded-lg bg-gray-700 p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent px-2 text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="ml-2 rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              <FaPaperPlane />
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
}
