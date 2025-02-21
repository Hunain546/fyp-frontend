import React from "react";
import { Book, Search, FileQuestion, List, Check } from "lucide-react";

const FeatureCard = ({
  title,
  description,
  videoSrc,
  onNavigate,
  icon: Icon,
  section,
  points,
  button,
}: any) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
    <video className="w-full h-48 object-cover" autoPlay loop muted playsInline>
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="p-4">
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2 bg-indigo-600 rounded-full">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
      <ul className="mt-2 space-y-1">
        {points.map((point: string, index: number) => (
          <li key={index} className="flex items-center text-gray-500 text-xs">
            <Check className="w-4 h-4 text-green-400 mr-1" /> {point}
          </li>
        ))}
      </ul>
      <button
        onClick={() => onNavigate(section)}
        className="mt-4 inline-block bg-indigo-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700"
      >
        {button}
      </button>
    </div>
  </div>
);

const AskAI = ({
  onNavigate,
  subject,
}: {
  onNavigate: (section: string) => void;
  subject: string;
}) => {
  let welcomeTitle = "Welcome";
  let welcomeSubtitle = "Your gateway to modern AI-powered learning.";
  switch (subject.toLowerCase()) {
    case "history":
      welcomeTitle = "Learn O Level History";
      welcomeSubtitle =
        "Explore key historical events, civilizations, and their impact on the modern world.";
      break;
    case "islamiat":
      welcomeTitle = "Learn O Level Islamiat";
      welcomeSubtitle =
        "Understand the teachings of Islam, the life of Prophet Muhammad (PBUH), and Islamic principles.";
      break;
    case "geography":
      welcomeTitle = "Learn O Level Geography";
      welcomeSubtitle =
        "Study physical and human geography, ecosystems, and global environmental challenges.";
      break;
    // ...other cases...
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center mb-4 px-4">
        <h1 className="text-4xl font-bold">
          {subject.toLowerCase() === "history" ? (
            <>
              Study <span className="text-indigo-600">O Level History</span>
            </>
          ) : subject.toLowerCase() === "islamiat" ? (
            <>
              Study <span className="text-indigo-600">O Level Islamiat</span>
            </>
          ) : subject.toLowerCase() === "geography" ? (
            <>
              Study <span className="text-indigo-600">O Level Geography</span>
            </>
          ) : (
            welcomeTitle
          )}
        </h1>
        <p className="text-gray-600 mt-2 text-lg">{welcomeSubtitle}</p>
      </section>
      {/* Features Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-4">
        <FeatureCard
          title="Ask AI"
          description="Chat with our AI assistant for personalized insights."
          videoSrc="/askkk.mp4"
          onNavigate={onNavigate}
          icon={Book}
          section="chat"
          points={[
            "Instant responses",
            "Deep insights",
            "Interactive learning",
          ]}
          button="Chat"
        />
        <FeatureCard
          title="Past Paper Assistant"
          description="Generate exam-grade answers with AI-enabled precision."
          videoSrc="/pastpaper.mp4"
          onNavigate={onNavigate}
          icon={Search}
          section="pastpapers"
          points={["Accurate analysis", "Exam confidence", "Detailed reports"]}
          button="Search"
        />
        <FeatureCard
          title="AI-Powered Quizzes"
          description="Challenge yourself with adaptive quizzes."
          videoSrc="/quizes.mp4"
          onNavigate={onNavigate}
          icon={FileQuestion}
          section="quizzes"
          points={[
            "Adaptive difficulty",
            "Immediate feedback",
            "Enhanced retention",
          ]}
          button="Create Quiz"
        />
        <FeatureCard
          title="Topic Explorer"
          description="Dive deep into topics with AI guided insights."
          videoSrc="/askai.mp4"
          onNavigate={onNavigate}
          icon={List}
          section="topics"
          points={["Focused content", "Visual guides", "Easy navigation"]}
          button="Explore"
        />
      </section>
    </div>
  );
};

export default AskAI;
