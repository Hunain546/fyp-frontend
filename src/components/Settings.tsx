import React, { useState, useEffect } from "react";
import { BookOpen, Bell, Moon, Shield, Settings2 } from "lucide-react";

const Settings: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync dark mode state with the `html` class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const settingsSections = [
    {
      icon: BookOpen,
      title: "Learning Preferences",
      description: "Adjust your study style and goals.",
      options: [
        { label: "Adaptive Learning", type: "toggle", value: true },
        {
          label: "Study Style",
          type: "dropdown",
          options: ["Visual", "Textual", "Interactive"],
          selected: "Interactive",
          onChange: (value: string) =>
            console.log("Study Style changed to:", value),
        },
        {
          label: "Daily Goal",
          type: "dropdown",
          options: ["30 min", "1 hour", "2 hours"],
          selected: "1 hour",
          onChange: (value: string) =>
            console.log("Daily Goal changed to:", value),
        },
      ],
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Manage updates and reminders.",
      options: [
        { label: "Study Reminders", type: "toggle", value: true },
        { label: "Daily Insights", type: "toggle", value: true },
      ],
    },
    {
      icon: Moon,
      title: "Appearance",
      description: "Customize your visual experience.",
      options: [
        {
          label: "Dark Mode",
          type: "toggle",
          value: isDarkMode,
          onChange: () => setIsDarkMode(!isDarkMode),
        },
        { label: "High Contrast", type: "toggle", value: false },
      ],
    },
    {
      icon: Shield,
      title: "Privacy",
      description: "Control your data and visibility.",
      options: [
        { label: "Share Progress", type: "toggle", value: true },
        { label: "Anonymous Feedback", type: "toggle", value: false },
      ],
    },
  ];

  // Helper function to render options
  const renderOption = (option: any) => {
    if (option.type === "toggle") {
      return (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={option.value}
            onChange={option.onChange || (() => {})}
          />
          <div className="w-9 h-5 bg-gray-300 dark:bg-gray-600 rounded-full peer-focus:ring-2 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-500 peer peer-checked:bg-indigo-500 dark:peer-checked:bg-indigo-400 peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
        </label>
      );
    } else if (option.type === "dropdown") {
      return (
        <select
          className="text-sm bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500"
          value={option.selected}
          onChange={(e) => option.onChange && option.onChange(e.target.value)}
        >
          {option.options.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }
    return null;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />{" "}
          Settings
        </h2>
        <button className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-500 text-sm flex items-center gap-1">
          Need Help?
        </button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section) => (
          <div
            key={section.title}
            className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg text-indigo-500 dark:text-indigo-400">
                <section.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium">{section.title}</h3>
                <p className="text-xs">{section.description}</p>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {section.options.map((option) => (
                <div
                  key={option.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm">{option.label}</span>
                  {renderOption(option)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
