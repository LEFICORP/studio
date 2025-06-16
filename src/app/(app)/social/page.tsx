"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Link2, Share2, UserPlus, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const currentUserCode = "LFUSER-XYZ123"; // Example user code

interface Friend {
  id: string;
  name: string;
  avatarUrl?: string;
  sharedTemplates: number;
  friendshipLevel: number;
}

const dummyFriends: Friend[] = [
  { id: "friend1", name: "Alex Johnson", avatarUrl: "https://placehold.co/100x100.png", dataAiHint: "person portrait", sharedTemplates: 3, friendshipLevel: 2 },
  { id: "friend2", name: "Maria Garcia", avatarUrl: "https://placehold.co/100x100.png", dataAiHint: "woman smiling", sharedTemplates: 1, friendshipLevel: 1 },
];

export default function SocialPage() {
  const [friendCode, setFriendCode] = useState("");
  const { toast } = useToast();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentUserCode);
    toast({ title: "Copied!", description: "Your friend code has been copied to the clipboard." });
  };

  const handleAddFriend = () => {
    if (!friendCode) {
      toast({ title: "Error", description: "Please enter a friend code.", variant: "destructive" });
      return;
    }
    // Simulate API call
    toast({ title: "Connecting...", description: `Attempting to connect with code: ${friendCode}` });
    console.log("Adding friend with code:", friendCode);
    setFriendCode("");
    // Add friend to list or show pending request
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline flex items-center">
          <Users className="mr-3 h-8 w-8 text-primary" /> Social Hub
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center"><Share2 className="mr-2 h-5 w-5 text-primary" />Share Your Code</CardTitle>
            <CardDescription>Share this code with friends to connect on LEFI.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Input type="text" value={currentUserCode} readOnly className="font-mono text-lg bg-muted" />
            <Button onClick={handleCopyCode} variant="outline" size="icon" aria-label="Copy code">
              <Copy className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center"><UserPlus className="mr-2 h-5 w-5 text-primary" />Connect with a Friend</CardTitle>
            <CardDescription>Enter your friend's unique code to send a connection request.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Input 
              type="text" 
              placeholder="Enter friend's code (e.g., LFUSER-ABC789)" 
              value={friendCode}
              onChange={(e) => setFriendCode(e.target.value)}
            />
            <Button onClick={handleAddFriend}>
              <Link2 className="mr-2 h-4 w-4" /> Add
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Your Connections</CardTitle>
          <CardDescription>Manage your LEFI friends and shared templates.</CardDescription>
        </CardHeader>
        <CardContent>
          {dummyFriends.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">You haven't connected with any friends yet. Share your code or add a friend to get started!</p>
          ) : (
            <ul className="space-y-4">
              {dummyFriends.map(friend => (
                <li key={friend.id} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={friend.avatarUrl} alt={friend.name} data-ai-hint={friend.avatarUrl ? undefined : "person initial"}/>
                      <AvatarFallback>{friend.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{friend.name}</p>
                      <p className="text-sm text-muted-foreground">Level {friend.friendshipLevel} Friendship</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{friend.sharedTemplates} Shared Templates</p>
                    <Button variant="link" size="sm" className="p-0 h-auto text-primary">Manage</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
