'use client';
import React from 'react'
import { useUser } from '@/context/user.context';
import EditProfile from '@/components/edit/edit-profile';
import EditProjects from '@/components/edit/edit-projects';

const EditPage = () => {
  const { user } = useUser()
  

  if (!user) {
    return <div>Login Required</div>;
  }

  

  return (
    <div>
      <EditProfile display_name={user.user_metadata.display_name} />
      <EditProjects display_name={user.user_metadata.display_name} />
    </div>
  )
}

export default EditPage
