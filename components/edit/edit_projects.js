"use client";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getProjects, updateProject, uploadProjectCover } from "@/lib/supabase";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

function EditProjects({ display_name }) {
  const [projects, setProjects] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await getProjects(display_name);
      setProjects(projectsData);
    };
    fetchData();
  }, []);

  const handleProjectUpdate = async (projectData) => {
    try {
      const newPreview = projectData.preview ? 
        await uploadProjectCover(projectData.preview, projectData.id) : projectData.oldPreview
      const updatedData = {
        name: projectData.name,
        preview: newPreview,
        description: projectData.description,
        url: projectData.url
       };
       console.log('Updating project with data', updatedData);
      await updateProject(projectData.id, updatedData);
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!projects || projects.length === 0) {
    return <div>No projects available</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      {projects.map((project) => (
        <Card key={project.id} className="w-full mb-4">
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => {
              e.preventDefault();
              const projectData = {
                id: project.id,
                name: e.target.name.value || project.name,
                description: e.target.description.value || project.description,
                url: e.target.url.value || project.url,
                oldPreview: project.preview,
                preview: e.target.preview.files[0] || null
              };
              console.log('Handling update for ', projectData);
              handleProjectUpdate(projectData);
            }} className="mt-6">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`name-${project.id}`}>Name</Label>
                  <Input
                    id={`name-${project.id}`}
                    name="name"
                    type="text"
                    defaultValue={project.name}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`description-${project.id}`}>Description</Label>
                  <Input
                    id={`description-${project.id}`}
                    name="description"
                    type="text"
                    defaultValue={project.description}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`url-${project.id}`}>URL</Label>
                  <Input
                    id={`url-${project.id}`}
                    name="url"
                    type="text"
                    defaultValue={project.url}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`file-${project.id}`}>Preview Image</Label>
                  <Input
                    id={`preview-${project.id}`}
                    name='preview'
                    type="file"
                    accept="image/jpg"
                  />
                </div>
              </div>
              <Button type="submit" className="mt-4">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
  
export default EditProjects;

