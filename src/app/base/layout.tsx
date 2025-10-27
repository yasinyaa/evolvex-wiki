import type { Metadata } from "next";

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/nav/app-sidebar";
import { Footer } from "@/components/ui/footer";

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
    <>
        <AppSidebar />
        <SidebarInset>
        <div className="w-full h-full p-4">
            {children}
            <Footer>
            <SidebarTrigger className="-ml-1 my-3" />
            </Footer>
        </div>
        </SidebarInset>
      </>
  );
}
