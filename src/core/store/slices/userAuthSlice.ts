"use client";
import { fetchUserAuth } from "../services/fetchUserAuth";
import { createSlice } from "@reduxjs/toolkit";
import { StateSchema, UserSchema } from "../types/StateSchema";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { getStoredCities } from "@/core/utils";

const initialState: UserSchema = {
  userId: undefined,
  storedCities: getStoredCities(),
  isAuth: false,
  isLoading: false,
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

          console.log("ID пользователя:", userId);
        } catch (error) {
          console.error("Ошибка при декодировании токена", error);
        }
        console.log("Успешная авторизация");
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
        console.log(`Пользователь авторизован: ${action.payload.access}`);
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

export const getUser = (state: StateSchema) => state.user;
export const getUserId = (state: StateSchema) => state.user.userId;
