"use client";
import { $api } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAdminRole = createAsyncThunk<boolean, number, { rejectValue: string }>(
  "login/fetchAdminRole",
  async (userId, thunkApi) => {
    try {
      const response = await $api.post<number>(`/api/v1/userrole/check_admin_role/${userId}`);
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(`error: ${error}`);
    }
  },
);
