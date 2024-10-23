"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getUser, getProjects } from "@/lib/supabase";
import Profile from "@/components/profile";
import Projects from "@/components/projects";

function ProfilePage() {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser(params.display_name);
        setUser(user);
        const projects = await getProjects(params.display_name);
        setProjects(projects);
      } catch (error) {
        console.error("Error fetching data", error.message);
        setUser(null);
        setProjects(null);
      }
    };

    fetchData();
  }, [params.display_name]);

  return (
    <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
      <div className="col-span-1">
        <Profile user={user} />
      </div>
      <div className="col-span-2">
        <Projects projects={projects} />
      </div>
    </div>
  );
}

export default ProfilePage;
