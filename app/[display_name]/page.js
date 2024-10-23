'use client';
import React from 'react'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

function ProfilePage() {
  const params = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Query the Users table for the matching display_name
        const { data, error } = await supabase
          .from('Users')
          .select('*')
          .eq('display_name', params.display_name)

        if (error) throw error;

        // Check if any user was found
        if (data && data.length > 0) {
          setUser(data[0]);
          console.log(data[0]);
        } else {
          console.log(`user ${params.display_name} not found`);
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error.message);
        setUser(null);
      }
    };

    fetchUser();
  }, [params.display_name]);

  return (
    <div>
      This is the profile page for {params.display_name}
    </div>
  )
}

export default ProfilePage;
