// src/lib/configs/axios-instance.ts
import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstance = async <T = unknown>({
  method,
  url,
  data,
  headers,
  params,
}: AxiosRequestConfig): Promise<T> => {
  const response = await instance.request<T>({
    method,
    url,
    data,
    headers,
    params,
  });
  return response.data;
};
