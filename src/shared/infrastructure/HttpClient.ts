import axios from 'axios';
import type { AxiosError, AxiosInstance } from 'axios';
import type { ApiError } from '@/shared/domain/errors';

class HttpClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const apiError: ApiError = {
          status: error.response?.status ?? 500,
          message:
            (error.response?.data as { message?: string })?.message ??
            error.message,
          details: error.response?.data,
        };
        return Promise.reject(apiError);
      }
    );
  }

  get<T>(url: string, params?: Record<string, unknown>) {
    return this.client.get<T>(url, { params });
  }
  post<T>(url: string, data?: unknown) {
    return this.client.post<T>(url, data);
  }
  put<T>(url: string, data?: unknown) {
    return this.client.put<T>(url, data);
  }
  patch<T>(url: string, data?: unknown) {
    return this.client.patch<T>(url, data);
  }
  delete<T>(url: string) {
    return this.client.delete<T>(url);
  }
}

export const httpClient = new HttpClient();