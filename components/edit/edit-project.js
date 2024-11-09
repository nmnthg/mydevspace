"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { updateProject, getProject, uploadProjectCover, addProject, deleteProject} from "@/lib/supabase";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [projectId]);

  const handleSaveSubmit = async (event) => {
    event.preventDefault();
    if (!project) {
      toast({
        title: "Error",
        description: "Project data is not available",
      });
      return;
    }
    try {
      const newPreview = file
        ? await uploadProjectCover(file, project.id)
        : project.preview;
      const newProjectData = {
        name: name || project.name,
        description: description || project.description,
        url: url || project.url,
        preview: newPreview,
        id: projectId,
      };
      console.log("Attempting to update project with", newProjectData);
      await updateProject(newProjectData);
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
      setTimeout(() => {
        window.location.href = `/${project.display_name}/edit`;
      }, 1500);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteSubmit = async() => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject(projectId);
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      setTimeout(() => {
        window.location.href = `/${project.display_name}/edit`;
      }, 1500);
    }
  }

  const projectExists = project !== null;

  return (
    <div className="container mx-auto mt-10 p-4 max-w-4xl">
      {projectExists ? (
        <Card key={project.id} className="w-full mb-4">
          <CardContent>
            <form className="mt-6">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`name-${project.id}`}>Name</Label>
                  <Input
                    id={`name-${project.id}`}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    defaultValue={project.name}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`description-${project.id}`}>
                    Description
                  </Label>
                  <Input
                    id={`description-${project.id}`}
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    defaultValue={project.description}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`url-${project.id}`}>URL</Label>
                  <Input
                    id={`url-${project.id}`}
                    type="url"
                    onChange={(e) => setUrl(e.target.value)}
                    defaultValue={project.url}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`preview-${project.id}`}>
                    Upload Preview Image
                  </Label>
                  <Input
                    id={`preview-${project.id}`}
                    type="file"
                    accept="image/png"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <div>
                  <Image
                    src={project.preview}
                    alt={project.name}
                    width={400}
                    height={250}
                    className="object-cover rounded-sm"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between mt-4">
              <div>
                <Button type="button" onClick={handleSaveSubmit}>
                  Save Changes
                </Button>
              </div>
              <div>
                <Button
                  variant="destructive"
                  type="button"
                  onClick={handleDeleteSubmit}
                >
                  Delete Project
                </Button>
              </div>
          </CardFooter>
        </Card>
      ) : (
        <p>Loading project data...</p>
      )}
    </div>
  );
}

export default EditProject;
