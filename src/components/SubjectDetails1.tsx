import React, { useState } from "react";
import { Book, Search, FileQuestion, List, BarChart } from "lucide-react";
import Modal from "./model";

const SubjectDetails = ({
  subject,
  onProceed,
  onNavigate,
}: {
  subject: string;
  onProceed: () => void;
  onNavigate: (section: string) => void;
}) => {
  const [progress, setProgress] = useState(60);
  const [modalInfo, setModalInfo] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const handleFeatureClick = (
    title: string,
    description: string,
    section: string
  ) => {
    onNavigate(section);
  };

  const features = [
    {
      title: "Ask AI",
      icon: Book,
      description:
        "Chat with an AI assistant specialized in this subject & ask anything",
      section: "chat",
      button: "Learn",
    },
    {
      title: "Past Paper Assistant",
      icon: Search,
      description:
        "Use AI to generate CAIE-standard answers for any past paper question.",
      section: "pastpapers",
      button: "Search",
    },
    {
      title: "AI-Powered Quizzes",
      icon: FileQuestion,
      description:
        "Challenge yourself with AI-generated quizzes tailored to your learning level.",
      section: "quizzes",
      button: "Take Quiz",
    },
    {
      title: "Topic Explorer",
      icon: List,
      description:
        "Explore subject-specific topics with AI-generated explanations and insights.",
      section: "topics",
      button: "Explore",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      {modalInfo && (
        <Modal
          title={modalInfo.title}
          description={modalInfo.description}
          onClose={() => setModalInfo(null)}
        />
      )}

      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-indigo-800">
          O-Level {subject}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Dive into the fascinating world of {subject}. Unlock the power of
          knowledge.
        </p>
      </header>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition cursor-pointer"
            onClick={() =>
              handleFeatureClick(
                feature.title,
                feature.description,
                feature.section
              )
            }
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-indigo-100 rounded-full">
                <feature.icon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold">{feature.title}</h3>
            </div>
            <p className="text-gray-600 text-center mt-2">
              {feature.description}
            </p>
            <button className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              {feature.button}
            </button>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold flex items-center">
          <BarChart className="w-6 h-6 mr-2 text-indigo-600" />
          Your Progress
        </h3>
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-indigo-600">
              Overall Completion
            </span>
            <span className="text-sm font-medium text-indigo-600">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-4">
            <div
              className="bg-indigo-600 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        {/* <button
          className="mt-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          onClick={onProceed}
        >
          Proceed to Practice Mode
        </button> */}
      </div>
    </div>
  );
};

export default SubjectDetails;
