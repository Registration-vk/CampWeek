"use client";
import { fetchUserAuth } from "../services/fetchUserAuth";
import { createSlice } from "@reduxjs/toolkit";
import {
  StateSchema,
  UserSchema,
  UsersAdminSchema,
  UsersAdminSchemaAll,
} from "../types/StateSchema";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { getStoredCities } from "@/core/utils";
import { fetchAdminRole } from "../services/fetchAdminRole";
import { fetchAllUsers } from "../services/fetchAllusers";

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
