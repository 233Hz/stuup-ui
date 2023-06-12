import router from '@/router';
import NProgress from '@/utils/progress';
import { existToken } from '@/utils/auth';
import { usePermissionStoreWithOut } from '@/store/modules/premission';
import { queryUserAuthority } from '@/api/system/user/index';
import { useUserStoreWithOut, UserInfoType } from '@/store/modules/user';
import { userFlowerStoreWithOut } from './store/modules/flowers';
import pageRouter from '@/router/pageRouter';

const whiteList: string[] = ['/login', '/404'];

// ↓全局后置钩子
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (existToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      const userInfo = sessionStorage.getItem('user_info');
      if (userInfo) {
        const userStore = useUserStoreWithOut();
        userStore.setUserInfo(JSON.parse(userInfo) as UserInfoType);
      }
      const flowersStore = userFlowerStoreWithOut();
      if (!flowersStore.getIsExist) {
        await flowersStore.loadFLowersConfig();
      }
      const premissionStore = usePermissionStoreWithOut();
      if (!premissionStore.getRouters.length) {
        const { data: res } = await queryUserAuthority();
        await premissionStore.generateRoutes(res);
        premissionStore.getRouters.forEach(route => router.addRoute(route));
        pageRouter.forEach(route => router.addRoute(route));
        if (to.name === '404') {
          next({ path: to.path, query: to.query });
        } else {
          // 请求带有 redirect 重定向时，登录自动重定向到该地址
          if (from.query.redirect) {
            const redirect = decodeURIComponent(from.query.redirect as string);
            next({ path: redirect });
          } else {
            next({ ...to, replace: true });
          }
          next({ ...to, replace: true });
        }
      } else {
        next();
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next('/login');
    }
  }
});

// ↓全局后置钩子
router.afterEach(() => {
  NProgress.done();
});
