const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    name: '首页',
    icon: 'HomeOutlined',
    path: '/dashboard',
    component: '@/pages/dashboard',
  },
  { path: '*', component: '404' },
];

export default routes;
