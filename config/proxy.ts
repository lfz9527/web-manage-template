const proxy = {
  '/api': {
    target: 'https://localhost:8900/',
    changeOrigin: true,
    secure: false,
  },
  '/upload': {
    target: 'https://localhost:8900/',
    changeOrigin: true,
    secure: false,
  },
};

export default proxy;
