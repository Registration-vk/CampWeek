"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EventSchema, Meeting, StateSchema } from "../types/StateSchema";
import { fetchEventById } from "../services/fetchEventById";

const initialState: EventSchema = {
  event: null,
  error: "",
  isLoading: false,
};

export const eventByIdSlice = createSlice({
  name: "eventById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventById.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchEventById.fulfilled, (state, action: PayloadAction<Meeting>) => {
        state.isLoading = false;
        state.event = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: eventByIdActions } = eventByIdSlice;
export const { reducer: eventByIdReducer } = eventByIdSlice;

export const getEventById = (state: StateSchema) => state?.eventById;
