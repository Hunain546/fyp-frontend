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
  Trash,
} from "lucide-react";
import { Message } from "../types";
import jsPDF from "jspdf";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { fetchChatHistory, fetchChatById } from "../supabaseUtils"; // Import the function to fetch chat history

interface ChatProps {
  subject: string;
  messages: Message[];
  onSendMessage: (message: string, pastpapermode: boolean) => void;
  onCloseChat: () => void;
  onClearChat: () => void;
  onNewChat: () => void;
  onLoadChat?: (messages: Message[]) => void; // New prop to load chat
}

interface ChatHistory {
  id: number;
  subject: string;
  created_at: string;
  history: Message[];
}

const Chat: React.FC<ChatProps> = ({
  subject,
  messages,
  onSendMessage,
  onCloseChat,
  onClearChat,
  onNewChat,
  onLoadChat,
}) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState("light");
  const [modalContent, setModalContent] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [pastpapermode, setPastpapermode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to refresh chat histories
  const refreshChatHistories = async () => {
    setIsLoading(true);
    const { data, error } = await fetchChatHistory(subject);
    if (data) {
      setChatHistories(data);
    } else {
      console.error("Failed to load chat histories:", error);
    }
    setIsLoading(false);
  };

  // Fetch chat histories on component mount only, not when messages change
  useEffect(() => {
    refreshChatHistories();
  }, [subject]); // Only depends on subject, not on messages

  const handleNewChat = () => {
    onNewChat();
  };

  const handleLoadChat = async (chatId: number) => {
    const { data, error } = await fetchChatById(chatId);
    if (data && data.history && onLoadChat) {
      onLoadChat(data.history);
      // Refresh chat histories after loading a chat
      refreshChatHistories();
    } else {
      console.error("Failed to load chat:", error);
    }
  };

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
      setMessage("");
      setTimeout(() => setIsTyping(false), 1000);
      onSendMessage(message, pastpapermode);
      // The refreshChatHistories will happen automatically due to messages.length dependency
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

  const handleClearChat = () => {
    // Call parent's clear chat handler
    onClearChat();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-100 text-gray-800"
      } transition-colors duration-200`}
    >
      {/* Sidebar for past chats */}
      <aside
        className={`${sidebarCollapsed ? "w-16" : "w-64"} border-r ${
          theme === "dark"
            ? "border-gray-700 bg-gray-800"
            : "border-gray-300 bg-white"
        } p-4 transition-all duration-200`}
      >
        <div className="flex items-center justify-between mb-4">
          {!sidebarCollapsed && (
            <h2 className="text-lg font-semibold">Past Chats</h2>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`p-1 rounded ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
            {!sidebarCollapsed && (
              <>
                <button
                  className={`p-1 rounded ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
                  }`}
                >
                  <Search className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNewChat}
                  className={`p-1 rounded ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
                  }`}
                  title="New Chat"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
        <ul className="space-y-2">
          {isLoading ? (
            <li className="text-center p-2">Loading...</li>
          ) : chatHistories.length > 0 ? (
            chatHistories.map((chat) => (
              <li key={chat.id}>
                <button
                  onClick={() => handleLoadChat(chat.id)}
                  className={`w-full text-left p-2 rounded ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
                  } overflow-hidden truncate`}
                >
                  {!sidebarCollapsed ? `${subject} Chat  ${chat.id}` : "#"}
                </button>
              </li>
            ))
          ) : (
            <li className="text-center p-2">No chat history found</li>
          )}
        </ul>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header
          className={`flex justify-between items-center px-6 py-3 border-b ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-300"
          } transition-colors duration-200`}
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5" />
            <h1 className="text-lg font-semibold">{subject} Assistant</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-md transition ${
                theme === "dark"
                  ? "hover:bg-gray-700 text-gray-200"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon /> : <Sun />}
            </button>
            <button
              onClick={downloadChatAsPDF}
              className={`p-2 rounded-md transition ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
            >
              <Download />
            </button>
            <button
              onClick={onCloseChat}
              className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Back
            </button>
          </div>
        </header>

        {/* Chat Messages */}
        <main
          className={`flex-1 overflow-y-auto p-6 space-y-6 ${
            theme === "dark" ? "bg-gray-900" : "bg-gray-100"
          } transition-colors duration-200`}
        >
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
                    : theme === "dark"
                    ? "bg-gray-800 text-gray-200"
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
                      className={`p-2 transition ${
                        theme === "dark"
                          ? "text-gray-400 hover:text-green-400"
                          : "text-gray-500 hover:text-green-500"
                      }`}
                    >
                      <ThumbsUp className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        console.log("Thumbs Down clicked for:", msg.content)
                      }
                      className={`p-2 transition ${
                        theme === "dark"
                          ? "text-gray-400 hover:text-red-400"
                          : "text-gray-500 hover:text-red-500"
                      }`}
                    >
                      <ThumbsDown className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div
              className={`flex items-center gap-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <Sparkles className="animate-spin" />
              <span>Assistant is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>

        {/* Input Section */}
        <footer
          className={`px-6 py-4 ${
            theme === "dark"
              ? "bg-gray-800 border-t border-gray-700"
              : "bg-white border-t border-gray-200"
          } transition-colors duration-200`}
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
              className={`flex-1 p-4 rounded-full border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            />
            <button
              onClick={handleSubmit}
              className="p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              <Send />
            </button>
            <button
              onClick={handleClearChat}
              className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              title="Clear Chat"
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
        </footer>

        {/* Modal */}
        {modalContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
              className={`p-6 rounded-lg shadow-lg max-w-md ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <h2 className="text-lg font-bold mb-4">Details</h2>
              <p
                className={`text-sm mb-4 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {modalContent}
              </p>
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
