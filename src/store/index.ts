import { configureStore } from "@reduxjs/toolkit";
import { userReducer, tasksReducer } from "./reducers";

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
  },
});

export type stateType = ReturnType<typeof store.getState>;
export default store;
