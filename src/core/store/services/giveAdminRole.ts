"use client";
import { $api } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface Roles {
  user_id: number;
  role_id: number;
  id: number;
}

export const giveAdminRole = createAsyncThunk<any, number, { rejectValue: string }>(
  "login/giveAdminRole",
  async (userId: number, thunkApi) => {
    try {
      const response = await $api.post<any>(`/api/v1/userrole/give_admin_role/${userId}`);
      if (response.status === 200) {
        return "Успешно";
      } else {
        console.log(response.data.detail);
      }
    } catch (error) {
      console.log(error);

      return thunkApi.rejectWithValue(`error: ${error}`);
    }
  },
);
