import { defineStore } from 'pinia'
import { removeToken, setToken } from '@/utils/auth'
import type { UserInfoState } from './types/type'
import { reqLogin } from '@/api/login'
import { LoginForm } from '@/api/login/type'
import { resetRouter } from '@/router'
import { STORAGE_KEY, useWebCache } from '@/utils/cache'
import { USER_TYPE } from '@/utils/dict'

const webCache = useWebCache()

const useUserStore = defineStore('User', {
  state: (): UserInfoState => {
    return {
      userInfo: webCache.get(STORAGE_KEY.USER_INFO),
    }
  },
  getters: {
    isStudent(): boolean {
      return this.userInfo.userType === USER_TYPE.STUDENT
    },
  },
  actions: {
    async userLogin(data: LoginForm) {
      try {
        const result = await reqLogin(data)
        setToken(result.token as string)
        this.userInfo = result.data
        webCache.set(STORAGE_KEY.USER_INFO, result.data)
        return result
      } catch (error) {
        return Promise.reject(error as Error)
      }
    },
    userLogout() {
      removeToken()
      webCache.clear()
      resetRouter()
    },
    updateAvatar(url: string) {
      this.userInfo.avatar = url
      this.updateLocalStorage()
    },
    updateTotalScore(score: number) {
      this.userInfo.totalScore += score
      this.updateLocalStorage()
    },
    /**
     * 更新 LocalStorage
     */
    updateLocalStorage() {
      webCache.set(STORAGE_KEY.USER_INFO, this.userInfo)
    },
  },
})

export default useUserStore
