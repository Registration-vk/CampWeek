"use client";
import { $api } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Meeting, ThunkConfig } from "../types/StateSchema";
import { getUserId } from "../slices/userAuthSlice";

export const fetchEventsByVisitorId = createAsyncThunk<Meeting[], void, ThunkConfig<string>>(
  "event/fetchEventsByVisitorId",
  async (_, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const userId = getUserId(getState());
    try {
      const response = await $api.get<Meeting[]>(`/api/v1/eventvisitor/events_of/${userId}/`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(`error: ${error}`);
    }
  },
);

export const fetchEventsBySpeakerId = createAsyncThunk<Meeting[], void, ThunkConfig<string>>(
  "event/fetchEventsBySpeakerId",
  async (_, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const userId = getUserId(getState());
    try {
      const response = await $api.get<Meeting[]>(`/api/v1/eventspeaker/events_of/${userId}/`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(`error: ${error}`);
    }
  },
);
