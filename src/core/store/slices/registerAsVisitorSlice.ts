"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CreateVisitor, CreateVisitorSchema, StateSchema } from "../types/StateSchema";
import { fetchRegisterAsVisitor } from "../services/fetchRegisterAsVisitor";

const initialState: CreateVisitorSchema = {
  ids: null,
  error: "",
  isLoading: false,
};

export const registerAsVisitorSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterAsVisitor.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchRegisterAsVisitor.fulfilled, (state, action: PayloadAction<CreateVisitor>) => {
        state.isLoading = false;
        state.ids = action.payload;
      })
      .addCase(fetchRegisterAsVisitor.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: registerAsVisitorActions } = registerAsVisitorSlice;
export const { reducer: registerAsVisitorReducer } = registerAsVisitorSlice;

export const getIdsVisitor = (state: StateSchema) => state?.visitor;
