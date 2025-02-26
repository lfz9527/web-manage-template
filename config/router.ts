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
  {
    name: '站群管理',
    path: '/site',
    icon: 'ProjectFilled',
    routes: [
      {
        path: '/site/manage',
        name: '站群管理',
        component: '@/pages/siteGroup/siteManage',
      },
      {
        path: '/site/site-config-key',
        name: '站群配置项',
        component: '@/pages/siteGroup/siteConfigKey',
      },
      {
        path: '/site/site-config-value',
        name: '站群配置值',
        component: '@/pages/siteGroup/siteConfigValue',
      },
    ],
  },
  {
    name: '广告管理',
    path: '/advertise',
    icon: 'ReconciliationFilled',
    component: '@/pages/advertise/advertiseManage',
  },
  {
    name: '品牌管理',
    path: '/brand',
    icon: 'InteractionFilled',
    component: '@/pages/brand/brandManage',
  },
  {
    name: '优惠券管理',
    path: '/deals',
    icon: 'MoneyCollectFilled',
    component: '@/pages/deals/dealsManage',
  },
  { path: '*', component: '404' },
];

export default routes;
