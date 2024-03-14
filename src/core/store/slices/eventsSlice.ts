"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EventSchema, EventsSchema, Meeting, StateSchema } from "../types/StateSchema";
import { fetchEvents } from "../services/fetchEvents";
import { compareArrays } from "@/core/utils";
import { createInitialCities } from "@/components/ui/FiltersProfileWrapper/ui/FiltersProfileWrapper";
import { regionsId } from "@/feature/MeetingForm/static";

const initialState: EventsSchema = {
  events: [],
  filteredEvents: [],
  error: "",
  isLoading: false,
  roleFilters: [],
  storedCities: [],
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
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Meeting[]>) => {
        state.isLoading = false;
        state.storedCities = createInitialCities();
        state.events = action.payload.filter((value) => {
          return state.storedCities.indexOf(regionsId[`${value.region_id}`]) !== -1;
        });
        state.filteredEvents = state.events;
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
