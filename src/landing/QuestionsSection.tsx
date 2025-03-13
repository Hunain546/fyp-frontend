import React from "react";

export function QuestionsSection() {
  return (
    <section className="bg-purple-700 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-4">
              Got{" "}
              <span className="bg-white text-purple-700 px-3 py-1 rounded">
                Questions?
              </span>
            </h2>
            <p className="mb-6">
              Find all the answers to common questions here. If you're still on
              the fence and need extra support - book a free consultation with
              our team. We're here to help you succeed.
            </p>
            <button className="bg-purple-300 hover:bg-purple-400 text-purple-900 px-6 py-2 rounded-md transition-colors">
              Contact Us
            </button>
          </div>

          {/* Right Column - Questions Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Question 1 */}
            <div className="bg-white rounded-lg p-4 flex items-center justify-between">
              <span className="text-gray-800">
                Which subjects do you offer?
              </span>
              <svg
                className="w-5 h-5 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>

            {/* Question 2 */}
            <div className="bg-white rounded-lg p-4 flex items-center justify-between">
              <span className="text-gray-800">
                Which exam boards do you support?
              </span>
              <svg
                className="w-5 h-5 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>

            {/* Question 3 */}
            <div className="bg-white rounded-lg p-4 flex items-center justify-between">
              <span className="text-gray-800">Do you offer live support?</span>
              <svg
                className="w-5 h-5 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>

            {/* Question 4 */}
            <div className="bg-white rounded-lg p-4 flex items-center justify-between">
              <span className="text-gray-800">
                Will I have access to teachers if I have questions?
              </span>
              <svg
                className="w-5 h-5 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>

            {/* Question 5 */}
            <div className="bg-white rounded-lg p-4 flex items-center justify-between">
              <span className="text-gray-800">Can I try before buying?</span>
              <svg
                className="w-5 h-5 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>

            {/* Question 6 */}
            <div className="bg-white rounded-lg p-4 flex items-center justify-between">
              <span className="text-gray-800">
                What if I'm stuck but don't want to contact with my video/audio?
              </span>
              <svg
                className="w-5 h-5 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Call-to-Action */}
        <div className="mt-12 bg-white rounded-xl p-6 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-purple-900">
              Still confused? Get in touch with us.
            </h3>
            <p className="text-gray-600">
              Get personalized support and the answers to all your questions.
            </p>
          </div>
          <button className="bg-purple-300 hover:bg-purple-400 text-purple-900 px-6 py-2 rounded-md transition-colors">
            Book a Call
          </button>
        </div>
      </div>
    </section>
  );
}
