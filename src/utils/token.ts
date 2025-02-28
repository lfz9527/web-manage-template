import { CURRENT_SITE_ID, LOGIN_PATH } from '@/enum';
import { history } from '@umijs/max';
import { message } from 'antd';

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};
const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const logoutFn = () => {
  if (!getToken()) {
    removeToken();
    sessionStorage.removeItem(CURRENT_SITE_ID);
    history.push(LOGIN_PATH);
    message.success('退出成功');
  }
};

export { getToken, logoutFn, removeToken, setToken };
