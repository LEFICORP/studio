import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, Target, CheckSquare, CalendarDays } from "lucide-react";

const currentDay = 7; // Example current day of the challenge
const totalDays = 21;
const progressPercentage = (currentDay / totalDays) * 100;

const dailyTasks = [
  { id: 1, description: "Log in to LEFI", completed: true },
  { id: 2, description: "Complete at least one Tier 1 block", completed: true },
  { id: 3, description: "Plan tomorrow's blocks", completed: false },
];

export default function ChallengePage() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline flex items-center">
          <Zap className="mr-3 h-8 w-8 text-primary" /> 21-Day LEFI Challenge
        </h1>
        <Button variant="outline">View Past Progress</Button>
      </div>

      <Card className="shadow-lg mb-8">
        <CardHeader>
          <CardTitle>Your Progress: Day {currentDay} of {totalDays}</CardTitle>
          <CardDescription>Building habits takes consistency. You're doing great!</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="w-full h-4 mb-4" />
          <p className="text-sm text-muted-foreground text-center">{Math.round(progressPercentage)}% complete. Keep pushing!</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Target className="mr-2 h-5 w-5 text-primary"/>Today's Goals (Day {currentDay})</CardTitle>
            <CardDescription>Complete these tasks to mark today as successful.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {dailyTasks.map(task => (
                <li key={task.id} className={`flex items-center p-3 rounded-md border ${task.completed ? 'bg-green-500/10 border-green-500/30' : 'bg-muted/50'}`}>
                  <CheckSquare className={`mr-3 h-5 w-5 ${task.completed ? 'text-green-500' : 'text-muted-foreground'}`} />
                  <span className={`flex-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>{task.description}</span>
                  {!task.completed && <Button size="sm" variant="outline">Mark as Done</Button>}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><CalendarDays className="mr-2 h-5 w-5 text-primary"/>Challenge Overview</CardTitle>
            <CardDescription>A quick look at your 21-day journey.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: totalDays }).map((_, index) => {
                const dayNumber = index + 1;
                const isCompleted = dayNumber < currentDay;
                const isCurrent = dayNumber === currentDay;
                const isFuture = dayNumber > currentDay;
                return (
                  <div 
                    key={dayNumber} 
                    className={`h-10 w-10 rounded-md flex items-center justify-center font-medium border
                      ${isCompleted ? 'bg-green-500 text-white border-green-600' : ''}
                      ${isCurrent ? 'bg-primary text-primary-foreground border-ring animate-pulse' : ''}
                      ${isFuture ? 'bg-muted/30 text-muted-foreground border-border' : ''}
                    `}
                    title={`Day ${dayNumber}`}
                  >
                    {dayNumber}
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Green: Completed, Purple: Current Day, Gray: Upcoming.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
