import React, { useState } from "react";
import {
  Star,
  Check,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import StatsFeatures from "./StatsFeatures";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Pricing() {
  const [selectedSubject, setSelectedSubject] = useState(
    "AS & A Level Physics (CIE, AQA, Edexcel AL)"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar />
      {/* Hero Section - Modernized */}
      <section className="py-14 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-6xl mx-auto"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl" />
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4 leading-tight">
            Unlock Your Learning
            <br />
            Potential with AI
          </h1>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of students experiencing the future of education.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm text-indigo-800 px-6 py-3 rounded-full flex items-center gap-3 transition-all shadow-sm"
            >
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
              7-day money-back guarantee
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-3 shadow-sm transition-all"
            >
              <div className="flex">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < 4 ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill={i < 4 ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                4.9 out of 5 stars
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Pricing Toggle - Streamlined */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 p-5 rounded-xl cursor-pointer transition-all shadow-md group backdrop-blur-sm"
          >
            <div className="text-lg font-semibold text-purple-900 group-hover:text-purple-700">
              Exam Pass MU{"'"}25
            </div>
            <div className="text-sm text-purple-600">
              access till your exams
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-indigo-500/5 to-indigo-500/10 p-5 rounded-xl cursor-pointer transition-all shadow-md group backdrop-blur-sm"
          >
            <div className="text-lg font-semibold text-indigo-900 group-hover:text-indigo-700">
              Monthly
            </div>
            <div className="text-sm text-indigo-600">Pay as you go</div>
          </motion.div>
        </div>

        {/* Pricing Cards - Modernized */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 px-4">
          {/* Solo Plan */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-white to-purple-50/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-purple-100 backdrop-blur-sm"
          >
            <div className="bg-gradient-to-r from-purple-500/10 to-purple-500/20 rounded-lg p-2 inline-block mb-3">
              <h3 className="text-2xl font-bold text-purple-900">
                Solo <span className="text-purple-600">(for one subject)</span>
              </h3>
            </div>
            <p className="mb-4 text-gray-600">
              All of our courses & features (listed below)
              <br />
              for ONE O/A Level subject of your choice.
            </p>

            <div className="mb-4 text-gray-700">
              <p className="font-medium">One time payment</p>
              <p>Access till end of May/Jun 2025 exams.</p>
            </div>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-3 rounded-lg mb-4 border border-purple-200 focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all bg-purple-50/50"
            >
              <option>AS & A Level Physics (CIE, AQA, Edexcel AL)</option>
            </select>

            <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
              Rs 20,000
            </div>
            <p className="mb-3 text-gray-600">
              Pay once and get access till MU 2025 exams
            </p>

            <div className="bg-gradient-to-r from-pink-500/10 to-pink-500/20 text-pink-600 inline-block px-4 py-2 rounded-lg mb-4 font-medium">
              Save 40% No recurring payments
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl transition-all font-medium text-lg shadow-lg hover:shadow-xl"
            >
              Get started
            </motion.button>
          </motion.div>

          {/* All Access Plan */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-white to-green-50/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-green-100 backdrop-blur-sm"
          >
            <div className="bg-gradient-to-r from-green-500/10 to-green-500/20 rounded-lg p-2 inline-block mb-3">
              <h3 className="text-2xl font-bold text-green-900">
                All Access{" "}
                <span className="text-green-600">(for all subjects)</span>
              </h3>
            </div>
            <p className="text-green-700 font-medium mb-4">
              Our best value offer.
            </p>

            <div className="mb-4 text-gray-700">
              <p>
                Access all of our courses & features (listed below) for all of
                your O/A Level subjects.
              </p>
              <p className="mt-2">
                One time payment
                <br />
                Access till end of May/Jun 2025 exams.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                "Chemistry",
                "Physics",
                "Biology",
                "Maths",
                "Economics",
                "Business",
                "Accounting",
                "Psychology",
              ].map((subject) => (
                <div
                  key={subject}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <div className="bg-gradient-to-r from-green-500/10 to-green-500/20 p-1.5 rounded-lg">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span>{subject}</span>
                </div>
              ))}
            </div>

            <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 to-teal-600 text-transparent bg-clip-text">
              Rs 30,000
            </div>
            <p className="mb-3 text-gray-600">
              Pay once and get access till MU 2025 exams
            </p>

            <div className="bg-gradient-to-r from-red-500/10 to-red-500/20 text-red-600 px-4 py-2 rounded-lg mb-4 inline-block font-medium">
              As low as Rs 10,000 per month
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-xl transition-all font-medium text-lg shadow-lg hover:shadow-xl"
            >
              Get started
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Streamlined */}
      <section className="py-14 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-3">
            What{"'"}s included in O/Adapt?
          </h2>
          <p className="text-center text-gray-600 text-lg mb-10">
            Everything you need for smarter, AI-powered learning.
          </p>

          <div className="max-w-4xl mx-auto grid gap-4">
            {[
              "AI Chatbot to instantly clarify doubts and provide in-depth explanations",
              "Past Paper Retrieval & Explanation to analyze and understand exam trends",
              "AI-Powered Quizzes to test your knowledge and reinforce key concepts",
              "Topical Notes tailored to each subject to streamline your revision",
              "Adaptive Learning Paths based on your strengths and weaknesses",
            ].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="flex items-center gap-4 bg-gradient-to-r from-white to-blue-50/50 p-4 rounded-xl shadow-md hover:shadow-lg transition-all backdrop-blur-sm"
              >
                <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/20 p-2 rounded-lg">
                  <Check className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Savings Comparison - Modernized */}
      <section className="py-14 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text mb-10">
            Save BIG with O/Adapt
          </h2>

          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8">
            {/* O/Adapt Box */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-white to-blue-50/50 p-6 rounded-3xl w-full md:w-96 shadow-xl border border-blue-100 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                O/Adapt
              </h3>
              <p className="mb-6 text-blue-700 font-medium">
                PKR 5,000/month for all subjects
              </p>
              <div className="space-y-3">
                {[
                  "AI Chatbot for instant academic assistance",
                  "Past Paper Retrieval & Explanations",
                  "AI-Powered Quizzes & Performance Analysis",
                  "Topical Notes & Summaries",
                  "Personalized Study Plans",
                  "Real-Time Feedback & Insights",
                  "All-in-One Adaptive Learning Experience",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/20 p-1.5 rounded-lg">
                      <Check className="w-4 h-4 text-blue-700" />
                    </div>
                    <span className="text-blue-900 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-full p-2">
                  <Minus className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-center mt-4">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                  PKR 5,000/month
                </div>
              </div>
            </motion.div>

            {/* VS Circle */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white text-xl font-bold rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
              VS
            </div>

            {/* Right Side Boxes */}
            <div className="space-y-4 w-full md:w-96">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-white to-pink-50/50 p-5 rounded-2xl relative shadow-lg border border-pink-100 backdrop-blur-sm"
              >
                <h4 className="text-xl font-bold mb-2 text-pink-800">
                  School Fee
                </h4>
                <p className="text-sm mb-2 text-pink-700">
                  Traditional schools and tuition centers cost significantly
                  more, yet don't offer personalized AI-driven learning.
                </p>
                <p className="text-pink-800 font-medium">
                  PKR 45,000/month on average
                </p>
                <div className="absolute -right-2 -top-2 bg-gradient-to-r from-gray-900 to-gray-800 rounded-full p-2 shadow-lg">
                  <Plus className="w-4 h-4 text-white" />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-white to-green-50/50 p-5 rounded-2xl relative shadow-lg border border-green-100 backdrop-blur-sm"
              >
                <h4 className="text-xl font-bold mb-2 text-green-800">
                  Tuition Fee
                </h4>
                <p className="text-green-800 font-medium">
                  PKR 30,000/month for 3 subjects
                </p>
                <div className="absolute -right-2 -top-2 bg-gradient-to-r from-gray-900 to-gray-800 rounded-full p-2 shadow-lg">
                  <Plus className="w-4 h-4 text-white" />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-white to-orange-50/50 p-5 rounded-2xl relative shadow-lg border border-orange-100 backdrop-blur-sm"
              >
                <h4 className="text-xl font-bold mb-2 text-orange-800">
                  Fuel Costs
                </h4>
                <p className="text-orange-800 font-medium">
                  PKR 5,500/month on average
                </p>
                <div className="absolute -right-2 -bottom-2 bg-gradient-to-r from-gray-900 to-gray-800 rounded-full p-2 shadow-lg">
                  <Minus className="w-4 h-4 text-white" />
                </div>
              </motion.div>

              <div className="text-center mt-4">
                <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-800 text-transparent bg-clip-text">
                  PKR 80,000/month
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="py-4">
        <StatsFeatures />
      </div>

      {/* Free Trial Section - Streamlined */}
      <section className="py-12 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-yellow-600 to-orange-600 text-transparent bg-clip-text mb-8">
            Risk-free, 7 day money back guarantee.
          </h2>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-white to-yellow-50/50 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl border border-yellow-100 backdrop-blur-sm"
          >
            <div>
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-transparent bg-clip-text">
                A Level Free Trial
              </h3>
              <p className="text-gray-600 max-w-xl">
                Curious but haven{"'"}t made up your mind yet? Take a
                complimentary sneak peek! Get a flavour of our videos and
                revision guides. You won{"'"}t get the whole experience BUT, its
                enough to get you started with your exam prep 😊
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-xl transition-all whitespace-nowrap text-lg font-medium shadow-lg hover:shadow-xl"
            >
              Subscribe now
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials - Modernized */}
      <section className="py-12 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              "O/Adapt changed the way I study!",
              "AI-powered learning is a game-changer!",
              "Best platform for past paper prep!",
              "Saved me so much time & effort!",
              "Topical notes are a lifesaver!",
              "Jumped from a C to an A in weeks!",
              "I love the AI quizzes!",
              "Never struggled with exam prep again!",
              "Instant explanations with the AI chatbot!",
              "Best decision I made for my studies!",
              "Highly recommend O/Adapt!",
              "Personalized study plans = stress-free learning!",
              "Mastered tough topics with ease!",
              "O/Adapt made learning fun and efficient!",
              "Finally, a platform that works!",
            ].map((quote, index) => (
              <motion.div
                key={quote}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-white to-indigo-50/50 px-5 py-2 rounded-full text-indigo-800 text-sm hover:bg-indigo-50 transition-all shadow-md cursor-default backdrop-blur-sm"
              >
                "{quote}"
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Modernized */}
      <section className="py-14 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-pink-500/5" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-white to-rose-50/50 p-8 rounded-2xl text-center shadow-xl border border-rose-100 backdrop-blur-sm"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-rose-600 to-pink-600 text-transparent bg-clip-text">
              Still confused? Get in touch with us.
            </h2>
            <p className="mb-6 text-gray-600">
              Get a personalized demo and the answers to all your questions.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 py-3 rounded-xl transition-all text-lg font-medium shadow-lg hover:shadow-xl"
            >
              Book a Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}

export default Pricing;
