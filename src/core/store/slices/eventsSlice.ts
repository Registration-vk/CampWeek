"use client";
import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { EventSchema, EventsSchema, Meeting, StateSchema } from "../types/StateSchema";
import { fetchEvents } from "../services/fetchEvents";
import { compareArrays } from "@/core/utils";
import { createInitialCities } from "@/components/ui/FiltersProfileWrapper/ui/FiltersProfileWrapper";
import { regionsId } from "@/feature/MeetingForm/static";

const eventsAdapter = createEntityAdapter({
  selectId: (event: Meeting) => event.id,
});

export const getEvents = eventsAdapter.getSelectors<StateSchema>(
  (state) => state.events || eventsAdapter.getInitialState(),
);

// const initialState: EventsSchema = {
//   events: [],
//   filteredEvents: [],
//   error: "",
//   isLoading: false,
//   roleFilters: [],
//   storedCities: [],
//   offset: 0,
//   limit: 6,
//   hasMore: true,
// };

export const eventsSlice = createSlice({
  name: "events",
  initialState: eventsAdapter.getInitialState<EventsSchema>({
    ids: [],
    entities: {},
    events: [],
    filteredEvents: [],
    error: "",
    isLoading: false,
    roleFilters: [],
    storedCities: [],
    offset: 0,
    limit: 6,
    hasMore: true,
  }),
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
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload;
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
        // state.events = action.payload.filter((value) => {
        //   return state.storedCities.indexOf(regionsId[`${value.region_id}`]) !== -1;
        // });
        // state.filteredEvents = state.events;
        state.hasMore = action.payload.length > 0;

        eventsAdapter.addMany(
          state,
          action.payload.filter((value) => {
            return state.storedCities.indexOf(regionsId[`${value.region_id}`]) !== -1;
          }),
        );
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

export const getOffsetForEvents = (state: StateSchema) => state?.events.offset || 0;
export const getLimitForEvents = (state: StateSchema) => state?.events.limit || 6;
// export const getRoleFiltersLength = (state: StateSchema) => state?.events.roleFilters.length || 0;
