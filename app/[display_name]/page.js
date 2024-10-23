'use client';
import React from 'react'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import { getUser, getProjects } from '@/lib/supabase';
import Profile from '@/components/profile';

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
        console.error('Error fetching data', error.message);
        setUser(null);
        setProjects(null);
      }
    };

    fetchData();
  }, [params.display_name]);


  return (
    <Profile user={user} />
  )
}

export default ProfilePage;
