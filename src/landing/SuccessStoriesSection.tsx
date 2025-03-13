import React from "react";

export function SuccessStoriesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-900 font-display">
            Real Stories, Real{" "}
            <span className="bg-purple-600 text-white px-3 py-1 font-display">
              Success
            </span>
          </h2>
          <p className="text-gray-600 mt-4 font-display">
            Thousands of students have improved their grades with O/Adapt's
            AI-powered learning.
            <br />
            See how our platform transformed their learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
          {/* Testimonial 1 - AI Chatbot (Small) */}
          <div className="bg-red-50 rounded-xl p-6 relative">
            <p className="text-red-800 font-medium mb-4 font-display">
              The AI Chatbot literally saved me during my revision. I could ask
              any concept from the CAIE syllabus, and it explained it so simply!
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-display">
                S
              </div>
              <span className="text-sm font-display">Sarah K</span>
            </div>
          </div>

          {/* Testimonial 2 - Past Paper Mastery (Large) */}
          <div className="bg-purple-50 rounded-xl p-6 relative row-span-2">
            <p className="text-purple-900 mb-4 font-display">
              O/Adapt’s Past Paper Mastery is the best thing that happened to me
              before my exams! I struggled with past papers, but this tool gave
              me perfect answers aligned with the CAIE marking scheme.
              <br />
              <br />I went from C in mocks to an A in finals. Highly recommend!
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-display">
                T
              </div>
              <span className="text-sm font-display">Taimoor R</span>
            </div>
          </div>

          {/* Testimonial 3 - AI-Powered Quizzes (Small) */}
          <div className="bg-blue-50 rounded-xl p-6 relative">
            <p className="text-blue-900 font-medium mb-4 font-display">
              The AI quizzes tested me on exactly what I needed to revise. I
              didn’t waste time on things I already knew, and it gave instant
              feedback!
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-display">
                A
              </div>
              <span className="text-sm font-display">Ali N</span>
            </div>
          </div>

          {/* Testimonial 4 - Topic-Based Notes (Large) */}
          <div className="bg-teal-50 rounded-xl p-6 relative row-span-2">
            <p className="text-teal-900 mb-4 font-display">
              I used O/Adapt’s Topic-Based Notes, and they saved me so much
              time. The notes were AI-generated but structured like an actual
              CAIE book. It felt like a teacher summarized everything for me!
              <br />
              <br />
              Instead of spending hours making my own notes, I used these and
              scored an A* in Economics!
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-display">
                H
              </div>
              <span className="text-sm font-display">Hafsa M</span>
            </div>
          </div>

          {/* Testimonial 5 - AI Chatbot (Small) */}
          <div className="bg-yellow-50 rounded-xl p-6 relative">
            <p className="text-yellow-900 mb-4 font-display">
              I asked O/Adapt’s AI Chatbot to explain Organic Chemistry, and it
              did a better job than my teacher. Can’t believe this is free!
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-display">
                U
              </div>
              <span className="text-sm font-display">Usman R</span>
            </div>
          </div>

          {/* Testimonial 6 - AI-Powered Quizzes (Small) */}
          <div className="bg-pink-50 rounded-xl p-6 relative">
            <p className="text-pink-900 mb-4 font-display">
              O/Adapt’s AI quizzes felt like a real tutor testing me. It picked
              weak areas and explained my mistakes in detail. Got an A in
              Business!
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-display">
                A
              </div>
              <span className="text-sm font-display">Ayesha R</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
