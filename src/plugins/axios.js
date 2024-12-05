import axios from 'axios';
import localConfig from '../local_config';

const isDev = import.meta.env.DEV;
const baseURL = localConfig.api;

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-From': 'admin'
  }
});

instance.interceptors.request.use(config => {
  if (!config.url.endsWith('/')) {
    config.url += '/';
  }

  console.log('Request:', {
    url: config.url,
    fullUrl: `${baseURL}${config.url}`,
    method: config.method,
    headers: config.headers,
    data: config.data
  });
  
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  response => {
    console.log('Response:', {
      status: response.status,
      data: response.data,
      url: response.config.url
    });
    return response;
  },
  error => {
    console.error('Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url
    });

    if (error.response?.status === 401) {
      localStorage.removeItem('jwt_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;