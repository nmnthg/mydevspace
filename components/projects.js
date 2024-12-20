"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // Assuming shadcn uses these components

function Projects({ projects }) {
  if (!projects || projects.length === 0) {
    return <div>No projects available</div>;
  }

  return (
    <div className="container mx-auto">
      <h3 className="text-xl font-semibold mx-10">Projects</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mx-10 2xl:mr-20">
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
              <CardTitle className="texsm font-semibold">
                {project.name}
              </CardTitle>
              <CardDescription className="mb-4 text-gray-600">
                {project.description}
              </CardDescription>
              <Link
                href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Project
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Projects;
