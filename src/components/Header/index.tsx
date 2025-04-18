import Logo from '@/assets/icon/logo.svg';
import { logoutFn } from '@/utils';
import { LogoutOutlined } from '@ant-design/icons';
import type { HeaderProps } from '@ant-design/pro-layout';
import { useModel } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown } from 'antd';
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
