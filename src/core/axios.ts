import axios from "axios";

import { API_BASE_URL, API_VERSION } from "@/core/constants";

export const $api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if((error.response.status == 403 && error.config && !error.config._isRetry) || error.response.status == 401) {
      originalRequest._isRetry = true;
     try {
      const response = await axios.post(`${API_BASE_URL}/api/${API_VERSION}/user/refresh`, null,  
      {withCredentials: true});
      console.log(response.data.access_token)
      localStorage.setItem('token', response.data.access_token);
      return $api.request(originalRequest);
     } catch (e) {
      console.log(e)
     }
    }
    throw error;
  },
);
