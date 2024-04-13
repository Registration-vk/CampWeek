"use client";
import { fetchUserAuth } from "../services/fetchUserAuth";
import { createSlice } from "@reduxjs/toolkit";
import { StateSchema, UserSchema } from "../types/StateSchema";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { getStoredCities } from "@/core/utils";
import { fetchAdminRole } from "../services/fetchAdminRole";

const initialState: UserSchema = {
  userId: undefined,
  storedCities: getStoredCities(),
  isAuth: false,
  isLoading: false,
  isAdmin: false,
};

export const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserIdFromCookie(state) {
      // Считываем значение cookies
      const accessToken = Cookies.get("access_token");
      if (accessToken) {
        localStorage.setItem("token", accessToken);
        try {
          const decodedToken = jwt.decode(accessToken);
          // Извлекаем ID пользователя из декодированного токена
          const userId = decodedToken?.sub || "";
          state.userId = Number(userId);
        } catch (error) {
          console.error("Ошибка при декодировании токена", error);
        }
      } else {
        console.error("Ошибка авторизации");
      }
    },
    logout(state) {
      state.userId = undefined;
      state.isAuth = false;
    },
  },

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
    builder
      .addCase(fetchAdminRole.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchAdminRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAdmin = action.payload;
      })
      .addCase(fetchAdminRole.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: userActions } = userAuthSlice;
export const { reducer: userReducer } = userAuthSlice;

export const getUser = (state: StateSchema) => state.user;
export const getUserId = (state: StateSchema) => state.user.userId;
export const getUserIsAuth = (state: StateSchema) => state.user.isAuth;
export const getUserIsAdmin = (state: StateSchema) => state.user.isAdmin;
