"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LefiLogo } from "@/components/icons/Logo";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation"; // Corrected import for App Router

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    // Simulate API call
    console.log("Login submitted:", values);
    toast({
      title: "Login Attempt",
      description: "Simulating login process...",
    });

    // Replace with actual Firebase login logic via Server Action
    // For now, simulate success and redirect to onboarding or dashboard
    // Check if onboarding is complete (this would come from user data)
    const onboardingComplete = false; // Placeholder

    setTimeout(() => {
        toast({
            title: "Login Successful",
            description: "Welcome back!",
        });
        if (onboardingComplete) {
            router.push("/dashboard");
        } else {
            router.push("/auth/onboarding");
        }
    }, 1500);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/30 via-background to-accent/30 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="items-center text-center">
          <Link href="/" className="mb-4">
            <LefiLogo className="h-16 w-16" />
          </Link>
          <CardTitle className="text-3xl font-bold font-headline">Welcome Back!</CardTitle>
          <CardDescription>Log in to your LEFI account to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
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
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>
           <div className="mt-2 text-center text-sm">
            <Link href="#" className="text-xs text-muted-foreground hover:underline">
              Forgot password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
