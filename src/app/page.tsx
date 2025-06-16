import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { CheckCircle, Zap, Users, CalendarDays } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/30 via-background to-accent/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Organize Your Life, Effortlessly with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent">LEFI</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    LEFI LifeBlocks helps you manage your time, build healthy habits, and achieve your goals with an intuitive and personalized system.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
                    <Link href="/auth/signup">Get Started Free</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="shadow-sm hover:shadow-accent/40 transition-shadow">
                    <Link href="/features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                data-ai-hint="productivity app schedule"
                width="600"
                height="400"
                alt="LEFI App Screenshot"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Key Features</div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Everything You Need to Succeed</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From personalized onboarding to social sharing, LEFI provides a comprehensive toolkit for better time management.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 pt-12">
              {[
                { icon: <Zap className="h-8 w-8 text-primary" />, title: "Interactive Onboarding", description: "Personalize your LEFI experience from day one with our guided wizard." },
                { icon: <CalendarDays className="h-8 w-8 text-primary" />, title: "Tiered Block Management", description: "Organize tasks into essential, responsibilities, self-improvement, and leisure." },
                { icon: <CheckCircle className="h-8 w-8 text-primary" />, title: "21-Day Challenge", description: "Build lasting habits with our guided challenge and progress tracking." },
                { icon: <Users className="h-8 w-8 text-primary" />, title: "Social Linking", description: "Connect with friends, share templates, and support each other's goals." },
                { icon: <Image src="https://placehold.co/32x32.png" data-ai-hint="template professional" width="32" height="32" alt="Pro Templates" className="text-primary" />, title: "Professional Templates", description: "Access pre-built templates for various professions and work schedules." },
                { icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7h18"/><path d="M3 12h18"/><path d="M3 17h18"/><path d="M12 3v18"/></svg>, title: "Quadrant Display", description: "Visualize your day and week with an intuitive grid-based schedule." },
              ].map((feature) => (
                <div key={feature.title} className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-md hover:shadow-lg transition-shadow">
                  <div className="mb-4 rounded-full bg-primary/20 p-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold font-headline mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-headline tracking-tighter md:text-4xl/tight">Ready to Take Control of Your Time?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of users transforming their productivity and achieving their goals with LEFI LifeBlocks.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Button asChild size="lg" className="w-full shadow-lg hover:shadow-primary/50 transition-shadow">
                <Link href="/auth/signup">Sign Up Now</Link>
              </Button>
              <p className="text-xs text-muted-foreground">
                Start with a free plan. No credit card required.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} LEFI LifeBlocks. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
