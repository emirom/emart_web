import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../configs/axios-instance";

export interface MutatorConfig<TVariables> {
  query: string;
  variables?: TVariables;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  config?: AxiosRequestConfig;
}

export const axiosMutator = async <TData = unknown, TVariables = unknown>({
  query,
  variables,
  method = "GET",
  config,
}: MutatorConfig<TVariables>): Promise<TData> => {
  const response: AxiosResponse<TData> = await axiosInstance({
    url: query,
    method,
    data: variables,
    ...config,
  });
  return response.data;
};
