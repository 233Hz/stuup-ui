import axios from 'axios'
import { getToken, setToken } from '@/utils/auth'
import errorCode from '@/const/errorCode'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
import { resetRouter } from '@/router'

let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 二进制数据则直接返回
    if (
      response.request.responseType === 'blob' ||
      response.request.responseType === 'arraybuffer'
    )
      return response
    const { data } = response
    const code = data.code
    const msg = data.message
    if (code === 1002) {
      ElMessage.error('登录超时,请重新登录')
      const userStore = useUserStore()
      userStore.userLogout()
      resetRouter()
      // 干掉token后再走一次路由让它过router.beforeEach的校验
      window.location.href = window.location.href
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
  (error) => {
    const status = error.response.status
    const msg = errorCode[status] || errorCode['default']
    ElMessage({
      message: msg,
      type: 'error',
    })
    return Promise.reject(error)
  },
)
