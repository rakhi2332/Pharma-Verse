// Centralized API Base URL Configuration for PharmaVerse
// Uses environment variable VITE_API_URL if defined.
// In production (e.g. Vercel), if VITE_API_URL is not set, defaults to relative '/api'
// In development (localhost), defaults to 'http://localhost:5000/api'

const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/$/, '');
  }

  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return '/api';
  }

  return 'http://localhost:5000/api';
};

export const API_BASE_URL = getApiBaseUrl();

export default API_BASE_URL;
