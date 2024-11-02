'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { emailSignIn } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const signInData = await emailSignIn(email, password);
            toast({
                title: "Success",
                description: "Signed in successfully.",
            });

            if (signInData.user?.user_metadata?.display_name) {
                router.push(`/${signInData.user.user_metadata.display_name}`);
            } else {
                // Fallback if display_name is not available
                router.push('/dashboard');
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
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Access your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="sign-in-email" name="email" type="email" value={email} onChange={handleChange} required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="sign-in-password" name="password" type="password" value={password} onChange={handleChange} required />
                        </div>
                    </div>
                    <CardFooter className="flex justify-between mt-4">
                        <Button type="submit">Sign In</Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    )
}

export default SignInForm;
