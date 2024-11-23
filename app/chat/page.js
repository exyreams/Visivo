"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiFile, FiSend, FiTrash2, FiUpload, FiUser } from "react-icons/fi";
import { toast } from "sonner";
import { marked } from "marked";
import logo from "@/assets/logo.png";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ChatPage() {
  // Initialize messages state with local storage data or empty array
  const [messages, setMessages] = useState(() => {
    // Check if running in browser environment
    if (typeof window !== "undefined") {
      // Retrieve saved messages from local storage
      const savedMessages = localStorage.getItem("chatMessages");
      return savedMessages ? JSON.parse(savedMessages) : [];
    }
    return [];
  });

  // State for managing input, loading, and file selection
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  // Auth Session
  const { data: session } = useSession();

  // References for file input and message scrolling
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Callback to scroll to the bottom of messages
  const scrollToBottom = useCallback(() => {
    // Smooth scroll to the last message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Effect to scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();

    // Optionally save messages to local storage
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages, scrollToBottom]);

  // Generate a preview URL for uploaded files
  const generateFilePreview = (file) => URL.createObjectURL(file);

  // Drag and drop event handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle file drop event
  const handleFileDrop = (e) => {
    e.preventDefault();
    // Convert dropped files to array and select first file
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
    setIsDragOver(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submission if no input or file
    if (!input.trim() && !selectedFile) return;

    const userMessage = input.trim();
    setInput(""); // Clear input
    setIsLoading(true); // Set loading state

    // Create user message object
    const newMessage = {
      id: Date.now(),
      type: "user",
      content: userMessage,
      file: selectedFile,
    };

    // Add user message to messages
    setMessages((prev) => [...prev, newMessage]);

    try {
      // Process file upload if a file is selected
      let fileData = null;
      if (selectedFile) {
        // Convert file to base64
        const reader = new FileReader();
        const fileContent = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(selectedFile);
        });

        // Extract base64 string
        const base64File = fileContent.split(",")[1];
        fileData = {
          mimeType: selectedFile.type,
          data: base64File,
        };
      }

      // Send message to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          fileData,
        }),
      });

      // Validate response
      if (!response.ok) {
        throw new Error("Failed to fetch response from server");
      }

      // Process streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let assistantResponse = "";

      // Read streaming chunks
      while (!done) {
        const { done: chunkDone, value } = await reader.read();
        done = chunkDone;
        if (value) {
          assistantResponse += decoder.decode(value, { stream: true });
        }
      }

      // Add assistant's response to messages
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "assistant",
          content: marked(assistantResponse), // Convert Markdown to HTML
        },
      ]);
    } catch (error) {
      // Handle errors
      console.error("Chat Error:", error);
      toast.error("Sorry, I encountered an error processing your request.");
    } finally {
      // Reset states
      setIsLoading(false);
      setSelectedFile(null);
    }
  };

  return (
    <div
      className="flex h-screen flex-col bg-gray-900 px-12 py-8 text-white lg:px-16"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleFileDrop}
    >
      {session ? (
        <>
          <div className="relative inline-block">
            <h1 className="animate-fade-in mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-center text-2xl font-extrabold text-transparent">
              Visivo Chat
            </h1>
            <div className="absolute -inset-1 -z-10 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 opacity-20 blur"></div>
          </div>
          <p className="animate-fade-in mx-auto mb-4 text-center text-sm text-gray-400 delay-100">
            Experience the power of AI vision—upload your documents, music, or
            videos, and engage in dynamic conversations with it using Visivo
            Chat.
          </p>
          {/* Messages Container */}
          <div className="relative flex-1 space-y-6 overflow-y-auto rounded-t-xl border border-gray-700/50 bg-gray-800/30 p-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-4"
                >
                  {/* Message avatar */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        message.type === "user"
                          ? "bg-purple-600/30"
                          : "bg-blue-600/30"
                      }`}
                    >
                      {message.type === "user" ? (
                        <FiUser className="text-2xl text-purple-400" />
                      ) : (
                        <Image src={logo} height={50} width={50} alt="avatar" />
                      )}
                    </div>
                  </div>

                  {/* Message content */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`max-w-[70%] rounded-lg p-4 ${message.type === "user" ? "bg-purple-600/30" : "bg-blue-600/30"}`}
                  >
                    {/* File preview if attached */}
                    {message.file && (
                      <div className="mb-2">
                        {message.file &&
                        message.file.type &&
                        message.file.type.startsWith("image/") ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={generateFilePreview(message.file)}
                            alt="File preview"
                            className="h-48 w-48 max-w-full rounded-lg"
                          />
                        ) : (
                          <div className="flex items-center space-x-2">
                            <FiFile />
                            <span>{message.file.name}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {/* Render message content */}
                    <div
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                  </motion.div>
                </motion.div>
              ))}

              {/* Ref to scroll to bottom */}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          </div>

          {/* File Preview Section */}
          {selectedFile && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="flex items-center justify-between bg-blue-900 p-4"
            >
              {/* File preview details */}
              <div className="flex items-center space-x-3">
                {selectedFile.type.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={generateFilePreview(selectedFile)}
                    alt="File preview"
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                ) : (
                  <FiFile className="h-8 w-8 text-purple-400" />
                )}
                <div>
                  <p className="max-w-[300px] truncate text-sm text-purple-300">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-blue-300">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>

              {/* Remove file button */}
              <button
                onClick={() => setSelectedFile(null)}
                className="rounded-lg border border-red-700 bg-red-900/50 p-4 text-red-300 hover:scale-105 hover:bg-red-800/50"
              >
                <FiTrash2 className="h-6 w-6" />
              </button>
            </motion.div>
          )}

          {/* Input Area */}
          <div
            className={`rounded-b-xl border border-gray-700/50 bg-gray-800/30 p-4 ${isDragOver ? "border-dashed border-purple-500" : ""}`}
          >
            <form
              onSubmit={handleSubmit}
              className="flex items-center space-x-3"
            >
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  // Set selected file when chosen
                  const file = e.target.files[0];
                  setSelectedFile(file);
                }}
                className="hidden" // Visually hide the input
              />

              {/* File upload button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()} // Trigger file input
                className="rounded-lg border border-purple-700 bg-purple-900/50 p-4 text-purple-300 transition-colors hover:scale-105 hover:bg-purple-800/50"
              >
                <FiUpload className="h-6 w-6" />
              </button>

              {/* Message input field */}
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 overflow-y-auto rounded-lg border border-gray-700/50 bg-gray-800/50 px-4 py-2 text-white focus:outline-none
            focus:ring-2 focus:ring-purple-500/30"
              />

              {/* Send message button */}
              <button
                type="submit"
                disabled={isLoading || (!input.trim() && !selectedFile)}
                className="rounded-lg border border-blue-700 bg-blue-900/50 p-4 text-blue-300 transition-transform
            hover:scale-105 hover:bg-blue-800/50 disabled:opacity-50"
              >
                <FiSend className="h-6 w-6" />
              </button>
            </form>
          </div>

          {/* Drag and Drop Overlay */}
          {isDragOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            >
              <div className="rounded-2xl border-4 border-dashed border-purple-500 p-10">
                <p className="text-center text-2xl text-white">
                  Drop your file here
                </p>
              </div>
            </motion.div>
          )}
        </>
      ) : (
        <div className="rounded-xl border border-gray-700/50 bg-gray-800/30 p-4 text-center text-red-300">
          <p className="mb-4 text-xl font-semibold text-blue-300">
            Please sign in to access Visivo chat and utilize its features.
          </p>
          <Link href="/signin">
            <button className="rounded-lg border border-blue-500/20 bg-blue-600/20 px-8 py-3 text-blue-300 transition-all hover:scale-105 hover:bg-blue-600/30">
              Signin
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
