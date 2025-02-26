const { generateService } = require('@umijs/openapi');

generateService({
  requestLibPath: "import { request } from '@umijs/max'",
  schemaPath: 'https://localhost:8900/swagger/v1/swagger.json', // 可以是.json文件，也可以是远程json地址
  serversPath: './src/services',
});
