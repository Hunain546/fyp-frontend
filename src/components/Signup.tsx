import React, { useState } from "react";

interface SignupProps {
  onSignup: (name: string, email: string, password: string) => Promise<void>;
  onLoginClick: () => void;
  onCancel: () => void; // Add this prop
}

const Signup: React.FC<SignupProps> = ({
  onSignup,
  onLoginClick,
  onCancel,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      setLoading(true);
      await onSignup(name, email, password);
      setSuccess(true);
    } catch (err: any) {
      setError(
        err?.message || "An unexpected error occurred. Please try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Branding Section */}
        <div className="w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-800 flex flex-col justify-center items-center text-white p-8 relative">
          <h1 className="text-5xl font-bold mb-3">O/Adapt</h1>
          <p className="text-lg text-center mb-6">
            Your personalized learning companion for O/A Level success.
          </p>
          <img
            src="/undraw_learning_re_32qv.svg" // Replace with an engaging illustration
            alt="Learning illustration"
            className="w-3/4 max-w-md rounded-lg"
          />
          <div className="absolute bottom-6 text-center text-sm opacity-75">
            <p>"Empowering students to excel in every subject. "</p>
          </div>
        </div>

        {/* Signup Form Section - Making it more compact */}
        <div className="w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-800 transition-colors duration-300 p-4">
          <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
              Create Account
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300 text-center mb-4">
              Join O/Adapt today and take control of your learning journey.
            </p>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* Success message - Updated to show verification email message */}
            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                <p className="font-medium">Account created successfully!</p>
                <p className="text-sm mt-1">
                  A verification email has been sent to your email address.
                  Please verify your account to continue.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm"
                  placeholder="Create a strong password"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 text-sm"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  onClick={onCancel}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ← Back to home
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className="text-xs text-gray-500 dark:text-gray-300 text-center mt-4">
              Already have an account?{" "}
              <button
                onClick={onLoginClick}
                disabled={loading}
                className="text-indigo-600 hover:underline font-medium cursor-pointer"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 w-10 h-10 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full shadow-md flex items-center justify-center hover:scale-110 transform transition-transform duration-300"
      >
        {darkMode ? (
          // Light mode (Sun Icon)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
          </svg>
        ) : (
          // Dark mode (Moon Icon)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Signup;
