"use client";
import { fetchUserAuth } from "../services/fetchUserAuth";
import { createSlice } from "@reduxjs/toolkit";
import { StateSchema, UserSchema } from "../types/StateSchema";

const initialState: UserSchema = {
  userId: undefined,
  isAuth: false,
  isLoading: false,
};

export const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAuth.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchUserAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = action.payload.access;
      })
      .addCase(fetchUserAuth.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: userActions } = userAuthSlice;
export const { reducer: userReducer } = userAuthSlice;

// Other code such as selectors can use the imported `RootState` type
export const getUserIsAuth = (state: StateSchema) => state.user.isAuth;
