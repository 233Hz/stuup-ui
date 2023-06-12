const Layout = () => import('@/layout/index.vue');

/**
 * 路由
 */
export default [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {},
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: '',
          flag: 1,
        },
      },
    ],
  },
  {
    path: '/dashboard',
    component: Layout,
    meta: {},
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '控制台',
          icon: '',
          flag: 2,
        },
      },
    ],
  },
];
