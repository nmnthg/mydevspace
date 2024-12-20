"use client";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { updateProfile, getUser, uploadResume } from "@/lib/supabase";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

function EditProfile({ display_name }) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [title, setTitle] = useState(null);
  const [github, setGithub] = useState(null);
  const [linkedin, setLinkedin] = useState(null);
  const [file, setFile] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser(display_name);
        setUser(user);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      toast({
        title: "Error",
        description: "User data is not available.",
      });
      return;
    }
    try {
      const newResumeUrl = file ? await uploadResume(file, user.display_name) : user.resume;
      const newProfileData = {
        name: name || user.name,
        title: title || user.title,
        github: github || user.github,
        linkedin: linkedin || user.linkedin,
        newResumeUrl,
        display_name
      }
      await updateProfile(newProfileData);
      toast({
        title: "Success",
        description: "User profile updated successfully",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const userExists = user !== null;

  return (
    <div className="container mx-auto mt-10 p-4 max-w-4xl">
      <Card className="w-full ">
        <CardHeader className="texsm font-semibold">
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="mt-6">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={userExists ? user.name : ""}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  defaultValue={userExists ? user.title : ""}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  type="url"
                  onChange={(e) => setGithub(e.target.value)}
                  defaultValue={userExists ? user.github : ""}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  type="url"
                  onChange={(e) => setLinkedin(e.target.value)}
                  defaultValue={userExists ? user.linkedin : ""}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="file">Upload New Resume</Label>
                <Input
                  id="file"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between mt-4">
          <Button type="button" onClick={handleSubmit}>
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default EditProfile;
