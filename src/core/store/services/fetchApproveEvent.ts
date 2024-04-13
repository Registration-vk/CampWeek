"use client";
import { $api } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Meeting } from "../types/StateSchema";

export const fetchApproveEvent = createAsyncThunk<Meeting, Meeting, { rejectValue: string }>(
  "event/fetchApproveEvent",
  async (event, thunkApi) => {
    try {
      const response = await $api.patch<Meeting>(`/api/v1/event/${event.id}/`, {
        ...event,
        approved: true,
      });
      console.log(`APPROVE ${response.data}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(`error: ${error}`);
    }
  },
);
