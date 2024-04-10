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

export const removeRegisterAsVisitor = createAsyncThunk<
  any,
  CreateVisitor,
  { rejectValue: string }
>("user/fetchRegisterAsVisitor", async (props, thunkApi) => {
  const { event_id, visitor_id } = props;
  try {
    const response = await $api.delete(`/api/v1/eventvisitor/${event_id}/${visitor_id}/`);
    if (response.status === 200) {
      return "Удаление прошло успешно";
    }
  } catch (error) {
    console.log(error);
    return thunkApi.rejectWithValue(`error: ${error}`);
  }
});
