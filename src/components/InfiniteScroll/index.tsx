import { Spin } from 'antd';
import React, { useEffect, useRef } from 'react';

interface InfiniteScrollProps {
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore: () => void;
  children: React.ReactNode;
  getContainer?: () => HTMLElement;
  threshold?: number;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loading = false,
  hasMore = true,
  onLoadMore,
  children,
  threshold = 100,
  getContainer,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || loading || !hasMore) return;

      const scrollContainer = getContainer?.() || window;
      const { bottom } = containerRef.current.getBoundingClientRect();
      const containerHeight =
        scrollContainer === window
          ? window.innerHeight
          : scrollContainer instanceof Window
          ? window.innerHeight
          : (scrollContainer as HTMLElement).clientHeight;

      if (bottom - containerHeight < threshold) {
        onLoadMore();
      }
    };

    const scrollContainer = getContainer?.() || window;
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, onLoadMore, threshold, getContainer]);

  return (
    <div ref={containerRef}>
      {children}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Spin />
        </div>
      )}
      {!hasMore && (
        <div style={{ textAlign: 'center', padding: '20px 0', color: '#999' }}>
          没有更多数据了
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
