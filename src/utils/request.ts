import axios from 'axios';

// 1. 创建 axios 实例
const request = axios.create({
  baseURL: '/api', // 你的接口前缀
  timeout: 10000,
});

// 2. 请求拦截器：自动带上 token
request.interceptors.request.use(
  (config) => {
    // 从 localStorage 取 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. 响应拦截器：统一处理错误、登录过期
request.interceptors.response.use(
  (response) => {
    // 直接返回 data，简化页面使用
    return response.data;
  },
  (error) => {
    const { status } = error.response || {};

    // 401：未登录 / token 过期
    if (status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // 跳登录
      alert('登录已过期，请重新登录');
    }

    // 403：无权限
    if (status === 403) {
      alert('暂无权限访问');
    }

    return Promise.reject(error);
  }
);

export default request;