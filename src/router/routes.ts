import { RouteRecordRaw } from 'vue-router'

export const constantRoute: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true,
      icon: '',
      flag: 3,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404',
      hidden: true,
      icon: '',
      flag: 3,
    },
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: 'NotFound',
      icon: '',
      hidden: true,
      flag: 3,
    },
  },
  {
    path: '',
    name: 'App',
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: true,
          icon: 'House',
          flag: 1,
        },
      },
      {
        path: '/garden/:id',
        name: 'Garden',
        component: () => import('@/views/garden/index.vue'),
        meta: {
          title: '成长花园',
          hidden: true,
          icon: '',
          flag: 1,
        },
      },
      {
        path: '/article/:id',
        name: 'Article',
        component: () => import('@/views/article/index.vue'),
        meta: {
          title: '文章详情',
          hidden: true,
          icon: '',
          flag: 1,
        },
      },
      {
        path: '/self/center',
        name: 'SelfCenter',
        component: () => import('@/views/self/center/index.vue'),
        meta: {
          title: '个人中心',
          hidden: true,
          icon: '',
          flag: 3,
        },
      },
      {
        path: '/self/notify',
        name: 'SelfNotify',
        component: () => import('@/views/self/message/index.vue'),
        meta: {
          title: '我的通知',
          hidden: true,
          icon: '',
          flag: 3,
        },
      },
    ],
  },
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      title: '可视化',
      hidden: false,
      icon: 'home-icon-screen',
      flag: 1,
    },
  },
]
