'use client'
import { Provider } from "react-redux"

import { store } from "@/store"
import { SidebarProvider } from "./ui/sidebar"

type CustomProvider = {
    children: React.ReactNode
}

export function CustomProvider ({ children }: CustomProvider) {
    return (<Provider store={store}>
        <SidebarProvider>
            {children}
        </SidebarProvider>
    </Provider>)
}