import { message } from 'antd';
import { useState } from 'react';

export default () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  return <div>首页</div>;
};
