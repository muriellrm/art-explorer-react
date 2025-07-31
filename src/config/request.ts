import axios from "axios";
import axiosRetry, { isRetryableError } from "axios-retry";
import { QueryClient } from "react-query";

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 30000,
  paramsSerializer: {
    indexes: null,
  },
});

axiosRetry(request, {
  retries: 3,
  retryCondition: isRetryableError,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});