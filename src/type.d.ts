import axios, { Method } from "axios";

// TASKS TYPES

export type Task = {
  completed: false;
  _id: string;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskList = Task[];

export type TaskListRequest = {
  data: TaskList;
  count: number;
};

// USER TYPES

export type User = {
  age: number;
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type UserToken = string;

export type UserRequestLogin = {
  user: User;
  token: UserToken;
};

export type UserRequestLogout = {
  success: boolean;
};

// Axios

export interface AxiosRequestConfig<T> {
  url?: string;
  method?: Method;
  baseURL?: string;
  data?: T;
  headers?: Record<string, string>;
}
