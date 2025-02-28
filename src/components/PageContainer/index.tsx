import { PropsWithChildren } from 'react';

interface PageContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PropsWithChildren<PageContainerProps>> = ({
  className,
  children,
}) => {
  return <div className={className}>{children}</div>;
};

export default PageContainer;
