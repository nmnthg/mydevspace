"use client";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getProjects } from "@/lib/supabase";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

function EditProjects({ display_name }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await getProjects(display_name);
      setProjects(projectsData);
    };
    fetchData();
  }, []);

  if (!projects || projects.length === 0) {
    return <div>No projects available</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <Card className="w-full ">
        <CardHeader className="flex flex-row justify-between items-center texsm font-semibold -mb-4">
        <div>
        <CardTitle>Edit Projects</CardTitle>
        <CardDescription>Update your projects</CardDescription>
        </div>  
          <Button type="button" onClick={() => window.location.href = `/${display_name}/edit/add`}>
            Add Project
          </Button>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-6">
          {projects.map((project) => (
            <Card key={project.name} className="bg-white shadow-lg rounded-lg">
              <CardHeader>
                <Image
                  src={project.preview}
                  alt={project.name}
                  width={400}
                  height={250}
                  className="object-cover rounded-sm h-64 w-full"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-md font-semibold">
                  {project.name}
                </CardTitle>
              </CardContent>
              <CardFooter className="flex justify-between mt-4">
                <Link href={`/${display_name}/edit/${project.id}`}>
                  <Button type="button">Edit</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default EditProjects;
