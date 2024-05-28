"use client";
import { $api } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Meeting, ThunkConfig } from "../types/StateSchema";
import { getCitiesIdsEvents, getLimitForEvents, getOffsetForEvents } from "../slices/eventsSlice";

interface FetchEventsProps {
  offset?: number;
  actualType?: "actual" | "all" | "passed";
  approved?: boolean;
}

export const fetchEvents = createAsyncThunk<Meeting[], FetchEventsProps, ThunkConfig<string>>(
  "events/fetchEvents",
  async (props, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const { actualType = "actual", offset = 10, approved } = props;
    const limit = getLimitForEvents(getState());
    const citiesIds = getCitiesIdsEvents(getState());
    try {
      const response = await $api.get<Meeting[]>("/api/v1/event/", {
        params: {
          actual_type: actualType,
          offset,
          limit,
          region_ids: citiesIds,
          approved,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(`error: ${error}`);
    }
  },
);
