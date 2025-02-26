import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './router';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '吉韵站群系统后台管理',
  },
  routes: routes,
  npmClient: 'pnpm',
  proxy,
});
