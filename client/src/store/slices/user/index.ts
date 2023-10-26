import { createSlice } from "@reduxjs/toolkit";

import { IAuthResponse } from "../../../models/response/IAuthResponse";

import { login } from "./thunks/login";
import { registration } from "./thunks/registration";

// Define a type for the slice state
interface UserState extends IAuthResponse {
  status: "loading" | "idle";
  error: string | null;
}

const initialState: UserState = {
  refreshToken: "",
  accessToken: "",
  user: null,
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registration.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.status = "idle";
      state.error = null;
    });
    builder.addCase(registration.rejected, (state) => {
      state.status = "idle";
      state.error = null;
    });
    // -----------------------------------------
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.status = "idle";
      state.error = null;
    });

    builder.addCase(login.rejected, (state) => {
      state.status = "idle";
      state.error = null;
    });
  },
});

export default userSlice.reducer;
