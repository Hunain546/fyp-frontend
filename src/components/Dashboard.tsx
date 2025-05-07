import { useState, useEffect } from "react";
import SubjectCard from "./SubjectCard";

interface Subject {
  subject: string;
  // Add other properties of the subject here
}

interface DashboardProps {
  subjects: Subject[];
  onSubjectSelect: (subject: string) => void;
  onSignOut?: () => void; // Optional prop for handling sign out
}

const Dashboard: React.FC<DashboardProps> = ({
  subjects,
  onSubjectSelect,
  onSignOut,
}) => {
  const examDate = new Date("2025-06-01T00:00:00"); // Set the next exam date here
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const difference = examDate.getTime() - now.getTime();
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      {/* Sign Out Button */}
      {/* <div className="absolute top-0 right-0">
        <button
          onClick={onSignOut}
          className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-md transition-colors duration-200 flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign Out
        </button>
      </div> */}

      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to <span className="text-indigo-600">O/Adapt</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Your personalized learning companion for O/A Level success
        </p>
      </div>

      {/* Minimalistic Countdown */}
      <div className="bg-indigo-50 rounded-lg p-6 mb-8 flex flex-col items-center">
        <h3 className="text-2xl font-bold text-indigo-700 mb-4">
          June/July Session O/A Level
        </h3>
        <div className="flex space-x-4">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((unit) => (
            <div
              key={unit.label}
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm w-20"
            >
              <span className="text-3xl font-extrabold text-indigo-600">
                {unit.value}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Subjects Grid */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Your Subjects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.subject}
              {...subject}
              onClick={() => onSubjectSelect(subject.subject)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
