export const fetchAssistantResponse = async (
  message: string,
  subject: string,
  pastpapermode: boolean // New parameter
): Promise<{
  answer: string;
  marking_scheme: string;
  examiner_report: string;
  paper_source: Record<string, string | undefined>;
  isAnswer: boolean;
}> => {
  // Determine the endpoint based on the subject and mode
  const endpoint =
    subject === "Islamiat" ? "/answer_islamiat" : "/answer_history";
  console.log(pastpapermode);

  // Make the POST request
  const response = await fetch(`http://localhost:8000${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_query: message, mode: pastpapermode }),
  });

  if (!response.ok) throw new Error("Failed to fetch answer");

  // Parse and return the JSON response
  return response.json();
};

export const fetchQuizQuestions = async (
  subject: string,
  topic: string,
  difficulty: string
): Promise<{ quiz: string }> => {
  const normalizedSubject = subject.toLowerCase(); // Convert to lowercase
  console.log("Sending request to /generate_quiz:", { normalizedSubject, topic, difficulty });

  const response = await fetch("http://localhost:8000/generate_quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subject: normalizedSubject,
      topic: topic,
      difficulty: difficulty,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Quiz API Error:", errorText);
    throw new Error("Failed to fetch quiz questions");
  }

  return response.json();
};

