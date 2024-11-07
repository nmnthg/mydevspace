import { createBrowserClient } from "@supabase/ssr";
import { decode } from "base64-arraybuffer";

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
      throw new Error(
        `Failed to create user in database: ${
          error.message || JSON.stringify(error)
        }`
      );
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
  const { data, error } = await supabase
    .from("Users")
    .select("*")
    .eq("display_name", display_name)
    .single();
  if (error) throw error;
  console.log(data);
  return data;
};

const getProjects = async (display_name) => {
  const { data, error } = await supabase
    .from("Projects")
    .select("*")
    .eq("display_name", display_name.trim());
  if (error) throw error;
  console.log(data);
  return data;
};

const getProject = async (projectId) => {
  const { data, error } = await supabase
    .from("Projects")
    .select("*")
    .eq("id", projectId);
  if (error) throw error;
  console.log(data[0]);
  return data[0];
};

const updateProfile = async (user) => {
  const { data, error } = await supabase
    .from("Users")
    .update({
      name: user.name,
      title: user.title,
      github: user.github,
      linkedin: user.linkedin,
      resume: user.newResumeUrl
    })
    .eq("display_name", user.display_name)
    .select();
  if (error) {
    console.error("Error uploading profile:", error);
    throw error;
  }
  if (data.length === 0) {
    throw new Error("No data was updated");
  }
  return data;
};

const uploadResume = async (resumeFile, display_name) => {
  // Upload resume file, replacing existing file if conflict
  const { data, error: uploadError } = await supabase.storage
    .from('mydevspace')
    .upload(`Resumes/${display_name}/${resumeFile.name}`, resumeFile, {
      cacheControl: "3600",
      upsert: true,
      contentType: 'application/pdf'
    });

  if (uploadError) {
    console.error("Error uploading file:", uploadError); 
    return;
  }

  // Retrieve the public URL of the uploaded file
  console.log("getting url");
  const { data: urlData, error: urlError } = supabase.storage
    .from('mydevspace')
    .getPublicUrl(`Resumes/${display_name}/${resumeFile.name}`)
  if (urlError) {
    console.error("Error retrieving public URL:", urlError); 
    return;
  }
  console.log(`got url: ${urlData.publicUrl}`);
  return urlData.publicUrl;
};

const updateProject = async(projectData) => {
  const { data, error } = await supabase
    .from("Projects")
    .upsert({
      id: projectData.id,
      name: projectData.name,
      preview: projectData.preview,
      description: projectData.description,
      url: projectData.url
    })
    .select();
  
  if (error) {
    console.error("Error uploading project data:", error);
    throw error;
  }
  
  return data;
}

const uploadProjectCover = async(image, projectId) => {
  const { data, error: uploadError } = await supabase.storage
    .from('mydevspace')
    .upload(`Projects/${projectId}/${image.name}`, image, {
      cacheControl: "3600",
      upsert: true,
      contentType: image.type
    });

    if (uploadError) {
      console.error("Error uploading file:", uploadError); 
      return;
    }
  
    // Retrieve the public URL of the uploaded file
    console.log("getting url");
    const { data: urlData, error: urlError } = supabase.storage
      .from('mydevspace')
      .getPublicUrl(`Projects/${projectId}/${image.name}`)
    if (urlError) {
      console.error("Error retrieving public URL:", urlError); 
      return;
    }
    console.log(`got url: ${urlData.publicUrl}`);
    return urlData.publicUrl;
}

export {
  supabase,
  emailSignUp,
  emailSignIn,
  signOut,
  getSession,
  getUser,
  getProjects,
  getProject,
  updateProfile,
  uploadResume,
  updateProject,
  uploadProjectCover
};
