"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import { LefiLogo } from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  CalendarCheck,
  Zap,
  Users,
  Briefcase,
  Settings,
  LogOut,
  Bot,
} from "lucide-react";

// Placeholder for auth state, replace with actual context/hook
const useAuth = () => ({
  user: { name: "Lefi User", email: "user@lefi.app", avatarUrl: "" },
  logout: () => { /* console.log("Logged out from AppLayout"); */ }, // Removed for production
});

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
    { href: "/blocks", label: "My Blocks", icon: <CalendarCheck /> },
    { href: "/challenge", label: "21-Day Challenge", icon: <Zap /> },
    { href: "/social", label: "Social Hub", icon: <Users /> },
    { href: "/professional", label: "Pro Templates", icon: <Briefcase /> },
  ];

  const bottomNavItems = [
    { href: "/settings", label: "Settings", icon: <Settings /> },
  ];

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <LefiLogo className="h-8 w-8" />
              <span className="font-bold text-lg font-headline">LEFI</span>
            </Link>
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <ScrollArea className="flex-grow">
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={{ children: item.label, side: "right", align:"center" }}
                  >
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
             <div className="p-4 mt-auto group-data-[collapsible=icon]:hidden">
                <div className="p-3 rounded-lg bg-primary/20 border border-primary/30 flex items-start gap-3">
                    <Bot className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <p className="font-semibold text-sm text-primary-foreground/90">Meet Lefi!</p>
                        <p className="text-xs text-primary-foreground/70">Your personal assistant to guide you through your day.</p>
                         <Button variant="link" size="sm" className="p-0 h-auto text-primary mt-1">
                            Ask Lefi
                        </Button>
                    </div>
                </div>
            </div>
          </SidebarContent>
        </ScrollArea>
        <SidebarFooter className="p-2 border-t border-sidebar-border">
           <SidebarMenu>
             {bottomNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={{ children: item.label, side: "right", align:"center" }}
                  >
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            <SidebarMenuItem>
                <SidebarMenuButton onClick={logout} tooltip={{children: "Log Out", side: "right", align:"center"}}>
                    <LogOut />
                    <span>Log Out</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
           </SidebarMenu>
          <div className="flex items-center gap-2 p-2 mt-2 group-data-[collapsible=icon]:justify-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person initial"/>
              <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-sm font-medium text-sidebar-foreground">{user.name}</span>
              <span className="text-xs text-sidebar-foreground/70">{user.email}</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="min-h-screen">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
