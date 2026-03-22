import axios from 'axios';

// Professional API client with base configuration
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for mock data simulation or auth tokens
api.interceptors.request.use((config) => {
  // In a real app, inject JWT here
  // const token = localStorage.getItem('token');
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
