"use client";
import { $api } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface Roles {
  user_id: number;
  role_id: number;
  id: number;
}

export const createRegionOnServer = createAsyncThunk<any, string, { rejectValue: string }>(
  "login/createRegionOnServer",
  async (regionName: string, thunkApi) => {
    try {
      const response = await $api.post<any>("/api/v1/user/create-region/", { name: regionName });
      return response.data;
    } catch (error) {
      console.log(error);

      return thunkApi.rejectWithValue(`error: ${error}`);
    }
  },
);
