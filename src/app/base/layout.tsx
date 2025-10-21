import type { Metadata } from "next";

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/nav/app-sidebar";

export const metadata: Metadata = {
  title: "EvolveX | Base",
  description: "Evolvex dev team wiki base",
};

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppSidebar />
        <SidebarInset>
        <main className="min-w-full px-4 min-h-screen">
            <SidebarTrigger className="-ml-1 mb-4" />
            {children}
        </main>
        </SidebarInset>
      </body>
    </html>
  );
}
