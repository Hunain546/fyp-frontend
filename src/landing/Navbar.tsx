import React, { useState, useRef, useEffect } from "react";

interface NavbarProps {
  onLogin: () => void;
  onSignup: () => void;
  onSubjectSelect?: (subject: string) => void;
  onPricingSelect?: () => void; // Add this prop
}

const Navbar: React.FC<NavbarProps> = ({
  onLogin,
  onSignup,
  onSubjectSelect,
  onPricingSelect,
}) => {
  const [subjectsDropdownOpen, setSubjectsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSubjectsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle subject selection
  const handleSubjectClick = (subject: string) => {
    if (onSubjectSelect) {
      onSubjectSelect(subject);
    }
    setSubjectsDropdownOpen(false);
  };

  return (
    <nav className="bg-indigo-900 bg-opacity-95 px-8 py-3 flex justify-between items-center shadow-lg backdrop-blur-sm sticky top-0 z-50">
      {/* Logo */}
      <h1 className="text-2xl font-extrabold">
        <span className="text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text">
          O/A
        </span>
        <span className="text-white">dapt</span>
      </h1>

      {/* Navigation Links */}
      <div className="flex space-x-6 text-white font-medium text-base">
        <a
          href="/"
          className="hover:text-pink-400 transition-colors duration-300 border-b-2 border-transparent hover:border-pink-400"
        >
          Home
        </a>

        {/* Subjects Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setSubjectsDropdownOpen(!subjectsDropdownOpen)}
            className={`flex items-center hover:text-pink-400 transition-colors duration-300 border-b-2 ${
              subjectsDropdownOpen
                ? "border-pink-400 text-pink-400"
                : "border-transparent"
            } hover:border-pink-400`}
          >
            Subjects
            <svg
              className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                subjectsDropdownOpen ? "rotate-180" : ""
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {subjectsDropdownOpen && (
            <div className="absolute mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-10">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubjectClick("Islamiat");
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-900"
              >
                Islamiat
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubjectClick("History");
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-900"
              >
                History
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubjectClick("Geography");
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-900"
              >
                Geography
              </a>
            </div>
          )}
        </div>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (onPricingSelect) onPricingSelect();
          }}
          className="hover:text-pink-400 transition-colors duration-300 border-b-2 border-transparent hover:border-pink-400"
        >
          Pricing
        </a>
        <a
          href="#"
          className="hover:text-pink-400 transition-colors duration-300 border-b-2 border-transparent hover:border-pink-400"
        >
          Blogs
        </a>
      </div>

      {/* Login & Signup Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={onLogin}
          className="px-4 py-2 text-white text-sm font-medium rounded-md transition-colors duration-300 hover:bg-indigo-800"
        >
          Log in
        </button>
        <button
          onClick={onSignup}
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-medium rounded-md hover:from-pink-600 hover:to-purple-600 transition-colors duration-300"
        >
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
