"use client";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { FiltersRoleSchema, StateSchema } from "../types/StateSchema";

const initialState: FiltersRoleSchema = {
  filters: [],
};

export const filtersRole = createSlice({
  name: "filtersRole",
  initialState,
  reducers: {
    addFilter(state, action: PayloadAction<string[]>) {
      state.filters = action.payload;
    },
  },
});

export const { actions: filtersRoleActions } = filtersRole;
export const { reducer: filtersRoleReducer } = filtersRole;

// Other code such as selectors can use the imported `RootState` type
export const getFiltersRole = (state: StateSchema) => state.filtersRole.filters;
