import { useState, useEffect } from "react";
import { fetchTopics } from "../utils/api"; // API function to fetch topics
import { ChevronDown, ChevronUp, Book } from "lucide-react";

interface TopicData {
  Topic: string;
  Subtopic: string;
  Section: string;
  Content: string;
}

interface GroupedTopicData {
  [key: string]: {
    [key: string]: {
      [key: string]: string[]; // Sections (array) under Subtopics
    };
  };
}

export default function TopicExplorer({ subject }: { subject: string }) {
  const [topics, setTopics] = useState<GroupedTopicData>({});
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [openSubtopic, setOpenSubtopic] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!subject) return;

    const loadTopics = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedTopics: TopicData[] = await fetchTopics(subject);

        // Organize data by Topic → Subtopic → Sections
        const groupedTopics: GroupedTopicData = {};
        fetchedTopics.forEach((item) => {
          if (!groupedTopics[item.Topic]) {
            groupedTopics[item.Topic] = {};
          }
          if (!groupedTopics[item.Topic][item.Subtopic]) {
            groupedTopics[item.Topic][item.Subtopic] = {};
          }
          // Group Sections and their contents
          if (!groupedTopics[item.Topic][item.Subtopic][item.Section]) {
            groupedTopics[item.Topic][item.Subtopic][item.Section] = [];
          }
          groupedTopics[item.Topic][item.Subtopic][item.Section].push(
            item.Content
          );
        });

        setTopics(groupedTopics);
      } catch (err) {
        setError("Failed to load topics");
      } finally {
        setLoading(false);
      }
    };

    loadTopics();
  }, [subject]);

  // Function to clean content by removing arrows and adding spaces
  const cleanContent = (content: string) => {
    return content
      .replace(/➜/g, "•") // Remove arrows
      .split("\n") // Split by newline
      .map((line, index) => (
        <p key={index} className="mb-2">
          {line}
        </p>
      )); // Add <p> tags for spacing
  };

  const toggleTopic = (topic: string) => {
    setOpenTopic(openTopic === topic ? null : topic);
    setOpenSubtopic(null); // Reset subtopic selection when changing topic
    setOpenSection(null); // Reset section selection when changing topic
  };

  const toggleSubtopic = (subtopic: string) => {
    setOpenSubtopic(openSubtopic === subtopic ? null : subtopic);
    setOpenSection(null); // Reset section selection when changing subtopic
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-blue-50 min-h-screen text-gray-900">
      <h1 className="text-4xl font-bold text-center mb-8">
        {subject} - Topic Explorer
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading topics...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : Object.keys(topics).length === 0 ? (
        <p className="text-center text-gray-500">
          No topics available for {subject}.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {Object.entries(topics).map(([topic, subtopics], index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl overflow-hidden"
            >
              {/* Topic Button with Solid Color */}
              <button
                className="w-full flex justify-between items-center p-5 bg-blue-300 text-black font-semibold text-lg hover:bg-blue-600 transition-all duration-300"
                onClick={() => toggleTopic(topic)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    <Book className="w-5 h-5" />
                  </div>
                  <span>{topic}</span>
                </div>
                {openTopic === topic ? <ChevronUp /> : <ChevronDown />}
              </button>

              {/* Subtopics (Expandable) */}
              {openTopic === topic && (
                <div className="bg-white p-4">
                  {Object.entries(subtopics).map(
                    ([subtopic, sections], subIndex) => (
                      <div key={subIndex} className="mb-4">
                        {/* Subtopic Button with Solid Color */}
                        <button
                          className="w-full flex justify-between items-center p-3 bg-yellow-200 text-black border border-gray-300 rounded-lg hover:bg-yellow-500 transition-all duration-200"
                          onClick={() => toggleSubtopic(subtopic)}
                        >
                          <span>{subtopic}</span>
                          {openSubtopic === subtopic ? (
                            <ChevronUp />
                          ) : (
                            <ChevronDown />
                          )}
                        </button>

                        {/* Sections (Expandable) */}
                        {openSubtopic === subtopic && (
                          <div className="bg-gray-50 p-3 mt-2 border-l-4 border-indigo-500 text-gray-700">
                            {Object.entries(sections).map(
                              ([section, content], secIndex) => (
                                <div key={secIndex} className="mb-2">
                                  {/* Section Button with Solid Color */}
                                  <button
                                    className="w-full flex justify-between items-center p-2 bg-green-200 text-black border border-gray-300 rounded-lg hover:bg-green-500 transition-all duration-200"
                                    onClick={() => toggleSection(section)}
                                  >
                                    <span>{section}</span>
                                    {openSection === section ? (
                                      <ChevronUp />
                                    ) : (
                                      <ChevronDown />
                                    )}
                                  </button>

                                  {/* Section Content */}
                                  {openSection === section && (
                                    <div className="bg-gray-50 p-3 mt-2 border-l-4 border-indigo-500 text-gray-700">
                                      {content.map((cont, idx) =>
                                        cleanContent(cont)
                                      )}{" "}
                                      {/* Cleaned content */}
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
