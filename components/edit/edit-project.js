"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { updateProject, getProject, uploadProjectCover } from "@/lib/supabase";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

function EditProject({ projectId }) {
  const [project, setProject] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [url, setUrl] = useState(null);
  const [file, setFile] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const project = await getProject(projectId);
        setProject(project);
        setName(project.name);
        setDescription(project.description);
        setUrl(project.url);
        // Assuming project.preview is the initial preview image
        // setFile(project.preview); // Uncomment if you want to set the file as well
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [projectId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!project) {
      toast({
        title: "Error",
        description: "User data is not available.",
      });
      return;
    }
    try {
      const newPreview = file ? await uploadProjectCover(file, project.id) : project.preview;
      const newProjectData = {
        name: name || project.name,
        description: description || project.description,
        url: url || project.url,
        preview: newPreview,
        id: projectId
      }
      await updateProject(newProjectData);
      toast({
        title: "Success",
        description: "User profile updated successfully",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const projectExists = project !== null;

  return (
    <div className="container mx-auto mt-10 p-4">
        {projectExists ? (
          <Card key={project.id} className="w-full mb-4">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <Image
                  src={project.preview}
                  alt={project.name}
                  width={400}
                  height={250}
                  className="object-cover rounded-t-lg"
                />
            </CardHeader>
            <CardContent>
              <form className="mt-6" onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`name-${project.id}`}>Name</Label>
                    <Input
                      id={`name-${project.id}`}
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`description-${project.id}`}>Description</Label>
                    <Input
                      id={`description-${project.id}`}
                      type="text"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`url-${project.id}`}>URL</Label>
                    <Input
                      id={`url-${project.id}`}
                      type="url"
                      onChange={(e) => setUrl(e.target.value)}
                      value={url}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor={`preview-${project.id}`}>Upload Preview Image</Label>
                    <Input
                      id={`preview-${project.id}`}
                      type="file"
                      accept="image/png"
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
        ) : (
          <p>Loading project data...</p>
        )}
    </div>
  );
}

export default EditProject;
