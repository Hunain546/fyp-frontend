export interface Message {
  type: "user" | "assistant";
  content: string;
  timestamp: number;
  marking_scheme: string;
  examiner_report: string;
  paper_source: string;
  isAnswer: boolean;
}

export interface SubjectHistory {
  subject: string;
  messages: Message[];
  lastAccessed: number;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
}

export interface SubjectTopics {
  [key: string]: Topic[];
}
