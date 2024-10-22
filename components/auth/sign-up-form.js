'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { emailSignUp, emailSignIn, getSession } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    const router = useRouter();
    const { toast } = useToast();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (password !== confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match",
                variant: "destructive",
            });
            return;
        }

        try {
            const signInData = await emailSignUp(email, password, displayName);
            toast({
                title: "Success",
                description: "Account created successfully and signed in.",
            });

            resetFormFields();
            
            // Get the session and redirect
            const session = await getSession();
            if (session && mounted) {
                router.push(`/${session.user.user_metadata.display_name}`);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error.message || "An unexpected error occurred",
                variant: "destructive",
            });
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value});
    }
    
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create a new account</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="displayName">Display Name</Label>
                            <Input id="displayName" name="displayName" value={displayName} onChange={handleChange} required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" value={email} onChange={handleChange} required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" value={password} onChange={handleChange} required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" name="confirmPassword" type="password" value={confirmPassword} onChange={handleChange} required />
                        </div>
                    </div>
                    <CardFooter className="flex justify-between mt-4">
                        <Button type="submit">Sign Up</Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    )
}

export default SignUpForm;