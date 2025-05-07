import React, { createContext, useState, useEffect, useContext } from "react";
import { Message, SubjectHistory } from "../types";
import { saveChatHistory } from "../supabaseUtils";

interface SubjectContextType {
  subjectHistory: SubjectHistory[];
  selectedSubject: string | null;
  setSelectedSubject: (subject: string | null) => void;
  updateHistory: (subject: string, newMessage: Message) => void;
  clearHistory: (subject: string) => void; // New function to clear chat
  createNewChat: (subject: string) => void;
}

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

export const SubjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [subjectHistory, setSubjectHistory] = useState<SubjectHistory[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem("subjectHistory");
    if (savedHistory) {
      setSubjectHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("subjectHistory", JSON.stringify(subjectHistory));
  }, [subjectHistory]);

  const updateHistory = (subject: string, newMessage: Message) => {
    setSubjectHistory((prev) => {
      const existingHistory = prev.find((h) => h.subject === subject);
      if (existingHistory) {
        return prev.map((h) =>
          h.subject === subject
            ? {
                ...h,
                messages: [...h.messages, newMessage],
                lastAccessed: Date.now(),
              }
            : h
        );
      }
      return [
        ...prev,
        { subject, messages: [newMessage], lastAccessed: Date.now() },
      ];
    });
  };

  // Add function to clear chat history for a subject
  const clearHistory = (subject: string) => {
    setSubjectHistory((prev) => {
      return prev.map((h) =>
        h.subject === subject ? { ...h, messages: [] } : h
      );
    });
  };

  // Modify the createNewChat function to save the old chat history first
  const createNewChat = (subject: string) => {
    // Find existing history for this subject
    const existingHistory = subjectHistory.find((h) => h.subject === subject);

    // If there's existing history with messages, save it to the database
    if (existingHistory && existingHistory.messages.length > 0) {
      // Save the old chat history to the database
      saveChatHistory(subject, existingHistory.messages)
        .then(({ success }) => {
          if (success) {
            console.log(`Previous ${subject} chat history saved to database`);
          }
        })
        .catch((error) => {
          console.error("Error while saving chat history:", error);
        });
    }

    // Create welcome message
    const welcomeMessage: Message = {
      type: "assistant",
      content: `Welcome to the O-Level ${subject} assistant! Ask me any question related to ${subject}, and I'll provide answers based on the O-Level syllabus.`,
      timestamp: Date.now(),
      marking_scheme: "",
      examiner_report: "",
      paper_source: "",
      isAnswer: false,
    };

    setSubjectHistory((prev) => {
      // Clear any existing messages for this subject
      const updatedHistory = prev.map((h) =>
        h.subject === subject ? { ...h, messages: [] } : h
      );

      // Check if we have an entry for this subject
      const existingSubject = updatedHistory.find((h) => h.subject === subject);

      if (existingSubject) {
        // Update with welcome message
        return updatedHistory.map((h) =>
          h.subject === subject
            ? {
                ...h,
                messages: [welcomeMessage],
                lastAccessed: Date.now(),
              }
            : h
        );
      } else {
        // Create new entry
        return [
          ...updatedHistory,
          { subject, messages: [welcomeMessage], lastAccessed: Date.now() },
        ];
      }
    });
  };

  return (
    <SubjectContext.Provider
      value={{
        subjectHistory,
        selectedSubject,
        setSelectedSubject,
        updateHistory,
        clearHistory,
        createNewChat,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

export const useSubject = (): SubjectContextType => {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error("useSubject must be used within a SubjectProvider");
  }
  return context;
};
