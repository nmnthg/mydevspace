import { createClient } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";
import { createRequire } from 'module'; // Import createRequire from module
const require = createRequire(import.meta.url); // Create a require function
const fs = require('fs').promises;

const supabaseUrl = "https://lvhyctrolcfedujsavhj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2aHljdHJvbGNmZWR1anNhdmhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyMTYyNTUsImV4cCI6MjA0NDc5MjI1NX0.wxIEtgt3yvStPgw3trYQDMRnXDOIlQgFteZXGbyDb_s";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const listObjects = async () => {
  const { data, error } = await supabase.storage
    .from("mydevspace")
    .list("Resumes/admin1", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

  if (error) {
    console.error("Error listing objects:", error);
    return; 
  }

  console.log("Retrieved objects:", data);

  if (data.length === 0) {
    console.log("No files found in the specified path.");
  }
};

const upsertResume = async () => {
  const fileBuffer = await fs.readFile('C:/Users/cunhn/Github/mydevspace/testResume1.pdf');

  console.log("Fetched file");

  // Specify the correct path including the file name
  const fileName = "Resumes/testResume1.pdf";

  // Upload the file
  const { data, error } = await supabase.storage
    .from("mydevspace")
    .upload(fileName, fileBuffer, {
      cacheControl: "3600",
      upsert: true,
      contentType: 'application/pdf'
    });

  if (error) {
    console.error("Error uploading file:", error); 
    return;
  }

  console.log("Uploaded file data:", data); 

  if (data.length === 0) {
    console.log("No files found in the specified path.");
  }
};

const getPublicUrl = async(resumeFile, display_name) => {
  const { data: urlData} = supabase.storage
    .from('mydevspace')
    .getPublicUrl(`Resumes/${display_name}/${resumeFile.name}`);
  console.log(urlData);
  if (urlError) {
    console.error("Error retrieving public URL:", urlError); 
    return;
  }

  console.log("Uploaded file data:", data); 
  return urlData.publicUrl;
};