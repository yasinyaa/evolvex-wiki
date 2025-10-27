import { fetchBaseQuery } from "@reduxjs/toolkit/query";


export const baseQuery = async (args, api, extraOptions) => {
    const result = fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL})
    return await result(args, api, extraOptions)
}