import axios, {
  InternalAxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
} from 'axios'
import { STORAGE_KEY, useWebCache } from '@/utils/cache'
import { getToken } from '@/utils/auth'
import { reqOpenSafe } from '@/api/login/index'
import useUserStore from '@/store/modules/user'
import pinia from '@/store'
import type { SaTokenInfo } from '@/types/global'
import { ElMessage, ElMessageBox } from 'element-plus'

const webCache = useWebCache<SaTokenInfo>()
const userStore = useUserStore(pinia)

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})
// 添加请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 设置token
    const tokenName = webCache.get(STORAGE_KEY.TOKEN_INFO)?.tokenName
    if (tokenName && getToken()) {
      config.headers[tokenName] = getToken()
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
    const msg = data.msg

    if (code === 1002) {
      userStore.userLogout().then(() => {
        ElMessage.error('登录超时,请重新登录')
        return Promise.reject(msg)
      })
    } else if ([11016, 11012].includes(code)) {
      userStore.userLogout().then(() => {
        ElMessage.error(msg)
        return Promise.reject(msg)
      })
    } else if (code === 11071) {
      // 二级认证未通过
      const config = response.config
      ElMessage.warning('请进行二级认证')
      return new Promise((resolve, reject) => {
        ElMessageBox.prompt('请输入密码', '二次认证', {
          inputPattern: /^.+$/,
          inputPlaceholder: '请输入密码',
          confirmButtonText: '确 认',
          cancelButtonText: '取 消',
          inputErrorMessage: '请输入密码',
        })
          .then(async ({ value }) => {
            reqOpenSafe(data.data, value)
              .then((res) => {
                ElMessage.success(res.data)
                resolve(request(config))
              })
              .catch((error) => {
                reject(error)
              })
          })
          .catch(() => {
            ElMessage.error(msg)
            reject(msg)
          })
      })
    } else if (code !== 0) {
      ElMessage.error(msg)
      return Promise.reject(msg)
    }
    return response
  },
  (error: any) => {
    // 处理响应错误
    ElMessage.error(error.msg)
    return Promise.reject(error)
  },
)
export default request
