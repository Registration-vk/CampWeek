"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EventSchema, EventsSchema, StateSchema } from "../types/StateSchema";
import { fetchEvents } from "../services/fetchEvents";
import { compareArrays } from "@/core/utils";

const initialState: EventsSchema = {
  events: [],
  filteredEvents: [],
  error: "",
  isLoading: false,
  roleFilters: [],
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addRoleFilter(state, action: PayloadAction<string[]>) {
      state.roleFilters = action.payload;
    },
    getFilteredEvents(state) {
      if (state.roleFilters.length > 0) {
        state.filteredEvents = state.events?.filter((value) => {
          return compareArrays(value.roles.split(";"), state.roleFilters);
        });
      } else {
        state.filteredEvents = state.events;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<EventSchema[]>) => {
        state.isLoading = false;
        state.events = action.payload;
        state.filteredEvents = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: eventsActions } = eventsSlice;
export const { reducer: eventsReducer } = eventsSlice;

export const getAllEvents = (state: StateSchema) => state?.events;
// export const getRoleFiltersLength = (state: StateSchema) => state?.events.roleFilters.length || 0;
