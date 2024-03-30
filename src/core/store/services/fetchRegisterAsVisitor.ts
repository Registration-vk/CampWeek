"use client";
import { $api } from "@/core/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreateVisitor } from "../types/StateSchema";

export const fetchRegisterAsVisitor = createAsyncThunk<
  CreateVisitor,
  CreateVisitor,
  { rejectValue: string }
>("user/fetchRegisterAsVisitor", async (ids, thunkApi) => {
  try {
    const response = await $api.post<CreateVisitor>("/api/v1/eventvisitor", ids);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkApi.rejectWithValue(`error: ${error}`);
  }
});

export const fetchRegisterAsSpeaker = createAsyncThunk<
  CreateVisitor,
  CreateVisitor,
  { rejectValue: string }
>("user/fetchRegisterAsVisitor", async (ids, thunkApi) => {
  try {
    const response = await $api.post<CreateVisitor>("/api/v1/eventvisitor", ids);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkApi.rejectWithValue(`error: ${error}`);
  }
});
