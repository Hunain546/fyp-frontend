import React, { useState, useEffect } from "react";
import {
  Atom,
  FlaskRound,
  Globe2,
  History as HistoryIcon,
  PlusCircleIcon,
  ScrollText,
} from "lucide-react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Dashboard from "./components/Dashboard";
import PracticeMode from "./components/PracticeMode";
import Settings from "./components/Settings";
import Progress from "./components/Progress";
import Login from "./components/Login";
import Signup from "./components/Signup"; // Add this import
import SubjectDetails from "./components/SubjectDetails";
import { Quizzes } from "./components/quizes";
import { Message } from "./types";
import { fetchAssistantResponse } from "./utils/api";
import { useSubject } from "./context/SubjectContext";
import PastPaperAI from "./components/PastPapers";
import FeedbackPage from "./components/Feedback";
import { signUp, signIn, getUser, signOut } from "./auth";
import HomePage from "./landing/HomePage"; // Import HomePage component
import TopicExplorer from "./components/topic";

function App() {
  // State variables
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showSignup, setShowSignup] = useState(false); // Add this state
  const [showAuth, setShowAuth] = useState(false); // Track if user wants to auth

  // Use subject context
  const { selectedSubject, setSelectedSubject, subjectHistory, updateHistory } =
    useSubject();

  // Check for existing session when the app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getUser();
        if (user) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleSelectSubject = (subject: string) => {
    setSelectedSubject(subject); // Keep the subject selected
    setActiveSection("subjectPage"); // Redirect to the new page
  };

  // Subject list
  const subjects = [
    {
      subject: "Islamiat",
      icon: <ScrollText className="w-6 h-6 text-white" />,
      color: "bg-emerald-600",
    },
    {
      subject: "History",
      icon: <HistoryIcon className="w-6 h-6 text-white" />,
      color: "bg-amber-600",
    },
    {
      subject: "Geography",
      icon: <Globe2 className="w-6 h-6 text-white" />,
      color: "bg-blue-600",
    },
    {
      subject: "Chemistry",
      icon: <FlaskRound className="w-6 h-6 text-white" />,
      color: "bg-pink-600",
    },
    {
      subject: "Physics",
      icon: <Atom className="w-6 h-6 text-white" />,
      color: "bg-purple-600",
    },
    {
      subject: "Biology",
      icon: <PlusCircleIcon className="w-6 h-6 text-white" />,
      color: "bg-green-600",
    },
  ];

  // Navigation handler
  const handleNavigate = (section: string) => {
    if (section === "dashboard") {
      setSelectedSubject(null);
    } else if (subjects.some((s) => s.subject === section)) {
      setSelectedSubject(section);
    }
    setActiveSection(section);
  };

  // Chat message handler
  const handleSendMessage = async (message: string, pastpapermode: boolean) => {
    if (!selectedSubject) return;

    const userMessage: Message = {
      type: "user",
      content: message,
      timestamp: Date.now(),
      marking_scheme: "",
      examiner_report: "",
      paper_source: "",
      isAnswer: false,
    };
    updateHistory(selectedSubject, userMessage);

    try {
      const data = await fetchAssistantResponse(
        message,
        selectedSubject,
        pastpapermode
      );
      const formattedSource = formatPaperSource(data.paper_source);
      const assistantMessage: Message = {
        type: "assistant",
        content: data.answer || "Unable to generate an answer.",
        timestamp: Date.now(),
        marking_scheme: data.marking_scheme,
        examiner_report: data.examiner_report,
        paper_source: formattedSource,
        isAnswer: data.isAnswer,
      };

      updateHistory(selectedSubject, assistantMessage);
    } catch (error) {
      const errorResponse: Message = {
        type: "assistant",
        content: "An error occurred while fetching the answer.",
        timestamp: Date.now(),
        marking_scheme: "",
        examiner_report: "",
        paper_source: "",
        isAnswer: false,
      };
      updateHistory(selectedSubject, errorResponse);
    }
  };

  const formatPaperSource = (source: Record<string, string | undefined>) => {
    if (!source || Object.keys(source).length === 0) return "N/A";
    return Object.entries(source)
      .map(([key, value]) => `${key}: ${value || "N/A"}`)
      .join("\n");
  };

  // Retrieve current chat messages
  const getCurrentMessages = () => {
    if (!selectedSubject) return [];
    const history = subjectHistory.find((h) => h.subject === selectedSubject);
    return (
      history?.messages || [
        {
          type: "assistant",
          content: `Welcome to the O-Level ${selectedSubject} assistant! Ask me any question related to ${selectedSubject}, and I'll provide answers based on the O-Level syllabus.`,
          timestamp: Date.now(),
          marking_scheme: "",
          examiner_report: "",
          paper_source: "",
          isAnswer: false,
        },
      ]
    );
  };

  // Login handler
  const handleLogin = async (email: string, password: string) => {
    try {
      const { user, error } = await signIn(email, password);

      if (error) {
        throw new Error(`Login failed: ${error.message}`);
      }

      if (user) {
        setIsAuthenticated(true);
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      alert(error.message || "Login failed. Please try again.");
    }
  };

  // Signup handler
  const handleSignup = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const { user, error } = await signUp(email, password, name);

      if (error) {
        throw new Error(`Signup failed: ${error.message}`);
      }

      if (user) {
        console.log("User registered successfully:", user);
        // Don't authenticate directly
        // setIsAuthenticated(true);
        return { success: true };
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      // Re-throw the error so the Signup component can handle it
      throw error;
    }
  };

  // Toggle between login and signup screens
  const toggleAuthScreen = () => {
    setShowSignup(!showSignup);
  };

  // Handle navigation to login screen from Homepage
  const handleShowLogin = () => {
    setShowAuth(true);
    setShowSignup(false);
  };

  // Handle navigation to signup screen from Homepage
  const handleShowSignup = () => {
    setShowAuth(true);
    setShowSignup(true);
  };

  // Handle cancel authentication and return to homepage
  const handleCancelAuth = () => {
    setShowAuth(false);
  };

  // Add clear chat handler: clears messages for selected subject.
  const handleClearChat = () => {
    if (!selectedSubject) return;
    const newHistory = subjectHistory.map((h) =>
      h.subject === selectedSubject ? { ...h, messages: [] } : h
    );
    localStorage.setItem("subjectHistory", JSON.stringify(newHistory));
    // Force UI update; adjust if you later expose a setter in context.
    window.location.reload();
  };

  // Sign out handler
  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setSelectedSubject(null);
      setActiveSection("dashboard");
    } catch (error) {
      console.error("Sign out error:", error);
      alert("Failed to sign out. Please try again.");
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <Dashboard
            subjects={subjects}
            onSubjectSelect={handleSelectSubject}
            onSignOut={handleSignOut}
          />
        );
      case "subjectPage":
        return (
          selectedSubject && (
            <SubjectDetails
              subject={selectedSubject}
              onProceed={() => setActiveSection("practice")}
              onNavigate={handleNavigate} // Pass handleNavigate
            />
          )
        );
      case "chat":
        return (
          selectedSubject && (
            <Chat
              subject={selectedSubject}
              messages={getCurrentMessages()}
              onSendMessage={handleSendMessage}
              onCloseChat={() => setActiveSection("subjectPage")}
              onClearChat={handleClearChat} // Added onClearChat prop here
            />
          )
        );
      case "lessons":
        return <div>Interactive Lessons Page (To Be Implemented)</div>;
      case "quizzes":
        return (
          selectedSubject && (
            <Quizzes
              subject={selectedSubject}
              onBack={() => setActiveSection("subjectPage")}
            />
          )
        );
      case "topics":
        return selectedSubject && <TopicExplorer subject={selectedSubject} />; // Pass subject
      case "pastpapers":
        return (
          selectedSubject && (
            <PastPaperAI
              subject={selectedSubject}
              onBack={() => setActiveSection("subjectPage")}
            />
          )
        );
      case "settings":
        return <Settings />;
      case "progress":
        return <Progress />;
      case "practice":
        return (
          selectedSubject && (
            <PracticeMode
              subject={selectedSubject}
              onBack={() => handleNavigate("dashboard")}
              onStartPractice={() =>
                console.log("Practice started for", selectedSubject)
              }
            />
          )
        );
      default:
        return <FeedbackPage />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Show login/signup only if the user has clicked on auth buttons
    if (showAuth) {
      return showSignup ? (
        <Signup
          onSignup={handleSignup}
          onLoginClick={toggleAuthScreen}
          onCancel={handleCancelAuth}
        />
      ) : (
        <Login
          onLogin={handleLogin}
          onSignupClick={toggleAuthScreen}
          onCancel={handleCancelAuth}
        />
      );
    }

    // Otherwise show the homepage
    return <HomePage onLogin={handleShowLogin} onSignup={handleShowSignup} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-1">
        <Sidebar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          selectedSubject={selectedSubject}
        />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto">{renderContent()}</div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-indigo-600 text-white py-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} O/Adapt. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-indigo-400">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="#" className="hover:text-indigo-400">
            Terms of Service
          </a>
          <span>|</span>
          <a href="#" className="hover:text-indigo-400">
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
