import React, { useState, useEffect } from "react";
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
  User,
  LogOut,
} from "lucide-react";
import { getUser } from "../auth";

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  selectedSubject: string | null;
  onSignOut?: () => void; // Optional prop for handling sign out
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onNavigate,
  selectedSubject,
  onSignOut,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const generalMenuItems = [
    { icon: Home, label: "Dashboard", id: "dashboard" },
    { icon: Star, label: "Progress", id: "progress" },
    { icon: Settings, label: "Settings", id: "settings" },
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
      } bg-indigo-900 text-white p-4 sticky top-0 overflow-y-auto transition-all duration-300 ease-in-out flex flex-col`}
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
        } mb-6`}
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

      {/* User Profile */}
      <div className={`mb-6 ${!isExpanded && "flex justify-center"}`}>
        {loading ? (
          <div className="flex items-center justify-center h-12">
            <div className="animate-pulse bg-indigo-800/50 rounded-full h-8 w-8"></div>
          </div>
        ) : user ? (
          <div
            className={`flex items-center ${
              isExpanded ? "gap-3" : "justify-center"
            }`}
          >
            <div className="bg-indigo-800/80 rounded-full p-1 flex items-center justify-center">
              {user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="User avatar"
                  className="rounded-full h-10 w-10 object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-white/80" />
              )}
            </div>
            {isExpanded && (
              <div className="flex flex-col">
                <span className="font-medium text-sm">
                  {user.user_metadata?.first_name ||
                    user.user_metadata?.name ||
                    "User"}
                </span>
                <span className="text-xs text-white/60 truncate w-36">
                  {user.email}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div
            className={`flex items-center ${
              isExpanded ? "gap-3" : "justify-center"
            }`}
          >
            <div className="bg-indigo-800/80 rounded-full p-1">
              <User className="h-8 w-8 text-white/80" />
            </div>
            {isExpanded && <span className="text-sm">Guest User</span>}
          </div>
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

      {/* Sign Out Button - pushed to bottom with mt-auto */}
      <div className="mt-auto pt-4">
        <button
          onClick={onSignOut}
          className={`flex items-center ${
            isExpanded ? "gap-3" : "justify-center"
          } w-full p-3 rounded-lg transition-transform transform hover:bg-indigo-800/50 text-white/80 hover:scale-105`}
        >
          <LogOut className="w-6 h-6" />
          {isExpanded && (
            <span className="transition-opacity duration-300">Sign Out</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
