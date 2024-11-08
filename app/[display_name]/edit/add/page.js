'use client';
import React from 'react'
import { useUser } from '@/context/user.context';
import AddProject from '@/components/edit/add-project';

const AddPage = () => {
  const { user } = useUser()
  

  if (!user) {
    return <div>Login Required</div>;
  }
  
  return (
    <div>
      <AddProject user={user}/>
    </div>
  )
}

export default AddPage;