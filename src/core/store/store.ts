"use client";
import { configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./types/StateSchema";
import { userReducer } from "./slices/userAuthSlice";
import { eventsReducer } from "./slices/eventsSlice";
import { eventByIdReducer } from "./slices/eventByIdSlice";
import { registerAsVisitorReducer } from "./slices/registerAsVisitorSlice";

export function createReduxStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      user: userReducer,
      events: eventsReducer,
      eventById: eventByIdReducer,
      visitor: registerAsVisitorReducer,
    },
    preloadedState: initialState,
  });
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
