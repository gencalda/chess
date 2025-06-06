import axiosInstance from "axios";

export const axios = axiosInstance.create({
  baseURL: "https://api.chess.com",
  timeout: 2000,
});
