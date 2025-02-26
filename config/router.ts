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
    icon: 'DashboardFilled',
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
    path: '/site-group',
    icon: 'ProjectFilled',
    routes: [
      {
        path: '/site-group/manage',
        name: '站群管理',
        component: '@/pages/siteGroup/siteManage',
      },
      {
        path: '/site-group/site-config-key',
        name: '站群配置项',
        component: '@/pages/siteGroup/siteConfigKey',
      },
      {
        path: '/site-group/site-config-value',
        name: '站群配置值',
        component: '@/pages/siteGroup/siteConfigValue',
      },
    ],
  },
  {
    name: '站点管理',
    path: '/sites',
    icon: 'ReconciliationFilled',
    component: '@/pages/sites/sitesManage',
  },
  {
    name: '广告管理',
    path: '/advertise',
    icon: 'CustomerServiceFilled',
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
  {
    name: '商品管理',
    path: '/goods',
    icon: 'CarryOutFilled',
    routes: [
      {
        path: '/goods/goodsManage',
        name: '商品管理',
        component: '@/pages/goods/goodsManage',
      },
      {
        path: '/goods/categoryManage',
        name: '分类管理',
        component: '@/pages/goods/categoryManage',
      },
      {
        path: '/goods/tagManage',
        name: '标签管理',
        component: '@/pages/goods/tagManage',
      },
    ],
  },
  {
    name: '专辑管理',
    path: '/album',
    icon: 'BookFilled',
    routes: [
      {
        path: '/album/albumManage',
        name: '专辑管理',
        component: '@/pages/album/albumManage',
      },
      {
        path: '/album/postManage',
        name: '帖子管理',
        component: '@/pages/album/postManage',
      },
    ],
  },
  {
    name: '统计管理',
    path: '/statistics',
    icon: 'CalculatorFilled',
    routes: [
      {
        path: '/statistics/accessStatistics',
        name: '访问统计',
        component: '@/pages/statistics/accessStatistics',
      },
      {
        path: '/statistics/sourceStatistics',
        name: '来源统计',
        component: '@/pages/statistics/sourceStatistics',
      },
    ],
  },
  {
    name: '友情链接',
    path: '/friend',
    icon: 'LinkOutlined',
    component: '@/pages/friend/friendLink',
  },
  {
    name: '日志管理',
    path: '/logs',
    icon: 'FileWordFilled',
    routes: [
      {
        path: '/logs/userLog',
        name: '用户日志',
        component: '@/pages/logs/userLog',
      },
      {
        path: '/logs/errorLog',
        name: '错误日志',
        component: '@/pages/logs/errorLog',
      },
      {
        path: '/logs/textLog',
        name: '文本日志',
        component: '@/pages/logs/textLog',
      },
    ],
  },

  { path: '*', component: '404' },
];

export default routes;
