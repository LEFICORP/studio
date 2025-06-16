import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline">My Quadrant</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Block
        </Button>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>Your daily blocks at a glance. Drag and drop to reorder (coming soon!).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[400px] bg-muted/50 rounded-md flex items-center justify-center border-2 border-dashed border-border">
            <p className="text-muted-foreground">Quadrant view coming soon!</p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Blocks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No upcoming blocks in the next 3 hours.</p>
            {/* Placeholder for upcoming blocks list */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>21-Day Challenge</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Day 1 of 21. Keep it up!</p>
            {/* Placeholder for challenge progress */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button variant="outline">Create Tier 1 Block</Button>
            <Button variant="outline">View Weekly Plan</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
