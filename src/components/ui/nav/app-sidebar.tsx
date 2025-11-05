"use client";

import { FilePlus, Home, Tag } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import type * as React from "react";
import { TagNav } from "@/components/ui/nav/tags-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const routes = [
  {
    title: "Base",
    url: "/base",
    icon: Home,
  },
  {
    title: "Create Document",
    url: "/base/documents/create",
    icon: FilePlus,
  },
  {
    title: "Create Tag",
    url: "/base/tags/create",
    icon: Tag,
  },
];

const UserDropdown = dynamic(
  async () => (await import("@/components/ui/nav/user-dropdown")).UserDropdown,
  {
    ssr: false,
  },
);

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="w-full flex flex-row items-center gap-4">
        <Image src="/logo.png" width={50} height={50} alt="logo" />
        {open && <span className="text-sm ">Team Wiki</span>}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Links</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {!open ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <span>{item.title}</span>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <TagNav />
      </SidebarContent>
      <SidebarFooter>
        <UserDropdown />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
