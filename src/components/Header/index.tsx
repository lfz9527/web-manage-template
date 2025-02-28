import Logo from '@/assets/icon/logo.svg';
import { CURRENT_SITE_ID } from '@/enum';
import { logoutFn } from '@/utils';
import { LogoutOutlined } from '@ant-design/icons';
import type { HeaderProps } from '@ant-design/pro-layout';
import { history, useModel } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Select, message } from 'antd';
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

  const [siteId, setSiteId] = useState<string>();

  useEffect(() => {
    setSiteId(sessionStorage.getItem(CURRENT_SITE_ID) || '');
  }, []);

  // 切换站点
  const selectSite = (value: string) => {
    console.log(value);
    setSiteId(value);
    sessionStorage.setItem(CURRENT_SITE_ID, value);
    message.success('切换站点成功');
    history.push('/');
  };

  // 退出登录
  const handleLogout = () => {
    logoutFn();
  };

  const DropdownOnClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      handleLogout();
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
          <Select
            placeholder="请选择站点"
            style={{ width: '100%' }}
            value={siteId}
            onChange={selectSite}
            options={[
              { label: '站群1', value: '1' },
              { label: '站群2', value: '2' },
            ]}
          />
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
