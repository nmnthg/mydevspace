'use client';
import React from 'react'
import { useParams } from 'next/navigation'

function ProfilePage() {
  const params = useParams();
  return (
    <div>
      This is the profile page for {params.display_name}
    </div>
  )
}

export default ProfilePage;
