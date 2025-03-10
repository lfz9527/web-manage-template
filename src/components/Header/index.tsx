import Logo from '@/assets/icon/logo.svg';
import { getWebSiteGetWebSiteList } from '@/services/api/webSite';
import { getCurrentSiteId, logoutFn, setCurrentSiteId } from '@/utils';
import { LogoutOutlined } from '@ant-design/icons';
import type { HeaderProps } from '@ant-design/pro-layout';
import { history, useModel } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Form, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';

const DropdownItems: MenuProps['items'] = [
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: '退出登录',
  },
];

export default (props: HeaderProps) => {
  const { initialState } = useModel('@@initialState');
  const { title } = props;
  const [form] = Form.useForm();

  const [webSiteList, setWebSiteList] = useState<
    { label: string; value: number }[]
  >([{ label: '全部站点', value: 0 }]);

  const getWebSiteList = async () => {
    const { data } = await getWebSiteGetWebSiteList({ page: 1, count: 100 });
    const { list } = data;
    const webSiteList = list.map((item: any) => ({
      label: item.name,
      value: item.webSiteId,
    }));
    setWebSiteList((state) => [...state, ...webSiteList]);
  };

  useEffect(() => {
    form.setFieldsValue({
      siteId: getCurrentSiteId() ?? 0,
    });
    getWebSiteList();
  }, []);

  // 切换站点
  const selectSite = (value: number) => {
    setCurrentSiteId(value);
    message.success('切换站点成功');
    history.push('/');
  };

  const DropdownOnClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      logoutFn();
    }
  };
  return (
    <div className={styles['header-container']}>
      <div className={styles['header-left']}>
        {Logo && (
          <a href="/" className={styles['header-left-logo']}>
            <img src={Logo} alt="logo" />
          </a>
        )}
        {title && <div className={styles['header-left-title']}>{title}</div>}
        <div className={styles['header-left-site-select']}>
          <Form form={form}>
            <Form.Item name="siteId" initialValue={{ siteId: 'all' }} noStyle>
              <Select
                allowClear
                placeholder="请选择站点"
                style={{ width: '100%' }}
                onChange={selectSite}
                options={webSiteList}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className={styles['header-right']}>
        <Dropdown
          placement="bottomRight"
          menu={{
            items: DropdownItems,
            onClick: DropdownOnClick,
          }}
        >
          <div className={styles['header-right-user']}>
            <Avatar src={initialState?.avatar} />
            <div className={styles['header-right-user-name']}>
              {initialState?.name || '用户'}
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};
