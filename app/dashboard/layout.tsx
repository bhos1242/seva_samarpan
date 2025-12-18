import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardSidebar, MobileSidebar } from "@/components/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect("/auth/login");
  }

  // Redirect to verify OTP if email not verified
  // Skip verification check for OAuth users (Google, GitHub, etc.)
  const isOAuthUser = session.user.provider && session.user.provider !== "credentials";
  if (!session.user.isVerified && !isOAuthUser) {
    redirect("/auth/verify-otp?email=" + encodeURIComponent(session.user.email));
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <DashboardSidebar className="hidden md:flex border-r" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex h-14 items-center gap-2 border-b bg-muted/40 px-6 md:hidden">
          <MobileSidebar />
          <span className="font-semibold">Dashboard</span>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
