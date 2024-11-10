'use client'
import ResetPasswordForm from "@/components/auth/reset-password-form";
import React, { useEffect, useState } from "react";
import { useUser } from "@/context/user.context";
import { useRouter } from 'next/navigation';

const ResetPasswordPage = () => {
  const { user, loading } = useUser();
  const router = useRouter(); 

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
       <ResetPasswordForm user={user}/> 
  );
};

export default ResetPasswordPage;
