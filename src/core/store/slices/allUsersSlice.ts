"use client";
import { createSlice } from "@reduxjs/toolkit";
import { StateSchema, UsersAdminSchemaAll } from "../types/StateSchema";
import { fetchAllUsers } from "../services/fetchAllUsers";

const initialState: UsersAdminSchemaAll = {
  users: [],
  isLoading: false,
  error: "",
};

export const allUsersSlice = createSlice({
  name: "allUsersSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        console.log(state.users);
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: allUsersActions } = allUsersSlice;
export const { reducer: allUsersReducer } = allUsersSlice;

export const getAllUsers = (state: StateSchema) => state.allUsers.users;
