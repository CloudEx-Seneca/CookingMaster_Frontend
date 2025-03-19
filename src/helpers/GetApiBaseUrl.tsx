import _ from 'lodash';

declare global {
  interface Window {
    env?: {
      API_URL?: string;
      RECIPE_API_URL?: string;
    };
  }
}

// Function to fetch env.js if not loaded yet
const getApiUrl = (): string => {
  if (!window.env || !window.env.API_URL) {
    console.warn("env.js not loaded yet, retrying...");
    return 'http://localhost:8080';  // Fallback
  }
  return window.env.API_URL;
};

export const getApiBaseUrl = (): string => getApiUrl();

const getApiUrlRec = (): string => {
  if (!window.env || !window.env.RECIPE_API_URL) {
    console.warn("env.js not loaded yet, retrying...");
    return 'http://localhost:8081';  // Fallback
  }
  return window.env.RECIPE_API_URL;
};

export const getApiBaseUrlRec = (): string => getApiUrlRec();

