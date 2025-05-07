import { supabase } from "./supabaseClient";

/**
 * Get the current authenticated user's ID
 * @returns The user ID or null if not authenticated
 */
export const getCurrentUserId = async (): Promise<string | null> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If there's no active session, the user is not logged in
  if (!session) {
    console.log("No active session found. User is not authenticated.");
    return null;
  }

  console.log("Current user ID:", session.user.id); // Debugging log
  return session.user.id;
};
