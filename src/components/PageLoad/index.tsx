import { Spin } from 'antd';
import styles from './index.less';

interface Props {
  loading: boolean;
}

const PageLoad: React.FC<Props> = ({ loading = false }) => {
  if (!loading) return null;

  return (
    <div className={styles['load-container']}>
      <div className={styles['load-content']}>
        <Spin size="large" />
      </div>
    </div>
  );
};

export default PageLoad;
