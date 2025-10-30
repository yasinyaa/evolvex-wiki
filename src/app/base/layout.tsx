import type { Metadata } from "next";
import { Footer } from "@/components/ui/footer";
import { AppSidebar } from "@/components/ui/nav/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

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
      <AppSidebar className="z-10" />
      <div className="w-full overflow-hidden h-full flex flex-col gap-4 p-4 z-0">
        {children}
        <Footer>
          <SidebarTrigger className="-ml-1 my-3" />
        </Footer>
      </div>
    </>
  );
}
