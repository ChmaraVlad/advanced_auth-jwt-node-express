import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../../../http";
import { IAuthResponse } from "../../../../models/response/IAuthResponse";

export const registration = createAsyncThunk<
  IAuthResponse,
  { email: string; password: string }
>("registration", async ({ email, password }) => {
  const response = await $api.post(`/registration`, {
    email,
    password,
  });
  const data = await response.data;
  return data;
});
