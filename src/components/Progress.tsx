import React from "react";
import { BarChart3, TrendingUp, Clock, Award } from "lucide-react";

const Progress: React.FC = () => {
  const subjects = [
    {
      name: "Islamiat",
      questionsAnswered: 45,
      accuracy: 85,
      timeSpent: "12h 30m",
      lastActive: "2 days ago",
    },
    {
      name: "History",
      questionsAnswered: 38,
      accuracy: 78,
      timeSpent: "10h 15m",
      lastActive: "1 day ago",
    },
    {
      name: "Geography",
      questionsAnswered: 52,
      accuracy: 92,
      timeSpent: "15h 45m",
      lastActive: "3 hours ago",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Your Progress</h2>
        <p className="text-gray-600">
          Track your learning journey across subjects
        </p>
      </div>
      {/* Motivational Section */}
      <div className="mb-8 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold">🔥 Your Streak</h3>
        <p className="text-lg">Active for 5 days in a row. Keep it up!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: BarChart3,
            label: "Total Questions",
            value: "135",
            color: "bg-blue-100 text-blue-600",
          },
          {
            icon: TrendingUp,
            label: "Average Accuracy",
            value: "85%",
            color: "bg-green-100 text-green-600",
          },
          {
            icon: Clock,
            label: "Study Time",
            value: "38h 30m",
            color: "bg-purple-100 text-purple-600",
          },
          {
            icon: Award,
            label: "Best Subject",
            value: "Geography",
            color: "bg-amber-100 text-amber-600",
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border">
        <div className="p-6 border-b">
          <h3 className="font-semibold text-gray-900">Subject-wise Progress</h3>
        </div>
        <div className="divide-y">
          {subjects.map((subject) => (
            <div key={subject.name} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">{subject.name}</h4>
                <span className="text-sm text-gray-500">
                  Last active: {subject.lastActive}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Questions Answered
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {subject.questionsAnswered}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Accuracy</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-indigo-600 rounded-full"
                        style={{ width: `${subject.accuracy}%` }}
                      ></div>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {subject.accuracy}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Time Spent</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {subject.timeSpent}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;
