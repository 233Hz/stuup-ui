import axios, {
  InternalAxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
} from 'axios'
import { getToken, setToken } from '@/utils/auth'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
import pinia from '@/store'

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})
// 添加请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 设置token
    if (getToken()) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  (error: any) => {
    // 处理请求错误
    return Promise.reject(error)
  },
)
// 添加响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 二进制数据则直接返回
    if (
      response.request.responseType === 'blob' ||
      response.request.responseType === 'arraybuffer'
    ) {
      return response
    }
    const { data } = response
    const code = data.code
    const msg = data.message

    if (code === 1002) {
      ElMessage.error('登录超时,请重新登录')
      const userStore = useUserStore(pinia)
      userStore.userLogout()
      window.location.reload()
    } else if (code === 1004) {
      const refreshToken = data.token
      // 获取当前失败的请求
      const config = response.config
      // 更新本地token
      setToken(refreshToken)
      // 重试当前请求并返回promise
      return request(config)
    } else if (code !== 0) {
      ElMessage.error(msg)
      return Promise.reject(msg)
    }
    return response
  },
  (error: any) => {
    // 处理响应错误
    ElMessage.error(error.message)
    return Promise.reject(error)
  },
)
export default request
