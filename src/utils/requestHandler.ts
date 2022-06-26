import axios, { AxiosResponse, AxiosInstance } from "axios";
import {
  TaskListRequest,
  UserRequestLogin,
  UserRequestLogout,
  UserToken,
} from "../type";
import { TASKS_PATH, USERS_PATH } from "./constants";

const instance: AxiosInstance = axios.create({
  baseURL: "https://api-nodejs-todolist.herokuapp.com/",
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const headers = {
  "Content-Type": "application/json",
};

const axiosConfigWithAuth = (token: UserToken) => ({
  headers: {
    ...headers,
    Authorization: `Bearer ${token}`,
  },
});

// USERS

const usersRequests = {
  post: async (url: string, data?: Record<string, string>) =>
    instance.post<UserRequestLogin>(url, data, { headers }).then(responseBody),
  postWithAuth: async (
    url: string,
    token: UserToken,
    data?: Record<string, string>
  ) =>
    instance
      .post<UserRequestLogout>(url, data, axiosConfigWithAuth(token))
      .then(responseBody),
};

const userRequestHandler = {
  logInUser: async (
    userName: string,
    password: string
  ): Promise<UserRequestLogin> =>
    usersRequests.post(`${USERS_PATH.BASE}${USERS_PATH.LOGIN}`, {
      email: userName,
      password,
    }),
  logOutUser: async (token: UserToken): Promise<UserRequestLogout> =>
    usersRequests.postWithAuth(`${USERS_PATH.BASE}${USERS_PATH.LOGOUT}`, token),
};

// TASKS

const tasksRequests = {
  get: (url: string, token: UserToken) =>
    instance
      .get<TaskListRequest>(url, axiosConfigWithAuth(token))
      .then(responseBody),
};

const taskRequestHandler = {
  getTasks: (token: UserToken): Promise<TaskListRequest> =>
    tasksRequests.get(TASKS_PATH.BASE, token),
};

export { taskRequestHandler, userRequestHandler };
