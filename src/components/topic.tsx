import { useState, useEffect } from "react";
import { fetchTopics } from "../utils/api"; // API function to fetch topics
import { ChevronDown, ChevronUp, Book } from "lucide-react";

interface TopicData {
  Topic: string;
  Subtopic: string;
  Section: string;
  Content: string;
}

export default function TopicExplorer({ subject }: { subject: string }) {
  const [topics, setTopics] = useState<{ [key: string]: TopicData[] }>({});
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [openSubtopic, setOpenSubtopic] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!subject) return;

    const loadTopics = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedTopics: TopicData[] = await fetchTopics(subject);

        // Organize data by Topic → Subtopic
        const groupedTopics: { [key: string]: TopicData[] } = {};
        fetchedTopics.forEach((item) => {
          if (!groupedTopics[item.Topic]) {
            groupedTopics[item.Topic] = [];
          }
          groupedTopics[item.Topic].push(item);
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

  const toggleTopic = (topic: string) => {
    setOpenTopic(openTopic === topic ? null : topic);
    setOpenSubtopic(null); // Reset subtopic selection when changing topic
  };

  const toggleSubtopic = (subtopic: string) => {
    setOpenSubtopic(openSubtopic === subtopic ? null : subtopic);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white min-h-screen text-gray-900">
      <h1 className="text-4xl font-bold text-center mb-8">{subject} - Topic Explorer</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading topics...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : Object.keys(topics).length === 0 ? (
        <p className="text-center text-gray-500">No topics available for {subject}.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {Object.entries(topics).map(([topic, subtopics], index) => (
            <div key={index} className="bg-gray-100 shadow-lg rounded-xl overflow-hidden">
              {/* Topic Button */}
              <button
                className="w-full flex justify-between items-center p-5 bg-gray-200 text-gray-900 font-semibold text-lg hover:bg-gray-300 transition-all duration-300"
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

              {/* Subtopics and Sections (Expandable) */}
              {openTopic === topic && (
                <div className="bg-white p-4">
                  {subtopics.map((subtopicData, subIndex) => (
                    <div key={subIndex} className="mb-2">
                      {/* Subtopic Button */}
                      <button
                        className="w-full flex justify-between items-center p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100 transition-all duration-200"
                        onClick={() => toggleSubtopic(subtopicData.Subtopic)}
                      >
                        <span>{subtopicData.Subtopic} - {subtopicData.Section}</span>
                        {openSubtopic === subtopicData.Subtopic ? <ChevronUp /> : <ChevronDown />}
                      </button>

                      {/* Notes (Content) */}
                      {openSubtopic === subtopicData.Subtopic && (
                        <div className="bg-gray-50 p-3 mt-2 border-l-4 border-indigo-500 text-gray-700">
                          {subtopicData.Content}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

