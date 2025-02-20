import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Loader2,
  History,
  Sparkles,
  Book,
  ImageIcon,
  MessageSquare,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export default function PastPaperAssistant() {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [subject, setSubject] = useState("");
  const [activeTab, setActiveTab] = useState("write");
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "English",
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setAnswer(
        "This is a sample answer to your question. In a real implementation, this would be replaced with an actual AI response."
      );
      setIsLoading(false);
    }, 2000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      // Handle file upload here
      console.log("File dropped:", files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Subtle patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.15]">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-full" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-50 to-purple-50 rounded-full" />
      </div>

      <div className="relative">
        {/* Hero Section */}
        <div className="pt-20 pb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              AI Past Paper Assistant
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Get instant, accurate answers to your past paper questions powered
              by advanced AI
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 mt-12 px-4"
          >
            {[
              { icon: Sparkles, text: "AI-Powered Analysis" },
              { icon: Book, text: "Multiple Subjects" },
              { icon: ImageIcon, text: "Image Recognition" },
              { icon: History, text: "Answer History" },
            ].map((Feature, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="p-3 rounded-full bg-white shadow-lg">
                  <Feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {Feature.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid gap-8"
          >
            {/* Input Card */}
            <div className="bg-white rounded-xl p-6 shadow-xl border border-gray-100">
              <div className="flex gap-4 mb-6">
                {[
                  { id: "write", icon: MessageSquare, label: "Write Question" },
                  { id: "upload", icon: ImageIcon, label: "Upload Image" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2
                      ${
                        activeTab === tab.id
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Custom Select */}
              <div className="relative mb-6">
                <button
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 text-left text-gray-600 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                >
                  <span>{subject || "Select subject"}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {isSelectOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-10">
                    {subjects.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          setSubject(sub);
                          setIsSelectOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-600"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {activeTab === "write" ? (
                <textarea
                  placeholder="Type or paste your question here..."
                  className="w-full min-h-[120px] mb-4 text-lg p-4 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 resize-none"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              ) : (
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 mb-4
                    ${
                      isDragging
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-blue-400"
                    }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center gap-3">
                    <Upload className="h-12 w-12 text-gray-400" />
                    <p className="text-gray-600">
                      Drag and drop an image here, or click to select
                    </p>
                    <input type="file" className="hidden" accept="image/*" />
                    <button
                      onClick={() =>
                        document.querySelector('input[type="file"]')?.click()
                      }
                      className="px-4 py-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                    >
                      Choose File
                    </button>
                  </div>
                </div>
              )}

              <button
                className={`w-full py-4 rounded-xl font-medium text-white transition-all duration-200
                  ${
                    isLoading || (!question && !isDragging)
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                  }`}
                onClick={handleSubmit}
                disabled={isLoading || (!question && !isDragging)}
              >
                <div className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Get Answer
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Answer Card */}
            {answer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-white rounded-xl p-6 shadow-xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Answer
                    </h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{answer}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
