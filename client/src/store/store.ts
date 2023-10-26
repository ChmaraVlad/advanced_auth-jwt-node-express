import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./slices/users";
import userReducer from "./slices/user";

const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
