import { Image } from '@/components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message, Space } from 'antd';
import { useRef, useState } from 'react';

interface TableItem {
  goodPostId: string;
  user: {
    nickName: string;
  };
  goodTitle: string;
  goodPrice: string;
  images: {
    imgSrc: string;
  }[];
  content: string;
  isHot: boolean;
  hotTime: string;
  topCount: string;
  commentCount: string;
  shareCount: string;
  createTime: string;
}

export default () => {
  const actionRef = useRef<ActionType>();
  const [messageApi, messageContextHolder] = message.useMessage();

  const [selectedRows, setSelectedRows] = useState<TableItem[]>([]);

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'ID',
      dataIndex: 'goodAlbumId',
      search: false,
    },
    {
      title: '用户名',
      dataIndex: 'user',
      search: false,
      render: (_, record) => {
        return record.user.nickName;
      },
    },
    {
      title: '商品标题',
      dataIndex: 'goodTitle',
      search: false,
    },
    {
      title: '商品价格',
      dataIndex: 'goodPrice',
    },
    {
      title: '帖子图片',
      dataIndex: 'images',
      search: false,
      render: (_, record) => {
        return record.images.map((item) => {
          return <Image src={item.imgSrc} key={item.imgSrc} />;
        });
      },
    },
    {
      title: '帖子描述',
      dataIndex: 'content',
      search: false,
      width: 300,
    },
    {
      title: '是否热门',
      dataIndex: 'isHot',
      search: false,
    },
    {
      title: '上热门时间',
      dataIndex: 'hotTime',
      search: false,
    },
    {
      title: '点赞数',
      dataIndex: 'topCount',
      search: false,
    },
    {
      title: '评论数',
      dataIndex: 'commentCount',
      search: false,
    },
    {
      title: '分享数',
      dataIndex: 'shareCount',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) =>
        [
          record.isHot && <a key="public">下热门</a>,
          !record.isHot && <a key="private">上热门</a>,
          <a key="delete">删除</a>,
        ].filter(Boolean),
    },
  ];

  return (
    <>
      <ProTable<TableItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        rowSelection={{}}
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <a onClick={() => {}}>批量上热门</a>
              <a onClick={() => {}}>批量下热门</a>
            </Space>
          );
        }}
        request={async (params) => {
          return {
            data: [],
            success: true,
            total: 0,
          };
        }}
        rowKey="goodPostId"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          onChange: () => {
            actionRef.current?.clearSelected?.();
          },
        }}
        dateFormatter="string"
      />
    </>
  );
};
