"use client";
import { configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./types/StateSchema";
import { userReducer } from "./slices/userAuthSlice";

export function createReduxStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      user: userReducer,
    },
    preloadedState: initialState,
  });
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
