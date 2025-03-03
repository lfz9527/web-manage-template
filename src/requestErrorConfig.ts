import { AUTO_LOGIN_KEY, LOGIN_PATH } from '@/enum';
import { getToken, logger, removeToken, setToken } from '@/utils';
import type { RequestConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { message } from 'antd';

// 与后端约定的响应数据格式
type ResponseStructure = API.REWebApiCallback;

type ResponseData = {
  status: number;
  data: ResponseStructure;
  message: string;
  headers: any;
};

const isSuccess = (code: number) => {
  return code === 10000;
};

// 退出登录
const handleLogout = () => {
  removeToken();
  localStorage.removeItem(AUTO_LOGIN_KEY);
  history.push(LOGIN_PATH);
};

const errorThrower = (res: ResponseStructure) => {
  const { code, data, msg } = res;
  if (!isSuccess(code!)) {
    const error: any = new Error(msg);
    error.name = 'BizError';
    error.info = { code, msg, data };
    throw error; // 抛出自制的错误
  }
};

// 错误处理
const errorHandle = (response: ResponseData) => {
  try {
    errorThrower(response.data);
  } catch (error: any) {
    const { code, msg } = error.info as ResponseStructure;
    let messageContent = '';
    switch (code) {
      case 10402:
        handleLogout();
        messageContent = msg || '请重新登录';
        logger.error(messageContent);
        break;
      default:
        messageContent = msg || 'request error';
        logger.error(messageContent);
        message.error({
          content: messageContent,
          duration: 2,
        });
    }
    throw new Error(messageContent);
  }
};

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      console.log(123, res);
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {},
  },
  // 请求拦截器
  requestInterceptors: [
    (config: any) => {
      const { url, headers } = config;
      const token = getToken();
      logger.info(`请求路径：${url}`);
      if (token) {
        headers['Authorization'] = 'Bearer ' + token;
      }
      return config;
    },
  ],
  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const {
        status,
        headers,
        message: resMessage,
      } = response as unknown as ResponseData;
      const token = headers['login-token'];
      if (token) {
        setToken(token);
      }
      let errorMessage = '';
      if (status === 200) {
        errorHandle(response as unknown as ResponseData);
      } else if (status === 404) {
        errorMessage = resMessage || '请求资源不存在';
      } else if (status === 500) {
        errorMessage = resMessage || '服务器内部错误';
      } else {
        errorMessage = resMessage || '网络错误';
      }
      if (errorMessage) {
        logger.error(errorMessage);
        message.error(errorMessage);
      }
      return { ...response };
    },
  ],
};
