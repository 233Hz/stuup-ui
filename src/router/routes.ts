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
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      hidden: false,
      icon: 'House',
      flag: 1,
    },
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '布局',
      hidden: false,
      icon: '',
      flag: 1,
    },
    children: [
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
        component: () => import('@/views/dashboard/Article.vue'),
        meta: {
          title: '文章详情',
          hidden: true,
          icon: '',
          flag: 1,
        },
      },
    ],
  },
  {
    path: '/self',
    redirect: '/center/center',
    name: 'Self',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '我的',
      hidden: false,
      icon: '',
      flag: 1,
    },
    children: [
      {
        path: '/self/center',
        name: 'SelfCenter',
        component: () => import('@/views/self/center/index.vue'),
        meta: {
          title: '个人中心',
          hidden: false,
          icon: '',
          flag: 1,
        },
      },
      {
        path: '/self/notify',
        name: 'SelfNotify',
        component: () => import('@/views/self/notify/index.vue'),
        meta: {
          title: '我的通知',
          hidden: false,
          icon: '',
          flag: 1,
        },
      },
    ],
  },
]
