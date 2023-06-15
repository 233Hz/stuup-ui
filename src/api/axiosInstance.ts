import axios, { InternalAxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import { getToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});
// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 设置token
    if (getToken()) {
      config.headers.Authorization = getToken();
    }
    return config;
  },
  (error: any) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 二进制数据则直接返回
    if (response.request.responseType === 'blob' || response.request.responseType === 'arraybuffer') {
      return response;
    }
    const { data } = response;
    const code = data.code;
    const msg = data.message;
    if (code !== 0) {
      ElMessage.error(msg);
      return Promise.reject(msg);
    }
    return response;
  },
  (error: any) => {
    // 处理响应错误
    ElMessage.error(error.message);
    return Promise.reject(error);
  }
);
export default axiosInstance;
