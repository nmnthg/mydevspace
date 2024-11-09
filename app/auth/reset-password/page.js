'use client'
import ResetPasswordForm from "@/components/auth/reset-password-form";
import React from "react";
import { useEffect } from "react";
import { useUser } from "@/context/user.context";
import { useRouter } from 'next/navigation';

const ResetPasswordPage = () => {
  const { user } = useUser()
  const router = useRouter(); 

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user, router]);

  if (!user) {
    return null; 
  }
  
  return (
       <ResetPasswordForm/> 
  );
};

export default ResetPasswordPage;
