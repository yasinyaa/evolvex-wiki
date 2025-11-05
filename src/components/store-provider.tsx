"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { type AppStore, makeStore } from "@/store";
import { PageLoading } from "./ui/page-loading";


export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    // <PersistGate
    //   loading={<PageLoading />}
    //   persistor={persistStore(storeRef.current)}
    // >
    // </PersistGate>
      <Provider store={storeRef.current}>{children}</Provider>
  );
}
