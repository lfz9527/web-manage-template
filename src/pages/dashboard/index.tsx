import { getSystemClearStaticFileCache } from '@/services/api/system';
import { Button, message } from 'antd';
import { useState } from 'react';

export default () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);

  const clearSiteResourceCache = async () => {
    setLoading(true);
    if (loading) return;
    await getSystemClearStaticFileCache();

    messageApi.success('清理成功');
    setLoading(false);
  };

  return (
    <div>
      {contextHolder}
      <h3 style={{ marginBottom: 20 }}>欢迎使用吉韵站群系统后台管理</h3>

      <Button
        size="large"
        type="primary"
        loading={loading}
        onClick={clearSiteResourceCache}
      >
        清理站点静态资源缓存
      </Button>
    </div>
  );
};
