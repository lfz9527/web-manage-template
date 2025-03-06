import { AUTO_LOGIN_KEY, CURRENT_SITE_ID, LOGIN_PATH } from '@/enum';
import { postUserLoginOut } from '@/services/api/user';
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

const logoutFn = async () => {
  const logout = () => {
    removeToken();
    localStorage.removeItem(AUTO_LOGIN_KEY);
    sessionStorage.removeItem(CURRENT_SITE_ID);
    history.push(LOGIN_PATH);
    message.success('退出成功');
  };

  const token = getToken();
  if (!token) {
    logout();
    return;
  }

  try {
    await postUserLoginOut();
    logout();
  } catch (error) {
    console.error(error);
  }
};

export { getToken, logoutFn, removeToken, setToken };
