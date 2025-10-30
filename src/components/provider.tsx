"use client";

import { StoreProvider } from "./store-provider";
import { SidebarProvider } from "./ui/sidebar";

type CustomProvider = {
  children: React.ReactNode;
};

export function CustomProvider({ children }: CustomProvider) {
  return (
    <StoreProvider>
      <SidebarProvider>{children}
      </SidebarProvider>
    </StoreProvider>
  );
}
