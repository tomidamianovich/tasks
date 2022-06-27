import { createSlice } from "@reduxjs/toolkit";
import { UserRequestLogin } from "../../type";

const initialState: UserRequestLogin = {
  token: "",
  user: {
    age: 0,
    _id: "",
    name: "",
    email: "",
    createdAt: "",
    updatedAt: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state = action.payload;
      return state;
    },
    unsetUser(state) {
      state = initialState;
      return state;
    },
  },
});

const { actions } = userSlice;
export const { setUser, unsetUser } = actions;

export const userReducer = userSlice.reducer;
