import { Space } from 'antd';
import { useRef } from 'react';
import styles from './index.less';
interface PageFooterProps {
  buttons?: React.ReactNode; // 按钮内容
  position?: 'left' | 'right'; // 按钮位置
  mode?: 'fixed' | 'relative'; // 模式
}

const PageFooter: React.FC<PageFooterProps> = ({
  buttons,
  position = 'right',
  mode = 'fixed',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const getHeight = () => {
    if (ref.current) {
      return ref.current.offsetHeight;
    }
    return 0;
  };

  return (
    <div
      style={{
        height: getHeight(),
        marginTop: 20,
        width: '100%',
      }}
    >
      <div
        ref={ref}
        className={styles['page-footer']}
        style={{
          position: mode,
          justifyContent: position === 'left' ? 'flex-start' : 'flex-end',
        }}
      >
        <Space>{buttons}</Space>
      </div>
    </div>
  );
};

export default PageFooter;
