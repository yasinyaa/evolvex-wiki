import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@/store'

import { UserType } from "@/types/auth"


type AuthStateType = {
    user: UserType | null,
    isAuthenticated: boolean
}


const initialState: AuthStateType = {
    user: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Partial<UserType>>) => {
            state.user = {...(state.user ?? {}), ...action.payload} as any
        },
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload
        },
        clearUser: (state) => {
            state.user = null
        }
    },
})


export const selectUser = (state: RootState) => state?.auth?.user
export const selectIsAuthenticated = (state:RootState) => state?.auth.isAuthenticated
export const { setUser, clearUser, setIsAuthenticated} = authSlice.actions

export default authSlice.reducer