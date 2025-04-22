import { extend } from 'umi-request';
import { message } from 'antd';
import { logger } from '@/utils';

// 错误处理方案
const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队',
  204: '删除数据成功',
  400: '请求错误',
  401: '用户没有权限（令牌、用户名、密码错误）',
  403: '用户得到授权，但是访问是被禁止的',
  404: '请求地址不存在',
  406: '请求的格式不可得',
  500: '服务器发生错误',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
};


const systemCode = {
  10402: '请重新登录',
  10500: '请求失败',
}

// 错误处理
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    message.error(`请求错误 ${response.status}: ${errorText}`);
  } else if (!response) {
    message.error('您的网络发生异常，无法连接服务器');
  }
  return response;
};

// 创建实例
const request = extend({
  timeout: 100000, // 超时时间
  errorHandler, // 错误处理
  credentials: 'include', // 默认请求是否带上cookie
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use((url, options) => {
  logger.info(`请求路径：${url}`);

  // 这里可以添加token等通用处理
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxIiwiVXNlck5hbWUiOiJhZG1pbiIsIlJvbGUiOiIxIiwibmJmIjoxNzQ1MzAyMTQwLCJleHAiOjE3NDU1NjEzNDAsImlhdCI6MTc0NTMwMjE0MH0.FxAauLFgTVInBx-uEzFttll0ugsVD6oswUrv2VJGehQ'
  const authHeader = { Authorization: `Bearer ${token}` };
  return {
    url,
    options: { ...options, headers: { ...options.headers, ...authHeader } },
  };
});

// 响应拦截器
request.interceptors.response.use(async (response) => {
  const data = await response.clone().json();
  if (data && data.code !== 10000) {
    const message = data.msg || systemCode[data.code as keyof typeof systemCode] || '服务器错误';
    message.error(message);
  }

  return response;
});

// 封装通用请求方法
export interface RequestOptions {
  [key: string]: any;
}


/**
 * 封装的通用请求方法
 * @param url 请求地址
 * @param options 请求配置
 * @returns Promise
 */
export async function createRequest<T = any>(
  url: string,
  options?: RequestOptions
): Promise<T> {
  try {
    return await request<T>(url, options);
  } catch (error) {
    logger.error(JSON.stringify(error));
    console.error('Request Error:', error);
    throw error;
  }
}

export default createRequest;