import React, { createContext, useState, useEffect, useContext } from "react";
import { Message, SubjectHistory } from "../types";

interface SubjectContextType {
  subjectHistory: SubjectHistory[];
  selectedSubject: string | null;
  setSelectedSubject: (subject: string | null) => void;
  updateHistory: (subject: string, newMessage: Message) => void;
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

  return (
    <SubjectContext.Provider
      value={{
        subjectHistory,
        selectedSubject,
        setSelectedSubject,
        updateHistory,
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
