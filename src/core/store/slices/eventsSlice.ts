"use client";
import { PayloadAction, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { EventSchema, EventsSchema, Meeting, StateSchema } from "../types/StateSchema";
import { fetchEvents } from "../services/fetchEvents";
import { compareArrays, convertDate, getStoredCitiesIds } from "@/core/utils";
import { createInitialCities } from "@/components/ui/FiltersProfileWrapper/ui/FiltersProfileWrapper";
import { regionsId } from "@/feature/MeetingForm/static";
import { fetchApproveEvent } from "../services/fetchApproveEvent";

const eventsAdapter = createEntityAdapter({
  selectId: (event: Meeting) => event.id,
});

export const getEvents = eventsAdapter.getSelectors<StateSchema>(
  (state) => state.events || eventsAdapter.getInitialState(),
);

export const eventsSlice = createSlice({
  name: "events",
  initialState: eventsAdapter.getInitialState<EventsSchema>({
    ids: [],
    entities: {},
    // events: [],
    regionIds: getStoredCitiesIds(),
    filteredEvents: [],
    prevFilteredEvents: [],
    error: "",
    isLoading: false,
    roleFilters: [],
    datesFilters: [],
    offset: 0,
    limit: 6,
    hasMore: true,
  }),
  reducers: {
    addRoleFilter(state, action: PayloadAction<string[]>) {
      state.roleFilters = action.payload;
    },
    addDatesFilter(state, action: PayloadAction<string[]>) {
      state.datesFilters = action.payload;
    },
    getFilteredEvents(state) {
      if (state.roleFilters.length > 0 || state.datesFilters.length > 0) {
        state.filteredEvents = state.prevFilteredEvents.filter((entity) => {
          const roleFilterPassed =
            state.roleFilters.length === 0 ||
            compareArrays(entity.roles.split(";"), state.roleFilters);
          const dateFilterPassed =
            state.datesFilters.length === 0 ||
            state.datesFilters.includes(convertDate(entity.date_time));

          // Возвращаем true только если фильтры ролей и дат прошли проверку
          return roleFilterPassed && dateFilterPassed;
        });
      } else if (state.roleFilters.length === 0) {
        state.filteredEvents = state.prevFilteredEvents.filter((entity) => {
          const dateFilterPassed =
            state.datesFilters.length === 0 ||
            state.datesFilters.includes(convertDate(entity.date_time));
          return dateFilterPassed;
        });
      } else {
        state.filteredEvents = state.prevFilteredEvents;
      }
      eventsAdapter.setAll(state, state.filteredEvents);
    },
    setRegionIds(state, action: PayloadAction<string>) {
      state.regionIds = action.payload;
      eventsAdapter.setAll(state, []);
    },
    cancelRoleFilter(state) {
      state.roleFilters = [];
      // eventsAdapter.setAll(state, Object.values(state.entities));
    },
    cancelDateFilter(state) {
      state.datesFilters = [];
      // eventsAdapter.setAll(state, Object.values(state.entities));
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
        state.hasMore = action.payload.length >= 6;

        eventsAdapter.addMany(state, action.payload);
        state.prevFilteredEvents = Object.values(state.entities);
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
export const getCitiesIdsEvents = (state: StateSchema) => state?.events.regionIds || "";
// export const getRoleFiltersLength = (state: StateSchema) => state?.events.roleFilters.length || 0;
