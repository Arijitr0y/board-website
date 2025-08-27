

import { AdminSidebar } from "@/app/(admin)/_components/sidebar";
import { Header } from "@/app/(admin)/_components/header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminRoleProvider } from "@/context/admin-role-context";
import { ThemeProvider } from "@/components/theme-provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminRoleProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <AdminSidebar />
            <SidebarInset>
              <div className="flex flex-col sm:gap-4 sm:py-4">
                <Header />
                <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                  {children}
                </main>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </AdminRoleProvider>
  );
}
