// utils/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const setAuthToken = (token: string) => {
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default axiosClient;
