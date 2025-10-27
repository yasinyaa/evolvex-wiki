"use client"

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { authClient } from "@/lib/auth-client";
import { setUser, setIsAuthenticated } from "@/store/slices/auth-slice";
import { AppDispatch } from "@/store";


export default function AppInit() {
    const { data: session} = authClient.useSession()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if(session?.user) {
            dispatch(setUser({
                name: session.user.name,
                email: session.user.email
            }))
            dispatch(setIsAuthenticated(true))
        }
    }, [session, dispatch])

    return null
}