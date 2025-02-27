import { TOKEN_KEY } from '@/enum';

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};
const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const isTrue = (value: string | boolean) => {
  return value === 'true' || value === true;
};

const isFalse = (value: string | boolean) => {
  return value === 'false' || value === false;
};

export { getToken, isFalse, isTrue, removeToken, setToken };
