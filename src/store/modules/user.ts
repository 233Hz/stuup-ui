import { defineStore } from 'pinia'
import { removeToken, setToken } from '@/utils/auth'
import { reqLogin, reqLogout } from '@/api/login'
import { LoginForm } from '@/api/login/type'
import { resetRouter } from '@/router'
import { STORAGE_KEY, useWebCache } from '@/utils/cache'
import { USER_TYPE } from '@/utils/dict'
import type { UserInfoState } from './types/type'
import type { UserInfo, GrowthInfo, OtherInfo } from '@/api/login/type'
import type { SaTokenInfo } from '@/types/global'
import { passwordRegex } from '@/utils/regex'

const webCache = useWebCache<SaTokenInfo>()

const useUserStore = defineStore('User', {
  state: (): UserInfoState => {
    return {
      userInfo: {
        userId: 0,
        userName: '',
        userType: 0,
        avatarUrl: void 0,
      },
      tokenInfo: webCache.get(STORAGE_KEY.TOKEN_INFO) || {
        tokenName: '',
        tokenValue: '',
        isLogin: false,
        loginId: 0,
        loginType: '',
        tokenTimeout: 0,
        sessionTimeout: 0,
        tokenSessionTimeout: 0,
        tokenActiveTimeout: 0,
        loginDevice: '',
        tag: '',
      },
      roles: [],
      permissions: [],
      growthInfo: {
        totalScore: 0,
        rank: 0,
      },
      otherInfo: {
        studentId: void 0,
        yearId: 0,
        semesterId: 0,
      },
      isSet: false,
      updatePasswordTips: false,
    }
  },
  getters: {
    isStudent(): boolean {
      return this.userInfo?.userType === USER_TYPE.STUDENT
    },
  },
  actions: {
    async userLogin(data: LoginForm) {
      try {
        const result = await reqLogin(data)
        if (!passwordRegex.test(data.password)) {
          this.updatePasswordTips = true
        }
        const tokenInfo = result.tokenInfo!
        this.tokenInfo.tokenName = tokenInfo.tokenName
        this.tokenInfo.tokenValue = tokenInfo.tokenValue
        this.tokenInfo.isLogin = tokenInfo.isLogin
        this.tokenInfo.loginId = tokenInfo.loginId
        this.tokenInfo.loginType = tokenInfo.loginType
        this.tokenInfo.tokenTimeout = tokenInfo.tokenTimeout
        this.tokenInfo.sessionTimeout = tokenInfo.sessionTimeout
        this.tokenInfo.tokenSessionTimeout = tokenInfo.tokenSessionTimeout
        this.tokenInfo.tokenActiveTimeout = tokenInfo.tokenActiveTimeout
        this.tokenInfo.loginDevice = tokenInfo.loginDevice
        this.tokenInfo.tag = tokenInfo.tag
        setToken(result.tokenInfo!.tokenValue as string)
        webCache.set(STORAGE_KEY.TOKEN_INFO, tokenInfo)
        return result
      } catch (error) {
        return Promise.reject(error as Error)
      }
    },
    async userLogout() {
      try {
        const result = await reqLogout(this.tokenInfo?.loginId)
        // 删除tokene
        removeToken()
        // 情况本地缓存
        webCache.clear()
        // 重置路由
        resetRouter()
        window.location.reload()
        return result
      } catch (error) {
        console.trace(error)
        return Promise.reject(error as Error)
      }
    },
    setUserInfo(userInfo: UserInfo) {
      this.userInfo.userId = userInfo.userId
      this.userInfo.userName = userInfo.userName
      this.userInfo.userType = userInfo.userType
      this.userInfo.avatarUrl = userInfo.avatarUrl
    },
    setRoles(roles: string[]) {
      this.roles = roles
    },
    setPermissions(permissions: string[]) {
      this.permissions = permissions
    },
    setGrowthInfo(growthInfo: GrowthInfo) {
      this.growthInfo.totalScore = growthInfo.totalScore
      this.growthInfo.rank = growthInfo.rank
    },
    setOtherInfo(otherInfo: OtherInfo) {
      this.otherInfo.studentId = otherInfo.studentId
      this.otherInfo.yearId = otherInfo.yearId
      this.otherInfo.semesterId = otherInfo.semesterId
    },
    updateIsSet() {
      this.isSet = true
    },
    updateAvatar(url: string) {
      this.userInfo.avatarUrl = url
    },
    updateTotalScore(score: number) {
      this.growthInfo.totalScore += score
    },
    cancelUpdatePasswordTips() {
      this.updatePasswordTips = false
    },
  },
})

export default useUserStore
