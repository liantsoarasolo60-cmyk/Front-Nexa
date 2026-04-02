import axios  from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Instance Axios globale
const baseURL ='http://localhost:3000/api/v1';

const api: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Intercepteur de RÉPONSE (gérer les erreurs globalement)
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const message =
      error.response?.message || 'Une erreur est survenue';
    const statusCode = error.response?.status;

    // Redirection si non authentifié
    if (statusCode === 401) {
      localStorage.removeItem('jwtToken');
    }

    // On rejette avec un objet d'erreur structuré
    return Promise.reject({
      message,
      statusCode,
      errors: error.response?.data?.errors || null,
    });
  }
);

export default api;