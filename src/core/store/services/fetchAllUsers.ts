"use client";
import { $api } from "@/core/axios";
import { User } from "@/core/services/users";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UsersAdminSchema } from "../types/StateSchema";

interface Users {
  users: UsersAdminSchema[];
}

export const fetchAllUsers = createAsyncThunk<UsersAdminSchema[], void, { rejectValue: string }>(
  "login/fetchAllUsers",
  async (_, thunkApi) => {
    try {
      const response = await $api.get<UsersAdminSchema[]>("/api/v1/user/all/");
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(`error: ${error}`);
    }
  },
);
