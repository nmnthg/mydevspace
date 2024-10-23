'use client';
import React from 'react'
import { useUser } from '@/context/user.context';

const EditPage = () => {
  const { user } = useUser()

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      <p>This is the edit page for {user.user_metadata.display_name}</p>
      {/* Add your edit form or components here */}
    </div>
  )
}

export default EditPage
