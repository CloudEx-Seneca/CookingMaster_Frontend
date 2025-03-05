import _ from 'lodash';

declare global {
  interface Window {
    env?: {
      API_URL?: string;
    };
  }
}

// Function to fetch env.js if not loaded yet
const getApiUrl = (): string => {
  if (!window.env || !window.env.API_URL) {
    console.warn("env.js not loaded yet, retrying...");
    return 'http://localhost:8888';  // Fallback
  }
  return window.env.API_URL;
};

export const getApiBaseUrl = (): string => getApiUrl();
