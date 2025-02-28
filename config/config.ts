import { defineConfig } from '@umijs/max';
import define from './define';
import proxy from './proxy';
import routes from './router';

export default defineConfig({
  define,
  /**
   * @name 开启 hash 模式
   * @description 让 build 之后的产物包含 hash 后缀。通常用于增量发布和避免浏览器加载缓存。
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,
  /**
   * @name antd 插件
   * @description 内置了 babel import 插件
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {},
  /**
   * @name antd 插件
   * @description 内置了 babel import 插件
   * @doc https://umijs.org/docs/max/antd#antd
   */
  model: {},
  /**
   * 一个全局的初始数据流，可以用它在插件之间共享数据
   * @description 可以用来存放一些全局的数据，比如用户信息，或者一些全局的状态，全局初始状态在整个 Umi 项目的最开始创建。
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
   */
  initialState: {},
  /**
   * @name 请求配置
   * @description 配置请求的地址，超时时间，请求头等
   * @doc https://umijs.org/docs/max/request#request
   */
  request: {},
  /**
   * @name 布局配置
   * @description 配置布局的标题，菜单，面包屑等
   */
  layout: {
    title: '吉韵站群系统后台管理',
  },
  routes: routes,
  npmClient: 'pnpm',
  proxy,
});
