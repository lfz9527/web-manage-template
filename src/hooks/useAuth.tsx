import { getToken } from '@/utils';
import { useModel } from '@umijs/max';

const useAuth = () => {
  const { initialState } = useModel('@@initialState');
  const isLogin = getToken() || initialState?.id;

  return {
    isLogin,
  };
};

export default useAuth;
