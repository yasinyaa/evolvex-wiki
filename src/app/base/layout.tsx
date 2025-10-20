import type { Metadata } from "next";

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
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
            <SidebarTrigger className="-ml-1" />
        <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
        />
        <main className="min-w-full min-h-screen">
            {children}
        </main>
        </SidebarInset>
      </body>
    </html>
  );
}
