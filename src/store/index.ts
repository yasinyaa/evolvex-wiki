import { configureStore } from "@reduxjs/toolkit"

import authReducer from '@/store/slices/auth-slice'
import { documentsApi } from "./services/documents-api"
import { tagsApi } from "./services/tags-api"


// export const store = configureStore({
//     reducer: {
//         auth: authReducer
//     }
// })
// this is not recomended for nextjs apps

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            [documentsApi.reducerPath]: documentsApi.reducer,
            [tagsApi.reducerPath]: tagsApi.reducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(documentsApi.middleware, tagsApi.middleware),
    })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']