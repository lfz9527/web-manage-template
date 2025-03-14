import { Image, InfiniteScroll, OnTop, PageLoad } from '@/components';
import { getImageGetImageList } from '@/services/api/image';
import { convertFileSize, formatImageUrl, formatTime } from '@/utils';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';

interface ImageItem {
  imageId: number;
  hash: string;
  imgSrc: string;
  size: number;
  height: number;
  width: number;
  createTime: string;
}

export default () => {
  const [pageLoad, setPageLoad] = useState(true);
  const [messageApi, messageContextHolder] = message.useMessage();
  const [images, setImages] = useState<ImageItem[]>([]);
  const [previewImage, setPreviewImage] = useState<ImageItem['imgSrc']>('');
  const [previewOpen, setPreviewOpen] = useState(false);

  const [listLoading, setListLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const handleDelete = (item: ImageItem) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这张图片吗？',
      centered: true,
      onOk: () => {
        messageApi.success('删除成功');
      },
    });
  };

  const handleUpload = (item: ImageItem) => {
    messageApi.info('上传功能开发中');
  };

  const handlePreview = (item: ImageItem) => {
    setPreviewImage(item.imgSrc);
    setPreviewOpen(true);
  };

  // 获取图片列表
  const getImageList = async () => {
    const { data } = await getImageGetImageList({
      page,
      count: 30,
    });
    const { list } = data;
    setImages((state) => [...state, ...list]);
    if (pageLoad) {
      setPageLoad(false);
    }
    if (listLoading) {
      setListLoading(false);
    }
  };

  const loadMore = () => {
    if (!listLoading) {
      setListLoading(true);
      setPage((p) => p + 1);
    }
  };

  useEffect(() => {
    getImageList();
  }, [page]);

  return (
    <>
      <PageLoad loading={pageLoad} />
      {messageContextHolder}
      <div className={styles['image-container']}>
        <InfiniteScroll
          loading={listLoading}
          hasMore={hasMore}
          onLoadMore={loadMore}
        >
          <div className={styles['image-content']}>
            {images.map((item) => (
              <div
                className={styles['img-wrap']}
                key={item.imageId + item.imgSrc}
              >
                <div
                  className={styles['point-container']}
                  onClick={() => handlePreview(item)}
                >
                  <div className={styles['point-content']}>
                    <div
                      className={`${styles['point-preview']} ${styles['point-item']}`}
                    >
                      <EyeOutlined /> <span>预览</span>
                    </div>
                    <div
                      style={{
                        display: 'none',
                      }}
                      className={`${styles['point-delete']} ${styles['point-item']}`}
                      onClick={() => handleDelete(item)}
                    >
                      <DeleteOutlined /> <span>删除</span>
                    </div>
                  </div>
                </div>

                <div className={styles['img-info']}>
                  <div className={styles['img-info-content']}>
                    <div className={styles['img-info-item']}>
                      <label>图片尺寸：</label>
                      <span>{item.width + 'X' + item.height}</span>
                    </div>
                    <div className={styles['img-info-item']}>
                      <label>图片大小：</label>
                      <span>{`${convertFileSize(
                        item.size,
                        'B',
                        'MB',
                      )}MB`}</span>
                    </div>
                    <div className={styles['img-info-item']}>
                      <label>上传时间：</label>
                      <span>{formatTime(item.createTime)}</span>
                    </div>
                  </div>
                </div>

                <img
                  alt={formatImageUrl(item.imgSrc)}
                  src={formatImageUrl(item.imgSrc)}
                  className={styles['img-item']}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>

      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={formatImageUrl(previewImage)}
        />
      )}

      <OnTop />
    </>
  );
};
