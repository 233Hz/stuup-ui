import { defineStore } from 'pinia';
import { store } from '../index';
import { storeNames } from '../store-name';
import { removeToken } from '@/utils/auth';

export interface UserInfoType {
  userId: number | undefined;
  loginName: string;
  userName: string;
  mobile: string;
  deptId: number | undefined;
  userType: number | undefined;
  roleIds: string;
  yearId: number | undefined;
  isExitst: boolean;
}

export const useUserStore = defineStore(storeNames.USER, {
  state: (): UserInfoType => {
    return {
      userId: void 0,
      loginName: '',
      userName: '',
      mobile: '',
      deptId: void 0,
      userType: void 0,
      roleIds: '',
      yearId: void 0,
      isExitst: false,
    };
  },
  getters: {
    getUserId(): number | undefined {
      return this.userId;
    },
    getLoginName(): string {
      return this.loginName;
    },
    getUserName(): string {
      return this.userName;
    },
    getMobile(): string {
      return this.mobile;
    },
    getDeptId(): number | undefined {
      return this.deptId;
    },
    getUserType(): number | undefined {
      return this.userType;
    },
    getRoleId(): string {
      return this.roleIds;
    },
    getYearId(): number | undefined {
      return this.yearId;
    },
    getIsExitst(): boolean {
      return this.isExitst;
    },
  },
  actions: {
    setUserInfo(userInfo: UserInfoType) {
      this.userId = userInfo.userId;
      this.loginName = userInfo.loginName;
      this.userName = userInfo.userName;
      this.mobile = userInfo.mobile;
      this.deptId = userInfo.deptId;
      this.userType = userInfo.userType;
      this.roleIds = userInfo.roleIds;
      this.yearId = userInfo.yearId;
      this.isExitst = true;
    },
    loginOut(): Promise<void> {
      return new Promise(resolve => {
        this.userId = void 0;
        this.loginName = '';
        this.userName = '';
        this.mobile = '';
        this.deptId = void 0;
        this.userType = void 0;
        this.roleIds = '';
        this.yearId = void 0;
        this.isExitst = false;
        removeToken();
        localStorage.clear();
        sessionStorage.clear();
        resolve();
      });
    },
  },
});

export const useUserStoreWithOut = () => {
  return useUserStore(store);
};
