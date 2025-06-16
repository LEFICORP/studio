"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings as SettingsIcon, User, Bell, Palette, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  bio: z.string().max(160).optional(),
});

const preferencesSchema = z.object({
  language: z.string(),
  usageMode: z.enum(["comando", "productivo", "ligero", "casual"]),
  sleepTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)."),
  worksThisWeek: z.boolean(),
  darkMode: z.boolean(),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PreferencesFormValues = z.infer<typeof preferencesSchema>;

// Dummy data, replace with actual user data
const currentUser = {
  name: "Lefi User",
  email: "user@lefi.app",
  avatarUrl: "https://placehold.co/100x100.png",
  bio: "Passionate about productivity and organization!",
  language: "en",
  usageMode: "productivo" as const,
  sleepTime: "23:00",
  worksThisWeek: true,
  darkMode: false,
  emailNotifications: true,
  pushNotifications: false,
};

export default function SettingsPage() {
  const { toast } = useToast();

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
      avatarUrl: currentUser.avatarUrl,
      bio: currentUser.bio,
    },
  });

  const preferencesForm = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      language: currentUser.language,
      usageMode: currentUser.usageMode,
      sleepTime: currentUser.sleepTime,
      worksThisWeek: currentUser.worksThisWeek,
      darkMode: currentUser.darkMode,
      emailNotifications: currentUser.emailNotifications,
      pushNotifications: currentUser.pushNotifications,
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    console.log("Profile updated:", data);
    toast({ title: "Profile Updated", description: "Your profile information has been saved." });
  }

  function onPreferencesSubmit(data: PreferencesFormValues) {
    console.log("Preferences updated:", data);
    toast({ title: "Preferences Updated", description: "Your app preferences have been saved." });
    // Handle dark mode toggle if needed, e.g., using next-themes
    if (data.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center mb-6">
        <SettingsIcon className="mr-3 h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold font-headline">Settings</h1>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="profile"><User className="mr-2 h-4 w-4" />Profile</TabsTrigger>
          <TabsTrigger value="preferences"><Palette className="mr-2 h-4 w-4" />Preferences</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4" />Notifications</TabsTrigger>
          <TabsTrigger value="security"><Shield className="mr-2 h-4 w-4" />Account</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <FormField
                    control={profileForm.control}
                    name="avatarUrl"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={field.value || undefined} alt={profileForm.getValues("name")} data-ai-hint="person face" />
                          <AvatarFallback>{profileForm.getValues("name")?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                        <FormLabel>Avatar URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/avatar.png" {...field} />
                        </FormControl>
                         <FormDescription>Enter a URL for your profile picture.</FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} readOnly disabled />
                        </FormControl>
                        <FormDescription>Email cannot be changed.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Input placeholder="Tell us a little about yourself" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={profileForm.formState.isSubmitting}>Save Profile Changes</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>App Preferences</CardTitle>
              <CardDescription>Customize your LEFI experience.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...preferencesForm}>
                <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-8">
                  <FormField
                    control={preferencesForm.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={preferencesForm.control}
                    name="usageMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usage Mode</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select usage mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="comando">Comando</SelectItem>
                            <SelectItem value="productivo">Productivo</SelectItem>
                            <SelectItem value="ligero">Ligero</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={preferencesForm.control}
                    name="sleepTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Typical Bedtime</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={preferencesForm.control}
                    name="worksThisWeek"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">Fixed Work Blocks This Week</FormLabel>
                            <FormDescription>
                                Do you have scheduled work this week?
                            </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={preferencesForm.control}
                    name="darkMode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">Dark Mode</FormLabel>
                            <FormDescription>
                                Enable dark theme for the app.
                            </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={preferencesForm.formState.isSubmitting}>Save Preferences</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how you receive updates from LEFI.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     <Form {...preferencesForm}> {/* Re-using form for these fields */}
                        <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-8">
                             <FormField
                                control={preferencesForm.control}
                                name="emailNotifications"
                                render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Email Notifications</FormLabel>
                                        <FormDescription>
                                            Receive important updates and summaries via email.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={preferencesForm.control}
                                name="pushNotifications"
                                render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Push Notifications</FormLabel>
                                        <FormDescription>
                                            Get real-time alerts for reminders and challenges.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={preferencesForm.formState.isSubmitting}>Save Notification Settings</Button>
                        </form>
                     </Form>
                </CardContent>
             </Card>
        </TabsContent>
         <TabsContent value="security">
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Account & Security</CardTitle>
                    <CardDescription>Manage your account settings and security options.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium mb-2">Change Password</h3>
                        <p className="text-sm text-muted-foreground mb-3">It's a good idea to use a strong password that you're not using elsewhere.</p>
                        <Button variant="outline">Change Password</Button>
                    </div>
                     <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-2 text-destructive">Delete Account</h3>
                        <p className="text-sm text-muted-foreground mb-3">Permanently delete your LEFI account and all associated data. This action cannot be undone.</p>
                        <Button variant="destructive">Delete My Account</Button>
                    </div>
                </CardContent>
             </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
