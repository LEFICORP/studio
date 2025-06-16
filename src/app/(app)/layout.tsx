import { AppLayout } from "@/components/layout/AppLayout";

export default function AuthenticatedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Here you would typically add authentication checks.
  // For now, we assume the user is authenticated if they reach this layout.
  return <AppLayout>{children}</AppLayout>;
}
