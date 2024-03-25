"use client";
import { $api } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Meeting } from "../types/StateSchema";

export const fetchEventById = createAsyncThunk<Meeting, number, { rejectValue: string }>(
  "event/fetchEventById",
  async (id, thunkApi) => {
    try {
      const response = await $api.get<Meeting>(`/api/v1/event/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(`error: ${error}`);
    }
  },
);
