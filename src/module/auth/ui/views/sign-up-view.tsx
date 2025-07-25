"use client";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
  confirmPassword: z.string().min(1, { message: "Password is required" })
}).refine((data)=> data.password === data.confirmPassword, { message: "Passwords don't match",
path: ["confirmPassword"],
});
 
export const SignUpView = () => {
const router = useRouter(); 
 const [pending , setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "", 
    },
  });
 const onSubmit = async (data: z.infer<typeof formSchema>) => {
  setError(null);
  setPending(true);
  authClient.signUp.email(
    {
    name: data.name,
    email: data.email,
    password: data.password,
    callbackURL: "/",
  },
{
   onSuccess: () => {
    setPending(false);
     router.push("/");
   },
   onError: ({error}) => {
     setError(error.message );
     setPending(false);
   }
 }
 
);
}
 const onSocial = async (provider: "github" | "google") => {
    setError(null);
    setPending(true);
    authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
        
        },
        onError: ({ error }) => {
          setError(error.message);
          setPending(false);
        }
      }
    );
  }
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Let&apos; get started</h1>
                  <p className="text-muted-foreground text-balance">
                    Create a your account
                  </p>
                </div>
                 <div className="grid gap-3"> 
                  <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="m@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="*******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    
                  )}
                />
                        <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="*******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    
                  )}
                />
</div>
                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}

                <Button 
                disabled={pending}
                className="w-full" type="submit">
                  Sign Up
                </Button>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:flex after:items-center after:top-1/2 after:border-t after:border-border">
                  <span className="relative z-10 bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                  onClick={
                      () => onSocial("google")}
                   disabled={pending}
                  className="w-full" variant="outline">
                    <FaGoogle/>
                  </Button>
                  <Button 
                  onClick={
                      () => onSocial("github" )}
                   disabled={pending}
                  className="w-full" variant="outline">
                   <FaGithub/>
                  </Button>
                </div>

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="underline underline-offset-4"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </form>
          </Form>

         
          <div className="relative hidden flex-col items-center justify-center gap-y-4 bg-radial from-sidebar-accent to-sidebar md:flex">
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-[92px] w-[92px]"
            />
            <p className="text-2xl font-semibold text-white">Meet.AI</p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-muted-foreground text-sm">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4">
          Privacy Policy
        </a>
        .
      </div>
    </div>
    
  );
};


