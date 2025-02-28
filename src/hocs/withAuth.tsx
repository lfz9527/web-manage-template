import { LOGIN_PATH } from '@/enum';
import { useAuth } from '@/hooks';
import { Navigate } from '@umijs/max';

const withAuth = (Component: React.ComponentType<any>) => {
  return (props: React.ComponentProps<any>) => {
    const { isLogin } = useAuth();
    if (isLogin) {
      return <Component {...props} />;
    } else {
      return <Navigate to={LOGIN_PATH} />;
    }
  };
};

export default withAuth;
