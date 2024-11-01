'use client';
import React from 'react'
import { useUser } from '@/context/user.context';
import EditProfile from '@/components/edit_profile';

const EditPage = () => {
  const { user } = useUser()
  

  if (!user) {
    return <div>Loading...</div>;
  }

  

  return (
    <EditProfile display_name={user.user_metadata.display_name} />
  )
}

export default EditPage
