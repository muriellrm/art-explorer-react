import axios from "axios";
import axiosRetry, { isRetryableError } from "axios-retry";
import { QueryClient } from "react-query";
import { env } from "#/utils/env";
import { log } from "#/utils/logging";

export const request = axios.create({
  baseURL: env?.VITE_APP_BASE_URL,
  timeout: 30000,
  paramsSerializer: {
    indexes: null,
  },
});

axiosRetry(request, {
  retries: 3,
  retryCondition: isRetryableError,
});

request.interceptors.response.use(
  (response) => {
    const url = `${response.config?.baseURL}/${response.config?.url}`;
    const method = response.config?.method?.toUpperCase() || "GET";
    const status = response.status;

    log.info("Request completed successfully", { url, method, status });

    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      const url = `${error.config?.baseURL}/${error.config?.url}`;
      const method = error.config?.method?.toUpperCase() || "GET";
      const status = error.response?.status;

      log.error("Request failed", { url, method, status });
    }
    return Promise.reject(error);
  }
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
