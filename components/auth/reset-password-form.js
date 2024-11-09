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
  const { toast } = useToast();

  const handlePasswordResetSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email",
      });
      return;
    }

    try {
      await sendResetPasswordEmail(email);
      toast({
        title: "Success",
        description: "A password reset link will be sent to your email if it matches a user in the system.",
      });
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
                <Label htmlFor="email">Enter your email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row justify-between mt-6 px-2">
            <Button type="submit">Reset Password</Button>
            <Link
              href="/auth"
              className="text-blue-600 text-sm no-underline flex items-center"
            >
              Know your password?
            </Link>
          </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;
