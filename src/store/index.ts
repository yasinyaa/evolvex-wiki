import { configureStore } from "@reduxjs/toolkit"

import authReducer from '@/store/slices/auth-slice'


// export const store = configureStore({
//     reducer: {
//         auth: authReducer
//     }
// })
// this is not recomended for nextjs apps

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']