import { useState, useEffect, useRef } from "react";
import { fetchAssistantResponse } from "../utils/api";
import { Pen, Upload } from "lucide-react"; // new import

interface GeneratedAnswer {
  answer: string;
  markingScheme: string;
  examinerReport: string;
  source: string;
}

interface PastPaperAIProps {
  subject: string; // Accept subject as a prop
  onBack: () => void;
}

export default function PastPaperAI({ subject, onBack }: PastPaperAIProps) {
  const [activeTab, setActiveTab] = useState<"question" | "upload">("question");
  const [question, setQuestion] = useState<string>("");
  const [style, setStyle] = useState<string>("concise");
  const [generatedAnswer, setGeneratedAnswer] =
    useState<GeneratedAnswer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageDescription, setImageDescription] = useState<string | null>(null);
  const [imageName, setImageName] = useState("Choose Image");
  const [isImageError, setIsImageError] = useState<boolean>(false);
  const answerRef = useRef<HTMLDivElement>(null);

  // Add this useEffect to clear inputs when tab changes
  useEffect(() => {
    setQuestion("");
    setGeneratedAnswer(null);
    setImage(null);
    setImagePreview(null);
    setImageDescription(null);
  }, [activeTab]);

  const generateAnswer = async () => {
    if (
      (activeTab === "question" && !question.trim()) ||
      (activeTab === "upload" && !image)
    )
      return;
    setLoading(true);
    setGeneratedAnswer(null);
    setImageDescription(null);
    setImage(null);
    setIsImageError(false); // reset error

    try {
      if (activeTab === "upload" && image) {
        const formData = new FormData();
        formData.append("file", image);
        const imageResponse = await fetch(
          "http://localhost:8000/analyze-image/",
          {
            method: "POST",
            body: formData,
          }
        );
        const imageData = await imageResponse.json();
        if (
          imageData.description &&
          imageData.description.toLowerCase() === "invalid image"
        ) {
          setIsImageError(true);
        } else {
          setImageDescription(imageData.description);
        }
      } else if (activeTab === "question" && question.trim()) {
        const response = await fetchAssistantResponse(question, subject, true);
        setGeneratedAnswer({
          answer: response.answer,
          markingScheme: response.marking_scheme,
          examinerReport: response.examiner_report,
          source: response.paper_source?.source || "May June 2023 Paper 1 Q2",
        });
        // console.log(answer);
        // console.log("testing");
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
      setImageName("Choose Image");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (generatedAnswer && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [generatedAnswer, imagePreview]);

  const isAnswerValid = (ans: string): boolean => {
    return ans.trim().split(/\s+/).length >= 20;
  };

  return (
    <div className="max-w-5xl mx-auto p-8 min-h-screen flex flex-col items-center bg-gradient-to-r from-gray-100 to-gray-50 text-gray-900 font-sans">
      <div className="w-full flex justify-end">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg bg-white shadow-md text-gray-700 hover:bg-gray-200 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        >
          ← Back to Subject
        </button>
      </div>

      <h1 className="text-4xl font-bold text-center mb-4">
        {subject} Past Paper <span className="text-blue-600">AI Assistant</span>
      </h1>
      <p className="text-lg text-center text-gray-600 max-w-2xl mb-6">
        {activeTab === "question"
          ? `Enter your ${subject} past paper question below, choose your preferred answer style, and let the AI generate a response for you.`
          : `Upload an image of your ${subject} past paper question and let the AI analyze it.`}
      </p>

      {/* Tabs header */}
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setActiveTab("question")}
          className={`px-4 py-2 rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            activeTab === "question"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-800 border border-gray-300 hover:bg-blue-50"
          }`}
        >
          <Pen className="inline mr-2" size={16} /> Write Question
        </button>
        {subject.toLowerCase() === "history" && (
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-4 py-2 rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              activeTab === "upload"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 border border-gray-300 hover:bg-blue-50"
            }`}
          >
            <Upload className="inline mr-2" size={16} /> Upload Image
          </button>
        )}
      </div>

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 space-y-4 border border-gray-200">
        {activeTab === "question" && (
          <>
            <textarea
              placeholder={`Enter your ${subject} past paper question...`}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 text-lg"
            />
            {/* <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-lg"
            >
              <option value="concise">Concise</option>
              <option value="detailed">Detailed</option>
              <option value="explanatory">Explanatory</option>
            </select> */}
          </>
        )}

        {activeTab === "upload" && (
          <div className="flex flex-col items-center justify-center">
            {/* Drop zone placeholder */}
            <div
              className="w-full border-2 border-dashed border-gray-300 rounded-md p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors mb-4"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <Upload className="text-gray-400" size={32} />
              <p className="text-gray-500 text-sm mt-2">
                Drag and drop image here or click to select
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              id="file-upload"
              onChange={handleImageUpload}
              className="hidden"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Uploaded preview"
                className="mt-4 max-w-md h-auto rounded-md shadow-sm" // changed from max-w-full to max-w-md
              />
            )}
          </div>
        )}

        <button
          onClick={generateAnswer}
          disabled={
            (activeTab === "question" && !question.trim()) ||
            (activeTab === "upload" && !image) ||
            loading
          }
          className="w-full px-4 py-2 rounded-lg shadow-md font-semibold transition duration-300 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Answer"}
        </button>

        {isImageError ? (
          <p className="bg-red-100 p-4 rounded-md text-md text-red-600">
            The uploaded image is not from {subject.toLowerCase()} past papers.
          </p>
        ) : (
          imageDescription && (
            <p className="bg-gray-100 p-4 rounded-md text-md">
              📷 {imageDescription}
            </p>
          )
        )}

        {generatedAnswer && (
          <>
            {!isAnswerValid(generatedAnswer.answer) ? (
              <p className="bg-red-100 p-4 rounded-md text-lg text-red-600">
                {generatedAnswer.answer}
              </p>
            ) : (
              <div
                ref={answerRef}
                className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-6 space-y-4 border border-gray-200"
              >
                <h2 className="text-xl font-bold text-center">
                  📝 Generated Answer
                </h2>
                <p className="bg-gray-100 p-4 rounded-md text-lg">
                  {generatedAnswer.answer}
                </p>
                <details className="border-t pt-2">
                  <summary className="font-medium cursor-pointer hover:text-blue-500 text-lg">
                    📌 Marking Scheme
                  </summary>
                  <p className="text-gray-600 mt-2 p-3 bg-gray-100 rounded-md text-lg">
                    {generatedAnswer.markingScheme}
                  </p>
                </details>
                <details className="border-t pt-2">
                  <summary className="font-medium cursor-pointer hover:text-blue-500 text-lg">
                    📋 Examiner Report
                  </summary>
                  <p className="text-gray-600 mt-2 p-3 bg-gray-100 rounded-md text-lg">
                    {generatedAnswer.examinerReport}
                  </p>
                </details>
                <details className="border-t pt-2">
                  <summary className="font-medium cursor-pointer hover:text-blue-500 text-lg">
                    📖 Question Source
                  </summary>
                  <p className="text-gray-600 mt-2 p-3 bg-gray-100 rounded-md text-lg">
                    {generatedAnswer.source}
                  </p>
                </details>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
