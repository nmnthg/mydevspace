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
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Image from "next/image";

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

  if (!projects || projects.length === 0) {
    return <div>No projects available</div>;
  }

  return (
    <div className="container mx-auto">
      <h3 className="text-xl font-semibold">Projects</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mr-20">
        {projects.map((project) => (
          <Card key={project.name} className="bg-white shadow-lg rounded-lg">
            <CardHeader>
              <Image
                src={project.preview}
                alt={project.name}
                width={400}
                height={250}
                className="object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg font-semibold">
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
    </div>
  );
}

export default EditProjects;
