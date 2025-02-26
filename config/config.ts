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
    title: '@umijs/max',
  },
  routes: routes,
  npmClient: 'pnpm',
  proxy,
});
