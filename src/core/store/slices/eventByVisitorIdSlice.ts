"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EventsByUserSchema, Meeting, StateSchema } from "../types/StateSchema";
import { fetchEventsBySpeakerId, fetchEventsByVisitorId } from "../services/fetchEventsByVisitorId";

const initialState: EventsByUserSchema = {
  eventsByVisitorId: [],
  eventsBySpeakerId: [],
  error: "",
  isLoading: false,
};

export const eventByVisitorIdSlice = createSlice({
  name: "eventByVisitorId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsByVisitorId.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchEventsByVisitorId.fulfilled, (state, action: PayloadAction<Meeting[]>) => {
        state.isLoading = false;
        state.eventsByVisitorId = action.payload;
      })
      .addCase(fetchEventsByVisitorId.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
    builder
      .addCase(fetchEventsBySpeakerId.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchEventsBySpeakerId.fulfilled, (state, action: PayloadAction<Meeting[]>) => {
        state.isLoading = false;
        state.eventsBySpeakerId = action.payload;
      })
      .addCase(fetchEventsBySpeakerId.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: eventByVisitorActions } = eventByVisitorIdSlice;
export const { reducer: eventByVisitorReducer } = eventByVisitorIdSlice;

export const getEventByVisitor = (state: StateSchema) => state?.eventByVisitorId;
