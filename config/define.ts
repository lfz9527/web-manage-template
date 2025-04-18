import env from './env';

export default {
  TOKEN_KEY: process.env.TOKEN_KEY,
  TIMEOUT: process.env.TIMEOUT,
  BASE_URL: process.env.BASE_URL,
  UPLOAD_URL: process.env.UPLOAD_URL,
  DEFAULT_NAME: process.env.DEFAULT_NAME,
  ...env,
};
