"use client";

import {
  Forward,
  type LucideIcon,
  MoreHorizontal,
  Pencil,
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { icons } from "@/constants";
import { useGetTagsQuery } from "@/store/services/tags-api";

export function TagNav() {
  const { data: tags, error, isLoading } = useGetTagsQuery();
  const { open, isMobile } = useSidebar();

  if (isLoading) {
    return (
      <div className="w-full flex justify-start p-8">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-start p-8">
        <li className="text-red-800">Something went wrong</li>
      </div>
    );
  }

  return (
    <SidebarGroup className="">
      <SidebarGroupLabel>Tags</SidebarGroupLabel>
      <SidebarMenu>
        {tags && tags?.length > 0 ? (
          tags.map((item) => {
            const IconComponent = icons.find(
              (icon) => icon.name === item.icon,
            )?.icon;
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  {open ? (
                    <Link href={`/base/documents/list/${item.id}/`}>
                      <span>#</span>
                      <span>{item.name}</span>
                    </Link>
                  ) : (
                    <Link href={`/base/documents/list/${item.id}/`}>
                      {IconComponent ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <IconComponent />
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <span>{item.name}</span>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>#</span>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <span>{item.name}</span>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </Link>
                  )}
                </SidebarMenuButton>
                <DropdownMenu>
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
                    <DropdownMenuItem asChild>
                      <Link href={`/base/tags/edit/${item.id}/`}>
                        <Pencil className="text-muted-foreground" />
                        <span>Edit Tag</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            );
          })
        ) : (
          <SidebarMenuItem>
            <span className="text-xs pl-2">No tags yet</span>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
