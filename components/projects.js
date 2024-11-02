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
              <CardDescription className="mb-4 text-gray-600">
                {project.description}
              </CardDescription>
              <Link
                href={project.url}
                className="text-blue-600 hover:underline"
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
