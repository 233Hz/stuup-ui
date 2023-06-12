const Layout = () => import('@/layout/index.vue');

/**
 * 不需要菜单的路由
 */
export default [
  {
    path: '/grow',
    component: Layout,
    children: [
      {
        path: '/garden/:id',
        name: 'Garden',
        component: () => import('@/views/garden/index.vue'),
      },
    ],
  },
];
