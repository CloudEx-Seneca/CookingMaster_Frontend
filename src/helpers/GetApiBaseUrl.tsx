import _ from 'lodash';

// Fetch API environment URL from environment variable
const API_ENV = process.env.REACT_APP_API_URL;
console.log(API_ENV)

// Fallback to local API URL if the environment variable is not set
const LOCAL_API = 'http://localhost:8888'; 

// Function to get the API base URL
export const getApiBaseUrl = (): string => {
  return _.isEmpty(API_ENV) ? LOCAL_API : API_ENV;
};
