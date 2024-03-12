"use client";
import { $api } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { EventSchema } from "../types/StateSchema";

export const fetchEvents = createAsyncThunk<EventSchema[], void, { rejectValue: string }>(
  "events/getEvents",
  async (_, thunkApi) => {
    try {
      const response = await $api.get<EventSchema[]>("/api/v1/event/");
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(`error: ${error}`);
    }
  },
);
