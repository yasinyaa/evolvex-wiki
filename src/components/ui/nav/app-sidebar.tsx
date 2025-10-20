"use client"

import * as React from "react"
import { TagNav } from "@/components/ui/nav/tags-nav"
import { UserDropdown } from "@/components/ui/nav/user-dropdown"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
            <h1 className="font-bold">Evolvex Team Wiki</h1>
        </SidebarHeader>
      <SidebarContent>
        <TagNav tags={[]} />
      </SidebarContent>
      <SidebarFooter>
        <UserDropdown />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
