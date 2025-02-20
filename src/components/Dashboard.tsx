import { useState, useEffect } from "react";
import SubjectCard from "./SubjectCard";

interface Subject {
  subject: string;
  // Add other properties of the subject here
}

interface DashboardProps {
  subjects: Subject[];
  onSubjectSelect: (subject: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ subjects, onSubjectSelect }) => {
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
    <>
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
    </>
  );
};

export default Dashboard;
