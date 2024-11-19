"use client";
import { useState } from "react";
import { addProject } from "@/lib/supabase";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

function AddProject({display_name}) {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [url, setUrl] = useState(null);
  const [preview, setPreview] = useState(null);
  const { toast } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !description || !url || !preview) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
      });
      return;
    }

    try {
      const newProjectData = {
        name,
        description,
        url,
        display_name,
        preview,
      };
      console.log("Attempting to create project with", newProjectData);
      await addProject(newProjectData);
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      setTimeout(() => {
        window.location.href = `/${display_name}/edit`;
      }, 1500);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4 max-w-4xl">
      <Card key="id" className="w-full mb-4">
        <CardContent>
          <form className="mt-6">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="preview">Upload Preview Image</Label>
                <Input
                  id="preview"
                  type="file"
                  accept="image/png"
                  onChange={(e) => setPreview(e.target.files[0])}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between mt-4">
          <div>
            <Button type="button" onClick={handleSubmit}>
              Save Changes
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AddProject;
