'use client'
import { Provider } from "react-redux"

import { store } from "@/store"

type ReduxProvider = {
    children: React.ReactNode
}

export function ReduxProvider ({ children }: ReduxProvider) {
    return (<Provider store={store}>
        {children}
    </Provider>)
}