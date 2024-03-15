"use client";
import { $api } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Meeting, ThunkConfig } from "../types/StateSchema";
import { getLimitForEvents, getOffsetForEvents } from "../slices/eventsSlice";

interface FetchEventsProps {
  offset: number;
}

export const fetchEvents = createAsyncThunk<Meeting[], FetchEventsProps, ThunkConfig<string>>(
  "events/getEvents",
  async (props, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const { offset } = props;
    const limit = getLimitForEvents(getState());
    try {
      const response = await $api.get<Meeting[]>("/api/v1/event/", {
        params: {
          offset,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(`error: ${error}`);
    }
  },
);
