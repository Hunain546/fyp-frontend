import { getCurrentUserId } from "./getuserId";
import { supabase } from "./supabaseClient";
import { Message } from "./types";

/**
 * Fetches the current user's quiz history for a specific subject
 * @param subject - The subject to filter by (default is "Islamiat")
 * @returns The quiz history data or null if user is not authenticated or error occurs
 */
export const fetchCurrentUserQuizHistory = async (
  subject: string = "Islamiat"
) => {
  // Get the current user ID
  const userId = await getCurrentUserId();

  // If no user is authenticated, return early
  if (!userId) {
    console.log("User is not authenticated. Cannot fetch quiz history.");
    return { data: null, error: new Error("User not authenticated") };
  }

  // Fetch quiz history for the authenticated user
  console.log("Attempting to fetch user quiz history");
  console.log("User ID:", userId);
  const { data, error } = await supabase
    .from("quizzes")
    .select()
    .eq("user_id", userId)
    .eq("subject", subject);
  console.log("Response:", { data, error });

  if (error) {
    console.error("Error fetching user quiz history:", error);
    return { data: null, error };
  }

  console.log("Fetched quiz history:", data); // Debugging log
  return { data, error: null };
};

// Add this new function to save quiz results
export const saveQuizResult = async (
  userId: string,
  subject: string,
  topic: string,
  difficulty: string,
  score: number
) => {
  console.log("Saving quiz result to database:", {
    userId,
    subject,
    topic,
    difficulty,
    score,
  });

  const { data, error } = await supabase.from("quizzes").insert([
    {
      user_id: userId,
      subject,
      topic,
      difficulty,
      score,
    },
  ]);

  if (error) {
    console.error("Error saving quiz result:", error);
    return { success: false, error };
  }

  console.log("Quiz result saved successfully:", data);
  return { success: true, data };
};

/**
 * Saves chat history to the database
 * @param subject - The subject of the chat
 * @param history - Array of chat messages
 * @returns Object indicating success or error
 */
export const saveChatHistory = async (subject: string, history: Message[]) => {
  // Get the current user ID
  const userId = await getCurrentUserId();

  // If no user is authenticated, return early
  if (!userId) {
    console.log("User is not authenticated. Cannot save chat history.");
    return { success: false, error: new Error("User not authenticated") };
  }

  // Save chat history to the database
  console.log("Saving chat history to database", { subject, userId });

  const { data, error } = await supabase.from("chats").insert([
    {
      subject,
      user_id: userId,
      history: JSON.stringify(history), // Store messages as JSON string in the history column
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Error saving chat history:", error);
    return { success: false, error };
  }

  console.log("Chat history saved successfully:", data);
  return { success: true, data };
};

/**
 * Fetches the current user's chat history
 * @param subject - Optional subject to filter chat history by
 * @returns The chat history data or null if user is not authenticated or error occurs
 */
export const fetchChatHistory = async (subject?: string) => {
  // Get the current user ID
  const userId = await getCurrentUserId();

  // If no user is authenticated, return early
  if (!userId) {
    console.log("User is not authenticated. Cannot fetch chat history.");
    return { data: null, error: new Error("User not authenticated") };
  }

  // Build query
  let query = supabase
    .from("chats")
    .select()
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  // Add subject filter if provided
  if (subject) {
    query = query.eq("subject", subject);
  }

  // Execute the query
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching chat history:", error);
    return { data: null, error };
  }

  // Parse JSON strings back to Message objects
  const parsedData = data?.map((chat) => ({
    ...chat,
    history: JSON.parse(chat.history),
  }));

  console.log("Fetched chat history:", parsedData);
  return { data: parsedData, error: null };
};

/**
 * Fetches a specific chat by ID
 * @param chatId - The ID of the chat to fetch
 * @returns The chat data or null if not found or error occurs
 */
export const fetchChatById = async (chatId: number) => {
  const { data, error } = await supabase
    .from("chats")
    .select()
    .eq("id", chatId)
    .single();

  if (error) {
    console.error("Error fetching chat by ID:", error);
    return { data: null, error };
  }

  // Parse JSON string back to Message objects
  if (data) {
    const parsedData = {
      ...data,
      history: JSON.parse(data.history),
    };
    return { data: parsedData, error: null };
  }

  return { data: null, error: new Error("Chat not found") };
};
