"use client";
import { configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./types/StateSchema";
import { userReducer } from "./slices/userAuthSlice";
import { eventsReducer } from "./slices/eventsSlice";

export function createReduxStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      user: userReducer,
      events: eventsReducer,
    },
    preloadedState: initialState,
  });
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
