const Layout = () => import('@/layout/index.vue')

/**
 * 路由
 */
export default [
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    name: 'Layout',
    meta: {
      title: '首页',
      icon: '',
      flag: 1,
      hidden: false,
    },
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
          title: '首页',
          icon: '',
          flag: 2,
          hidden: false,
        },
      },
    ],
  },
]
