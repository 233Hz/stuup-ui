const Layout = () => import('@/layout/index.vue');

/**
 * 不需要菜单的路由
 */
export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/garden/:id',
        name: 'Garden',
        component: () => import('@/views/garden/index.vue'),
      },
      {
        path: '/article/:id',
        name: 'Article',
        component: () => import('@/views/dashboard/Article.vue'),
      },
    ],
  },
  {
    path: '/self',
    redirect: '/center/center',
    component: Layout,
    children: [
      {
        path: '/self/center',
        name: 'SelfCenter',
        component: () => import('@/views/self/center/index.vue'),
      },
      {
        path: '/self/notify',
        name: 'SelfNotify',
        component: () => import('@/views/self/notify/index.vue'),
      },
    ],
  },
];
