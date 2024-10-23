import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const emailSignUp = async (email, password, displayName) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) throw error;

    console.log("User signed up successfully:", data);

     // Create user in the database
    await createUserInDatabase(data.user);

    // Sign in the user immediately after sign up
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) throw signInError;

    console.log("User signed in successfully:", signInData);

    return signInData;
  } catch (error) {
    console.error("Error in emailSignUp:", error);
    throw error;
  }
};

const emailSignIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};

const createUserInDatabase = async (user) => {
  try {
    console.log("Attempting to create user in database:", user);

    const { data, error } = await supabase
      .from("Users")
      .insert({
        id: user.id,
        email: user.email,
        display_name: user.user_metadata.display_name,
      })
      .select();
    if (error) {
      throw new Error(`Failed to create user in database: ${error.message || JSON.stringify(error)}`);
    }
    console.log("User created in database:", data);
    return data;
  } catch (error) {
    console.error("Error in createUserInDatabase:", error);
  }
};


const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};

const getUser = async (display_name) => {
  const { data, error } = await supabase.from('Users').select('*').eq('display_name', display_name).single();
  if (error) throw error;
  console.log(data);
  return data;
};

const getProjects = async (display_name) => {
    console.log(display_name);
  const { data, error } = await supabase.from('Projects').select('*').eq('display_name', display_name);
  if (error) throw error;
  console.log(data);
  return data;
};

export { supabase, emailSignUp, emailSignIn, signOut, getSession, getUser, getProjects };
