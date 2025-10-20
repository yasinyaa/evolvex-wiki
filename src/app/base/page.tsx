"use client"
import { useSelector } from "react-redux"

import { selectUser } from "@/store/slices/auth-slice"

export default function Base() {
    const user = useSelector(selectUser)
    return (
        <h1>{user?.email}</h1>
    )
}