import { supabase } from "./supabaseClient";

// Sign Up Function
export const signUp = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: name,
      },
    },
  });
  return { user: data.user, error };
};

// Sign In Function
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { user: data.user, error };
};

// GitHub OAuth Sign In Function
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/app/agents`,
    },
  });
  console.log(data);
  return { data, error };
};

// Sign Out Function
export const signOut = async () => {
  await supabase.auth.signOut();
};

// Get Current User
export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
