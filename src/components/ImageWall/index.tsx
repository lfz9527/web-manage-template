import { PlusOutlined } from '@ant-design/icons';
import { Image, message, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';

interface ImageWallProps {
  maxCount?: number; // 最大上传数量
  fileList?: Pick<UploadFile, 'url'>[]; // 文件列表
  value?: UploadFile[]; // Form 表单用的 value
  onChange?: (fileList: UploadFile[]) => void; // 文件列表改变的回调
  maxSize?: number; // 最大文件大小(MB)
  accept?: string; // 接受的文件类型
}

const ImageWall: React.FC<ImageWallProps> = ({
  maxCount = 1,
  fileList: propFileList,
  value,
  maxSize = 5,
  accept = 'image/*',
  onChange,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    setFileList(propFileList as UploadFile[]);
  }, [propFileList]);

  // 监听 value 变化
  useEffect(() => {
    if (typeof value === 'object') {
      setFileList(value);
    }
  }, [value]);

  // 将文件转换为 Base64
  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  // 预览图片
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // 文件列表改变
  const handleChange: UploadProps['onChange'] = ({
    file,
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
    if (file.status === 'done') {
      onChange?.(newFileList);
    }
  };

  // 上传前校验
  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('只能上传图片文件!');
      return false;
    }

    const isLtMaxSize = file.size / 1024 / 1024 < maxSize;
    if (!isLtMaxSize) {
      message.error(`图片大小必须小于 ${maxSize}MB!`);
      return false;
    }

    return true;
  };

  // 上传按钮
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 4 }}>上传</div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        maxCount={maxCount}
        accept={accept}
        action="/api/Image/UploadImage"
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default ImageWall;
