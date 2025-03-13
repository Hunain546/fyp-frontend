import React from "react";

export function ThreeStepsSection() {
  return (
    <section className="bg-gradient-to-b from-purple-50 to-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold font-display text-center text-purple-900 mb-6">
          Three Steps to{" "}
          <span className="text-purple-600">O/A Level Success</span>
        </h1>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {/* Step 1 */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <span className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full font-bold font-display">
                1
              </span>
              <h3 className="text-xl font-semibold font-display ml-3 text-purple-900">
                Choose Your Plan
              </h3>
            </div>
            <p className="text-gray-600 font-display">
              Pick the subjects you need help with, along with the pricing plan
              that works best for you.
            </p>
            <img
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              alt="Choose Plan"
              className="mt-4 rounded-lg w-full h-48 object-cover"
            />
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <span className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full font-bold font-display">
                2
              </span>
              <h3 className="text-xl font-semibold font-display ml-3 text-purple-900">
                Quick Sign-up
              </h3>
            </div>
            <p className="text-gray-600 font-display">
              Takes just 2 minutes - no complicated forms, just quick access to
              top-tier learning.
            </p>
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              alt="Quick Signup"
              className="mt-4 rounded-lg w-full h-48 object-cover"
            />
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <span className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full font-bold font-display">
                3
              </span>
              <h3 className="text-xl font-semibold font-display ml-3 text-purple-900">
                Start Excelling
              </h3>
            </div>
            <p className="text-gray-600 font-display">
              Dive into comprehensive, engaging courses that help make your 'A*'
              dream come true.
            </p>
            <img
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              alt="Start Learning"
              className="mt-4 rounded-lg w-full h-48 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
