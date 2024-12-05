import axios from 'axios';

// Create axios instance with base configuration
const instance = axios.create({
  baseURL: '',  // Use empty base URL since we'll include the full path in requests
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-From': 'admin'
  },
  withCredentials: true
});

instance.interceptors.request.use(config => {
  // Ensure URL ends with slash
  if (!config.url.endsWith('/')) {
    config.url += '/';
  }

  // Log request details
  console.log('Request:', {
    url: config.url,
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