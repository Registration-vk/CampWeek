"use client";
import { $api } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Meeting } from "../types/StateSchema";

export const fetchApproveEvent = createAsyncThunk<Meeting, number, { rejectValue: string }>(
  "event/fetchApproveEvent",
  async (event_id, thunkApi) => {
    try {
      const response = await $api.get<Meeting>(`/api/v1/event/${event_id}/approve/`);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(`error: ${error}`);
    }
  },
);
