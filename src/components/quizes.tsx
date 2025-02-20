import React, { useState, useEffect } from "react";
import { Book, Search, Tag, Loader2 } from "lucide-react";
import { fetchQuizQuestions } from "../utils/api";

const subjectTopics: Record<string, string[]> = {
  Islamiat: [
    "The History and Importance of the Quran",
    "The Life and Teachings of the Holy Prophet Muhammad (PBUH)",
    "The Four Rightly Guided Caliphs (Khulafa-e-Rashideen)",
    "The Articles of Faith (Aqeedah)",
    "The Five Pillars of Islam",
    "The Life and Importance of Other Prophets",
    "Islamic Ethics and Moral Teachings",
    "The Status and Rights of Women in Islam",
    "Islamic Law and Society",
    "Jihad and Its True Meaning",
  ],
  History: [
    "Muslim Religious thinkers",
    "Causes and Consequences Of The Downfall of Mughal Empire",
    "War of Independence 1857",
    "Sit Syed Ahmed Khan",
    "Regional Languages",
  ],
  Geography: [
    "Maps",
    "Map2",
    "Map3",
    "Map6",
    "Map19",
    "Map0",
    "Map22",
    "Map00",
    "Map9",
    "Map02",
  ],
};

const difficultyLevels = ["easy", "medium", "hard"];

const generateQuestions = (topic: string, difficulty: string) => {
  return Array.from({ length: 15 }, (_, index) => ({
    question: `Dummy question ${index + 1} for ${topic} - ${difficulty} level?`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option A",
  }));
};
const formatQuizData = (quizString: string) => {
  const questionsArray = quizString.split("\n\n").map((block, index) => {
    const lines = block.split("\n");
    const questionText = lines[0];
    const options = lines.slice(1, 5); // Extract A, B, C, D options
    const answerLine = lines.find((line) => line.startsWith("Correct Answer:"));
    const correctAnswer = answerLine ? answerLine.split(": ")[1] : "";

    return {
      id: index + 1,
      question: questionText,
      options,
      answer: correctAnswer,
    };
  });

  return questionsArray;
};

const Quizzes = ({
  subject,
  onBack,
}: {
  subject: string;
  onBack: () => void;
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  useEffect(() => {
    const loadQuizQuestions = async () => {
      if (selectedTopic && selectedDifficulty) {
        setIsLoading(true); // Start loading
        try {
          const data = await fetchQuizQuestions(
            subject,
            selectedTopic,
            selectedDifficulty
          );
          if (data.quiz && data.quiz.length > 0) {
            const formattedQuestions = formatQuizData(data.quiz);
            setQuestions(formattedQuestions); // Set questions
          }
        } catch (error) {
          console.error("Error fetching quiz questions:", error);
        } finally {
          setIsLoading(false); // Stop loading
        }
      }
    };

    loadQuizQuestions();
  }, [selectedTopic, selectedDifficulty]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
        <p className="text-lg text-gray-700">Creating your quiz...</p>
      </div>
    );
  }
  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col items-center bg-gray-50">
      <div className="flex items-center justify-between w-full max-w-2xl mb-6">
        <h2 className="text-2xl font-bold text-indigo-700">
          {subject} - AI-Powered Quizzes
        </h2>
        <button
          onClick={onBack}
          className="text-indigo-500 hover:text-indigo-700 text-sm font-medium"
        >
          ← Back to Subject
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-lg border p-6 w-full max-w-2xl">
        {!selectedTopic ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Choose a Topic
            </h3>
            <div className="grid gap-4">
              {subjectTopics[subject]?.map((topic, index) => (
                <button
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-colors text-left group"
                  onClick={() => setSelectedTopic(topic)}
                >
                  <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 group-hover:bg-indigo-200">
                    <Tag className="w-5 h-5" />
                  </div>
                  <span className="text-gray-900 font-medium">{topic}</span>
                </button>
              ))}
            </div>
          </div>
        ) : !selectedDifficulty ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Choose Difficulty Level
            </h3>
            <div className="grid gap-4">
              {difficultyLevels.map((level, index) => (
                <button
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-green-200 hover:bg-green-50 transition-colors text-left group"
                  onClick={() => setSelectedDifficulty(level)}
                >
                  <span className="text-gray-900 font-medium">{level}</span>
                </button>
              ))}
            </div>
          </div>
        ) : showResult ? (
          <div className="text-center">
            <h3 className="text-3xl font-extrabold text-green-600 mb-4">
              Your Score: {score} / {questions.length}
            </h3>
            <p className="text-gray-600 mb-6">
              Great job! Want to try another quiz or review the questions?
            </p>
            <button
              className="mt-4 bg-indigo-500 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-600 transition"
              onClick={onBack}
            >
              Back to Topics
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <progress
                value={currentQuestionIndex + 1}
                max={questions.length}
                className="w-full h-2 rounded-full bg-gray-200 mt-2"
              ></progress>
            </div>

            <p className="text-xl font-medium text-gray-800 mb-6">
              {questions[currentQuestionIndex]?.question}
            </p>
            <div className="grid gap-4">
              {questions[currentQuestionIndex]?.options.map((option, index) => (
                <button
                  key={index}
                  className={`py-3 px-4 rounded-lg transition text-left shadow ${
                    selectedOption === option
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-100 hover:bg-indigo-100"
                  }`}
                  onClick={() => setSelectedOption(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              {currentQuestionIndex > 0 && (
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-400"
                  onClick={() => {
                    setCurrentQuestionIndex(currentQuestionIndex - 1);
                    setSelectedOption(""); // Reset selected option
                  }}
                >
                  Previous
                </button>
              )}
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600"
                onClick={() => {
                  if (currentQuestionIndex === questions.length - 1) {
                    setShowResult(true);
                  } else {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setSelectedOption(""); // Reset selected option
                  }
                }}
              >
                {currentQuestionIndex === questions.length - 1
                  ? "Finish Quiz"
                  : "Next Question"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { Quizzes };
