"use client";

import { FilePlus, Home, Tag } from "lucide-react";
import Image from "next/image";
import type * as React from "react";
import { TagNav } from "@/components/ui/nav/tags-nav";
import { UserDropdown } from "@/components/ui/nav/user-dropdown";
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
} from "@/components/ui/sidebar";

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Image src="/logo.png" width={50} height={50} alt="logo" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Links</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
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
