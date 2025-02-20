import React from "react";
import {
  Brain,
  History,
  Home,
  Settings,
  Star,
  ScrollText,
  Globe2,
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
  const generalMenuItems = [
    { icon: Home, label: "Dashboard", id: "dashboard" },
    { icon: Brain, label: "Practice Mode", id: "practice" },
    { icon: Star, label: "Progress", id: "progress" },
    { icon: Settings, label: "Settings", id: "settings" },
  ];

  const subjectMenuItems = [
    { icon: ScrollText, label: "Islamiat", id: "Islamiat" },
    { icon: History, label: "History", id: "History" },
    { icon: Globe2, label: "Geography", id: "Geography" },
  ];

  return (
    <div className="h-screen w-64 bg-indigo-900 text-white p-6 sticky top-0 overflow-y-auto">
      {/* Header */}
      <div
        className="flex items-center gap-3 mb-10 animate-slide-in"
        style={{ animation: "slide-in 0.5s ease-out" }}
      >
        <Brain className="w-8 h-8 scale-110 transform transition-transform duration-300 hover:scale-125" />
        <h1
          className="text-2xl font-extrabold drop-shadow-lg leading-none"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <span className="text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text">
            O/A
          </span>
          <span className="text-white">dapt</span>
        </h1>
      </div>

      {/* General Menu */}
      <nav className="space-y-2">
        {generalMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-transform transform ${
              activeSection === item.id
                ? "bg-indigo-800 text-white scale-105"
                : "hover:bg-indigo-800/50 text-white/80 hover:scale-105"
            }`}
          >
            <item.icon className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
            <span className="transition-opacity duration-300 hover:opacity-90">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Subjects Menu */}
      <h2 className="text-sm font-semibold text-white/60 mt-8 mb-4">
        Subjects
      </h2>
      <nav className="space-y-2">
        {subjectMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-transform transform ${
              activeSection === item.id
                ? "bg-indigo-800 text-white scale-105"
                : "hover:bg-indigo-800/50 text-white/80 hover:scale-105"
            }`}
          >
            <item.icon className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
            <span className="transition-opacity duration-300 hover:opacity-90">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
