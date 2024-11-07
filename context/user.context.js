'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);   
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);

      // Handle initial session
      if (event === 'INITIAL_SESSION') {
        setUser(session?.user ?? null); // Set user from session if available
        setLoading(false);              // End loading after initial session check
      }

      // Handle sign-in event
      else if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null); // Update the user when signed in
        setLoading(false);              // Update loading state if needed
      }

      // Handle sign-out event
      else if (event === 'SIGNED_OUT') {
        setUser(null);                  // Clear the user when signed out
        setLoading(false);              // No longer loading after sign-out
      }
    });

    // Cleanup subscription on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);


  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
