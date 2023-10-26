import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../../../http";
import { IAuthResponse } from "../../../../models/response/IAuthResponse";

export const login = createAsyncThunk<
  IAuthResponse,
  { email: string; password: string }
>("login", async ({ email, password }) => {
  const response = await $api.post(`/login`, {
    email,
    password,
  });
  const data = await response.data;
  return data;
});
