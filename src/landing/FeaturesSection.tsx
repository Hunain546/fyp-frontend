import React from "react";
import { MessageCircle, BookOpen, HelpCircle, FileText } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-red-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-800 mb-4 font-display">
            The{" "}
            <span className="bg-purple-700 text-white px-2 py-1 rounded font-display">
              Ultimate
            </span>{" "}
            AI Learning Toolkit
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-display">
            Our AI-powered platform helps students worldwide achieve top grades
            with interactive learning tools and expert guidance.
          </p>
        </div>

        {/* Asymmetrical Layout (Big-Small Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* AI Chatbot (Big Box) */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-red-100 transform hover:scale-[1.02] transition-transform">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <MessageCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-red-600 font-display">
                  AI Chatbot for CAIE
                </h3>
                <p className="text-gray-600 mt-2 font-display">
                  Ask any question from the CAIE syllabus and get instant
                  AI-generated explanations tailored to your topic.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <video autoPlay loop muted className="w-full h-48 object-cover">
                <source src="/askai.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Past Paper Mastery (Small Box) */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-100 transform hover:scale-[1.02] transition-transform">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-600 font-display">
                  Past Paper Mastery
                </h3>
                <p className="text-gray-600 mt-2 font-display">
                  Get perfect, structured answers for any past paper question,
                  aligned with CAIE marking schemes.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <video autoPlay loop muted className="w-full h-48 object-cover">
                <source src="/pastpaper.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* AI-Powered Quizzes (Small Box) */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-100 transform hover:scale-[1.02] transition-transform">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-600 font-display">
                  AI-Powered Quizzes
                </h3>
                <p className="text-gray-600 mt-2 font-display">
                  Test yourself with AI-generated quizzes based on the topics
                  you choose and track your progress.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <video autoPlay loop muted className="w-full h-48 object-cover">
                <source src="/quizes.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Topic-Based Notes (Big Box) */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-orange-100 transform hover:scale-[1.02] transition-transform">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-orange-600 font-display">
                  Topic-Based Notes
                </h3>
                <p className="text-gray-600 mt-2 font-display">
                  Get concise, AI-generated notes for each syllabus topic,
                  making revision efficient and effective.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <video autoPlay loop muted className="w-full h-48 object-cover">
                <source src="/pastpaper.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
