'use client';
import React from 'react'
import { useUser } from '@/context/user.context';
import AddProject from '@/components/edit/add-project';

export const runtime = 'edge';

const AddPage = () => {
  const { user } = useUser()
  

  if (!user) {
    return <div>Login Required</div>;
  }
  
  return (
    <div>
      <AddProject display_name={user.user_metadata.display_name}/>
    </div>
  )
}

export default AddPage;