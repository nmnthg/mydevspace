'use client'
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { sendResetPasswordEmail } from "@/lib/supabase";
import Link from "next/link";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();

  const handlePasswordResetSubmit = async (event) => {
    event.preventDefault();

    if (!password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please enter your password and confirm it",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        description: "Passwords do not match",
      });
      return;
    }

    try {
      await sendResetPasswordEmail(email);
      toast({
        title: "Success",
        description: "Password has been reset",
      });
      setTimeout(() => {
        window.location.href = "/auth";
      }, 1500);
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4 max-w-2xl">
      <Card className="w-full mb-4">
        <CardContent>
          <form className="mt-6" onSubmit={handlePasswordResetSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Enter your new password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm your new password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row justify-between mt-6 px-2">
              <Button type="submit">Reset Password</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;
