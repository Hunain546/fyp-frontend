import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import {
  ThumbsUp,
  BookOpenCheck,
  BookOpen,
  Navigation,
  Palette,
  MessageSquare,
  Share2,
  Plus,
} from "lucide-react";

const FeedbackPage = () => {
  // New state variables for functionality
  const [accuracyRating, setAccuracyRating] = useState<number | null>(null);
  const [explanationOption, setExplanationOption] = useState("");
  const [navigationRating, setNavigationRating] = useState<number | null>(null);
  const [designRating, setDesignRating] = useState(8);
  const [mostHelpfulFeature, setMostHelpfulFeature] = useState("");
  const [featureSuggestion, setFeatureSuggestion] = useState("");

  // Existing state variables
  const [issues, setIssues] = useState(false);
  const [issueDescription, setIssueDescription] = useState("");
  const [syllabusAlignment, setSyllabusAlignment] = useState(80);
  const [futureReliance, setFutureReliance] = useState(8);

  const handleSubmit = () => {
    // Process or send the feedback; then notify user
    console.log({
      accuracyRating,
      syllabusAlignment,
      explanationOption,
      navigationRating,
      designRating,
      issues,
      issueDescription,
      mostHelpfulFeature,
      featureSuggestion,
    });
    alert("Feedback submitted!");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-purple-800 mb-8">
            Share Your Experience
          </h1>

          <div className="space-y-8">
            {/* Accuracy Rating - Interactive Stars */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <ThumbsUp className="text-purple-600 w-6 h-6" />
                <p className="text-xl font-semibold">
                  How accurate were the answers provided by the AI assistant?
                </p>
              </div>
              <div className="flex gap-4">
                {[
                  "Very Inaccurate",
                  "Inaccurate",
                  "Neutral",
                  "Accurate",
                  "Very Accurate",
                ].map((rating, index) => (
                  <button
                    key={rating}
                    onClick={() => setAccuracyRating(index + 1)}
                    className={`flex-1 py-3 px-4 rounded-lg transition-all ${
                      accuracyRating === index + 1
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 hover:bg-purple-100"
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>

            {/* Syllabus Alignment - Progress Bar Style */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <BookOpen className="text-purple-600 w-6 h-6" />
                <h3 className="text-xl font-semibold">
                  Did the answers align with your syllabus and exam
                  expectations?
                </h3>
              </div>
              <div className="relative pt-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={syllabusAlignment}
                  onChange={(e) =>
                    setSyllabusAlignment(parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Not Aligned</span>
                  <span className="text-purple-600 font-semibold">
                    {syllabusAlignment}%
                  </span>
                  <span>Perfectly Aligned</span>
                </div>
              </div>
            </div>

            {/* Explanation Detail - Three Button Choice */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <BookOpenCheck className="text-purple-600 w-6 h-6" />
                <h3 className="text-xl font-semibold">
                  Were the explanations detailed enough to help you understand
                  the topic?
                </h3>
              </div>
              <div className="flex gap-4">
                {["Yes", "Somewhat", "No"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setExplanationOption(option)}
                    className={`flex-1 py-4 px-6 rounded-lg transition-all text-lg font-medium ${
                      explanationOption === option
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 hover:bg-purple-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Future Reliance - Modern Slider */}
            {/* <div className="bg-white p-6 rounded-xl shadow-sm">
							<div className="flex items-center gap-4 mb-4">
								<GraduationCap className="text-purple-600 w-6 h-6" />
								<h3 className="text-xl font-semibold">Future Exam Preparation Reliance</h3>
							</div>
							<div className="relative pt-1">
								<input
									type="range"
									min="1"
									max="10"
									value={futureReliance}
									onChange={(e) => setFutureReliance(parseInt(e.target.value))}
									className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
								/>
								<div className="flex justify-between text-sm text-gray-600 mt-2">
									<span>Unlikely (1)</span>
									<span className="text-purple-600 font-semibold">{futureReliance}/10</span>
									<span>Very Likely (10)</span>
								</div>
							</div>
						</div> */}

            {/* Navigation Experience - Emoji Rating */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <Navigation className="text-purple-600 w-6 h-6" />
                <h3 className="text-xl font-semibold">
                  How easy was it to navigate through the app?
                </h3>
              </div>
              <div className="flex justify-between items-center">
                {["😫", "😕", "😐", "🙂", "😄"].map((emoji, index) => (
                  <button
                    key={emoji}
                    onClick={() => setNavigationRating(index + 1)}
                    className={`text-4xl p-4 rounded-full transition-all ${
                      navigationRating === index + 1
                        ? "bg-purple-100 scale-110"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Design Rating - Modern Slider */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <Palette className="text-purple-600 w-6 h-6" />
                <h3 className="text-xl font-semibold">
                  How would you rate the design and layout of the app?
                </h3>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={designRating}
                onChange={(e) => setDesignRating(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>1</span>
                <span>10</span>
              </div>
            </div>

            {/* Issues Toggle with Conditional Text Field */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <MessageSquare className="text-purple-600 w-6 h-6" />
                <h3 className="text-xl font-semibold">
                  Did you encounter any issues while using the app?
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIssues(false)}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    !issues ? "bg-green-600 text-white" : "bg-gray-100"
                  }`}
                >
                  No Issues
                </button>
                <button
                  onClick={() => setIssues(true)}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    issues ? "bg-red-600 text-white" : "bg-gray-100"
                  }`}
                >
                  Yes, I had issues
                </button>
              </div>
              {issues && (
                <textarea
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="Please describe the issues you encountered..."
                  className="mt-4 w-full p-4 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  rows={4}
                />
              )}
            </div>

            {/* Most Helpful Feature - Card Selection */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <Share2 className="text-purple-600 w-6 h-6" />
                <h3 className="text-xl font-semibold">Most Helpful Feature</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "AI Assistant",
                  "Past Paper Assistant",
                  "AI-Powered Quizzes",
                  "Topic Explorer",
                ].map((feature) => (
                  <button
                    key={feature}
                    onClick={() => setMostHelpfulFeature(feature)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      mostHelpfulFeature === feature
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 hover:border-purple-600 hover:bg-purple-50"
                    }`}
                  >
                    {feature}
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Suggestions */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <Plus className="text-purple-600 w-6 h-6" />
                <h3 className="text-xl font-semibold">Feature Suggestions</h3>
              </div>
              <textarea
                value={featureSuggestion}
                onChange={(e) => setFeatureSuggestion(e.target.value)}
                placeholder="What features would you like to see in future updates?"
                className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
