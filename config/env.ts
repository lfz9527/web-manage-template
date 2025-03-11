// 配置多环境下的环境变量
const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        UPLOAD_URL: '',
      };
    case 'production':
      return {
        UPLOAD_URL: 'https://www.goodsfill.com',
      };
  }
  return {};
};

const env = getEnv();

export default env;
