import { ArrowUpOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

interface OnTopProps {
  // 位置配置
  position?: {
    right?: number | string;
    bottom?: number | string;
  };
  // 滚动容器获取函数
  getContainer?: () => HTMLElement | Window;
}

const OnTop: React.FC<OnTopProps> = ({
  position = {
    right: 60,
    bottom: 60,
  },
  getContainer = () => window,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = getContainer();

    // 监听滚动事件
    const handleScroll = () => {
      const scrollTop =
        container instanceof Window
          ? document.documentElement.scrollTop
          : (container as HTMLElement).scrollTop;

      setVisible(scrollTop > 300);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [getContainer]);

  // 回到顶部处理函数
  const scrollToTop = () => {
    const container = getContainer();
    if (container instanceof Window) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      (container as HTMLElement).scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return visible ? (
    <div
      onClick={scrollToTop}
      className={styles['on-top-container']}
      style={{
        right: position.right,
        bottom: position.bottom,
      }}
    >
      <ArrowUpOutlined />
    </div>
  ) : null;
};

export default OnTop;
