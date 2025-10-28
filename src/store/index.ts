import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  persistReducer,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "@/store/slices/auth-slice";
import { documentsApi } from "./services/documents-api";
import { tagsApi } from "./services/tags-api";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["documentsApi", "tagsApi"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  [documentsApi.reducerPath]: documentsApi.reducer,
  [tagsApi.reducerPath]: tagsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(documentsApi.middleware, tagsApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
