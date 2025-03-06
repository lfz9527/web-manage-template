// 运行时配置

import { Header, PageContainer } from '@/components';
import { LOGIN_PATH } from '@/enum';
import { getUserGetUserForPublic } from '@/services/api/user';
import { logoutFn } from '@/utils';
import type { HeaderProps } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { RequestConfig } from '@umijs/max';
import { errorConfig } from './requestErrorConfig';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

type InitialStateType = {
  name: string;
  avatar?: string;
  id: string;
};

export async function getInitialState(): Promise<InitialStateType> {
  const fetchUserInfo = async () => {
    try {
      const { data } = await getUserGetUserForPublic({});
      return data;
    } catch (error) {
      // 清除登录状态并跳转登录页
      logoutFn();
    }
  };

  if (location.pathname !== LOGIN_PATH) {
    const data = await fetchUserInfo();
    const { nickName, headImage, userId } = data as Record<string, any>;
    const url = headImage?.imgSrc;
    return {
      name: nickName,
      avatar: url,
      id: userId,
    };
  }
  return {
    name: '管理员',
    avatar: '',
    id: '',
  };
}

// 运行时基本布局配置
export const layout: RunTimeLayoutConfig = ({
  initialState,
}: {
  initialState?: InitialStateType;
}) => {
  //initialState上面登录函数返回的信息
  return {
    menu: {
      locale: false,
    },
    layout: 'mix', //菜单的方式，有mix,top,side三种，这里用mix
    // 自定义头部
    headerRender: (props: HeaderProps) => {
      return <Header {...props} />;
    },
    // 使用withAuth包装子组件
    childrenRender: (children) => <PageContainer>{children}</PageContainer>,
    token: {
      // 菜单的样式配置
      sider: {
        //侧边菜单的配置 ，这里具体看文档
        colorMenuBackground: '#fff',
      },
    },
  };
};

export const request: RequestConfig = {
  timeout: parseInt(TIMEOUT),
  baseURL: BASE_URL,
  ...errorConfig,
};
