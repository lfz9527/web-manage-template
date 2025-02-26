// 运行时配置
import { AUTO_LOGIN_KEY } from '@/enum';
import { getUserGetUserForPublic } from '@/services/api/user';
import { getToken, removeToken, setToken } from '@/utils';
import { LogoutOutlined } from '@ant-design/icons';
import { history, RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { Dropdown, MenuProps, message } from 'antd';
import Logo from './assets/icon/logo.svg';

const loginPath = '/login';

const logout = () => {
  removeToken();
  localStorage.removeItem(AUTO_LOGIN_KEY);
  history.push('/login');
};

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  name: string;
  avatar?: string;
}> {
  const fetchUserInfo = async () => {
    try {
      const data = await getUserGetUserForPublic({});
      return data;
    } catch (error) {
      // 清除登录状态并跳转登录页
      logout();
    }
  };

  if (location.pathname !== loginPath) {
    const data = await fetchUserInfo();

    const { nickName, headImage } = data as Record<string, any>;
    const url = headImage?.imgSrc;
    return {
      name: nickName || '管理员',
      avatar: url,
    };
  }
  return {
    name: '管理员',
    avatar: '',
  };
}

//运行时基本布局配置
export const layout: RunTimeLayoutConfig = ({
  initialState,
}: {
  initialState: any;
}) => {
  //initialState上面登录函数返回的信息

  const DropdownItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const DropdownOnClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      logout();
    }
  };

  const { location } = history;
  if (location.pathname === loginPath) {
    if (!getToken()) {
      logout();
    }
  }

  return {
    logo: Logo,
    title: '吉韵站群系统后台管理', //左上角Logo后面的名字
    menu: {
      locale: false,
    },
    layout: 'mix', //菜单的方式，有mix,top,side三种，这里用mix
    avatarProps: {
      src: initialState?.avatar || undefined, //右上角头像
      title: initialState?.name || '用户', //右上角名称
      size: 'small',
      render: (props, dom) => {
        return (
          <Dropdown
            menu={{
              items: DropdownItems,
              onClick: DropdownOnClick,
            }}
          >
            {dom}
          </Dropdown>
        );
      },
    },
    token: {
      // 菜单的样式配置
      sider: {
        //侧边菜单的配置 ，这里具体看文档
      },
    },
  };
};

interface ResponseData {
  code: number;
  data: any;
  msg: string;
}

const handleSuccess = ({ code, data, msg }: ResponseData) => {
  if (code === 10000) {
    return data;
  } else if (code === 10402) {
    localStorage.removeItem(AUTO_LOGIN_KEY);
    history.push('/login');
    throw new Error(msg || 'Login expired');
  } else {
    message.error(msg || 'request error');
    throw new Error(msg || 'request error');
  }
};

export const request: RequestConfig = {
  timeout: 1000000,
  // other axios options you want
  errorConfig: {
    errorHandler(error: any) {
      message.error(error.message || 'request error');
    },
    errorThrower(error) {
      console.log(123, error);
      throw new Error('request error');
    },
  },
  // 请求拦截
  requestInterceptors: [
    (config: any) => {
      const token = getToken();
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      return config;
    },
    (error: any) => {
      return error;
    },
  ],
  // 相应拦截
  responseInterceptors: [
    (response: any) => {
      const { status, data, headers } = response;
      const token = headers['login-token'];
      if (token) {
        setToken(token);
      }
      switch (status) {
        case 200:
          handleSuccess(data);
          return data;
        case 404:
          throw new Error('资源不存在');
        case 500:
          throw new Error('服务器错误');
        default:
          throw new Error('网络错误');
      }
    },
  ],
};
