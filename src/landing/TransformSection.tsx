import React from "react";
import { GraduationCap, Clock, CheckCircle } from "lucide-react";

export function TransformSection() {
  return (
    <section className="bg-blue-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold font-display text-purple-900 mb-6">
            Ready to <span className="text-purple-600">Transform</span> Your
            <br />
            Academic Journey?
          </h2>
          <p className="text-xl text-gray-600 font-display mb-12 max-w-3xl mx-auto">
            Get instant access to expert-led courses, timed crash courses, and
            comprehensive resources that make A/A* grades achievable.
          </p>
          <button className="bg-purple-600 text-white px-10 py-4 text-lg rounded-full font-display font-semibold hover:bg-purple-700 transition-colors shadow-lg">
            Start Your A* Journey
          </button>

          {/* Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-md transform hover:scale-105 transition-transform">
              <GraduationCap className="w-16 h-16 text-purple-600 mb-6" />
              <h3 className="text-2xl font-semibold font-display mb-4">
                Expert Teachers
              </h3>
              <p className="text-lg text-gray-600 font-display">
                Learn from experienced educators who understand exactly what it
                takes to achieve top grades
              </p>
            </div>
            <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-md transform hover:scale-105 transition-transform">
              <Clock className="w-16 h-16 text-purple-600 mb-6" />
              <h3 className="text-2xl font-semibold font-display mb-4">
                Flexible Learning
              </h3>
              <p className="text-lg text-gray-600 font-display">
                Study at your own pace with 24/7 access to all course materials
                and resources
              </p>
            </div>
            <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-md transform hover:scale-105 transition-transform">
              <CheckCircle className="w-16 h-16 text-purple-600 mb-6" />
              <h3 className="text-2xl font-semibold font-display mb-4">
                Proven Results
              </h3>
              <p className="text-lg text-gray-600 font-display">
                Join countless students who have achieved A/A* grades with our
                structured approach
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
