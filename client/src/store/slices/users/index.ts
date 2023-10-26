import { createSlice } from "@reduxjs/toolkit";

import { IUser } from "../../../models/response/IAuthResponse";

import { fetchUsers } from "./thunks/fetchUsers";

interface UsersState {
  users: IUser[];
  status: "loading" | "idle";
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = [...action.payload.users];
      state.status = "idle";
    });

    builder.addCase(fetchUsers.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export default usersSlice.reducer;
