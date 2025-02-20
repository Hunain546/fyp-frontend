import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  BookOpen,
  Download,
  Sun,
  Moon,
  Plus,
  Menu,
  Search,
} from "lucide-react"; // Added Plus, Menu, Search
import { Message } from "../types";
import jsPDF from "jspdf";
import { ThumbsUp, ThumbsDown } from "lucide-react"; //THUMBSUP

interface ChatProps {
  subject: string;
  messages: Message[];
  onSendMessage: (message: string, pastpapermode: boolean) => void; // Updated
  onCloseChat: () => void;
}

const Chat: React.FC<ChatProps> = ({
  subject,
  messages,
  onSendMessage,
  onCloseChat,
}) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState("light");
  const [modalContent, setModalContent] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [pastpapermode, setPastpapermode] = useState(false);
  // New state for sidebar collapse
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Define past chat histories for different subjects
  const chatHistories: { [key: string]: { id: number; title: string }[] } = {
    islamiat: [
      { id: 1, title: "Foundations" },
      { id: 2, title: "Prophets" },
      { id: 3, title: "Quranic Studies" },
    ],
    history: [
      { id: 1, title: "Ancient Civilizations" },
      { id: 2, title: "Medieval Times" },
      { id: 3, title: "Modern History" },
    ],
    geography: [
      { id: 1, title: "Physical Geography" },
      { id: 2, title: "Human Geography" },
      { id: 3, title: "Environmental Issues" },
    ],
  };

  // Derive past chats list based on subject (case-insensitive)
  const pastChats = chatHistories[subject.toLowerCase()] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setIsTyping(true);
      //onSendMessage(message);
      setMessage("");
      setTimeout(() => setIsTyping(false), 1000);
      onSendMessage(message, pastpapermode);
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const openModal = (content: string) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const downloadChatAsPDF = () => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);

    doc.text(`Subject: ${subject} - Chat History`, 10, y);
    y += 10;

    messages.forEach((msg) => {
      const messageType = msg.type === "user" ? "You" : "Assistant";
      const timestamp = msg.timestamp
        ? formatTime(msg.timestamp)
        : "No timestamp";

      doc.text(`${messageType} (${timestamp}):`, 10, y);
      y += 6;

      const splitText = doc.splitTextToSize(msg.content, 180);
      splitText.forEach((line: string) => {
        doc.text(line, 10, y);
        y += 6;
      });

      y += 4;
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save(`${subject}_chat_history.pdf`);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex ${
        theme === "light"
          ? "bg-gray-100 text-gray-800"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      {/* Sidebar for past chats */}
      <aside
        className={`${
          sidebarCollapsed ? "w-16" : "w-64"
        } border-r border-gray-300 p-4 bg-white dark:bg-gray-800 transition-all`}
      >
        <div className="flex items-center justify-between mb-4">
          {!sidebarCollapsed && (
            <h2 className="text-lg font-semibold">Past Chats</h2>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              <Menu className="w-5 h-5" />
            </button>
            {!sidebarCollapsed && (
              <>
                <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  <Plus className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
        <ul className="space-y-2">
          {pastChats.map((chat) => (
            <li key={chat.id}>
              <button className="w-full text-left p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                {!sidebarCollapsed && chat.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header
          className={`flex justify-between items-center px-6 py-3 border-b border-gray-300 ${
            theme === "light" ? "bg-white" : "bg-gray-800"
          }`}
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5" />
            <h1 className="text-lg font-semibold">{subject} Assistant</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-200 transition"
            >
              {theme === "light" ? <Moon /> : <Sun />}
            </button>
            <button
              onClick={downloadChatAsPDF}
              className="p-2 rounded-md hover:bg-gray-200 transition"
            >
              <Download />
            </button>
            <button
              onClick={onCloseChat}
              className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Back
            </button>
          </div>
        </header>

        {/* Chat Messages */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-4 rounded-xl w-auto max-w-[80%] shadow-sm ${
                  msg.type === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.content.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
                {msg.type === "assistant" && msg.isAnswer && (
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => openModal(msg.marking_scheme)}
                      className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Marking Scheme
                    </button>
                    <button
                      onClick={() => openModal(msg.examiner_report)}
                      className="px-3 py-1 text-xs bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Examiner Report
                    </button>
                    <button
                      onClick={() => openModal(msg.paper_source)}
                      className="px-3 py-1 text-xs bg-purple-500 text-white rounded-md hover:bg-purple-600"
                    >
                      Source
                    </button>
                  </div>
                )}

                {msg.type === "assistant" && (
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() =>
                        console.log("Thumbs Up clicked for:", msg.content)
                      }
                      className="p-2 text-gray-500 hover:text-green-500 transition"
                    >
                      <ThumbsUp className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        console.log("Thumbs Down clicked for:", msg.content)
                      }
                      className="p-2 text-gray-500 hover:text-red-500 transition"
                    >
                      <ThumbsDown className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-gray-500">
              <Sparkles className="animate-spin" />
              <span>Assistant is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>

        {/* Input Section */}
        <footer
          className={`px-6 py-4 ${
            theme === "light" ? "bg-white" : "bg-gray-800"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) handleSubmit(e);
              }}
              placeholder={`Ask about ${subject}...`}
              className="flex-1 p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <button
              onClick={handleSubmit}
              className="p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              <Send />
            </button>

            {/* Toggle Button for pastpapermode */}
            {/* <button
              onClick={() => setPastpapermode(!pastpapermode)}
              className={`px-4 py-2 rounded-full border transition ${
                pastpapermode
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Pastpaper
            </button> */}
          </div>
        </footer>

        {/* Modal */}
        {modalContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
              <h2 className="text-lg font-bold mb-4">Details</h2>
              <p className="text-sm text-gray-600 mb-4">{modalContent}</p>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
