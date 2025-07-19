import axiosInstance from "./axiosInstance";
import { setToken, removeToken } from "../utils/token";

export const loginService = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  const token = response.data.token;
  setToken(token);
  return response.data;
};

export const registerService = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  const token = response.data.token;
  setToken(token);
  return response.data;
};

export const logoutService = () => {
  removeToken();
  // Optional: server-side logout endpoint call
  // await axiosInstance.post("/auth/logout");
};
