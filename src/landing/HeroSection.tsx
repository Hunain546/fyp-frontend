import React from "react";
import { Sparkles, Users, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-purple-100 to-white py-20 px-8 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-200 rounded-full opacity-50" />
        <div className="absolute top-1/2 -left-8 w-32 h-32 bg-purple-200 rounded-full opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-pink-200 rounded-full opacity-30" />
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-6xl font-display font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-purple-800">
          Welcome to O/Adapt
        </h1>

        {/* Subheading */}
        <h2 className="text-2xl font-display font-semibold mb-6 text-indigo-800">
          AI-Powered Learning for O & A Level Students
        </h2>

        {/* Description */}
        <p className="text-lg font-display text-indigo-700 max-w-2xl mx-auto mb-10">
          Our intelligent learning assistant helps you understand exam concepts,
          solve past papers, and get AI-driven quizzes to boost your grades.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <button className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-display font-bold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
            Start for Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-white text-indigo-900 font-display font-bold rounded-xl border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50 transition-colors">
            Learn More
          </button>
        </div>

        {/* Active Users Display */}
        <div className="inline-flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-md mb-12">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={`https://randomuser.me/api/portraits/${
                  i % 2 ? "women" : "men"
                }/${i}.jpg`}
                alt={`User ${i}`}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            ))}
          </div>
          <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
            <Users className="w-5 h-5 text-indigo-600" />
            <p className="font-display font-bold text-indigo-900">
              5k+ Active Users
            </p>
          </div>
        </div>

        {/* Subject Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { name: "Islamiat", color: "bg-pink-100 hover:bg-pink-200" },
            { name: "History", color: "bg-purple-100 hover:bg-purple-200" },
            { name: "Geography", color: "bg-blue-100 hover:bg-blue-200" },
            { name: "Biology", color: "bg-red-100 hover:bg-red-200" },
            { name: "Economics", color: "bg-green-100 hover:bg-green-200" },
            { name: "Business", color: "bg-yellow-100 hover:bg-yellow-200" },
            { name: "Accounting", color: "bg-orange-100 hover:bg-orange-200" },
            { name: "Psychology", color: "bg-violet-100 hover:bg-violet-200" },
          ].map((subject) => (
            <button
              key={subject.name}
              className={`${subject.color} text-indigo-900 font-display font-medium px-6 py-3 rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all`}
            >
              {subject.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
