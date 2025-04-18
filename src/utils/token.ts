import { LOGIN_PATH } from '@/enum';
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
    history.push(LOGIN_PATH);
    message.success('退出成功');
  };

  const token = getToken();
  if (!token) {
    logout();
    return;
  }
  try {
    logout();
  } catch (error) {
    console.error(error);
  }
};

export { getToken, logoutFn, removeToken, setToken };
