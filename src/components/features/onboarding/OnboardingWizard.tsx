"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Bot, Languages, Briefcase, Moon, Clock, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const onboardingSchemaStep1 = z.object({
  language: z.string().min(1, "Please select a language."),
  usageMode: z.enum(["comando", "productivo", "ligero", "casual"], {
    required_error: "Please select a usage mode.",
  }),
});

const onboardingSchemaStep2 = z.object({
  worksThisWeek: z.enum(["yes", "no"], { required_error: "Please answer this question." }),
  sleepTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)."),
});

// Combine schemas for final submission if needed, or handle step-by-step
const fullOnboardingSchema = onboardingSchemaStep1.merge(onboardingSchemaStep2);
type OnboardingFormValues = z.infer<typeof fullOnboardingSchema>;

const steps = [
  { id: 1, title: "Welcome to LEFI!", description: "Let's personalize your experience.", schema: onboardingSchemaStep1, icon: <Bot className="h-6 w-6" /> },
  { id: 2, title: "Your Routine", description: "Tell us a bit about your schedule.", schema: onboardingSchemaStep2, icon: <Briefcase className="h-6 w-6" /> },
  { id: 3, title: "All Set!", description: "You're ready to start organizing.", icon: <CheckCircle className="h-6 w-6" /> },
];

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const { toast } = useToast();

  const currentSchema = steps[currentStep]?.schema;
  const form = useForm<Partial<OnboardingFormValues>>({
    resolver: currentSchema ? zodResolver(currentSchema) : undefined,
    mode: "onChange", // Validate on change for better UX
  });

  const { control, handleSubmit, trigger, getValues } = form;

  const handleNext = async () => {
    if (steps[currentStep].id === steps.length) { // Final step (All Set!)
      // Simulate saving all data
      const allData = getValues();
      console.log("Onboarding complete. Data:", allData);
      toast({
        title: "Onboarding Complete!",
        description: "Redirecting you to the dashboard...",
      });
      // Here, you would call a server action to save data to Firestore
      // For example: await saveOnboardingData(allData);
      router.push("/dashboard");
      return;
    }

    const isValid = await trigger();
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const progressValue = ((currentStep + 1) / steps.length) * 100;

  return (
    <Card className="w-full max-w-lg shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
            {steps[currentStep].icon}
            <CardTitle className="text-2xl font-headline">{steps[currentStep].title}</CardTitle>
        </div>
        <CardDescription>{steps[currentStep].description}</CardDescription>
        <Progress value={progressValue} className="mt-2" />
      </CardHeader>
      <CardContent className="min-h-[250px]">
        <Form {...form}>
          <form onSubmit={handleSubmit(handleNext)} className="space-y-6">
            {steps[currentStep].id === 1 && (
              <>
                <FormField
                  control={control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Languages className="h-4 w-4 text-muted-foreground" />Language</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your preferred language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="usageMode"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="flex items-center gap-2"><Bot className="h-4 w-4 text-muted-foreground" />How will you primarily use LEFI?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="comando" />
                            </FormControl>
                            <FormLabel className="font-normal">Comando (Focused, structured)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="productivo" />
                            </FormControl>
                            <FormLabel className="font-normal">Productivo (Goal-oriented)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="ligero" />
                            </FormControl>
                            <FormLabel className="font-normal">Ligero (Flexible, adaptive)</FormLabel>
                          </FormItem>
                           <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="casual" />
                            </FormControl>
                            <FormLabel className="font-normal">Casual (Occasional planning)</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {steps[currentStep].id === 2 && (
              <>
                <FormField
                  control={control}
                  name="worksThisWeek"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-muted-foreground" />Do you have fixed work blocks this week?</FormLabel>
                       <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex items-center space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal">Yes</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="sleepTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Moon className="h-4 w-4 text-muted-foreground" />Typical bedtime (e.g., 22:30)</FormLabel>
                      <FormControl>
                        <Input type="time" placeholder="HH:MM" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 {/* A field for current time might not be ideal as it can be derived.
                     But if strictly required by prompt:
                <FormField
                  control={control}
                  name="currentTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" />Current time (will be auto-filled if possible)</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                */}
              </>
            )}
             {steps[currentStep].id === 3 && (
                <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <p className="text-lg">You&apos;re all set up!</p>
                    <p className="text-muted-foreground">
                        Your personalized LEFI experience is ready.
                        We&apos;ve generated your first daily quadrant and activated the 21-day challenge.
                    </p>
                </div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={handleNext}>
          {steps[currentStep].id === steps.length ? "Go to Dashboard" : "Next"}
          {steps[currentStep].id < steps.length && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
}
