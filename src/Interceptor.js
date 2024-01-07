import axios from './instance';

// Request Interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error, "ttt");
    return Promise.reject(error);
  }
);

// Response Interceptor
axios.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      window.location.href = '/login';
    }
    return response;
  },
  (error) => {
    // localStorage.removeItem("token");
    window.location.href = '/login';
    console.log(error);
    return Promise.reject(error);
  }
);

export default axios;