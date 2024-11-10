"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useUser } from "@/context/user.context";
import EditProject from "@/components/edit/edit-project";

export const runtime = 'edge';

const EditProjectPage = () => {
  const params = useParams();
  const { user } = useUser()

  if (!user) {
    return <div>Login Required</div>;
  }

  return (
    <div>
      <EditProject projectId={params.project_id}/>
    </div>
  )
}

export default EditProjectPage
