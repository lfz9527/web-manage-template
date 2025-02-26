const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    name: '登录',
    path: '/login',
    component: '@/pages/login',
    layout: false,
  },
  {
    name: '控制台',
    path: '/dashboard',
    icon: 'DashboardOutlined',
    component: '@/pages/dashboard',
  },
  {
    name: '用户管理',
    path: '/user',
    icon: 'UserOutlined',
    routes: [
      {
        path: '/user/manage',
        name: '用户管理',
        component: '@/pages/user/userManage',
      },
      {
        path: '/user/third-party',
        name: '第三方账号',
        component: '@/pages/user/thirdParty',
      },
      {
        path: '/user/platforms',
        name: '第三方平台',
        component: '@/pages/user/platforms',
      },
    ],
  },
  { path: '*', component: '404' },
];

export default routes;
