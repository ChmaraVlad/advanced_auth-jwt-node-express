import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../../../http";

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const response = await $api.get(`/users`);
  const data = await response.data;
  return data;
});
