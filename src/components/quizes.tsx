import React, { useState, useEffect } from "react";
import {
  Book,
  Search,
  Tag,
  Loader2,
  CheckCircle,
  XCircle,
  History,
} from "lucide-react";
import { fetchQuizQuestions } from "../utils/api";
import { fetchCurrentUserQuizHistory, saveQuizResult } from "../supabaseUtils";
import { getCurrentUserId } from "../getuserId";

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
    "Physical Features and Topography of Pakistan",
    "Climate of Pakistan",
    "Natural Resources of Pakistan",
    "Water Resources and Management",
    "Agriculture and Farming in Pakistan",
    "Industry and Manufacturing",
    "Population and Demographics",
    "Transport and Communications",
    "Trade and Commerce",
    "Environmental Challenges in Pakistan",
  ],
};

const difficultyLevels = ["Easy", "Medium", "Hard"];

const generateQuestions = (topic: string, difficulty: string) => {
  return Array.from({ length: 15 }, (_, index) => ({
    question: `Dummy question ${index + 1} for ${topic} - ${difficulty} level?`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option A",
  }));
};
const formatQuizData = (quizString: string) => {
  const questionsArray = quizString
    .split("\n\n")
    .slice(1)
    .map((block, index) => {
      const lines = block.split("\n");
      const questionText = lines[0];
      const options = lines.slice(1, 5); // Extract A, B, C, D options
      const answerLine = lines.find((line) =>
        line.startsWith("Correct Answer:")
      );
      const correctAnswer = answerLine ? answerLine.split(": ")[1] : "";

      return {
        id: index + 1,
        question: questionText,
        options,
        answer: correctAnswer,
      };
    });

  console.log("Formatted questions:", questionsArray); // Debugging log
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
  const [answers, setAnswers] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  useEffect(() => {
    const loadQuizHistory = async () => {
      if (subject) {
        setIsLoadingHistory(true);
        try {
          console.log("Fetching quiz history for subject:", subject);
          const { data, error } = await fetchCurrentUserQuizHistory(subject);
          if (data && !error) {
            setQuizHistory(data);
          }
        } catch (error) {
          console.error("Error loading quiz history:", error);
        } finally {
          setIsLoadingHistory(false);
        }
      }
    };

    loadQuizHistory();
  }, [subject]);

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
            const evenIndexedQuestions = formattedQuestions.filter(
              (_, index) => index % 2 === 0
            );
            const oddIndexedQuestions = formattedQuestions.filter(
              (_, index) => index % 2 !== 0
            );
            setAnswers(oddIndexedQuestions); // Set answers

            setQuestions(evenIndexedQuestions); // Set questions
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

  const getCorrectAnswer = (index: number): string => {
    if (answers && answers[index] && answers[index].question) {
      const answerText = answers[index].question;

      // Extract letter from both "Correct answer: D) Abu Bakr" or "Correct answer: D. Abu Bakr" formats
      const match = answerText.match(/Correct answer:\s*([A-D])[\.\)]/i);

      return match ? match[1] : "";
    }
    return "";
  };

  const checkAnswer = () => {
    if (!selectedOption) return;

    const currentAnswerIndex = currentQuestionIndex;
    const correctAnswerLetter = getCorrectAnswer(currentAnswerIndex);

    // Extract the letter from the selected option (e.g. "A. Option text" -> "A")
    const selectedLetter = selectedOption.charAt(0);

    const correct = selectedLetter === correctAnswerLetter;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    // Save user's answer
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newUserAnswers);

    setAnswerSubmitted(true);
  };

  // Then modify the goToNextQuestion function to save results when the quiz is complete
  const goToNextQuestion = async () => {
    setAnswerSubmitted(false);
    setIsCorrect(null);

    if (currentQuestionIndex === 14) {
      setShowResult(true);

      // Save quiz results to Supabase when quiz is complete
      try {
        const userId = await getCurrentUserId();
        if (userId) {
          await saveQuizResult(
            userId,
            subject,
            selectedTopic || "",
            selectedDifficulty || "",
            score
          );

          // Refresh quiz history after saving new result
          const { data } = await fetchCurrentUserQuizHistory(subject);
          if (data) {
            setQuizHistory(data);
          }
        } else {
          console.error("Cannot save quiz result: User not authenticated");
        }
      } catch (error) {
        console.error("Error saving quiz result:", error);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
    }
  };

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
            {isLoadingHistory ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-5 h-5 text-indigo-500 animate-spin mr-2" />
                <span className="text-gray-600">Loading quiz history...</span>
              </div>
            ) : quizHistory && quizHistory.length > 0 ? (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <History className="w-5 h-5 mr-2 text-indigo-600" />
                  Your Quiz History
                </h3>
                <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-indigo-200">
                        <th className="text-left py-2 px-2 text-indigo-700">
                          Topic
                        </th>
                        <th className="text-center py-2 px-2 text-indigo-700">
                          Difficulty
                        </th>
                        <th className="text-right py-2 px-2 text-indigo-700">
                          Score
                        </th>
                        <th className="text-right py-2 px-2 text-indigo-700">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {quizHistory.slice(0, 5).map((history, index) => (
                        <tr
                          key={index}
                          className="border-b border-indigo-100 last:border-0"
                        >
                          <td className="py-2 px-2">{history.topic}</td>
                          <td className="py-2 px-2 text-center capitalize">
                            {history.difficulty}
                          </td>
                          <td className="py-2 px-2 text-right">
                            {history.score}/15
                          </td>
                          <td className="py-2 px-2 text-right text-gray-500">
                            {new Date(history.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}

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
          <div className="text-center w-full">
            <div className="mb-8 pb-6 border-b">
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-indigo-50 border-4 border-indigo-100">
                  <span className="text-3xl font-bold text-indigo-700">
                    {score}/{questions.length}
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Quiz Completed!
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {score === questions.length
                  ? "Perfect score! Excellent understanding of the topic."
                  : score > questions.length / 2
                  ? "Good job! Keep practicing to master this topic."
                  : "Keep learning! Review the material and try again."}
              </p>
            </div>

            <div className="mt-8 mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center">
                <Book className="w-5 h-5 mr-2 text-indigo-600" />
                Answer Review
              </h4>
              <div className="grid gap-4 text-left max-w-3xl mx-auto">
                {questions.map((q, idx) => {
                  const isCorrectAnswer =
                    userAnswers[idx]?.charAt(0) === getCorrectAnswer(idx);
                  return (
                    <div
                      key={idx}
                      className={`p-4 border rounded-lg ${
                        isCorrectAnswer
                          ? "bg-green-50 border-green-100"
                          : "bg-red-50 border-red-100"
                      }`}
                    >
                      <p className="font-medium mb-2">{q.question}</p>
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex items-start">
                          <span className="font-semibold w-24">
                            Your answer:
                          </span>
                          <span
                            className={
                              isCorrectAnswer
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {userAnswers[idx] || "Not answered"}
                            {isCorrectAnswer && (
                              <CheckCircle className="inline ml-2 w-4 h-4" />
                            )}
                            {!isCorrectAnswer && (
                              <XCircle className="inline ml-2 w-4 h-4" />
                            )}
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-semibold w-24">Correct:</span>
                          <span className="text-green-600">
                            {q.options.find(
                              (opt: string) =>
                                opt.charAt(0) === getCorrectAnswer(idx)
                            ) ||
                              `${getCorrectAnswer(idx)}. ${answers[
                                idx
                              ]?.question
                                ?.split(getCorrectAnswer(idx) + ".")[1]
                                ?.trim()}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button
                className="bg-indigo-500 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-600 transition"
                onClick={onBack}
              >
                Back to Topics
              </button>
              <button
                className="bg-white text-indigo-500 border border-indigo-200 px-6 py-3 rounded-lg shadow hover:bg-indigo-50 transition"
                onClick={() => {
                  setSelectedTopic(null);
                  setSelectedDifficulty(null);
                  setQuestions([]);
                  setAnswers([]);
                  setCurrentQuestionIndex(0);
                  setSelectedOption("");
                  setScore(0);
                  setShowResult(false);
                  setUserAnswers([]);
                }}
              >
                Try Another Quiz
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <progress
                value={currentQuestionIndex + 1}
                max={questions.length}
                className="w-full h-2 rounded-full bg-gray-200 mt-2"
              ></progress>
              <p className="text-right text-sm text-gray-500 mt-1">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>

            <p className="text-xl font-medium text-gray-800 mb-6">
              {questions[currentQuestionIndex]?.question}
            </p>
            <div className="grid gap-4">
              {questions[currentQuestionIndex]?.options.map((option, index) => (
                <button
                  key={index}
                  disabled={answerSubmitted}
                  className={`py-3 px-4 rounded-lg transition text-left shadow ${
                    selectedOption === option
                      ? answerSubmitted
                        ? option.charAt(0) ===
                          getCorrectAnswer(currentQuestionIndex)
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        : "bg-indigo-500 text-white"
                      : answerSubmitted &&
                        option.charAt(0) ===
                          getCorrectAnswer(currentQuestionIndex)
                      ? "bg-green-100 border border-green-500"
                      : "bg-gray-100 hover:bg-indigo-100"
                  }`}
                  onClick={() => !answerSubmitted && setSelectedOption(option)}
                >
                  {option}
                  {answerSubmitted &&
                    option.charAt(0) ===
                      getCorrectAnswer(currentQuestionIndex) && (
                      <CheckCircle className="inline ml-2 w-5 h-5 text-white" />
                    )}
                </button>
              ))}
            </div>

            {answerSubmitted && (
              <div
                className={`mt-4 p-3 rounded-lg ${
                  isCorrect ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    isCorrect ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle className="inline mr-2 w-4 h-4" />
                  ) : (
                    <XCircle className="inline mr-2 w-4 h-4" />
                  )}
                  {isCorrect ? "Correct!" : "Incorrect!"}
                  {!isCorrect && (
                    <span className="block mt-1">
                      The correct answer is:{" "}
                      {questions[currentQuestionIndex]?.options.find(
                        (opt) =>
                          opt.charAt(0) ===
                          getCorrectAnswer(currentQuestionIndex)
                      )}
                    </span>
                  )}
                </p>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {currentQuestionIndex > 0 && !answerSubmitted && (
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-400"
                  onClick={() => {
                    setCurrentQuestionIndex(currentQuestionIndex - 1);
                    setSelectedOption(
                      userAnswers[currentQuestionIndex - 1] || ""
                    );
                    setAnswerSubmitted(
                      userAnswers[currentQuestionIndex - 1] ? true : false
                    );
                    setIsCorrect(
                      userAnswers[currentQuestionIndex - 1]?.charAt(0) ===
                        getCorrectAnswer(currentQuestionIndex - 1)
                    );
                  }}
                >
                  Previous
                </button>
              )}

              {!answerSubmitted ? (
                <button
                  disabled={!selectedOption}
                  className={`ml-auto bg-indigo-500 text-white px-4 py-2 rounded-lg shadow ${
                    selectedOption
                      ? "hover:bg-indigo-600"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={checkAnswer}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  className="ml-auto bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600"
                  onClick={goToNextQuestion}
                >
                  {currentQuestionIndex === questions.length - 1
                    ? "Finish Quiz"
                    : "Next Question"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { Quizzes };
