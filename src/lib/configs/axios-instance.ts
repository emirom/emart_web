import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const hasJsonContentType =
    config.headers?.["Content-Type"] === "application/json";

  const isEmptyBody =
    config.data === undefined ||
    config.data === null ||
    (typeof config.data === "object" &&
      Object.keys(config.data as Record<string, unknown>).length === 0);

  if (hasJsonContentType && isEmptyBody) {
    delete (config.headers as Record<string, unknown>)["Content-Type"];
    delete config.data;
  }

  return config;
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
