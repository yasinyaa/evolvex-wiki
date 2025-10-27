"use client";

import {
  Folder,
  Forward,
  type LucideIcon,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";

import { useGetTagsQuery } from "@/store/services/tags-api";

export function TagNav() {
  const { data: tags, error, isLoading } = useGetTagsQuery();
  const { isMobile } = useSidebar();

  if(isLoading) {
    return (
      <div className="w-full flex justify-start p-8">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full flex justify-start p-8">
        <li className="text-red-800">Something went wrong</li>
      </div>
    )
  }


  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Tags</SidebarGroupLabel>
      <SidebarMenu>
        {tags &&
          tags?.length > 0 ?
          tags.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <Link href={`/base/documents/list/${item.id}/`}>
                  <span>#</span>
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <Folder className="text-muted-foreground" />
                    <span>View Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward className="text-muted-foreground" />
                    <span>Share Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2 className="text-muted-foreground" />
                    <span>Delete Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </SidebarMenuItem>
          )): (<SidebarMenuItem>
                <span className="text-xs pl-2">No tags yet</span>
              </SidebarMenuItem>)}
      </SidebarMenu>
    </SidebarGroup>
  );
}
