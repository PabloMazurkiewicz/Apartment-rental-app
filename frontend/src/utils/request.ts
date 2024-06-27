/**
 * @author Dias
 * @date 2024/6/20
 * @description Authorized Axios Request.
 */

import axios from 'axios';
import constants from './constants';

const api = axios.create({
  baseURL: constants.API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      config.headers['Authorization'] = user.accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
