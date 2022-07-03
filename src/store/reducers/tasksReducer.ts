import { createSlice } from "@reduxjs/toolkit";
import { Task, TaskList } from "../../type";
import { INITIAL_TASKS } from "../../utils/constants";

const initialState: TaskList = INITIAL_TASKS;

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action) {
      state = action.payload;
      return state;
    },
    addTask(state, action) {
      state = [...state, action.payload];
      return state;
    },
    removeTask(state, action) {
      debugger;
      state = state.filter((task: Task) => task._id !== action.payload);
      return state;
    },
    clearAllTask(state) {
      state = initialState;
      return state;
    },
    markTaskAsCompleted(state, action) {
      state = state.filter((task: Task) => task._id !== action.payload);
      return state;
    },
  },
});

const { actions } = tasksSlice;
export const {
  setTasks,
  addTask,
  removeTask,
  clearAllTask,
  markTaskAsCompleted,
} = actions;

export const tasksReducer = tasksSlice.reducer;
