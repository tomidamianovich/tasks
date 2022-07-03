import { TaskList } from "../type";

export const INITIAL_TASKS: TaskList = [
  {
    _id: "62b822d244d16b00177cd1a1",
    completed: false,
    description: "Placeholder task",
    owner: "62b81c3744d16b00177cd19e",
    createdAt: "2022-06-26T09:11:46.687Z",
    updatedAt: "2022-06-26T09:11:46.687Z",
  },
];

export const TASKS_PATH = (id?: string) => "/task" + (id ? `/${id}` : "");

export const USERS_PATH = {
  BASE: "/user",
  LOGIN: "/login",
  LOGOUT: "/logout",
  USER_LOGGED: "/me",
};
