import { OnboardingWizard } from "@/components/features/onboarding/OnboardingWizard";
import { LefiLogo } from "@/components/icons/Logo";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20 p-4">
        <div className="mb-8 text-center">
            <Link href="/" className="inline-block mb-2">
                <LefiLogo className="h-20 w-20" />
            </Link>
            <h1 className="text-4xl font-bold font-headline">Welcome to LEFI!</h1>
            <p className="text-muted-foreground">Let's set up your personalized LifeBlocks experience.</p>
        </div>
      <OnboardingWizard />
    </div>
  );
}
