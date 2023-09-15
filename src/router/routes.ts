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
        path: '/portrait/:id',
        name: 'Portrait',
        component: () => import('@/views/portrait/index.vue'),
        meta: {
          title: '我的成长画像',
          hidden: true,
          icon: 'home-icon-portrait',
          flag: 1,
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
  {
    path: '/self/message/notify',
    name: 'MessageNotify',
    component: () => import('@/views/self/message/notify/index.vue'),
    meta: {
      title: '通知公告',
      hidden: false,
      icon: 'home-icon-message-notify',
      flag: 1,
    },
  },
  {
    path: '/self/message/system',
    name: 'MessageSystem',
    component: () => import('@/views/self/message/system/index.vue'),
    meta: {
      title: '智慧提醒',
      hidden: false,
      icon: 'home-icon-message-system',
      flag: 1,
    },
  },
]
