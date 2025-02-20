import React, { useState } from "react";
import {
  Brain,
  History,
  Home,
  Settings,
  Star,
  ScrollText,
  Globe2,
  ChevronRight,
  ChevronLeft,
  Edit3,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  selectedSubject: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onNavigate,
  selectedSubject,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const generalMenuItems = [
    { icon: Home, label: "Dashboard", id: "dashboard" },
    { icon: Star, label: "Progress", id: "progress" },
    { icon: Settings, label: "Settings", id: "settings" },
    { icon: Edit3, label: "Feedback", id: "feedback" },
  ];

  const subjectMenuItems = [
    { icon: ScrollText, label: "Islamiat", id: "Islamiat" },
    { icon: History, label: "History", id: "History" },
    { icon: Globe2, label: "Geography", id: "Geography" },
  ];

  return (
    <div
      className={`h-screen ${
        isExpanded ? "w-64 sticky top-0 overflow-y-auto" : "w-20"
      } bg-indigo-900 text-white p-4 sticky top-0 overflow-y-auto transition-all duration-300 ease-in-out`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute top-16 -right-0 transform -translate-y-1/2 bg-indigo-900 text-white p-2 transition-all duration-300 flex items-center justify-center"
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Header */}
      <div
        className={`flex items-center ${
          isExpanded ? "gap-3" : "justify-center"
        } mb-10`}
      >
        <Brain className="w-8 h-8" />
        {isExpanded && (
          <h1
            className="text-2xl font-extrabold drop-shadow-lg leading-none"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <span className="text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text">
              O/A
            </span>
            <span className="text-white">dapt</span>
          </h1>
        )}
      </div>

      {/* General Menu */}
      <nav className="space-y-2">
        {generalMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center ${
              isExpanded ? "gap-3" : "justify-center"
            } w-full p-3 rounded-lg transition-transform transform ${
              activeSection === item.id
                ? "bg-indigo-800 text-white scale-105"
                : "hover:bg-indigo-800/50 text-white/80 hover:scale-105"
            }`}
          >
            <item.icon className="w-6 h-6" />
            {isExpanded && (
              <span className="transition-opacity duration-300">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Subjects Menu */}
      {isExpanded && (
        <h2 className="text-sm font-semibold text-white/60 mt-8 mb-4">
          Subjects
        </h2>
      )}
      <nav className="space-y-2">
        {subjectMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center ${
              isExpanded ? "gap-3" : "justify-center"
            } w-full p-3 rounded-lg transition-transform transform ${
              activeSection === item.id
                ? "bg-indigo-800 text-white scale-105"
                : "hover:bg-indigo-800/50 text-white/80 hover:scale-105"
            }`}
          >
            <item.icon className="w-6 h-6" />
            {isExpanded && (
              <span className="transition-opacity duration-300">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
